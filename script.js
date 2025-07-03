/* ---------- Mobile nav toggle ---------- */
const navToggle = document.getElementById("nav_toggle");
const navMenu = document.getElementById("nav_menu");
const navLinks = document.querySelectorAll(".nav_link");

navToggle.addEventListener("click", () => navMenu.classList.toggle("show"));
navLinks.forEach((link) =>
  link.addEventListener("click", () => navMenu.classList.remove("show"))
);

/* ---------- Active link on scroll ---------- */
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 70;
    const sectionId = current.getAttribute("id");

    if(scrollY> sectionTop && scrollY< sectionTop+ sectionHeight){
      nav_link.forEach((link)=>link.classList.remove("active"));

    /* fix: add quotes around sectionId in selector */
    const targetLink= document.querySelector(
      `.nav_link[href*='${sectionId}']`);
      if(targetLink) targetLink.classList.add("active")
    }
  });
}
window.addEventListener("scroll", scrollActive);

/* ---------- Reveal on scroll ---------- */
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target); // animate once
      }
    });
  },
  { threshold: 0.1 }
);

reveals.forEach((el) => observer.observe(el));

/* ---------- Footer Year ---------- */
document.getElementById("year").textContent = new Date().getFullYear();