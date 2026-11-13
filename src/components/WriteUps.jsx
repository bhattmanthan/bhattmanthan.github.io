import './Section.css';
import './Exhibits.css';

export default function WriteUps() {
  const writeups = [
    {
      id: "1",
      title: "TryHackMe: Attacktive Directory",
      stamp: "Medium",
      desc: "Full Active Directory attack chain: Kerberos user enumeration, AS-REP Roasting a no-preauth service account, an SMB share leaking backup credentials, DCSync via DRSUAPI, and Pass-the-Hash to Administrator.",
      stack: "Kerberos · AS-REP Roasting · DCSync · Pass-the-Hash",
      link: "https://medium.com/@antisocialstare/tryhackme-attacktive-directory-writeup-a061dd62cedf"
    },
    {
      id: "2",
      title: "HackSmarter: Kitsune",
      stamp: "Case File",
      desc: "Six-hop AD compromise from an anonymous guest: cracked Password Safe vault, ADCS ESC13 into HelpDesk, GenericAll account takeover, DPAPI credential recovery, gMSA password read and Backup Operators to DCSync.",
      stack: "ADCS ESC13 · DPAPI · gMSA · Backup Operators",
      link: "/writeups/kitsune/"
    }
  ];

  return (
    <section id="writeups" className="section">
      <div className="section-head">
        <div className="section-title">Write-Ups — Case Files</div>
        <div className="section-count">{String(writeups.length).padStart(2, '0')} on file</div>
      </div>

      <div className="exhibits-grid">
        {writeups.map(wu => (
          <a href={wu.link} {...(wu.link.startsWith('http') && { target: "_blank", rel: "noopener noreferrer" })} className="exhibit is-link" key={wu.id}>
            <span className="stamp-mark">{wu.stamp}</span>
            <div className="exhibit-tag">
              <span>Case {wu.id}</span>
            </div>
            <h3>{wu.title}</h3>
            <p>{wu.desc}</p>
            <div className="stack">{wu.stack}</div>
          </a>
        ))}
      </div>
    </section>
  );
}
