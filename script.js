const courses = [
  {name:"Scratch Programming",symbol:"&lt;/&gt;",description:"Design games, stories and animations while learning core coding logic.",ages:"7–12",duration:"6 weeks",level:"Beginner",format:"Live online",learn:["Coding blocks and sequences","Events, loops and conditions","Game design and storytelling"],curriculum:["Getting started with Scratch","Motion, looks and sound","Interactive games and challenges","Showcase and reflection"],project:"An interactive Scratch game or animated story.",skills:"Creative problem-solving, coding foundations and digital confidence."},
  {name:"Graphic Design",symbol:"GD",description:"Turn ideas into polished posters, social graphics and visual stories.",ages:"10–18",duration:"6 weeks",level:"Beginner",format:"Live online",learn:["Design principles and colour","Typography and layouts","Creating a simple visual brand"],curriculum:["Design tools and inspiration","Colour, type and composition","Poster and campaign design","Portfolio polish"],project:"A mini poster and social-media design portfolio.",skills:"Visual communication, creative software confidence and presentation."},
  {name:"HTML & CSS Web Design",symbol:"&lt;/&gt;",description:"Build responsive web pages and discover how the web is designed.",ages:"11–18",duration:"8 weeks",level:"Beginner",format:"Live online",learn:["HTML page structure","CSS layouts and responsive styling","Publishing a personal web page"],curriculum:["How websites work","HTML foundations","CSS styling and layouts","Responsive final website"],project:"A responsive personal or community website.",skills:"Web fundamentals, design thinking and a shareable portfolio project."},
  {name:"Computer Basics",symbol:"PC",description:"Build practical confidence with devices, files, online tools and safe habits.",ages:"7–14",duration:"4 weeks",level:"Beginner",format:"Live online",learn:["Navigating a computer","Files, folders and documents","Smart and safe online habits"],curriculum:["Using a computer with confidence","Working with documents","Internet basics and safety","Practical task challenge"],project:"A digital learning portfolio of completed tasks.",skills:"Everyday computer fluency, organisation and online awareness."},
  {name:"Data Analytics",symbol:"DA",description:"Explore real-world questions with data, visuals and clear insights.",ages:"13–18",duration:"8 weeks",level:"Intermediate",format:"Live online",learn:["Understanding data sets","Spotting patterns and trends","Communicating insights visually"],curriculum:["Data thinking","Cleaning and exploring data","Charts and dashboards","Insight presentation"],project:"A simple insight dashboard based on a practical question.",skills:"Data literacy, analytical thinking and communication."},
  {name:"Excel & SQL",symbol:"XL",description:"Learn practical spreadsheet analysis and beginner database querying.",ages:"13–18",duration:"8 weeks",level:"Intermediate",format:"Live online",learn:["Excel formulas and visualisation","SQL queries and tables","Using data to answer questions"],curriculum:["Excel essentials","Formula and chart practice","SQL foundations","Data challenge"],project:"A spreadsheet dashboard and a small SQL query portfolio.",skills:"Spreadsheet confidence, database fundamentals and analysis."},
  {name:"Automation",symbol:"AU",description:"Discover how to simplify repeat tasks with smart, no-code workflows.",ages:"14–18",duration:"6 weeks",level:"Intermediate",format:"Live online",learn:["Mapping a process","Choosing triggers and actions","Testing helpful workflows"],curriculum:["Automation ideas","Workflow building blocks","Connecting tools","Workflow showcase"],project:"A safe, practical automation workflow for a common task.",skills:"Process thinking, digital productivity and problem-solving."},
  {name:"CRM Fundamentals",symbol:"CRM",description:"Understand how organisations build better relationships with customer data.",ages:"14–18",duration:"6 weeks",level:"Beginner",format:"Live online",learn:["Customer records and pipelines","Organising data responsibly","Planning helpful follow-up"],curriculum:["What a CRM does","Records and contacts","Simple customer journeys","CRM scenario project"],project:"A sample CRM workflow and customer journey plan.",skills:"Business technology awareness, organisation and communication."}
];

const grid = document.getElementById("courseGrid");
const modal = document.getElementById("courseModal");
const modalContent = document.getElementById("modalContent");

function renderCourses() {
  if (!grid) return;
  grid.innerHTML = courses.map((course, index) => `
    <article class="course-card">
      <div class="course-top"><span class="course-symbol">${course.symbol}</span><span class="level-pill">${course.level}</span></div>
      <div class="course-body"><h3>${course.name}</h3><p>${course.description}</p>
        <div class="course-meta"><span>${course.ages}</span><span>${course.duration}</span><span>${course.format}</span></div>
        <button type="button" data-course="${index}" data-track="course_details">Explore course &rarr;</button>
      </div>
    </article>`).join("");
}

function openCourse(index) {
  const course = courses[index];
  if (!course || !modal || !modalContent) return;
  modalContent.innerHTML = `
    <button class="modal-close" type="button" aria-label="Close course details">&times;</button>
    <p class="modal-kicker">Maffizz Edify programme</p><h2 class="modal-title">${course.name}</h2><p class="modal-intro">${course.description}</p>
    <div class="modal-details"><span>Ages ${course.ages}</span><span>${course.duration}</span><span>${course.level} level</span></div>
    <div class="modal-section"><h3>What learners will learn</h3><ul>${course.learn.map(item => `<li>${item}</li>`).join("")}</ul></div>
    <div class="modal-section"><h3>Weekly learning journey</h3><ul>${course.curriculum.map(item => `<li>${item}</li>`).join("")}</ul></div>
    <div class="modal-section"><h3>Final project and skills gained</h3><p class="modal-intro"><strong>Final project:</strong> ${course.project}<br><strong>Skills gained:</strong> ${course.skills}</p></div>
    <div class="modal-section"><p class="modal-intro">A Maffizz Edify certificate is awarded on completion of the guided programme and final project.</p><a class="button" href="#contact" data-track="course_enrol">Enquire about enrolment &rarr;</a></div>`;
  modal.showModal();
}

