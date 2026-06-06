. (Join-Path $PSScriptRoot "_github-cred.ps1")

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

$targets = @(
    "git:https://x-access-token@github.com",
    "git:https://github.com",
    "git:https://Denwien@github.com",
    "git:https://vyr-auto@github.com",
    "GitHub - https://api.github.com/ffdfd2424325"
)

foreach ($t in $targets) {
    $c = Get-WindowsCredential $t
    if (-not $c) { Write-Host "MISSING $t"; continue }
    try {
        $u = Invoke-GitHubApi -Method GET -Path "/user" -Token $c.Secret
        $access = Invoke-GitHubApi -Method GET -Path "/repos/vyr-auto/autocore-landing" -Token $c.Secret
        Write-Host "OK target=$t login=$($u.login) repo_access=read"
        try {
            $perms = Invoke-RestMethod -Uri "https://api.github.com/repos/vyr-auto/autocore-landing" -Headers @{
                Authorization = "Bearer $($c.Secret)"
                Accept = "application/vnd.github+json"
                "User-Agent" = "test"
            }
            Write-Host "  can_push=unknown"
        } catch {}
    } catch {
        Write-Host "FAIL target=$t"
    }
}
