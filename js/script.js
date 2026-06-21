const lenis = new Lenis({
  duration: 1.6 ,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

const targetId = this.getAttribute('href');
    if (targetId !== "#") {
      lenis.scrollTo(targetId);
    }
  });
});

console.log(2);

// Removed inline style manipulation so CSS .active class can properly handle underlines.

const words = [
  "Frontend Developer",
  "Python Developer",
  "Robotics Engineer"
];

let wordIndex = 0;

let charIndex = 0;

let isDeleting = false;

document.querySelectorAll(".linkLogo img").forEach((img) => {
  img.addEventListener("mouseenter", () => {
    img.src = img.src.replace("white", "color");
  });
  img.addEventListener("mouseleave", () => {
    img.src = img.src.replace("color", "white");
  });
});

function stickyNav() {
    let nav = document.querySelector(".nav");

let scrollValue = window.scrollY;

let headerHeight = document.querySelector(".hero").offsetHeight / 2;

    if (scrollValue > headerHeight) {
        nav.classList.add("stickyNav");
    } else {
        nav.classList.remove("stickyNav");
    }
}

window.addEventListener("scroll", () => {
    stickyNav();
});

const element = document.getElementById("typewriter");

function typeEffect() {
  const currentWord = words[wordIndex];

  if (!isDeleting) {
    element.textContent =
      currentWord.substring(0, charIndex +1);

    charIndex++;

    if (charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1500);
      return;
    }
  } else {
    element.textContent =
      currentWord.substring(0, charIndex - 1);

    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

let delayTime;
  if (isDeleting) {
    delayTime = 60;
  } else {
    delayTime = 100;
  }

  setTimeout(typeEffect, delayTime);
}

typeEffect();

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

const animatedElements = document.querySelectorAll('.minimal-project, .OtherSkillCard, .techStack img, .skillHeading, #about p, .Be_D_text');

  animatedElements.forEach((el, index) => {

    el.classList.add('hidden');

    if (el.classList.contains('minimal-project') || el.tagName === 'IMG') {
        el.style.transitionDelay = `${(index % 4) * 0.1}s`;
    }

    observer.observe(el);
  });

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
    if(['about', 'skills', 'projects'].includes(section.id)) {
      scrollSpyObserver.observe(section);
    }
  });

  const journeyWrapper = document.querySelector('.journey-wrapper');
  if (journeyWrapper) {
    journeyWrapper.setAttribute('data-nav-id', 'journey');
    scrollSpyObserver.observe(journeyWrapper);
  }

const previewContainer = document.getElementById('project-preview-image');

let previewImg;
  if (previewContainer) {
    previewImg = previewContainer.querySelector('img');
  } else {
    previewImg = null;
  }

const projectsList = document.querySelectorAll('.minimal-project');

  if (previewContainer && projectsList.length > 0) {
    projectsList.forEach(project => {
      project.addEventListener('mouseenter', function() {
        const imgUrl = this.getAttribute('data-image');
        previewImg.src = imgUrl;
        previewContainer.classList.add('active');
      });

      project.addEventListener('mouseleave', function() {
        previewContainer.classList.remove('active');
      });
    });

window.addEventListener('mousemove', function(e) {
      if(previewContainer.classList.contains('active')) {
        previewContainer.style.left = e.clientX + 'px';
        previewContainer.style.top = e.clientY + 'px';
      }
    });
  }
});

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
});
