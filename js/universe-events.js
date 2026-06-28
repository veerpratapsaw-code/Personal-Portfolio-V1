    universeModal.addEventListener('mousedown', (e) => {
      if (hologramOpen || e.target.closest('#radar-sidebar')) return; // Lock dragging
      isDragging = true;
      hasDragged = false; // Reset drag state on click
      startX = e.clientX - translateX;
      startY = e.clientY - translateY;
      universeCanvas.style.transition = 'none'; // Remove transition for instant drag
    });

    window.addEventListener('mousemove', (e) => {
      // Orbit Hover Effect
      if (!universeModal.classList.contains('hidden') && !hologramOpen) {
        const dx = (e.clientX - translateX) / currentScale;
        const dy = (e.clientY - translateY) / currentScale;
        const dist = Math.hypot(dx, dy);
        
        // Dynamically increase screen tolerance from 15px (at 100% zoom) up to 50px (at 10% zoom)
        let screenTolerance = 15;
        if (currentScale < 1) {
          screenTolerance = 15 + (1 - currentScale) * 40; 
        }
        const tolerance = screenTolerance / currentScale;

        if (orbitRings) {
          orbitRings.forEach(ring => {
            const r = parseFloat(ring.dataset.radius);
            if (Math.abs(dist - r) <= tolerance || r === hoveredCardRadius) {
              ring.classList.add('glow');
            } else {
              ring.classList.remove('glow');
            }
          });
        }
      }

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
      if (hologramOpen || e.target.closest('#radar-sidebar')) return;
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
      if (hologramOpen || (e.target.closest && e.target.closest('#radar-sidebar'))) return;
      if (e.touches.length === 1 && isDragging) {
        e.preventDefault(); // Prevent native scroll while panning universe
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
      if (hologramOpen || e.target.closest('#radar-sidebar')) return;
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

