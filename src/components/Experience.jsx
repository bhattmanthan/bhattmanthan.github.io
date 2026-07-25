import './Section.css';
import './Experience.css';

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="section-head">
        <div className="section-title">Field Experience</div>
        <div className="section-count">03</div>
      </div>
      
      <div className="experience-item">
        <div className="exp-meta">
          <span className="exp-date">Jan 2026 — Present</span>
          <span className="exp-role">Vulnerability Researcher, HackWithIndiaa VDP</span>
        </div>
        <p className="exp-desc">
          Identified and reported a P2/P3-severity vulnerability through HackWithIndiaa's Vulnerability Disclosure Program, certified by the program. Authored a formal report covering reproduction steps, risk assessment, and remediation — mirroring a real-world penetration testing deliverable.
        </p>
        <p className="exp-note">
          *Also active on Bugcrowd.*
        </p>
      </div>
    </section>
  );
}
