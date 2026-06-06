. (Join-Path $PSScriptRoot "_github-cred.ps1")

$repo = "$login/autocore-landing"

foreach ($body in @(
    @{ build_type = "workflow" },
    @{ source = @{ branch = "main"; path = "/" } }
)) {
    try {
        Invoke-GitHubApi -Method POST -Path "/repos/$repo/pages" -Token $token -Body $body | Out-Null
        Write-Host "PAGES_CREATED via POST"
        exit 0
    }
    catch {
        $code = $_.Exception.Response.StatusCode.value__
        Write-Host "POST failed status=$code body=$($body | ConvertTo-Json -Compress)"
    }
}

try {
    Invoke-GitHubApi -Method PUT -Path "/repos/$repo/pages" -Token $token -Body @{ build_type = "workflow" } | Out-Null
    Write-Host "PAGES_UPDATED via PUT"
    exit 0
}
catch {
    $code = $_.Exception.Response.StatusCode.value__
    Write-Host "PUT failed status=$code"
}

throw "Could not enable GitHub Pages automatically. Open: https://github.com/$repo/settings/pages and set Source to GitHub Actions."
