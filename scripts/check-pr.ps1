. (Join-Path $PSScriptRoot "_github-cred.ps1")
$pr = Invoke-GitHubApi -Method GET -Path "/repos/vyr-auto/autocore-landing/pulls/1" -Token $token
Write-Host "PR_STATE=$($pr.state)"
Write-Host "MERGEABLE=$($pr.mergeable)"
Write-Host "URL=$($pr.html_url)"
