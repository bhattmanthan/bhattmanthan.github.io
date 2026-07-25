import './Footer.css';

export default function Footer() {
  return (
    <footer id="contact">
      <div className="seal">
        <div className="seal-left">
          <p>Case remains open. New exhibits filed as work is verified and cleared for release.</p>
          <div className="cat-easter-egg">
            <span className="prompt">$</span> cat contact.json
            <pre>
{`{
  "email": "bhattmanthan8@gmail.com",
  "status": "available for hire",
  "pgp_key": "unavailable"
}`}
            </pre>
          </div>
        </div>
        <div className="contact-links">
          <a href="https://linkedin.com/in/bhattmanthan" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/bhattmanthan" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://app.hackthebox.com/users/123456" target="_blank" rel="noopener noreferrer">HackTheBox</a>
          <a href="https://tryhackme.com/p/bhattmanthan" target="_blank" rel="noopener noreferrer">TryHackMe</a>
          <a href="mailto:bhattmanthan8@gmail.com">Email</a>
        </div>
      </div>
    </footer>
  );
}
