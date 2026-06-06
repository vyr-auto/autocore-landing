$ErrorActionPreference = "Stop"

. (Join-Path $PSScriptRoot "_github-cred.ps1")

$login = "osy-les"
$repoName = "autocore-landing"

try {
    Invoke-GitHubApi -Method PUT -Path "/repos/$login/$repoName/pages" -Token $token -Body @{
        build_type = "workflow"
    } | Out-Null
    Write-Host "PAGES_ENABLED"
}
catch {
    if ($_.Exception.Response.StatusCode.value__ -eq 422) {
        Write-Host "PAGES_ALREADY_CONFIGURED"
    }
    else {
        throw
    }
}

$runs = Invoke-GitHubApi -Method GET -Path "/repos/$login/$repoName/actions/workflows/deploy-pages.yml/runs?per_page=1" -Token $token
if ($runs.workflow_runs.Count -gt 0) {
    $run = $runs.workflow_runs[0]
    Write-Host "WORKFLOW=$($run.status) $($run.conclusion)"
    Write-Host "RUN_URL=$($run.html_url)"
}

Write-Host "SITE=https://$login.github.io/$repoName/"
