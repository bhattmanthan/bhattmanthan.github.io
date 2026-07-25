import './Section.css';
import './About.css';

export default function About() {
  return (
    <section id="about" className="section">
      <div className="section-head">
        <div className="section-title">Subject Background</div>
        <div className="section-count">01</div>
      </div>
      
      <div className="about-content">
        <p>
          I'm a <strong>third-year B.Tech Computer Science</strong> student at Nirma University with a hands-on focus on offensive security. My work spans penetration testing, red team tooling, web application security, and network analysis — currently leading the full security layer on RegSentinel, a hackathon build for Canara Bank's SuRaksha Hackathon.
        </p>
        <p>
          I built <strong>L.E.A.P.</strong> — a modular Linux post-exploitation framework in Bash — from scratch, and I'm building a self-hosted SOC dashboard to track my homelab's vulnerable-app fleet and C2 session history. I've competed in global CTF competitions, ranked #125 globally at the AWS Skills to Job CTF, and hold a certified P2/P3 finding through the HackWithIndiaa Vulnerability Disclosure Program.
        </p>
        <p>
          Open to roles in <strong>penetration testing, vulnerability research,</strong> and <strong>security engineering</strong> — remote or on-site.
        </p>
      </div>

      <div className="stat-strip">
        <div className="stat-item">
          <div className="stat-value">8.2</div>
          <div className="stat-label">GPA/10</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">Top 5%</div>
          <div className="stat-label">TryHackMe</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">#125</div>
          <div className="stat-label">AWS CTF Global</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">14+</div>
          <div className="stat-label">THM Badges</div>
        </div>
      </div>
    </section>
  );
}
