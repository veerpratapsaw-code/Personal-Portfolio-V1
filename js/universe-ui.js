  const closeHologramBtn = document.getElementById('close-hologram');
  if (closeHologramBtn) {
    closeHologramBtn.addEventListener('click', () => {
      document.getElementById('hologram-modal').classList.add('hidden');
      universeCanvas.style.filter = 'brightness(1)';
      hologramOpen = false;
    });
  }

  // Prev/Next Navigation
  const holoPrevBtn = document.getElementById('holo-prev-btn');
  const holoNextBtn = document.getElementById('holo-next-btn');
  if (holoPrevBtn && holoNextBtn) {
    holoPrevBtn.addEventListener('click', () => {
      if (!uCards || uCards.length === 0) return;
      let prevIndex = currentHologramIndex - 1;
      if (prevIndex < 0) prevIndex = uCards.length - 1;
      hasDragged = false; // Allow programmatic click
      uCards[prevIndex].click();
    });
    holoNextBtn.addEventListener('click', () => {
      if (!uCards || uCards.length === 0) return;
      let nextIndex = currentHologramIndex + 1;
      if (nextIndex >= uCards.length) nextIndex = 0;
      hasDragged = false; // Allow programmatic click
      uCards[nextIndex].click();
    });
  }

  // Radar Directory Logic
  const radarBtn = document.getElementById('radar-toggle-btn');
  const radarSidebar = document.getElementById('radar-sidebar');
  const closeRadarBtn = document.getElementById('close-radar-btn');
  const radarContent = document.getElementById('radar-content');

  if (radarBtn && radarSidebar) {
    radarBtn.addEventListener('click', () => radarSidebar.classList.add('open'));
    closeRadarBtn.addEventListener('click', () => radarSidebar.classList.remove('open'));
    
    // Group projects by type for the radar
    const groups = {
      'software': 'Software Engineering',
      'robotics': 'Robotics & Hardware',
      'models': 'Physical Models'
    };

    if (radarContent) {
      Object.keys(groups).forEach(type => {
        const typeProjects = universeProjects.map((p, i) => ({...p, originalIndex: i})).filter(p => p.type === type);
        
        if (typeProjects.length > 0) {
          const catTitle = document.createElement('div');
          catTitle.className = 'radar-category';
          catTitle.innerText = groups[type];
          radarContent.appendChild(catTitle);

          typeProjects.forEach(proj => {
            const item = document.createElement('div');
            item.className = 'radar-item';
            item.innerHTML = `<div class="radar-item-title">${proj.title}</div><div class="radar-item-tech">${proj.tech}</div>`;
            item.addEventListener('click', () => {
              radarSidebar.classList.remove('open');
              if (uCards[proj.originalIndex]) {
                hasDragged = false; // Allow programmatic click
                uCards[proj.originalIndex].click();
              }
            });
            radarContent.appendChild(item);
          });
        }
      });
    }
  }

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

          // Asteroid Materialization
          uAsteroids.forEach((asteroid) => {
            asteroid.classList.remove('visible');
            setTimeout(() => {
              asteroid.classList.add('visible');
            }, 1000 + (Math.random() * 1000)); // Random pop-in
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


