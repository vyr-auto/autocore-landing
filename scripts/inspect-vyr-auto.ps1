. (Join-Path $PSScriptRoot "_github-cred.ps1")

$owner = "vyr-auto"
$repoName = "autocore-landing"

$repo = Invoke-GitHubApi -Method GET -Path "/repos/$owner/$repoName" -Token $token
Write-Host "REPO=$($repo.html_url)"
Write-Host "UPDATED=$($repo.updated_at)"

$commits = Invoke-GitHubApi -Method GET -Path "/repos/$owner/$repoName/commits?per_page=3" -Token $token
foreach ($c in $commits) {
    Write-Host "COMMIT $($c.sha.Substring(0,7)) $($c.commit.message.Split("`n")[0])"
}

try {
    Invoke-GitHubApi -Method GET -Path "/repos/$owner/$repoName/contents/hooks/use-landing-motion.ts" -Token $token | Out-Null
    Write-Host "MOBILE_FIX=present"
}
catch {
    Write-Host "MOBILE_FIX=missing"
}

try {
    $pages = Invoke-GitHubApi -Method GET -Path "/repos/$owner/$repoName/pages" -Token $token
    Write-Host "PAGES=$($pages.html_url)"
}
catch {
    Write-Host "PAGES=not_configured"
}

$runs = Invoke-GitHubApi -Method GET -Path "/repos/$owner/$repoName/actions/runs?per_page=1" -Token $token
if ($runs.workflow_runs.Count -gt 0) {
    $run = $runs.workflow_runs[0]
    Write-Host "LAST_RUN=$($run.name) $($run.status) $($run.conclusion)"
}
