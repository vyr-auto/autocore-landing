. (Join-Path $PSScriptRoot "_github-cred.ps1")

$run = Invoke-GitHubApi -Method GET -Path "/repos/$login/autocore-landing/actions/runs/27060001348" -Token $token
Write-Host "STATUS=$($run.status) CONCLUSION=$($run.conclusion)"

$jobs = Invoke-GitHubApi -Method GET -Path "/repos/$login/autocore-landing/actions/runs/27060001348/jobs" -Token $token
foreach ($job in $jobs.jobs) {
    Write-Host "JOB $($job.name) $($job.conclusion)"
    foreach ($step in $job.steps) {
        if ($step.conclusion -eq "failure") {
            Write-Host "  FAIL $($step.name) $($step.number)"
        }
    }
}
