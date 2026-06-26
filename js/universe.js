// --- Project Universe Logic ---
document.addEventListener("DOMContentLoaded", () => {
  const openUniverseBtn = document.getElementById('open-universe-btn');
  const closeUniverseBtn = document.getElementById('close-universe');
  const universeModal = document.getElementById('universe-modal');
  const universeCanvas = document.getElementById('universe-canvas');
  const universeCoords = document.getElementById('universe-coords');
  const blackHole = document.getElementById('black-hole');
  let uCards = []; // Will be populated dynamically

  const universeProjects = [
    // Important Software (Right Side, close)
    { title: "E-Commerce Platform", tech: "MERN Stack", desc: "A fully functional e-commerce platform with real-time checkout and user authentication.", type: "software", importance: 1, media: "https://via.placeholder.com/600x400/7c3aed/ffffff?text=E-Commerce+Demo" },
    { title: "Weather Dashboard", tech: "React / API", desc: "Real-time weather tracking dashboard utilizing third-party REST APIs.", type: "software", importance: 1, media: "https://via.placeholder.com/600x400/4f46e5/ffffff?text=Weather+App" },
    
    // Less Important Software (Right Side, far)
    { title: "Task Tracker", tech: "Vanilla JS", desc: "A simple task tracking app to manage daily chores.", type: "software", importance: 3, media: "https://via.placeholder.com/600x400/333333/ffffff?text=Task+Tracker" },
    { title: "Portfolio V0", tech: "HTML/CSS", desc: "My very first portfolio website ever built.", type: "software", importance: 3, media: "https://via.placeholder.com/600x400/333333/ffffff?text=Old+Portfolio" },
    { title: "Chatbot UI", tech: "React", desc: "A simple UI for a chatbot interface.", type: "software", importance: 2, media: "https://via.placeholder.com/600x400/222222/ffffff?text=Chatbot+UI" },

    // Important Robotics (Left Side, close)
    { title: "AI Jarvis Assistant", tech: "Python / NLP", desc: "A voice-activated artificial intelligence assistant that manages smart home devices and answers questions.", type: "robotics", importance: 1, media: "https://via.placeholder.com/600x400/ff4444/ffffff?text=Jarvis+AI" },
    { title: "Self-driving Rover", tech: "Robotics / OpenCV", desc: "An autonomous rover capable of navigating obstacle courses using computer vision.", type: "robotics", importance: 1, media: "https://via.placeholder.com/600x400/ff8800/ffffff?text=Rover+Test" },

    // Less Important Robotics (Left Side, far)
    { title: "Arduino Smart Home", tech: "IoT / C++", desc: "Basic temperature sensors and automated fan control.", type: "robotics", importance: 3, media: "https://via.placeholder.com/600x400/333333/ffffff?text=Arduino+Setup" },
    { title: "Line Follower Bot", tech: "C / Microcontrollers", desc: "A simple robot that follows a black line on a white surface using IR sensors.", type: "robotics", importance: 2, media: "https://via.placeholder.com/600x400/333333/ffffff?text=Line+Follower" }
  ];

  let hasDragged = false; // To distinguish between clicking and dragging
  let isDragging = false;
  let hologramOpen = false; // Prevent dragging while hologram is active
  let startX, startY;
  let translateX = 0, translateY = 0;
  let currentScale = 1;

  function updateCanvasTransform() {
    if (!universeCanvas) return;
    universeCanvas.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentScale})`;
    
    // Pan the background grid simultaneously for infinite parallax effect
    universeModal.style.backgroundPosition = `${translateX * 0.5}px ${translateY * 0.5}px, ${(translateX * 0.5) + 25}px ${(translateY * 0.5) + 25}px`;

    // Calculate coordinates of the center of the screen
    if (universeCoords) {
      let uniX = Math.round(-(translateX - window.innerWidth / 2) / currentScale);
      let uniY = Math.round(-(translateY - window.innerHeight / 2) / currentScale);
      universeCoords.textContent = `X: ${uniX} | Y: ${-uniY} | Zoom: ${Math.round(currentScale * 100)}%`;
    }
  }

  function renderUniverseProjects() {
    if (!universeCanvas) return;
    // Clear existing cards but KEEP the black hole
    Array.from(universeCanvas.children).forEach(child => {
      if (child.id !== 'black-hole') child.remove();
    });
    
    universeProjects.forEach((proj) => {
      let minRadius, maxRadius;
      if (proj.importance === 1) { minRadius = 300; maxRadius = 700; }
      else if (proj.importance === 2) { minRadius = 800; maxRadius = 1400; }
      else { minRadius = 1500; maxRadius = 3000; }
      
      const r = Math.random() * (maxRadius - minRadius) + minRadius;
      
      // Software = Right side (-90 to 90 degrees), Robotics = Left side (90 to 270 degrees)
      let angleDegrees = proj.type === 'software' ? (Math.random() * 180 - 90) : (Math.random() * 180 + 90);
      const angleRads = angleDegrees * (Math.PI / 180);
      
      const x = Math.round(r * Math.cos(angleRads));
      const y = Math.round(r * Math.sin(angleRads));
      
      const card = document.createElement('div');
      card.className = 'u-card';
      card.style.left = `${x}px`;
      card.style.top = `${y}px`;
      card.style.setProperty('--float-delay', `${Math.random() * -4}s`);
      card.innerHTML = `
        <h3>${proj.title}</h3>
        <p>${proj.tech}</p>
      `;
      
      // Hologram Interaction
      card.addEventListener('click', (e) => {
        if (hasDragged) return; 
        
        // Auto-pan to center this card
        translateX = (window.innerWidth / 2) - x;
        translateY = (window.innerHeight / 2) - y;
        universeCanvas.style.transition = 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        updateCanvasTransform();
        
        // Populate Hologram
        document.getElementById('hologram-title').innerText = proj.title;
        document.getElementById('hologram-tech').innerText = proj.tech;
        document.getElementById('hologram-desc').innerText = proj.desc;
        document.getElementById('hologram-media-container').innerHTML = `<img src="${proj.media}" alt="${proj.title}">`;
        
        // Open Hologram
        setTimeout(() => {
          document.getElementById('hologram-modal').classList.remove('hidden');
          universeCanvas.style.filter = 'brightness(0.3)'; // Removed heavy blur for performance
          universeCanvas.style.transition = 'filter 0.4s ease, transform 0.1s linear';
          hologramOpen = true;
        }, 300);
      });
      
      universeCanvas.appendChild(card);
    });
    
    uCards = document.querySelectorAll('.u-card');
  }

  // Call once to generate
  renderUniverseProjects();

  const closeHologramBtn = document.getElementById('close-hologram');
  if (closeHologramBtn) {
    closeHologramBtn.addEventListener('click', () => {
      document.getElementById('hologram-modal').classList.add('hidden');
      universeCanvas.style.filter = 'none'; 
      hologramOpen = false;
    });
  }

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
          currentScale = 1;
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

    universeModal.addEventListener('mousedown', (e) => {
      if (hologramOpen) return; // Lock dragging
      isDragging = true;
      hasDragged = false; // Reset drag state on click
      startX = e.clientX - translateX;
      startY = e.clientY - translateY;
      universeCanvas.style.transition = 'none'; // Remove transition for instant drag
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      hasDragged = true; // Mark as dragged if mouse moves
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
      if (hologramOpen) return; // Lock dragging
      isDragging = true;
      hasDragged = false;
      startX = e.touches[0].clientX - translateX;
      startY = e.touches[0].clientY - translateY;
      universeCanvas.style.transition = 'none';
    });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      hasDragged = true;
      translateX = e.touches[0].clientX - startX;
      translateY = e.touches[0].clientY - startY;

      updateCanvasTransform();
    });

    window.addEventListener('touchend', () => {
      isDragging = false;
      universeCanvas.style.transition = 'transform 0.1s linear';
    });

    // Zooming logic with Mouse Wheel
    universeModal.addEventListener('wheel', (e) => {
      if (hologramOpen) return;
      e.preventDefault(); // prevent actual page scrolling
      
      const oldScale = currentScale;
      // Reverse scroll direction to feel natural
      const zoomDirection = e.deltaY > 0 ? -1 : 1;
      const zoomSpeed = 0.1;
      currentScale += zoomDirection * zoomSpeed;
      
      // limit scale between 0.2 and 3
      currentScale = Math.max(0.2, Math.min(currentScale, 3));
      
      if (currentScale !== oldScale) {
        const scaleRatio = currentScale / oldScale;
        
        // Zoom around the center of the screen (window center)
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        
        translateX = cx - (cx - translateX) * scaleRatio;
        translateY = cy - (cy - translateY) * scaleRatio;
        
        universeCanvas.style.transition = 'none'; // Instant zoom without lag
        updateCanvasTransform();
      }
    }, { passive: false });

    // Recenter Button Logic
    const recenterBtn = document.getElementById('recenter-universe');
    if (recenterBtn) {
      recenterBtn.addEventListener('click', () => {
        if (hologramOpen) return;
        translateX = window.innerWidth / 2;
        translateY = window.innerHeight / 2;
        currentScale = 1;
        
        universeCanvas.style.transition = 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        updateCanvasTransform();
        
        // reset transition after panning finishes
        setTimeout(() => {
          universeCanvas.style.transition = 'transform 0.1s linear';
        }, 800);
      });
    }
  }
});
