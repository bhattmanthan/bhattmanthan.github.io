import './Section.css';
import './Skills.css';

export default function Skills() {
  const categories = [
    { name: "Languages", items: "Python · Bash · C · C++ · Java" },
    { name: "Security Tools", items: "Nmap · Burp Suite · Metasploit · Wireshark · Gobuster · Netcat · CyberChef · ffuf" },
    { name: "Security Domains", items: "Penetration Testing · Post-Exploitation · Privilege Escalation · Web App Security · Network Enumeration · Packet Analysis · Container Security · Vulnerability Assessment" },
    { name: "Web Vulnerabilities", items: "SQL Injection · XSS · IDOR · SSRF · CORS Misconfig" },
    { name: "Dev & Infra", items: "Git · GitHub · Linux CLI · Docker · Tailscale" },
    { name: "Security Infra", items: "Wazuh · Sliver C2 (homelab)" }
  ];

  return (
    <section id="skills" className="section">
      <div className="section-head">
        <div className="section-title">Arsenal — Skills</div>
        <div className="section-count">02</div>
      </div>
      
      <div className="skills-grid">
        {categories.map((cat, index) => (
          <div className="skill-category" key={index}>
            <div className="skill-name">{cat.name}</div>
            <div className="skill-items">{cat.items}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
