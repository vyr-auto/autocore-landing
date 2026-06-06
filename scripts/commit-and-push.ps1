$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$git = Join-Path (Split-Path -Parent $root) "tools\MinGit\cmd\git.exe"
Set-Location $root
& $git add scripts
& $git commit -m "Add automatic GitHub auth scripts using Windows Credential Manager."
. (Join-Path $PSScriptRoot "auto-github-auth.ps1")
