import ThemeToggle from './ThemeToggle';
import './Masthead.css';

export default function Masthead() {
  return (
    <div className="masthead">
      <div className="masthead-row">
        <span><strong>REF//</strong> AS-2028-CSE-NIRMA</span>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <span className="status-pill">Status: Active</span>
          <ThemeToggle />
        </div>
      </div>
      <nav className="masthead-nav">
        <a href="#about">About</a>
        <span>·</span>
        <a href="#skills">Skills</a>
        <span>·</span>
        <a href="#experience">Experience</a>
        <span>·</span>
        <a href="#exhibits">Exhibits</a>
        <span>·</span>
        <a href="#field-reports">Field Reports</a>
        <span>·</span>
        <a href="#education">Education</a>
        <span>·</span>
        <a href="#contact">Contact</a>
        <span>·</span>
        <a href="/assets/resume.pdf" target="_blank" rel="noopener noreferrer">[Resume]</a>
      </nav>
    </div>
  );
}
