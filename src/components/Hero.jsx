import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="eyebrow">Subject Profile — Offensive Security</div>
      <h1>Manthan Bhatt</h1>
      <div className="role">alias AntisocialStare · Penetration Tester · Red Team · CTF Competitor</div>

      <p className="redact-line">
        <span className="redact" tabIndex="0">I break things</span> to understand them — 
        then <span className="redact" tabIndex="0">document exactly why they broke</span>. 
        Every exhibit below is <span className="redact" tabIndex="0">verified, not claimed</span>.
      </p>
      <span className="redact-hint">Click or focus a redacted line to declassify</span>

      <div className="hero-cta">
        <a href="#contact" className="cta-link">Initialize Contact</a>
        <span className="cta-dot">·</span>
        <a href="#exhibits" className="cta-link">View Exhibits</a>
      </div>
    </section>
  );
}