function track(eventName, extra = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...extra });
}

renderCourses();

grid?.addEventListener("click", event => {
  const button = event.target.closest("[data-course]");
  if (!button) return;
  track("maffizz_course_details", { course: courses[Number(button.dataset.course)]?.name });
  openCourse(Number(button.dataset.course));
});

modal?.addEventListener("click", event => {
  if (event.target === modal || event.target.closest(".modal-close")) modal.close();
});

modal?.addEventListener("close", () => { modalContent.innerHTML = ""; });

const header = document.querySelector(".site-header");
addEventListener("scroll", () => header?.classList.toggle("is-scrolled", scrollY > 8), { passive: true });

const menuButton = document.querySelector(".menu-button");
const mobileNav = document.querySelector(".mobile-nav");
menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  mobileNav.hidden = isOpen;
});
mobileNav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mobileNav.hidden = true;
  menuButton?.setAttribute("aria-expanded", "false");
}));

document.querySelectorAll("[data-track]").forEach(link => link.addEventListener("click", () => track("maffizz_cta_click", { label: link.dataset.track, text: link.textContent.trim() })));
document.querySelectorAll('a[href*="wa.me"]').forEach(link => link.addEventListener("click", () => track("maffizz_whatsapp_click", { location: link.dataset.track || "contact" })));

const enquiryForm = document.getElementById("enquiryForm");
const formMessage = document.querySelector(".form-message");
const enquiryEndpoint = "https://xbpggndoycytkovkizex.supabase.co/functions/v1/submit-enquiry";

if (enquiryForm) {
  document.head.insertAdjacentHTML("beforeend", "<style>.trap-field{position:absolute;left:-10000px;width:1px;height:1px;overflow:hidden}.consent-field label{display:flex;align-items:flex-start;gap:9px;cursor:pointer;font-size:.76rem;line-height:1.45}.consent-field input{width:16px;height:16px;margin:2px 0 0;accent-color:#1768e6}</style>");
  enquiryForm.insertAdjacentHTML("beforeend", `<div class="trap-field" aria-hidden="true"><label for="website">Leave this field empty</label><input id="website" name="website" tabindex="-1" autocomplete="off"></div><div class="field full consent-field"><label><input type="checkbox" name="privacyConsent" required> I agree that Maffizz Edify may use my details to respond to this enquiry.</label></div>`);
}

enquiryForm?.addEventListener("submit", async event => {
  event.preventDefault();
  if (!enquiryForm.checkValidity()) { enquiryForm.reportValidity(); return; }
  const values = Object.fromEntries(new FormData(enquiryForm).entries());
  const enquiryText = `Hello Maffizz Edify, I would like to enquire about ${values.service}.\n\nName: ${values.name}\nEmail: ${values.email}\nPhone: ${values.phone}\nLearner age or level: ${values.level}\n\nMessage: ${values.message}`;
  const message = encodeURIComponent(enquiryText);
  const emailSubject = encodeURIComponent(`Maffizz Edify enquiry: ${values.service}`);
  track("maffizz_enquiry_submit", { service: values.service });
  const submitButton = enquiryForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  formMessage.style.display = "block";
  formMessage.textContent = "Sending your enquiry securely…";
  try {
    const response = await fetch(enquiryEndpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
    if (!response.ok) throw new Error("Enquiry could not be saved");
    formMessage.textContent = "Thank you — your enquiry has been securely received. WhatsApp and email are opening now.";
    window.open(`https://wa.me/2347041059367?text=${message}`, "_blank", "noopener");
    window.location.href = `mailto:maffizztech@gmail.com?subject=${emailSubject}&body=${message}`;
    enquiryForm.reset();
  } catch {
    formMessage.textContent = "We could not save this enquiry right now. Please contact us directly on WhatsApp or email.";
    track("maffizz_enquiry_error", { service: values.service });
  } finally {
    submitButton.disabled = false;
  }
});

window.MaffizzAnalytics = { track };

const footerConnect = document.querySelector(".footer-layout > div:last-child");
if (footerConnect) {
  footerConnect.insertAdjacentHTML("beforeend", '<a href="https://maffizztech.github.io/maffizz-edify/" target="_blank" rel="noopener" data-track="github_pages_live">Visit Live Website</a><a href="https://github.com/maffizztech/maffizz-edify" target="_blank" rel="noopener" data-track="github_repository">GitHub Repository</a>');
}

const proprietorChip = document.querySelector(".proprietor-chip");
if (proprietorChip) {
  proprietorChip.setAttribute("role", "link");
  proprietorChip.setAttribute("tabindex", "0");
  proprietorChip.setAttribute("aria-label", "Read about Mahmud Haffeez, proprietor of Maffizz Edify");
  proprietorChip.style.cursor = "pointer";
  const openProprietorPage = () => { track("maffizz_proprietor_profile"); window.location.href = "mahmud-haffeez.html"; };
  proprietorChip.addEventListener("click", openProprietorPage);
  proprietorChip.addEventListener("keydown", event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openProprietorPage(); } });
}
