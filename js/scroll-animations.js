// Lenis Smooth Scrolling Setup
const lenis = new Lenis({
  duration: 1.6,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Intersection Observers for Fade-In
document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      } else {
        entry.target.classList.remove('show');
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.minimal-project, .OtherSkillCard, .techStack img, .skillHeading, #about p, .Be_D_text, .info-card, .contact-header, .quote-container');

  animatedElements.forEach((el, index) => {
    el.classList.add('hidden');
    if (el.classList.contains('minimal-project') || el.tagName === 'IMG') {
        el.style.transitionDelay = `${(index % 4) * 0.1}s`;
    }
    observer.observe(el);
  });
});

// Preloader Logic
window.addEventListener('load', async () => {
  const imagesToLoad = document.querySelectorAll('img[data-src]');
  for (let img of imagesToLoad) {
    await new Promise((resolve) => {
      const tempImage = new Image();
      tempImage.onload = () => {
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
        resolve();
      };
      tempImage.onerror = () => resolve();
      tempImage.src = img.getAttribute('data-src');
    });
  }

  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.classList.add('preloader-hidden');
      document.body.classList.remove('no-scroll');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 200);
    }
  }, 10);
});
