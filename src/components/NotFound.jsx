import ThemeToggle from './ThemeToggle';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="wrap">
      <div className="masthead">
        <div className="masthead-row">
          <span><strong>REF//</strong> AS-2028-CSE-NIRMA</span>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <span className="status-pill">STATUS: NOT ON FILE</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
      
      <section className="not-found-section">
        <h1>Exhibit Not Found</h1>
        <p className="not-found-body">
          REF// 404 — the requested exhibit does not exist in this case file.
        </p>
        <a href="/" className="return-link">Return to Case File</a>
      </section>
    </div>
  );
}
