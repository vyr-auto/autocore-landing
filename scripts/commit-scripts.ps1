$git = "C:\Users\gorco\Downloads\autocore-landing-main\tools\MinGit\cmd\git.exe"
$gh = "C:\Users\gorco\Downloads\autocore-landing-main\tools\gh\bin\gh.exe"
$root = "C:\Users\gorco\Downloads\autocore-landing-main\autocore-landing-main"
Set-Location $root
& $git add scripts
& $git commit -m "Add automatic vyr-auto GitHub login and deploy scripts."
$token = (& $gh auth token).Trim()
$remoteUrl = "https://x-access-token:$token@github.com/vyr-auto/autocore-landing.git"
& $git remote set-url origin $remoteUrl
$ErrorActionPreference = "Continue"
& $git pull origin main --rebase 2>&1 | Out-Null
& $git push origin main 2>&1
$ErrorActionPreference = "Stop"
& $git remote set-url origin "https://github.com/vyr-auto/autocore-landing.git"
