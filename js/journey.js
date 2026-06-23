document.addEventListener("DOMContentLoaded", () => {
  const journeyWrapper = document.querySelector('.journey-wrapper');
  const journeyTrack = document.querySelector('.journey-track');
  const gridBg = document.querySelector('.grid-bg');
  const roverContainer = document.querySelector('.rover-container');
  const wheels = document.querySelectorAll('.wheel');
  const milestones = document.querySelectorAll('.milestone');

  if (!journeyWrapper || !journeyTrack) return;

  // Set SVG origins so wheels spin correctly around their centers
  // Based on the cx/cy attributes we will give them in the HTML
  wheels.forEach(wheel => {
    const cx = wheel.getAttribute('cx');
    const cy = wheel.getAttribute('cy');
    wheel.style.transformOrigin = `${cx}px ${cy}px`;
  });

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const rect = journeyWrapper.getBoundingClientRect();
        
        // How far we have scrolled into the wrapper
        const scrolled = -rect.top;
        
        // The maximum amount we can scroll before leaving the wrapper
        const maxScroll = rect.height - window.innerHeight;

        if (scrolled >= 0 && scrolled <= maxScroll) {
          // Calculate progress from 0.0 to 1.0
          const progress = scrolled / maxScroll;
          
          // Calculate how far to move the track
          const trackWidth = journeyTrack.scrollWidth;
          const maxTranslate = trackWidth - window.innerWidth;
          const currentTranslate = maxTranslate * progress;
          
          // Move track and background grid
          journeyTrack.style.transform = `translateX(${-currentTranslate}px)`;
          if (gridBg) {
            gridBg.style.transform = `translateX(${-currentTranslate * 0.5}px)`; // Parallax effect
          }
          
          // Animate Rover Wheels (spin proportional to progress)
          // 15 full rotations across the entire scroll
          const rotation = progress * 360 * 15; 
          wheels.forEach(wheel => {
             wheel.style.transform = `rotate(${rotation}deg)`;
          });

          // Animate Rover Body (bobbing up and down to simulate rough terrain)
          const bob = Math.sin(progress * Math.PI * 100) * 4; // Fast, small bobs
          roverContainer.style.transform = `translateY(${bob}px)`;

          // Milestone Visibility Engine
          milestones.forEach(milestone => {
            const milestoneRect = milestone.getBoundingClientRect();
            
            // If the left edge of the milestone enters the right 70% of the screen
            if(milestoneRect.left < window.innerWidth * 0.7 && milestoneRect.right > 0) {
              milestone.classList.add('visible');
            } else {
              milestone.classList.remove('visible');
            }
          });
        }
        ticking = false;
      });
      ticking = true;
    }
  });
});
