$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$git = Join-Path (Split-Path -Parent $root) "tools\MinGit\cmd\git.exe"
$gh = Join-Path (Split-Path -Parent $root) "tools\gh\bin\gh.exe"

if (-not (Test-Path $git)) {
  throw "Git not found. Run deploy setup from Cursor first."
}

if (-not (Test-Path $gh)) {
  throw "GitHub CLI not found. Run deploy setup from Cursor first."
}

Set-Location $root

$auth = & $gh auth status 2>&1
if ($LASTEXITCODE -ne 0) {
  Write-Host "Log in to GitHub first:"
  & $gh auth login -h github.com -p https -w
}

$repoName = "autocore-landing"
$existingRemote = & $git remote get-url origin 2>$null

if (-not $existingRemote) {
  Write-Host "Creating GitHub repository: $repoName"
  & $gh repo create $repoName --public --source . --remote origin --push
} else {
  Write-Host "Pushing to existing remote: $existingRemote"
  & $git push -u origin main
}

Write-Host ""
Write-Host "Next steps:"
Write-Host "1. Open https://github.com/$(& $gh api user -q .login)/$repoName/settings/pages"
Write-Host "2. Set Build and deployment -> Source = GitHub Actions"
Write-Host "3. Wait for the 'Deploy to GitHub Pages' workflow to finish"
Write-Host "4. Site URL: https://$(& $gh api user -q .login).github.io/$repoName/"
