. (Join-Path $PSScriptRoot "_github-cred.ps1")

$repo = Invoke-GitHubApi -Method GET -Path "/repos/$login/autocore-landing" -Token $token
Write-Host "REPO=$($repo.html_url)"
Write-Host "DEFAULT_BRANCH=$($repo.default_branch)"

$workflows = Invoke-GitHubApi -Method GET -Path "/repos/$login/autocore-landing/actions/workflows" -Token $token
foreach ($wf in $workflows.workflows) {
    Write-Host "WORKFLOW $($wf.name) state=$($wf.state)"
}

$runs = Invoke-GitHubApi -Method GET -Path "/repos/$login/autocore-landing/actions/runs?per_page=5" -Token $token
foreach ($run in $runs.workflow_runs) {
    Write-Host "RUN $($run.name) status=$($run.status) conclusion=$($run.conclusion) url=$($run.html_url)"
}

try {
    $pages = Invoke-GitHubApi -Method GET -Path "/repos/$login/autocore-landing/pages" -Token $token
    Write-Host "PAGES_URL=$($pages.html_url)"
    Write-Host "PAGES_STATUS=$($pages.status)"
}
catch {
    Write-Host "PAGES_NOT_CONFIGURED"
}
