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
    let header = document.querySelector(".header");

    let scrollValue = window.scrollY;
    let headerHeight = document.querySelector(".hero").offsetHeight / 2;

    if (scrollValue > headerHeight) {
        header.classList.add("stickyNav");
    } else {
        header.classList.remove("stickyNav");
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

const animatedElements = document.querySelectorAll('.minimal-project, .OtherSkillCard, .techStack img, .skillHeading, #about p, .Be_D_text, .info-card, .contact-header, .quote-container');

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
    if(['about', 'skills', 'projects', 'contact'].includes(section.id)) {
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

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const btn = this.querySelector('.submit-btn');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<span>Sending...</span>';
      btn.style.opacity = '0.8';
      btn.style.pointerEvents = 'none';

      const formData = new FormData(this);
      formData.append("access_key", "8dd3181e-267a-4700-bde2-e74ec1582626");

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
          btn.innerHTML = '<span>Sent Successfully!</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
          btn.style.background = '#10b981'; // Green for success
          this.reset();
        } else {
          console.error(data);
          btn.innerHTML = '<span>Error! Try Again.</span>';
          btn.style.background = '#ea1818ff'; // Red for error
        }
      } catch (error) {
        console.error(error);
        btn.innerHTML = '<span>Error! Try Again.</span>';
        btn.style.background = '#ea1818ff'; // Red for error
      }

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.opacity = '1';
        btn.style.pointerEvents = 'auto';
        btn.style.background = '#a855f7';
      }, 3000);
    });
  }

  // Hamburger Menu Logic
  const hamburger = document.getElementById('hamburgerMenu');
  const nav = document.querySelector('.nav');
  const navLinksList = document.querySelectorAll('.nav_link_wrapper a');

  if (hamburger) {
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

  // Hide preloader after images are loaded, with a 1-second minimum delay
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.classList.add('preloader-hidden');
      document.body.classList.remove('no-scroll');
      
      // Optionally remove from DOM after transition
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }
  }, 1000);
});

// Custom Context Menu Logic
const contextMenu = document.getElementById('custom-context-menu');
const sharePortfolioBtn = document.getElementById('share-portfolio');

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  
  // Calculate position
  let x = e.clientX;
  let y = e.clientY;
  
  // Ensure menu doesn't go off-screen
  const menuWidth = 240; 
  const menuHeight = 200; 
  
  if (x + menuWidth > window.innerWidth) {
    x = window.innerWidth - menuWidth - 10;
  }
  if (y + menuHeight > window.innerHeight) {
    y = window.innerHeight - menuHeight - 10;
  }
  
  contextMenu.style.left = `${x}px`;
  contextMenu.style.top = `${y}px`;
  
  contextMenu.classList.add('active');
});

// Close menu on click anywhere
document.addEventListener('click', (e) => {
  if (contextMenu.classList.contains('active')) {
    contextMenu.classList.remove('active');
  }
});

// Close menu on scroll
window.addEventListener('scroll', () => {
  if (contextMenu.classList.contains('active')) {
    contextMenu.classList.remove('active');
  }
});

// Share Portfolio functionality
if (sharePortfolioBtn) {
  sharePortfolioBtn.addEventListener('click', (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(window.location.href).then(() => {
      const span = sharePortfolioBtn.querySelector('span');
      const originalText = span.innerText;
      span.innerText = 'Copied to clipboard!';
      setTimeout(() => {
        span.innerText = originalText;
      }, 2000);
    });
  });
}

// Show QR Code functionality
const showQrBtn = document.getElementById('show-qr');
const qrModal = document.getElementById('qr-modal');
const closeQrBtn = document.getElementById('close-qr');
let qrGenerated = false;

if (showQrBtn) {
  showQrBtn.addEventListener('click', (e) => {
    e.preventDefault();
    contextMenu.classList.remove('active'); // close context menu
    qrModal.classList.add('active'); // show modal
    
    if (!qrGenerated) {
      new QRCode(document.getElementById("qrcode"), {
        text: window.location.href, // QR Code text
        width: 200,
        height: 200,
        logo: "assets/images/favicon.webp", // User's logo
        logoWidth: 50,
        logoHeight: 50,
        logoBackgroundColor: '#ffffff',
        logoBackgroundTransparent: false
      });
      qrGenerated = true;
    }
  });
}

if (closeQrBtn) {
  closeQrBtn.addEventListener('click', () => {
    qrModal.classList.remove('active');
  });
}

// close modal when clicking outside
if (qrModal) {
  qrModal.addEventListener('click', (e) => {
    if (e.target === qrModal) {
      qrModal.classList.remove('active');
    }
  });
}
