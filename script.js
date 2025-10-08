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
const nav_link = document.querySelectorAll(".nav_link");

function scrollActive() {
  const scrollY = window.pageYOffset;

  let currentSectionId=null;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 100;
    const sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY < sectionTop + sectionHeight - 150) {
        currentSectionId = sectionId;
    }
});
      nav_link.forEach((link) => link.classList.remove("active"));

      if(currentSectionId){
      const targetLink = document.querySelector(`.nav_link[href*='${currentSectionId}']`);
      if (targetLink) targetLink.classList.add("active");
    }
}
window.addEventListener("scroll", scrollActive);

/* ---------- Image Slider ---------- */
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".slider a");
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");
  const dots = document.querySelectorAll(".pagination .dot");

  let currentSlide = 0;
  const slideCount = slides.length;

  // Show only the current slide
  function updateSlides() {
    slides.forEach((slide, index) => {
      slide.style.display = index === currentSlide ? "block" : "none";
    });
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });
  }

  // Go to a specific slide
  function goToSlide(index) {
    currentSlide = (index + slideCount) % slideCount;
    updateSlides();
  }

  // Next/Prev slide functions
  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  // Event listeners for buttons
  next.addEventListener("click", nextSlide);
  prev.addEventListener("click", prevSlide);

  // Make dots clickable
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => goToSlide(index));
  });

  // Auto slide every 5 seconds
  setInterval(nextSlide, 5000);

  // Initialize first slide
  updateSlides();
});

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