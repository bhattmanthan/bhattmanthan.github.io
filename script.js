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

/* ── Intersection reveal ── */
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 },
);
document.querySelectorAll(".rev").forEach((el, i) => {
  el.style.transitionDelay = (i % 7) * 0.065 + "s";
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
