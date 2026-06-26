document.addEventListener("DOMContentLoaded", () => {
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
});
