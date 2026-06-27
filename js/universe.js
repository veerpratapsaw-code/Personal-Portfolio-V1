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
    { 
      title: "SpotifMe Music Player", 
      tech: "Vanilla JS • HTML/CSS", 
      desc: "A fully functional music player web application. Instead of using a framework, I used complex Vanilla Javascript to dynamically fetch playlists from a local JSON database, manage audio playback states, and update the UI in real-time with a custom responsive layout.", 
      type: "software", 
      importance: 1, 
      media: "assets/projects/spotifme.webp" 
    },
    { 
      title: "Driver's Sleep Detector", 
      tech: "Python • OpenCV • dlib", 
      desc: "A real-time safety monitoring system using dlib and a 68-point facial landmark predictor to actively track a driver's eyes. It calculates the Eye Aspect Ratio (EAR) to detect drowsiness and triggers an alert if the eyes remain closed, preventing potential accidents.", 
      type: "software", 
      importance: 1, 
      media: "assets/projects/sleep-detector.webp" 
    },
    { 
      title: "Advanced Face Recognizer", 
      tech: "Python • OpenCV • ML", 
      desc: "A biometric identification system. It uses a script to process images of known people and saves their facial data into a database. A second script scans live video feeds, compares the faces to the database, and identifies people in real-time.", 
      type: "software", 
      importance: 1, 
      media: "assets/projects/face-recognizer.webp" 
    },
    
    // Mid-tier Software (Right Side, mid)
    { 
      title: "AuraPlay Netflix Clone", 
      tech: "HTML/CSS • UI/UX", 
      desc: "A premium streaming platform landing page clone. It features a visually striking hero section, an email signup form, and a responsive Trending Now content carousel, demonstrating a strong grasp of modern UI aesthetics.", 
      type: "software", 
      importance: 2, 
      media: "assets/projects/auraplay.webp" 
    },
    { 
      title: "SpaceX Landing Page", 
      tech: "HTML/CSS • Animations", 
      desc: "A high-fidelity clone of the SpaceX landing page focusing heavily on frontend layout structure, bold typography, and replicating sleek aerospace-themed design using pure CSS.", 
      type: "software", 
      importance: 2, 
      media: "assets/projects/spacex.webp" 
    },

    // Minor Software (Right Side, far)
    { 
      title: "Jarvis AI Assistant", 
      tech: "Python • NLP • APIs", 
      desc: "A voice-activated virtual assistant utilizing speech recognition to listen to user commands and fetch real-time information from the web to answer questions dynamically.", 
      type: "software", 
      importance: 3, 
      media: "assets/projects/jarvis.webp" 
    },
    { 
      title: "Real-time Face Detector", 
      tech: "Python • OpenCV", 
      desc: "A computer vision utility that actively scans video feeds or images to detect the presence of human faces, drawing bounding boxes around them in real-time.", 
      type: "software", 
      importance: 3, 
      media: "assets/projects/face-detector.webp" 
    },

    // Important Robotics (Left Side, close)
    { 
      title: "CyberRover V2", 
      tech: "ESP32 • LoRa • Autonomous Robotics", 
      desc: "An autonomous AI-powered inspection rover developed for post-blast underground mine safety. It navigates hazardous environments using ultrasonic sensors, monitors carbon monoxide and air quality with MQ-7 and MQ-135 sensors, transmits live environmental data through LoRa communication, and provides remote monitoring with an onboard camera and LCD control station. The rover can automatically switch into stationary monitoring mode for continuous safety analysis.", 
      type: "robotics", 
      importance: 1, 
      media: "assets/projects/cyberrover.webp" 
    },
    { 
      title: "TitanDrive Combat Rover", 
      tech: "ESP32 • Wi-Fi • Custom Web Dashboard", 
      desc: "A modular Wi-Fi controlled combat robot featuring a custom-built browser dashboard. The robot supports two drivetrain configurations: an 8-wheel standard mode for agility and a 12-wheel extreme power mode for maximum traction and pushing force. Designed with future expansion in mind, allowing quick hardware upgrades without redesigning the chassis.", 
      type: "robotics", 
      importance: 1, 
      media: "assets/projects/robofight.webp" 
    },
    { 
      title: "EcoSense Classroom Automation", 
      tech: "Arduino Uno • IR Sensors • Automation", 
      desc: "My first robotics project. An intelligent classroom automation system that automatically controls lighting based on occupancy using entry and exit IR sensors. The system counts people entering and leaving the room to reduce unnecessary electricity consumption. This project won 3rd place in my school science exhibition.", 
      type: "robotics", 
      importance: 1, 
      media: "assets/projects/smart-classroom.webp" 
    },

    // Less Important Robotics (Left Side, far)
    { 
      title: "RoboSoccer X1", 
      tech: "Arduino Uno • HC-05 Bluetooth", 
      desc: "A wireless RC robot designed for Robo Soccer competitions. Controlled through Bluetooth using a smartphone, the robot provides responsive movement in all directions and introduced me to wireless robotics, motor drivers, and mobile-controlled embedded systems.", 
      type: "robotics", 
      importance: 2, 
      media: "assets/projects/robosoccer.webp" 
    },
    { 
      title: "PathSense Autonomous Rover", 
      tech: "Arduino Uno • IR Sensors", 
      desc: "An autonomous robot capable of detecting nearby obstacles using infrared sensors and making movement decisions without human intervention. This project strengthened my understanding of sensor-based navigation and embedded programming logic.", 
      type: "robotics", 
      importance: 2, 
      media: "assets/projects/obstacle-car.webp" 
    }
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
    universeModal.style.backgroundPosition = `${translateX * 0.3}px ${translateY * 0.3}px`;

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

    const placedPositions = []; // To track where cards are to avoid overlap

    universeProjects.forEach((proj) => {
      let minRadius, maxRadius;
      if (proj.importance === 1) { minRadius = 300; maxRadius = 700; }
      else if (proj.importance === 2) { minRadius = 800; maxRadius = 1400; }
      else { minRadius = 1500; maxRadius = 3000; }

      let x, y;
      let isOverlapping = true;
      let attempts = 0;
      const minDistance = 350; // The minimum pixel distance between any two cards

      while (isOverlapping && attempts < 50) {
        const r = Math.random() * (maxRadius - minRadius) + minRadius;
        
        // Software = Right side (-90 to 90 degrees), Robotics = Left side (90 to 270 degrees)
        let angleDegrees = proj.type === 'software' ? (Math.random() * 180 - 90) : (Math.random() * 180 + 90);
        const angleRads = angleDegrees * (Math.PI / 180);

        x = Math.round(r * Math.cos(angleRads));
        y = Math.round(r * Math.sin(angleRads));

        // Check if this new spot is too close to any previously placed card
        isOverlapping = placedPositions.some(pos => {
          const dist = Math.hypot(pos.x - x, pos.y - y);
          return dist < minDistance;
        });

        attempts++;
      }

      placedPositions.push({ x, y }); // Save the final chosen position

      const card = document.createElement('div');
      card.className = 'u-card';
      card.style.left = `${x}px`;
      card.style.top = `${y}px`;
      card.style.setProperty('--float-delay', `${Math.random() * -4}s`);
      card.innerHTML = `<h3>${proj.title}</h3><p>${proj.tech}</p>`;

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
        }, 350);
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


    // Touch support for mobile dragging and zooming
    let initialTouchDist = 0;

    universeModal.addEventListener('touchstart', (e) => {
      if (hologramOpen) return;
      if (e.touches.length === 1) {
        isDragging = true;
        hasDragged = false;
        startX = e.touches[0].clientX - translateX;
        startY = e.touches[0].clientY - translateY;
        universeCanvas.style.transition = 'none';
      } else if (e.touches.length === 2) {
        isDragging = false;
        hasDragged = true;
        initialTouchDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    });

    window.addEventListener('touchmove', (e) => {
      if (hologramOpen) return;
      if (e.touches.length === 1 && isDragging) {
        hasDragged = true;
        translateX = e.touches[0].clientX - startX;
        translateY = e.touches[0].clientY - startY;
        updateCanvasTransform();
      } else if (e.touches.length === 2) {
        e.preventDefault(); // prevent native scroll
        const currentDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        if (initialTouchDist > 0) {
          const oldScale = currentScale;
          const zoomSpeed = 0.01;
          const diff = currentDist - initialTouchDist;
          currentScale += diff * zoomSpeed;
          currentScale = Math.max(0.2, Math.min(currentScale, 3));

          if (currentScale !== oldScale) {
            const scaleRatio = currentScale / oldScale;
            const cx = (e.touches[0].clientX + e.touches[1].clientX) / 2;
            const cy = (e.touches[0].clientY + e.touches[1].clientY) / 2;
            translateX = cx - (cx - translateX) * scaleRatio;
            translateY = cy - (cy - translateY) * scaleRatio;
            universeCanvas.style.transition = 'none';
            updateCanvasTransform();
          }
          initialTouchDist = currentDist;
        }
      }
    }, { passive: false });

    window.addEventListener('touchend', (e) => {
      if (e.touches.length === 0) {
        isDragging = false;
        initialTouchDist = 0;
        universeCanvas.style.transition = 'transform 0.1s linear';
      }
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

        universeCanvas.style.transition = 'transform 1s ease-in-out';
        updateCanvasTransform();

        // reset transition after panning finishes
        setTimeout(() => {
          universeCanvas.style.transition = 'transform 0.1s linear';
        }, 1000);
      });
    }
  }
});
