/* ── Smooth cursor with RAF lag ── */
const cur = document.getElementById("cur");
const curR = document.getElementById("curR");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;
window.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
});
(function loop() {
  cur.style.left = mx + "px";
  cur.style.top = my + "px";
  rx += (mx - rx) * 0.13;
  ry += (my - ry) * 0.13;
  curR.style.left = rx + "px";
  curR.style.top = ry + "px";
  requestAnimationFrame(loop);
})();
document
  .querySelectorAll(
    'a,button,[class*="card"],[class*="chip"],[class*="stat"],[class*="cert"]',
  )
  .forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cur.classList.add("grow");
      curR.classList.add("grow");
    });
    el.addEventListener("mouseleave", () => {
      cur.classList.remove("grow");
      curR.classList.remove("grow");
    });
  });

/* ── Hamburger ── */
const ham = document.getElementById("ham");
const navL = document.getElementById("navL");
ham.addEventListener("click", () => {
  ham.classList.toggle("open");
  navL.classList.toggle("open");
});
navL.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    ham.classList.remove("open");
    navL.classList.remove("open");
  }),
);

/* ── Typewriter ── */
const roles = [
  "Penetration Tester",
  "Red Team Developer",
  "CTF Competitor",
  "Vulnerability Researcher",
  "Security Engineer",
];
let ri = 0,
  ci = 0,
  del = false;
const typed = document.getElementById("typed");
function tick() {
  const r = roles[ri];
  typed.textContent = del ? r.slice(0, --ci) : r.slice(0, ++ci);
  if (!del && ci === r.length) {
    del = true;
    setTimeout(tick, 1900);
    return;
  }
  if (del && ci === 0) {
    del = false;
    ri = (ri + 1) % roles.length;
  }
  setTimeout(tick, del ? 36 : 82);
}
tick();

/* ── Intersection reveal & Title Decrypt ── */
const chars = "!<>-_\\\\/[]{}—=+*^?#_";
function decryptText(el) {
  if (el.dataset.decrypted) return;
  el.dataset.decrypted = "true";
  const originalText = el.innerText;
  let iterations = 0;
  const interval = setInterval(() => {
    el.innerText = originalText.split("").map((letter, index) => {
      if (index < iterations) return originalText[index];
      if (letter === " ") return " ";
      return chars[Math.floor(Math.random() * chars.length)];
    }).join("");
    if (iterations >= originalText.length) {
      clearInterval(interval);
      el.innerText = originalText;
    }
    iterations += 1 / 12;
  }, 25);
}

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        if(e.target.classList.contains("sec-title")) {
          decryptText(e.target);
        }
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 },
);
document.querySelectorAll(".rev").forEach((el, i) => {
  el.style.transitionDelay = (i % 7) * 0.045 + "s";
  io.observe(el);
});

/* ── Active nav ── */
const secs = [...document.querySelectorAll("section[id]")];
const links = [...document.querySelectorAll(".nav-links a")];
function markActive() {
  const mid = window.scrollY + window.innerHeight / 3;
  let active = secs[0];
  secs.forEach((s) => {
    if (s.offsetTop <= mid) active = s;
  });
  links.forEach((a) =>
    a.classList.toggle("active", a.getAttribute("href") === "#" + active.id),
  );
}
window.addEventListener("scroll", markActive, { passive: true });
markActive();

/* ── Interactive Terminal ── */
const termInputWrapper = document.getElementById("termInputWrapper");
const termHiddenInput = document.getElementById("termHiddenInput");
const termInputDisplay = document.getElementById("termInputDisplay");
const termOutput = document.getElementById("termOutput");

if(termInputWrapper && termHiddenInput) {
  termInputWrapper.addEventListener("click", () => {
    termHiddenInput.focus();
  });

  termHiddenInput.addEventListener("input", (e) => {
    termInputDisplay.textContent = e.target.value;
  });

  termHiddenInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const rawCmd = termHiddenInput.value.trim();
      const cmd = rawCmd.toLowerCase();
      termHiddenInput.value = "";
      termInputDisplay.textContent = "";
      
      if (cmd === "") return;

      const newCmdLine = document.createElement("div");
      newCmdLine.className = "tline";
      const promptSpan = document.createElement("span");
      promptSpan.className = "p";
      promptSpan.textContent = "$";
      newCmdLine.appendChild(promptSpan);
      newCmdLine.appendChild(document.createTextNode(` ${rawCmd}`)); // XSS safe
      termOutput.appendChild(newCmdLine);

      const responseLine = document.createElement("div");
      responseLine.className = "tline";
      
      // Multi-line terminal output helper — all text nodes, no innerHTML
      const appendLines = (lines) => {
        lines.forEach(({ text, color, indent }) => {
          const div = document.createElement("div");
          div.className = "tline";
          if (color) div.style.color = color;
          if (indent) div.style.paddingLeft = "1.1rem";
          div.textContent = text;
          termOutput.appendChild(div);
        });
      };

      if (cmd === "help") {
        appendLines([
          { text: "Available commands:" },
          { text: "  help       — show this message", indent: true },
          { text: "  whoami     — current user", indent: true },
          { text: "  ls         — list files", indent: true },
          { text: "  cat <file> — read a file", indent: true },
          { text: "  contact    — contact details", indent: true },
          { text: "  clear      — clear terminal", indent: true },
        ]);
      } else if (cmd === "whoami") {
        responseLine.textContent = "guest";
        termOutput.appendChild(responseLine);
      } else if (cmd === "clear") {
        termOutput.innerHTML = "";
        return;
      } else if (cmd === "contact") {
        appendLines([
          { text: "Email   : bhattmanthan8@gmail.com", color: "var(--green)" },
          { text: "LinkedIn: linkedin.com/in/bhattmanthan1", color: "var(--green)" },
          { text: "GitHub  : github.com/bhattmanthan", color: "var(--green)" },
        ]);
      } else if (cmd === "ls") {
        appendLines([
          { text: "contact.json   resume.pdf   projects/" },
        ]);
      } else if (cmd === "cat contact.json") {
        appendLines([
          { text: "{" },
          { text: '  "name"     : "Manthan Bhatt"', indent: true, color: "var(--text)" },
          { text: '  "role"     : "Cybersecurity Engineer"', indent: true, color: "var(--text)" },
          { text: '  "location" : "Vadodara, Gujarat, India"', indent: true, color: "var(--text)" },
          { text: '  "email"    : "bhattmanthan8@gmail.com"', indent: true, color: "var(--text)" },
          { text: '  "available": true', indent: true, color: "var(--green)" },
          { text: "}" },
        ]);
      } else if (cmd === "cat resume.pdf") {
        appendLines([
          { text: "Binary file resume.pdf — open in browser instead.", color: "var(--muted)" },
          { text: "Tip: click [ RESUME ] in the navbar to view it.", color: "var(--green)" },
        ]);
      } else if (cmd.startsWith("cat ")) {
        const filename = rawCmd.slice(4);
        responseLine.textContent = `cat: ${filename}: No such file or directory`;
        responseLine.style.color = "#ff5c5c";
        termOutput.appendChild(responseLine);
      } else {
        responseLine.textContent = `bash: command not found: ${rawCmd}`;
        responseLine.style.color = "#ff5c5c";
        termOutput.appendChild(responseLine);
      }
      
      // Auto scroll to bottom of terminal if it overflows
      const termBody = document.getElementById("termBody");
      termBody.scrollTop = termBody.scrollHeight;
    }
  });
}
