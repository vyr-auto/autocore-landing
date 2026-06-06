Add-Type @"
using System;
using System.Runtime.InteropServices;
using System.Text;
public class WinCred {
    [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Unicode)]
    public struct CREDENTIAL {
        public uint Flags; public uint Type; public string TargetName; public string Comment;
        public System.Runtime.InteropServices.ComTypes.FILETIME LastWritten;
        public uint CredentialBlobSize; public IntPtr CredentialBlob; public uint Persist;
        public uint AttributeCount; public IntPtr Attributes; public string TargetAlias; public string UserName;
    }
    [DllImport("advapi32.dll", CharSet = CharSet.Unicode, SetLastError = true)]
    public static extern bool CredRead(string target, uint type, uint reserved, out IntPtr credential);
    [DllImport("advapi32.dll", SetLastError = true)]
    public static extern bool CredFree(IntPtr credential);
}
"@

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

function Invoke-GitHubApi {
    param([string]$Method, [string]$Path, [string]$Token, [object]$Body = $null)
    $headers = @{
        Authorization = "Bearer $Token"
        Accept = "application/vnd.github+json"
        "X-GitHub-Api-Version" = "2022-11-28"
        "User-Agent" = "autocore-landing-deploy"
    }
    $params = @{ Uri = "https://api.github.com$Path"; Method = $Method; Headers = $headers }
    if ($Body) { $params.Body = ($Body | ConvertTo-Json); $params.ContentType = "application/json" }
    return Invoke-RestMethod @params
}

$credentialTargets = @(
    "git:https://github.com",
    "git:https://Denwien@github.com",
    "GitHub - https://api.github.com/ffdfd2424325"
)

$script:token = $null
$script:login = $null

foreach ($target in $credentialTargets) {
    $stored = Get-WindowsCredential -Target $target
    if (-not $stored -or -not $stored.Secret) { continue }
    try {
        $user = Invoke-GitHubApi -Method GET -Path "/user" -Token $stored.Secret
        $script:token = $stored.Secret
        $script:login = $user.login
        break
    } catch { continue }
}

if (-not $script:token) { throw "No valid GitHub token found." }
