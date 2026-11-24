/* main.js – content data + all page behavior (Bootstrap handles layout) */
"use strict";

/* =====================================================
   1. DATA STORAGE (arrays/objects)
   Edit these to change the page content; the HTML stays untouched.
   ===================================================== */

// Personal details shown in the Hero/Profile/Contact sections
const profile = {
  motto: "Build it small, break it on purpose, then fix it.",   // TODO: replace with your own motto
  bio: "I’m a second-year computer science student. I enjoy turning a plain idea into a working page or app, and I’m studying networking and cybersecurity so what I build is safe to use.", // TODO: edit
  skills: ["HTML", "CSS", "JavaScript", "Bootstrap", "Flutter", "Networking basics", "CompTIA A+ (studying)"],
  contacts: [   // TODO: replace with your real links
    { label: "Email", url: "mailto:you@example.com" }
  ]
};

// Design philosophy: one intro sentence + a list of principles
const philosophy = {
  intro: "I treat a page like a drawing: plan the structure first, then add only what helps the reader. A design is finished when nothing else can be removed.", // TODO: edit
  principles: [
    { title: "Structure first", text: "A clear layout and heading order before any color or effect." },
    { title: "Clarity over decoration", text: "One accent color and one type pairing, so the content stays the focus." },
    { title: "Secure by default", text: "Validate every input and never trust what a user types." },
    { title: "Easy to maintain", text: "Separate HTML, CSS and JS, and keep content in data so one change updates everything." }
  ]
};

// Projects portfolio (term is "Midterm" or "Finals"; image goes in images/projects/)
const projects = [
  { term: "Midterm", title: "Register, Login and List", image: "images/grocery.png",
    description: "A multi-page site where users register, log in and view a list of accounts stored in localStorage.", // TODO: edit
    tech: ["HTML", "CSS", "JavaScript"] },
  { term: "Midterm", title: "Midterm Project 2", image: "images/Midterms.png",
    description: "A Product page for shoes.",
    tech: ["HTML", "CSS"] },
  { term: "Finals", title: "Finals Project 1", image: "images/paceimage.jpg",
    description: "A Fitness app tracker.",
    tech: ["Flutter", "Dart"] },
  { term: "Finals", title: "Finals Project 2", image: "images/Finals1.png",
    description: "Web page for the movie Spirited Away.",
    tech: ["HTML", "Bootstrap", "JavaScript"] }
];

/* =====================================================
   2. HELPER FUNCTIONS
   ===================================================== */

// Builds an SVG placeholder (as a data URI) so missing images still look intentional
function makePlaceholder(label, width, height) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <rect width="100%" height="100%" fill="#16456b"/>
    <text x="50%" y="50%" fill="#e8eef2" font-family="sans-serif" font-size="22"
          text-anchor="middle" dominant-baseline="middle">${label}</text></svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

// If an <img> fails to load, show a placeholder instead (runs once per image)
function addImageFallback(img, label, width, height) {
  img.addEventListener("error", function () {
    img.src = makePlaceholder(label, width, height);
  }, { once: true });
}

/* =====================================================
   3. RENDER FUNCTIONS (data -> HTML)
   ===================================================== */

// Profile section: motto, bio, skill badges, photo fallback
function renderProfile() {
  document.getElementById("motto").textContent = "“" + profile.motto + "”";
  document.getElementById("bio").textContent = profile.bio;

  const skills = document.getElementById("skills");
  profile.skills.forEach(function (skill) {
    const badge = document.createElement("span");
    badge.className = "skill-badge";
    badge.textContent = skill;
    skills.appendChild(badge);
  });

  addImageFallback(document.getElementById("profilePhoto"), "Add images/me.png", 400, 500);
}

// Philosophy section: intro text + one block per principle
function renderPhilosophy() {
  document.getElementById("philosophyIntro").textContent = philosophy.intro;
  const container = document.getElementById("principles");
  container.innerHTML = philosophy.principles.map(function (p) {
    return `<div class="col-md-6"><div class="principle">
              <h3>${p.title}</h3><p>${p.text}</p></div></div>`;
  }).join("");
}

// Projects section: shows cards for the chosen term ("All" shows everything)
function renderProjects(filter) {
  const grid = document.getElementById("projectGrid");
  const visible = projects.filter(function (p) { return filter === "All" || p.term === filter; });

  grid.innerHTML = visible.map(function (p) {
    return `<div class="col-md-6"><article class="card project-card h-100">
      <img src="${p.image}" class="card-img-top" alt="Screenshot of ${p.title}">
      <div class="card-body">
        <span class="badge term-badge mb-2">${p.term}</span>
        <h3 class="h5 card-title">${p.title}</h3>
        <p class="card-text">${p.description}</p>
        <p class="tech-list">${p.tech.join(", ")}</p>
      </div></article></div>`;
  }).join("");

  // Attach the placeholder fallback to each screenshot we just created
  grid.querySelectorAll("img").forEach(function (img) {
    addImageFallback(img, "Screenshot coming soon", 640, 400);
  });
}

// Contact section: list of links
function renderContactLinks() {
  document.getElementById("contactLinks").innerHTML = profile.contacts.map(function (c) {
    return `<li class="mb-2"><a href="${c.url}" target="_blank" rel="noopener">${c.label}</a></li>`;
  }).join("");
}

/* =====================================================
   4. INTERACTIONS
   ===================================================== */

// Project filter buttons: mark the clicked one active, then re-render the cards
function setupFilters() {
  const buttons = document.querySelectorAll("[data-filter]");
  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      buttons.forEach(function (b) { b.classList.remove("active"); });
      button.classList.add("active");
      renderProjects(button.dataset.filter);
    });
  });
}

// Contact form: Bootstrap validation styles + a confirmation message.
// NOTE: there is no server, so nothing is actually sent in this activity.
function setupContactForm() {
  const form = document.getElementById("contactForm");
  const alertBox = document.getElementById("formAlert");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    alertBox.classList.add("d-none");

    // checkValidity() uses the required/minlength/type rules written in the HTML
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    alertBox.textContent = "Thanks, " + form.name.value.trim() + ". Your message is ready to send once a mail service is connected.";
    alertBox.classList.remove("d-none");
    form.reset();
    form.classList.remove("was-validated");
  });
}

// Highlight the nav link of the section currently on screen (Bootstrap ScrollSpy)
function setupScrollSpy() {
  new bootstrap.ScrollSpy(document.body, { target: "#mainNav", offset: 80 });
}

/* =====================================================
   5. START THE PAGE
   ===================================================== */
document.addEventListener("DOMContentLoaded", function () {
  renderProfile();
  renderPhilosophy();
  renderProjects("All");
  renderContactLinks();
  setupFilters();
  setupContactForm();
  setupScrollSpy();
  document.getElementById("year").textContent = new Date().getFullYear();   // footer year
});
