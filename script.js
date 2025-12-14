// ===== PORTFOLIO INTERACTION SCRIPT =====

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");

  // Return early if elements don't exist
  if (!menuToggle || !sidebar || !overlay) return;

  // Open menu
  const openMenu = () => {
    sidebar.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
    menuToggle.classList.remove("hide"); // ensure visible when open
  };

  // Close menu
  const closeMenu = () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  };

  // Event listeners
  menuToggle.addEventListener("click", openMenu);
  overlay.addEventListener("click", closeMenu);

  // Close menu when a link is clicked
  sidebar.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  // Close menu on Escape key
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeMenu();
  });

  // ===== AUTO-HIDE MENU BUTTON ON SCROLL (MOBILE) =====
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    // If sidebar is open, keep menu button visible
    if (sidebar.classList.contains("active")) {
      menuToggle.classList.remove("hide");
      lastScrollY = window.scrollY;
      return;
    }

    if (window.scrollY > lastScrollY && window.scrollY > 60) {
      // scrolling down
      menuToggle.classList.add("hide");
    } else {
      // scrolling up
      menuToggle.classList.remove("hide");
    }

    lastScrollY = window.scrollY;
  });
});

// ===== SMOOTH SCROLL BEHAVIOR =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements for scroll animation
document.querySelectorAll(
  '.project-card, .skill-box, .repo-card, .about-card'
).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'all 0.6s ease';
  observer.observe(el);
});

console.log('✓ Portfolio script loaded successfully');
