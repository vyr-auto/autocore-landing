$ErrorActionPreference = "Stop"

. (Join-Path $PSScriptRoot "_github-cred.ps1")

$root = Split-Path -Parent $PSScriptRoot
$git = Join-Path (Split-Path -Parent $root) "tools\MinGit\cmd\git.exe"
$upstreamOwner = "vyr-auto"
$repoName = "autocore-landing"
$forkOwner = $login
$forkName = "$repoName-1"
$branch = "mobile-scroll-fix"

Set-Location $root

$upstreamFetch = "https://x-access-token:$token@github.com/$upstreamOwner/$repoName.git"
$forkRemote = "https://x-access-token:$token@github.com/$forkOwner/$forkName.git"

$prevEap = $ErrorActionPreference
$ErrorActionPreference = "SilentlyContinue"
& $git remote remove origin | Out-Null
& $git remote remove upstream | Out-Null
$ErrorActionPreference = $prevEap

& $git remote add upstream $upstreamFetch
& $git remote add origin $forkRemote

& $git fetch upstream main
if ($LASTEXITCODE -ne 0) {
    throw "Failed to fetch upstream main."
}

$ErrorActionPreference = "SilentlyContinue"
& $git branch -D $branch | Out-Null
$ErrorActionPreference = "Stop"
& $git checkout -B $branch upstream/main
if ($LASTEXITCODE -ne 0) {
    throw "Failed to create branch from upstream/main."
}

& $git checkout main -- `
    hooks/use-landing-motion.ts `
    app/globals.css `
    components/landing/before-after.tsx `
    components/landing/cta.tsx `
    components/landing/examples.tsx `
    components/landing/hero.tsx `
    components/landing/problems.tsx `
    components/landing/process.tsx `
    components/landing/results.tsx `
    components/landing/section-title.tsx `
    components/landing/services.tsx `
    components/landing/trust.tsx `
    scripts

& $git add hooks/use-landing-motion.ts app/globals.css components/landing scripts
$status = & $git status --porcelain
if (-not $status) {
    throw "No changes to commit on top of upstream/main."
}

& $git commit -m @"
Fix mobile scroll freezes and add GitHub deploy scripts.

Show section content immediately on phones, reduce heavy blur effects, and add scripts for automatic GitHub auth/deploy.
"@

$ErrorActionPreference = "Continue"
$pushOutput = & $git push -u origin $branch --force 2>&1
$ErrorActionPreference = "Stop"

if ($LASTEXITCODE -ne 0) {
    throw "Push to fork failed: $pushOutput"
}

Write-Host "FORK_PUSH_OK=https://github.com/$forkOwner/$forkName/tree/$branch"

$existingPrs = Invoke-GitHubApi -Method GET -Path "/repos/$upstreamOwner/$repoName/pulls?head=$forkOwner`:$branch&state=open" -Token $token
if ($existingPrs.Count -gt 0) {
    Write-Host "PR_EXISTS=$($existingPrs[0].html_url)"
    exit 0
}

$pr = Invoke-GitHubApi -Method POST -Path "/repos/$upstreamOwner/$repoName/pulls" -Token $token -Body @{
    title = "Fix mobile scroll freezes and add deploy scripts"
    head = "$forkOwner`:$branch"
    base = "main"
    body = @"
## Summary
- Fix mobile scroll freezes by showing section content immediately on phones
- Reduce heavy blur/background effects on mobile
- Add automatic GitHub auth/deploy scripts

## Test plan
- [ ] Open https://vyr-auto.github.io/autocore-landing/ on mobile after merge
- [ ] Scroll through all sections without freezes
"@
}

Write-Host "PR_CREATED=$($pr.html_url)"
Write-Host "TARGET_REPO=https://github.com/$upstreamOwner/$repoName"
Write-Host "SITE=https://$upstreamOwner.github.io/$repoName/"
