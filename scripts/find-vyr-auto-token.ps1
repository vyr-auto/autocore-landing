. (Join-Path $PSScriptRoot "_github-cred.ps1")

$targets = @(
    "git:https://x-access-token@github.com",
    "git:https://github.com",
    "git:https://Denwien@github.com",
    "git:https://vyr-auto@github.com"
)

foreach ($t in $targets) {
    $stored = Get-WindowsCredential -Target $t
    if (-not $stored) { Write-Host "MISSING $t"; continue }
    try {
        $user = Invoke-GitHubApi -Method GET -Path "/user" -Token $stored.Secret
        Write-Host "LOGIN target=$t account=$($user.login)"
    } catch {
        Write-Host "INVALID target=$t"
    }
}
