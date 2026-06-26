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
      }, 200);
    }
  }, 10);
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
        logo: "assets/images/logoMe white.webp", // User's logo
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

// Skills Modal Logic
const skillsContent = {
  "Self Learning": `
    <h2>Self Learning — 95%</h2>
    <h3>Overview</h3>
    <p>I am a self-taught student who consistently learns new technologies and applies them through real projects. Most of my learning comes from documentation, experimentation, AI tools, YouTube, and building projects.</p>
    <h3>Learning Journey</h3>
    <ul>
      <li>June 2024 — Got my first personal laptop</li>
      <li>August 2024 — Started exploring AI tools</li>
      <li>Late 2024 — Began learning Python</li>
      <li>2025 — Started Web Development</li>
      <li>2025 — Built Arduino and Robotics projects</li>
      <li>2026 — Building SaaS ideas and advanced portfolio projects</li>
    </ul>
    <h3>Evidence</h3>
    <ul>
      <li>Created spaceX landing page clone website</li>
      <li>Created a personal portfolio website</li>
      <li>Built an Arduino-based Smart Classroom project</li>
      <li>Built a self driven AI rover</li>
      <li>Built AI jarvis type assistant</li>
      <li>Consistently learning new tools and technologies</li>
    </ul>
    <h3>Why 95%</h3>
    <p>I can independently learn unfamiliar topics, find resources, understand concepts, and apply them in practical projects without requiring constant guidance.</p>
  `,
  "Problem Solving": `
    <h2>Problem Solving — 88%</h2>
    <h3>Overview</h3>
    <p>I enjoy breaking large problems into smaller steps and finding practical solutions through experimentation and persistence.</p>
    <h3>Evidence</h3>
    <h4>Spotify Clone</h4>
    <p><strong>Challenge:</strong> Creating a functional music player and managing playlists.<br>
    <strong>Solution:</strong> Built custom JavaScript functionality and debugging logic.</p>
    <h4>12WD RC robo fight car</h4>
    <p><strong>Challenge:</strong> Designing a powerful and stable remote-controlled robot capable of handling rough movements and impacts during robo fights. Managing multiple motors, ensuring proper power distribution, and maintaining control responsiveness were key challenges.<br>
    <strong>Solution:</strong> Built a 12-wheel drive system using multiple motors for better traction and stability. Implemented efficient wiring and motor control using Arduino and motor drivers. Optimized weight distribution and control system to ensure smooth movement and reliable performance during operation.</p>
    <h4>Netflix Clone</h4>
    <p><strong>Challenge:</strong> Recreating a professional streaming platform interface.<br>
    <strong>Solution:</strong> Designed and implemented the layout from scratch with some help of AI agents in only some advanced concepts.</p>
    <h4>Smart Classroom Project</h4>
    <p><strong>Challenge:</strong> Automatically detecting room occupancy.<br>
    <strong>Solution:</strong> Created a people-counting system using Arduino and IR sensors.</p>
    <h4>Portfolio Development</h4>
    <p><strong>Challenge:</strong> Building a modern responsive portfolio.<br>
    <strong>Solution:</strong> Designed and deployed a complete website independently.</p>
    <h3>Why 88%</h3>
    <p>I can solve most beginner and intermediate-level technical problems independently. More experience with large-scale systems is still needed.</p>
    <h3>Metrics</h3>
    <ul>
      <li>Multiple completed projects</li>
      <li>Hundreds of debugging sessions</li>
      <li>Experience across software and hardware projects</li>
    </ul>
    <p><strong>Final Score: 88%</strong></p>
  `,
  "Technical Research": `
    <h2>Technical Research — 85%</h2>
    <h3>Overview</h3>
    <p>I regularly explore new technologies, compare tools, study market opportunities, and test emerging software.</p>
    <h3>Research Areas</h3>
    <ul>
      <li>Artificial Intelligence</li>
      <li>Web Development</li>
      <li>Robotics</li>
      <li>Arduino Systems</li>
      <li>SaaS Business Models</li>
      <li>Productivity Tools</li>
    </ul>
    <h3>Evidence</h3>
    <ul>
      <li>Explored dozens of AI tools</li>
      <li>Researched business opportunities in multiple industries</li>
      <li>Compared technologies before selecting project stacks</li>
      <li>Continuously evaluate new development tools</li>
    </ul>
    <h3>Why 85%</h3>
    <p>I actively investigate technologies before using them and enjoy understanding how different systems work. I continue to improve the depth of my technical research.</p>
    <p><strong>Final Score: 85%</strong></p>
  `,
  "Prompt Engineering": `
    <h2>Prompt Engineering — 82%</h2>
    <h3>Overview</h3>
    <p>I use AI systems daily for coding, learning, research, content generation, project planning, and problem solving.</p>
    <h3>Experience</h3>
    <ul>
      <li>Extensive use of ChatGPT</li>
      <li>Experience with Gemini</li>
      <li>Experience with Claude</li>
      <li>Experience with AI image generation tools</li>
      <li>Experience with AI coding assistants</li>
    </ul>
    <h3>Applications</h3>
    <ul>
      <li>Website development</li>
      <li>Learning acceleration</li>
      <li>Research assistance</li>
      <li>Project planning</li>
      <li>Content generation</li>
    </ul>
    <h3>Evidence</h3>
    <ul>
      <li>Have experience of 50k+ lines of prompts</li>
      <li>Used AI to accelerate project development</li>
      <li>Created structured prompts for coding and research tasks</li>
      <li>Refined prompts through experimentation and iteration</li>
    </ul>
    <h3>Why 82%</h3>
    <p>I can reliably obtain useful results from AI systems and understand prompt refinement techniques. Advanced agent workflows and automation systems are areas I am still learning.</p>
    <p><strong>Final Score: 82%</strong></p>
  `,
  "Leadership": `
    <h2>Leadership — 62%</h2>
    <h3>Overview</h3>
    <p>I take initiative in personal projects and can guide small groups, but I am still developing experience leading larger teams.</p>
    <h3>Evidence</h3>
    <ul>
      <li>Led development of the Smart AI Rover project</li>
      <li>Presented projects during exhibitions</li>
      <li>Explained technical concepts to visitors and judges</li>
      <li>Helped classmates understand technology-related topics</li>
      <li>Managed project planning and documentation</li>
    </ul>
    <h3>Why 62%</h3>
    <p>I am comfortable taking responsibility and leading small project efforts. However, large-team management and long-term leadership experience are still developing.</p>
    <p><strong>Final Score: 62%</strong></p>
  `
};

