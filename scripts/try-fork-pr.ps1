. (Join-Path $PSScriptRoot "_github-cred.ps1")

$owner = "vyr-auto"
$repoName = "autocore-landing"

try {
    $fork = Invoke-GitHubApi -Method POST -Path "/repos/$owner/$repoName/forks" -Token $token
    Write-Host "FORK=$($fork.full_name)"
}
catch {
    Write-Host "FORK_FAIL $($_.Exception.Message)"
}
