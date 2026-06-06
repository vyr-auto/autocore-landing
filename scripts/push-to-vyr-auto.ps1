$ErrorActionPreference = "Stop"

. (Join-Path $PSScriptRoot "_github-cred.ps1")

$root = Split-Path -Parent $PSScriptRoot
$git = Join-Path (Split-Path -Parent $root) "tools\MinGit\cmd\git.exe"
$owner = "vyr-auto"
$repoName = "autocore-landing"

$credentialTargets = @(
    "git:https://github.com",
    "git:https://Denwien@github.com",
    "git:https://yuriy-vasilenko@github.com",
    "GitHub - https://api.github.com/ffdfd2424325"
)

function Get-WindowsCredential([string]$Target) {
    $ptr = [IntPtr]::Zero
    if (-not [WinCred]::CredRead($Target, 1, 0, [ref]$ptr)) { return $null }
    try {
        $cred = [Runtime.InteropServices.Marshal]::PtrToStructure($ptr, [type][WinCred+CREDENTIAL])
        $size = [int]$cred.CredentialBlobSize
        if ($size -le 0) { return $null }
        $bytes = New-Object byte[] $size
        [Runtime.InteropServices.Marshal]::Copy($cred.CredentialBlob, $bytes, 0, $size)
        $secret = [Text.Encoding]::Unicode.GetString($bytes).TrimEnd([char]0)
        return [pscustomobject]@{ Target=$cred.TargetName; UserName=$cred.UserName; Secret=$secret }
    } finally { [WinCred]::CredFree($ptr) | Out-Null }
}

Set-Location $root

$repo = Invoke-GitHubApi -Method GET -Path "/repos/$owner/$repoName" -Token $token
Write-Host "TARGET_REPO=$($repo.html_url)"

$pushed = $false
foreach ($target in $credentialTargets) {
    $stored = Get-WindowsCredential -Target $target
    if (-not $stored -or -not $stored.Secret) { continue }

    try {
        $user = Invoke-GitHubApi -Method GET -Path "/user" -Token $stored.Secret
    }
    catch {
        continue
    }

    Write-Host "TRY_USER=$($user.login) TARGET=$target"
    $remoteUrl = "https://x-access-token:$($stored.Secret)@github.com/$owner/$repoName.git"
    & $git remote remove origin 2>$null
    & $git remote add origin $remoteUrl

    $env:GIT_TERMINAL_PROMPT = "0"
    $prevEap = $ErrorActionPreference
    $ErrorActionPreference = "Continue"
    $pushOutput = & $git push -u origin main --force-with-lease 2>&1
    $ErrorActionPreference = $prevEap
    if ($LASTEXITCODE -eq 0) {
        $pushed = $true
        $script:token = $stored.Secret
        $script:login = $user.login
        Write-Host "PUSH_OK USER=$($user.login)"
        break
    }

    Write-Host "PUSH_FAIL USER=$($user.login) $pushOutput"
}

if (-not $pushed) {
    throw "No stored GitHub account has write access to $owner/$repoName. Log in as vyr-auto and save credentials, or add osy-les as collaborator."
}

& $git remote set-url origin "https://github.com/$owner/$repoName.git"

try {
    Invoke-GitHubApi -Method GET -Path "/repos/$owner/$repoName/pages" -Token $token | Out-Null
    Write-Host "PAGES_ALREADY_ENABLED"
}
catch {
    if ($_.Exception.Response.StatusCode.value__ -eq 404) {
        Invoke-GitHubApi -Method POST -Path "/repos/$owner/$repoName/pages" -Token $token -Body @{
            build_type = "workflow"
        } | Out-Null
        Write-Host "PAGES_ENABLED"
    }
    else {
        throw
    }
}

Write-Host "AUTH_OK"
Write-Host "REPO=https://github.com/$owner/$repoName"
Write-Host "SITE=https://$owner.github.io/$repoName/"