const skillsModal = document.getElementById('skills-modal');
const modalBody = document.getElementById('modal-body');
const closeModalBtn = document.getElementById('close-modal');
const skillCards = document.querySelectorAll('.OtherSkillCard');

if (skillsModal && modalBody && closeModalBtn) {
  // Open modal on card click
  skillCards.forEach(card => {
    card.addEventListener('click', () => {
      const headingElement = card.querySelector('.OSCT_heading');
      if (headingElement) {
        const skillName = headingElement.textContent.replace(/\s+/g, ' ').trim();
        if (skillsContent[skillName]) {
          modalBody.innerHTML = skillsContent[skillName];
          skillsModal.classList.remove('hidden');
          document.body.classList.add('no-scroll'); // Prevent background scrolling
          if (typeof lenis !== 'undefined') lenis.stop(); // Stop Lenis smooth scrolling
        }
      }
    });
  });

  // Close modal on close button click
  closeModalBtn.addEventListener('click', () => {
    skillsModal.classList.add('hidden');
    document.body.classList.remove('no-scroll');
    if (typeof lenis !== 'undefined') lenis.start(); // Resume Lenis smooth scrolling
  });

  // Close modal on clicking outside the content
  skillsModal.addEventListener('click', (e) => {
    if (e.target === skillsModal) {
      skillsModal.classList.add('hidden');
      document.body.classList.remove('no-scroll');
      if (typeof lenis !== 'undefined') lenis.start(); // Resume Lenis smooth scrolling
    }
  });
}

// --- Project Universe Logic ---
const openUniverseBtn = document.getElementById('open-universe-btn');
const closeUniverseBtn = document.getElementById('close-universe');
const universeModal = document.getElementById('universe-modal');
const universeCanvas = document.getElementById('universe-canvas');
const universeCoords = document.getElementById('universe-coords');
const blackHole = document.getElementById('black-hole');
const uCards = document.querySelectorAll('.u-card');

// Randomize float delays dynamically in JS
uCards.forEach(card => {
  card.style.setProperty('--float-delay', `${Math.random() * -4}s`);
});

