. (Join-Path $PSScriptRoot "_github-cred.ps1")
try {
    $result = Invoke-GitHubApi -Method PUT -Path "/repos/vyr-auto/autocore-landing/pulls/1/merge" -Token $token -Body @{
        merge_method = "merge"
        commit_title = "Merge pull request #1 from osy-les/mobile-scroll-fix"
    }
    Write-Host "MERGED=$($result.merged)"
    Write-Host "SHA=$($result.sha)"
}
catch {
    Write-Host "MERGE_FAIL=$($_.Exception.Message)"
}
