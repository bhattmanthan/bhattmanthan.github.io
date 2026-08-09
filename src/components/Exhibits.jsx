import './Section.css';
import './Exhibits.css';

export default function Exhibits() {
  const exhibits = [
    {
      id: "A",
      title: "L.E.A.P. — Linux Enumeration & Persistence Framework",
      stamp: "Public",
      desc: "Modular, stealthy Bash framework for post-exploitation enumeration, privilege escalation vectoring, container escape detection, and C2 exfiltration. Six modules spanning recon through cleanup.",
      stack: "Bash · v1.1.0",
      link: "https://github.com/bhattmanthan/LEAP"
    },
    {
      id: "B",
      title: "RegSentinel",
      stamp: "Redacted",
      desc: "Agentic regulatory compliance system for SuRaksha Hackathon (Canara Bank). Sole security-layer lead — browser fingerprinting, hash-chained audit log, scoped per-agent JWTs, prompt-injection defenses.",
      stack: "Next.js · FastAPI · LangGraph · PostgreSQL + pgvector"
    },
    {
      id: "C",
      title: "Homelab Dashboard",
      stamp: "Redacted",
      desc: "Self-hosted SOC dashboard tracking a vulnerable-app fleet, test-coverage logs, and C2 session history — with an enforced sanitization boundary before anything reaches public view.",
      stack: "Node/Express · Vue.js · MySQL · MongoDB"
    },
    {
      id: "D",
      title: "ExpenseFlow",
      stamp: "In Testing",
      desc: "Intentionally vulnerable app chaining OWASP Top 10 into malware analysis and C2 traffic capture, built for an EHVA coursework assignment.",
      stack: "Node.js · Express · PostgreSQL",
      link: "https://github.com/bhattmanthan/ExpenseFlow"
    }
  ];

  return (
    <section id="exhibits" className="section">
      <div className="section-head">
        <div className="section-title">Exhibits — Projects</div>
        <div className="section-count">04 on file</div>
      </div>
      
      <div className="exhibits-grid">
        {exhibits.map(ex => {
          const content = (
            <>
              <span className="stamp-mark">{ex.stamp}</span>
              <div className="exhibit-tag">
                <span>Exhibit {ex.id}</span>
              </div>
              <h3>{ex.title}</h3>
              <p>{ex.desc}</p>
              <div className="stack">{ex.stack}</div>
            </>
          );

          if (ex.link) {
            return (
              <a href={ex.link} target="_blank" rel="noopener noreferrer" className="exhibit is-link" key={ex.id}>
                {content}
              </a>
            );
          }
          
          return (
            <div className="exhibit" key={ex.id}>
              {content}
            </div>
          );
        })}
      </div>
    </section>
  );
}
