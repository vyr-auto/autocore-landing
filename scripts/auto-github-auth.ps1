$ErrorActionPreference = "Stop"

. (Join-Path $PSScriptRoot "_github-cred.ps1")

$root = Split-Path -Parent $PSScriptRoot
$git = Join-Path (Split-Path -Parent $root) "tools\MinGit\cmd\git.exe"
$repoName = "autocore-landing"

Set-Location $root

try {
    Invoke-GitHubApi -Method GET -Path "/repos/$login/$repoName" -Token $token | Out-Null
}
catch {
    if ($_.Exception.Response.StatusCode.value__ -eq 404) {
        Invoke-GitHubApi -Method POST -Path "/user/repos" -Token $token -Body @{
            name = $repoName
            description = "Landing page: Автоматизация в дело"
            private = $false
            auto_init = $false
        } | Out-Null
    }
    else {
        throw
    }
}

$remoteUrl = "https://x-access-token:$token@github.com/$login/$repoName.git"
$existingRemote = & $git remote get-url origin 2>$null

if (-not $existingRemote) {
    & $git remote add origin $remoteUrl
}
else {
    & $git remote set-url origin $remoteUrl
}

$env:GIT_TERMINAL_PROMPT = "0"
& $git push -u origin main
if ($LASTEXITCODE -ne 0) {
    throw "Git push failed."
}

& $git remote set-url origin "https://github.com/$login/$repoName.git"

Write-Host "AUTH_OK"
Write-Host "USER=$login"
Write-Host "REPO=https://github.com/$login/$repoName"
Write-Host "SITE=https://$login.github.io/$repoName/"
