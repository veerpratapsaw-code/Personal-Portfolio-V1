// Smooth anchor scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId !== "#" && typeof lenis !== 'undefined') {
      lenis.scrollTo(targetId);
    }
  });
});

// Logo hover colors
document.querySelectorAll(".linkLogo img").forEach((img) => {
  img.addEventListener("mouseenter", () => {
    img.src = img.src.replace("white", "color");
  });
  img.addEventListener("mouseleave", () => {
    img.src = img.src.replace("color", "white");
  });
});

// Sticky Header logic
function stickyNav() {
  let header = document.querySelector(".header");
  let hero = document.querySelector(".hero");
  if (!header || !hero) return;
  
  let scrollValue = window.scrollY;
  let headerHeight = hero.offsetHeight / 2;

  if (scrollValue > headerHeight) {
      header.classList.add("stickyNav");
  } else {
      header.classList.remove("stickyNav");
  }
}

window.addEventListener("scroll", () => {
  stickyNav();
});

// Scroll Spy for active nav links
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section[id], div[id]");
  const navLinks = document.querySelectorAll(".nav a");

  const scrollSpyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let currentId = entry.target.getAttribute("id") || entry.target.getAttribute("data-nav-id");
        if (!currentId) return;
        navLinks.forEach(link => {
          link.parentElement.classList.remove("active");
          if (link.getAttribute("href") === `#${currentId}`) {
            link.parentElement.classList.add("active");
          }
        });
      }
    });
  }, { rootMargin: "-40% 0px -40% 0px", threshold: 0 });

  sections.forEach(section => {
    if(['about', 'skills', 'projects', 'contact'].includes(section.id)) {
      scrollSpyObserver.observe(section);
    }
  });

  const journeyWrapper = document.querySelector('.journey-wrapper');
  if (journeyWrapper) {
    journeyWrapper.setAttribute('data-nav-id', 'journey');
    scrollSpyObserver.observe(journeyWrapper);
  }

  // Hamburger Menu Logic
  const hamburger = document.getElementById('hamburgerMenu');
  const nav = document.querySelector('.nav');
  const navLinksList = document.querySelectorAll('.nav_link_wrapper a');

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      nav.classList.toggle('active');
    });

    navLinksList.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
      });
    });
  }
});
