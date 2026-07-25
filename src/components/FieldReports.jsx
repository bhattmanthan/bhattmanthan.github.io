import './Section.css';
import './FieldReports.css';

export default function FieldReports() {
  const reports = [
    {
      engagement: "AWS Skills to Job CTF (SANS)",
      result: "125th global / 35th regional",
      notes: "20/37 challenges solved (Web Offensive, Forensics, Mixed Offensive); 6-month SANS SkillQuest access"
    },
    {
      engagement: "TryHackMe",
      result: "Top 5% global (~Rank 103,800)",
      notes: "Jr. Penetration Tester path complete; 14 badges"
    },
    {
      engagement: "HackWithIndiaa VDP",
      result: "P2/P3 certified",
      notes: "See Experience section for detail"
    }
  ];

  return (
    <section id="field-reports" className="section">
      <div className="section-head">
        <div className="section-title">Field Reports — Achievements</div>
        <div className="section-count">03 logged</div>
      </div>
      
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Engagement</th>
              <th>Result</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, idx) => (
              <tr key={idx}>
                <td>{report.engagement}</td>
                <td>{report.result}</td>
                <td>{report.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
