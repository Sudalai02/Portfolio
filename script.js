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
  let currentSectionId = null;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 100; // offset for navbar
    const sectionId = current.getAttribute("id");

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight - 150) {
      currentSectionId = sectionId;
    }
  });

  // Remove active from all
  nav_link.forEach((link) => link.classList.remove("active"));

  // Add active only to visible section
  if (currentSectionId) {
    const targetLink = document.querySelector(
      `.nav_link[href*='${currentSectionId}']`
    );
    if (targetLink) targetLink.classList.add("active");
  }
}
window.addEventListener("scroll", scrollActive);

/* ---------- Image Slider + Dots + Hotspot Popup ---------- */
document.addEventListener("DOMContentLoaded", () => {
  // Slider elements
  const slides = document.querySelectorAll(".slide");
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");
  const dots = document.querySelectorAll(".pagination .dot");

  let currentSlide = 0;
  const slideCount = slides.length;

  // Update slides and dots
  function updateSlides() {
    slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === currentSlide);
    });
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });
  }

  // Change slides
  function goToSlide(index) {
    currentSlide = (index + slideCount) % slideCount;
    updateSlides();
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  // Event listeners
  next.addEventListener("click", nextSlide);
  prev.addEventListener("click", prevSlide);

  // Clickable dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => goToSlide(index));
  });

  // Auto slide every 5 seconds
  setInterval(nextSlide, 5000);

  // Initialize
  updateSlides();

  /* ---------- Hotspot Popup ---------- */
  const popup = document.getElementById("popup");
  const popupTitle = document.getElementById("popupTitle");
  const viewBtn = document.getElementById("viewProjectBtn");
  const closePopup = document.querySelector(".popup .close");

  let currentLink = "";

  // When a slide is clicked → show popup
  slides.forEach((slide) => {
    slide.addEventListener("click", () => {
      const title = slide.dataset.title;
      const link = slide.dataset.link;
      currentLink = link;
      popupTitle.textContent = title;
      popup.style.display = "flex";
    });
  });

  // Button → open project
  viewBtn.addEventListener("click", () => {
    if (currentLink) window.open(currentLink, "_blank");
  });

  // Close popup
  closePopup.addEventListener("click", () => (popup.style.display = "none"));
  popup.addEventListener("click", (e) => {
    if (e.target === popup) popup.style.display = "none";
  });
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