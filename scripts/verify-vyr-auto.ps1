$gh = "C:\Users\gorco\Downloads\autocore-landing-main\tools\gh\bin\gh.exe"
$token = (& $gh auth token).Trim()
$headers = @{
    Authorization = "Bearer $token"
    Accept = "application/vnd.github+json"
    "User-Agent" = "verify"
}

$login = Invoke-RestMethod -Uri "https://api.github.com/user" -Headers $headers
Write-Host "LOGIN=$($login.login)"

try {
    Invoke-RestMethod -Uri "https://api.github.com/repos/vyr-auto/autocore-landing/contents/hooks/use-landing-motion.ts" -Headers $headers | Out-Null
    Write-Host "MOBILE_FIX=present"
} catch {
    Write-Host "MOBILE_FIX=missing"
}

$runs = Invoke-RestMethod -Uri "https://api.github.com/repos/vyr-auto/autocore-landing/actions/runs?per_page=1" -Headers $headers
$run = $runs.workflow_runs[0]
Write-Host "LAST_RUN=$($run.name) $($run.status) $($run.conclusion)"

try {
    $pages = Invoke-RestMethod -Uri "https://api.github.com/repos/vyr-auto/autocore-landing/pages" -Headers $headers
    Write-Host "SITE=$($pages.html_url)"
} catch {
    Write-Host "PAGES=missing"
}
