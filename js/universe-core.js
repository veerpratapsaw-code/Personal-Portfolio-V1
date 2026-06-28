  const openUniverseBtn = document.getElementById('open-universe-btn');
  const closeUniverseBtn = document.getElementById('close-universe');
  const universeModal = document.getElementById('universe-modal');
  const universeCanvas = document.getElementById('universe-canvas');
  const universeCoords = document.getElementById('universe-coords');
  const blackHole = document.getElementById('black-hole');
  let uCards = []; // Will be populated dynamically
  let uAsteroids = [];
  let orbitRings = [];
  let hoveredCardRadius = null;

  // universeProjects is now loaded from js/data/projects.js

  let hasDragged = false; // To distinguish between clicking and dragging
  let isDragging = false;
  let hologramOpen = false; // Prevent dragging while hologram is active
  let currentHologramIndex = -1;
  let startX, startY;
  let translateX = 0, translateY = 0;
  let currentScale = 1;

  function updateCanvasTransform() {
    // READ PHASE (Avoid Layout Thrashing)
    const halfW = window.innerWidth / 2;
    const halfH = window.innerHeight / 2;
    const deltaX = translateX - halfW;
    const deltaY = translateY - halfH;
    
    let uniX = 0, uniY = 0;
    if (universeCoords) {
      uniX = Math.round(-deltaX / currentScale);
      uniY = Math.round(-deltaY / currentScale);
    }

    // WRITE PHASE
    universeCanvas.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) scale(${currentScale})`;
    
    if (universeCoords) {
      universeCoords.textContent = `X: ${uniX} | Y: ${-uniY} | Zoom: ${Math.round(currentScale * 100)}%`;
    }

    if (uCards) {
      uCards.forEach(card => {
        const z = parseFloat(card.dataset.z || 1);
        card.style.setProperty('--px', `${deltaX * (z - 1)}px`);
        card.style.setProperty('--py', `${deltaY * (z - 1)}px`);
      });
    }

    if (typeof globalSpaceEngine !== 'undefined') {
      globalSpaceEngine.setCamera(translateX, translateY, currentScale);
    }
  }

  function renderUniverseProjects() {
    if (!universeCanvas) return;
    // Clear existing cards but KEEP the black hole
    Array.from(universeCanvas.children).forEach(child => {
      if (child.id !== 'black-hole') child.remove();
    });

    const placedPositions = []; // To track where cards are to avoid overlap

    function generateAsteroids(minR, maxR, count) {
      for (let i = 0; i < count; i++) {
        const r = Math.random() * (maxR - minR) + minR;
        const angleRads = Math.random() * Math.PI * 2;
        const x = Math.round(r * Math.cos(angleRads));
        const y = Math.round(r * Math.sin(angleRads));
        
        const size = Math.random() * 3 + 1; // 1px to 4px
        const opacity = Math.random() * 0.4 + 0.1;

        const asteroid = document.createElement('div');
        asteroid.className = 'asteroid';
        asteroid.style.left = `${x}px`;
        asteroid.style.top = `${y}px`;
        asteroid.style.width = `${size}px`;
        asteroid.style.height = `${size}px`;
        asteroid.style.setProperty('--final-opacity', opacity);
        asteroid.style.setProperty('--float-delay', `${Math.random() * -10}s`);
        
        universeCanvas.appendChild(asteroid);
      }
    }

    // Reduce universe size dynamically on mobile so orbits aren't so massive
    const isMobile = window.innerWidth <= 768;
    const orbitScale = isMobile ? 0.6 : 1; 

    // Define the 7 distinct orbits
    const orbitConfigs = {
      'software-1': { r: 500 * orbitScale, speed: 0.00010 },
      'robotics-1': { r: 1000 * orbitScale, speed: 0.00009 },
      'software-2': { r: 1500 * orbitScale, speed: 0.00008 },
      'robotics-2': { r: 2000 * orbitScale, speed: 0.00007 },
      'software-3': { r: 2500 * orbitScale, speed: 0.00006 },
      'robotics-3': { r: 3000 * orbitScale, speed: 0.00005 },
      'models-4':   { r: 3800 * orbitScale, speed: 0.00004 }
    };

    // Render 7 visible orbit rings
    Object.values(orbitConfigs).forEach(config => {
      const ring = document.createElement('div');
      ring.className = 'orbit-ring';
      ring.style.width = `${config.r * 2}px`;
      ring.style.height = `${config.r * 2}px`;
      ring.dataset.radius = config.r;
      universeCanvas.appendChild(ring);
    });

    // To evenly distribute cards on their respective orbits
    const orbitCounts = {};
    const orbitPlaced = {};
    const orbitOffsets = {};
    
    // First pass to count how many items in each orbit and assign a random rotational offset
    universeProjects.forEach(proj => {
      const key = `${proj.type}-${proj.importance}`;
      orbitCounts[key] = (orbitCounts[key] || 0) + 1;
      orbitPlaced[key] = 0;
      if (orbitOffsets[key] === undefined) {
        // Give each ring a completely random starting angle so they don't align in a robotic straight line
        orbitOffsets[key] = Math.random() * Math.PI * 2; 
      }
    });

    universeProjects.forEach((proj, index) => {
      const key = `${proj.type}-${proj.importance}`;
      const config = orbitConfigs[key] || orbitConfigs['models-4']; // fallback just in case
      
      const r = config.r;
      const speed = config.speed; // All move in the same direction (positive)

      // Evenly distribute them, but shifted by the random offset of this specific orbit
      const angleRads = ((orbitPlaced[key] / orbitCounts[key]) * Math.PI * 2) + orbitOffsets[key];
      orbitPlaced[key]++;
      
      let x = Math.round(r * Math.cos(angleRads));
      let y = Math.round(r * Math.sin(angleRads));

      const card = document.createElement('div');
      card.className = 'u-card';
      
      const depthZ = Math.random() * 0.3 + 0.7; // Range: 0.7 to 1.0
      
      card.style.left = `${x}px`;
      card.style.top = `${y}px`;
      card.dataset.z = depthZ;
      card.dataset.orbitAngle = angleRads;
      card.dataset.orbitRadius = r;
      card.dataset.orbitSpeed = speed; // Same direction, no random negative
      card.dataset.x = x;
      card.dataset.y = y;
      card.dataset.index = index;

      card.style.setProperty('--card-z', depthZ);
      card.style.setProperty('--card-z-index', Math.round(depthZ * 100)); // Closer cards appear on top
      card.style.setProperty('--float-delay', `${Math.random() * -4}s`);
      card.innerHTML = `<h3>${proj.title}</h3><p>${proj.tech}</p>`;

      // Hologram Interaction
      card.addEventListener('mouseenter', () => {
        hoveredCardRadius = r;
        if (orbitRings) {
          orbitRings.forEach(ring => {
            if (parseFloat(ring.dataset.radius) === r) ring.classList.add('glow');
          });
        }
      });
      card.addEventListener('mouseleave', () => {
        hoveredCardRadius = null;
        if (orbitRings) {
          orbitRings.forEach(ring => {
            if (parseFloat(ring.dataset.radius) === r) ring.classList.remove('glow');
          });
        }
      });

      card.addEventListener('click', (e) => {
        if (hasDragged) return;

        currentHologramIndex = index;

        // Auto-pan to center this card (using current dynamic X/Y)
        const currentX = parseFloat(card.dataset.x);
        const currentY = parseFloat(card.dataset.y);
        translateX = (window.innerWidth / 2) - currentX;
        translateY = (window.innerHeight / 2) - currentY;
        universeCanvas.style.transition = 'transform 0.8s ease-in-out';
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
    uAsteroids = document.querySelectorAll('.asteroid');
    orbitRings = document.querySelectorAll('.orbit-ring');
  }

  // Call once to generate
  renderUniverseProjects();

