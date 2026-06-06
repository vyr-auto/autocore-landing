$git = "C:\Users\gorco\Downloads\autocore-landing-main\tools\MinGit\cmd\git.exe"
Set-Location "C:\Users\gorco\Downloads\autocore-landing-main\autocore-landing-main"
& $git rebase --abort 2>$null
& $git status
