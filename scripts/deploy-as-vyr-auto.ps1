$ErrorActionPreference = "Stop"

$gh = "C:\Users\gorco\Downloads\autocore-landing-main\tools\gh\bin\gh.exe"
$git = "C:\Users\gorco\Downloads\autocore-landing-main\tools\MinGit\cmd\git.exe"
$root = "C:\Users\gorco\Downloads\autocore-landing-main\autocore-landing-main"
$owner = "vyr-auto"
$repoName = "autocore-landing"
$token = (& $gh auth token).Trim()

if (-not $token) {
    . (Join-Path $root "scripts\login-vyr-auto.ps1")
    $token = (& $gh auth token).Trim()
}

$activeLogin = (& $gh api user -q .login).Trim()
if ($activeLogin -ne "vyr-auto") {
    throw "Active GitHub account is '$activeLogin', expected vyr-auto. Run scripts/login-vyr-auto.ps1 first."
}

Set-Location $root

function Invoke-GitHubApi {
    param([string]$Method, [string]$Path, [object]$Body = $null)
    $headers = @{
        Authorization = "Bearer $token"
        Accept = "application/vnd.github+json"
        "X-GitHub-Api-Version" = "2022-11-28"
        "User-Agent" = "autocore-landing-deploy"
    }
    $params = @{ Uri = "https://api.github.com$Path"; Method = $Method; Headers = $headers }
    if ($Body) { $params.Body = ($Body | ConvertTo-Json); $params.ContentType = "application/json" }
    return Invoke-RestMethod @params
}

try {
    $pr = Invoke-GitHubApi -Method GET -Path "/repos/$owner/$repoName/pulls/1"
    if ($pr.state -eq "open" -and $pr.mergeable -ne $false) {
        $merged = Invoke-GitHubApi -Method PUT -Path "/repos/$owner/$repoName/pulls/1/merge" -Body @{
            merge_method = "merge"
        }
        if ($merged.merged) {
            Write-Host "PR_MERGED=https://github.com/$owner/$repoName/pull/1"
        }
    }
}
catch {
    Write-Host "PR_MERGE_SKIPPED=$($_.Exception.Message)"
}

$remoteUrl = "https://x-access-token:$token@github.com/$owner/$repoName.git"
$ErrorActionPreference = "SilentlyContinue"
& $git remote remove origin | Out-Null
$ErrorActionPreference = "Stop"
& $git remote add origin $remoteUrl

$branch = (& $git branch --show-current).Trim()
if ($branch -ne "main") {
    & $git checkout main
}

& $git fetch origin main
$ErrorActionPreference = "Continue"
$pushOutput = & $git push -u origin main 2>&1
$ErrorActionPreference = "Stop"
if ($LASTEXITCODE -ne 0) {
    $pushOutput = & $git push -u origin mobile-scroll-fix:main --force 2>&1
    if ($LASTEXITCODE -ne 0) {
        throw "Push failed: $pushOutput"
    }
}

& $git remote set-url origin "https://github.com/$owner/$repoName.git"

try {
    Invoke-GitHubApi -Method GET -Path "/repos/$owner/$repoName/pages" | Out-Null
}
catch {
    Invoke-GitHubApi -Method POST -Path "/repos/$owner/$repoName/pages" -Body @{
        build_type = "workflow"
    } | Out-Null
}

Write-Host "AUTH_OK USER=vyr-auto"
Write-Host "REPO=https://github.com/$owner/$repoName"
Write-Host "SITE=https://$owner.github.io/$repoName/"
