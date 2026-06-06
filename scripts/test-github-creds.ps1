$ErrorActionPreference = "Continue"

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
        return [pscustomobject]@{ Target=$cred.TargetName; UserName=$cred.UserName; Secret=$secret; Length=$secret.Length; Prefix=$secret.Substring(0,[Math]::Min(4,$secret.Length)) }
    } finally { [WinCred]::CredFree($ptr) | Out-Null }
}

$targets = @(
    "GitHub - https://api.github.com/ffdfd2424325",
    "git:https://github.com",
    "git:https://Denwien@github.com",
    "git:https://yuriy-vasilenko@github.com"
)

foreach ($t in $targets) {
    $c = Get-WindowsCredential $t
    if (-not $c) { Write-Host "MISSING $t"; continue }
    Write-Host "FOUND $t user=$($c.UserName) len=$($c.Length) prefix=$($c.Prefix)"
    try {
        $r = Invoke-RestMethod -Uri "https://api.github.com/user" -Headers @{ Authorization = "Bearer $($c.Secret)"; Accept="application/vnd.github+json"; "User-Agent"="test" }
        Write-Host "  OK login=$($r.login)"
    } catch {
        $code = $_.Exception.Response.StatusCode.value__
        Write-Host "  FAIL status=$code"
    }
}