if (openUniverseBtn && universeModal && universeCanvas) {
  const dimOverlay = document.getElementById('dim-overlay');
  const flashOverlay = document.getElementById('flash-overlay');

  openUniverseBtn.addEventListener('click', () => {
    if (openUniverseBtn.classList.contains('sparking')) return;
    
    // 1. The Dimming and the Spark
    if (dimOverlay) dimOverlay.style.opacity = '1';
    openUniverseBtn.classList.add('sparking');
    
    // 2. The Blinding Flash (after spark buildup)
    setTimeout(() => {
      if (flashOverlay) flashOverlay.style.opacity = '1';
      
      // 3. Swap to the Universe during the pure white blindness
      setTimeout(() => {
        openUniverseBtn.classList.remove('sparking');
        if (dimOverlay) dimOverlay.style.opacity = '0';
        
        universeModal.classList.remove('hidden');
        universeModal.classList.remove('open'); // Reset so it starts blurred
        
        // Center mathematically
        translateX = window.innerWidth / 2;
        translateY = window.innerHeight / 2;
        updateCanvasTransform();
        
        document.body.classList.add('no-scroll');
        if (typeof lenis !== 'undefined') lenis.stop();
        
        void universeModal.offsetWidth; // Force reflow
        
        // Start the long Cinematic Blur-Clear transition
        universeModal.classList.add('open');
        
        // Fade out the flash very slowly
        if (flashOverlay) {
          flashOverlay.style.transition = 'opacity 3s ease-out';
          flashOverlay.style.opacity = '0';
        }

        // Staggered Card Materialization
        uCards.forEach((card, index) => {
          card.classList.remove('visible'); // Reset
          setTimeout(() => {
            card.classList.add('visible');
          }, 1000 + (index * 150)); // Start appearing as flash clears
        });
        
        // Clean up flash transition for next time
        setTimeout(() => {
          if (flashOverlay) flashOverlay.style.transition = 'opacity 0.15s ease';
        }, 3000);
        
      }, 150); // duration of pure white blindness
    }, 400); // duration of the spark charge-up
  });

  closeUniverseBtn.addEventListener('click', () => {
    // Spawn the Black Hole exactly where the user is currently looking!
    // The center of the screen in canvas coordinates:
    const targetX = (window.innerWidth / 2) - translateX;
    const targetY = (window.innerHeight / 2) - translateY;

    if (blackHole) {
      blackHole.style.left = `${targetX}px`;
      blackHole.style.top = `${targetY}px`;
      // Force reflow so it instantly moves before exploding
      void blackHole.offsetWidth; 
      
      // Trigger the engulfing explosion
      blackHole.classList.add('explode');
    }
    
    universeModal.classList.add('engulfed');

    // Wait for the universe to be engulfed in darkness, then shrink back
    setTimeout(() => {
      universeModal.classList.remove('open');
      document.body.classList.remove('no-scroll');
      if (typeof lenis !== 'undefined') lenis.start();
      
      // Hide cards so they materialize nicely next time
      uCards.forEach(card => card.classList.remove('visible'));

      // Reset the black hole after it's hidden
      setTimeout(() => {
        universeModal.classList.add('hidden');
        universeModal.classList.remove('engulfed');
        if (blackHole) {
          blackHole.classList.remove('explode');
          // Reset back to origin (0,0) for next time
          blackHole.style.left = '0px';
          blackHole.style.top = '0px';
        }
      }, 1200);
    }, 1500);
  });

  // Drag to pan logic
  let isDragging = false;
  let startX, startY;
  let translateX = 0, translateY = 0;

  function updateCanvasTransform() {
    universeCanvas.style.transform = `translate(${translateX}px, ${translateY}px)`;
    
    // Pan the background grid simultaneously for infinite effect
    universeModal.style.backgroundPosition = `${translateX}px ${translateY}px, ${translateX + 25}px ${translateY + 25}px`;

    // Calculate coordinates of the center of the screen
    if (universeCoords) {
      let uniX = Math.round(-(translateX - window.innerWidth / 2));
      let uniY = Math.round(-(translateY - window.innerHeight / 2));
      universeCoords.textContent = `X: ${uniX} | Y: ${-uniY}`;
    }
  }

  universeModal.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
    universeCanvas.style.transition = 'none'; // Remove transition for instant drag
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    translateX = e.clientX - startX;
    translateY = e.clientY - startY;
    
    updateCanvasTransform();
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      universeCanvas.style.transition = 'transform 0.1s linear';
    }
  });

  // Touch support for mobile
  universeModal.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].clientX - translateX;
    startY = e.touches[0].clientY - translateY;
    universeCanvas.style.transition = 'none';
  });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    translateX = e.touches[0].clientX - startX;
    translateY = e.touches[0].clientY - startY;

    updateCanvasTransform();
  });

  window.addEventListener('touchend', () => {
    isDragging = false;
    universeCanvas.style.transition = 'transform 0.1s linear';
  });
}
