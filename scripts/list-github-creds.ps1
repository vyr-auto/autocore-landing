$ErrorActionPreference = "Stop"

Add-Type @"
using System;
using System.Runtime.InteropServices;
using System.Text;
public class WinCred {
    [DllImport("advapi32.dll", CharSet = CharSet.Unicode, SetLastError = true)]
    public static extern bool CredEnumerate(string filter, uint flags, out uint count, out IntPtr credentials);
    [DllImport("advapi32.dll", SetLastError = true)]
    public static extern bool CredFree(IntPtr credential);
    [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Unicode)]
    public struct CREDENTIAL {
        public uint Flags; public uint Type; public string TargetName; public string Comment;
        public System.Runtime.InteropServices.ComTypes.FILETIME LastWritten;
        public uint CredentialBlobSize; public IntPtr CredentialBlob; public uint Persist;
        public uint AttributeCount; public IntPtr Attributes; public string TargetAlias; public string UserName;
    }
}
"@

function Test-GitHubToken([string]$Token) {
    try {
        $r = Invoke-RestMethod -Uri "https://api.github.com/user" -Headers @{
            Authorization = "Bearer $Token"
            Accept = "application/vnd.github+json"
            "User-Agent" = "cred-scan"
        }
        return $r.login
    } catch { return $null }
}

$count = 0
$ptr = [IntPtr]::Zero
[WinCred]::CredEnumerate($null, 0, [ref]$count, [ref]$ptr) | Out-Null

$size = [System.Runtime.InteropServices.Marshal]::SizeOf([type][WinCred+CREDENTIAL])
for ($i = 0; $i -lt $count; $i++) {
    $credPtr = [IntPtr]($ptr.ToInt64() + $i * [IntPtr]::Size)
    $credStructPtr = [System.Runtime.InteropServices.Marshal]::ReadIntPtr($credPtr)
    $cred = [Runtime.InteropServices.Marshal]::PtrToStructure($credStructPtr, [type][WinCred+CREDENTIAL])
    $target = $cred.TargetName
    if ($target -notmatch "git|github|GitHub") { continue }

    $blobSize = [int]$cred.CredentialBlobSize
    if ($blobSize -le 0) { continue }
    $bytes = New-Object byte[] $blobSize
    [Runtime.InteropServices.Marshal]::Copy($cred.CredentialBlob, $bytes, 0, $blobSize)
    $secret = [Text.Encoding]::Unicode.GetString($bytes).TrimEnd([char]0)
    $login = Test-GitHubToken $secret
    if ($login) {
        Write-Host "VALID target=$target user=$($cred.UserName) login=$login len=$blobSize"
    } else {
        Write-Host "INVALID target=$target user=$($cred.UserName) len=$blobSize"
    }
}
