document.addEventListener("DOMContentLoaded", () => {
  // Skills Modal Logic
  // skillsContent is now loaded from js/data/skills.js

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
});
