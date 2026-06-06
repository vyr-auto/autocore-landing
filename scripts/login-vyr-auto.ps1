$ErrorActionPreference = "Stop"

$gh = "C:\Users\gorco\Downloads\autocore-landing-main\tools\gh\bin\gh.exe"
if (-not (Test-Path $gh)) {
    throw "GitHub CLI not found."
}

$status = & $gh auth status 2>&1
if ($LASTEXITCODE -eq 0 -and ($status -match "Logged in to github.com account vyr-auto")) {
    Write-Host "ALREADY_LOGGED_IN=vyr-auto"
    exit 0
}

$job = Start-Job -ScriptBlock {
    param($ghPath)
    & $ghPath auth login --hostname github.com --git-protocol https --web --scopes "repo,workflow,read:org,project" 2>&1
} -ArgumentList $gh

Start-Sleep -Seconds 2
$lines = Receive-Job $job
$codeLine = $lines | Where-Object { $_ -match "one-time code" } | Select-Object -First 1
if ($codeLine -match "code:\s*([A-Z0-9-]+)") {
    $code = $Matches[1]
    Start-Process "https://github.com/login/device/code/$code"
    Write-Host "OPENED_BROWSER code=$code"
}

Wait-Job $job | Out-Null
$output = Receive-Job $job
Remove-Job $job

if ($output -notmatch "Logged in as vyr-auto") {
    throw "GitHub login did not complete for vyr-auto."
}

Write-Host "LOGGED_IN=vyr-auto"
