import './Section.css';
import './Education.css';

export default function Education() {
  return (
    <section id="education" className="section">
      <div className="section-head">
        <div className="section-title">Education & Certifications</div>
        <div className="section-count">04 entries</div>
      </div>

      <div className="edu-entry">
        <div className="edu-meta">
          <span className="edu-date">2023 — 2027</span>
          <span className="edu-title">B.Tech in Computer Science</span>
        </div>
        <p className="edu-desc">Nirma University, Ahmedabad · GPA: 8.2/10</p>
      </div>

      <div className="section-head" style={{ marginTop: '56px' }}>
        <div className="section-title">Credentials on File</div>
        <div className="section-count">04 verified</div>
      </div>

      <div className="verification-block">
        <div className="verify-row">
          <span className="v-check">[✓]</span>
          <span className="v-title">Introduction to Cybersecurity</span>
          <span className="v-org">— Cisco Networking Academy</span>
          <span className="v-date">— May 2025</span>
          <span className="v-link">— <a href="https://www.credly.com/badges/fc4ffc80-7066-42ff-8e63-d7ade19976c3/public_url" target="_blank" rel="noopener noreferrer">[verify]</a></span>
        </div>
        <div className="verify-row">
          <span className="v-check">[✓]</span>
          <span className="v-title">Networking Basics</span>
          <span className="v-org">— Cisco Networking Academy</span>
          <span className="v-date">— Jun 2025</span>
          <span className="v-link">— <a href="https://www.credly.com/badges/13d8684a-2621-480e-9c61-18096579cce5/public_url" target="_blank" rel="noopener noreferrer">[verify]</a></span>
        </div>
        <div className="verify-row">
          <span className="v-check">[✓]</span>
          <span className="v-title">Ethical Hacking</span>
          <span className="v-org">— NPTEL</span>
          <span className="v-date">— Nov 2025</span>
        </div>
        <div className="verify-row">
          <span className="v-check">[✓]</span>
          <span className="v-title">BreachLab Ghost Track</span>
          <span className="v-org">— Operative Certification</span>
          <span className="v-date">— Jul 2026</span>
          <span className="v-link">— <a href="https://breachlab.org/u/antisocialstare/certificate/ghost" target="_blank" rel="noopener noreferrer">[verify]</a></span>
        </div>
      </div>
    </section>
  );
}
