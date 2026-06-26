document.addEventListener("DOMContentLoaded", () => {
  // Custom Context Menu Logic
  const contextMenu = document.getElementById('custom-context-menu');
  const sharePortfolioBtn = document.getElementById('share-portfolio');

  if (contextMenu) {
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
  }

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

  if (showQrBtn && qrModal) {
    showQrBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (contextMenu) contextMenu.classList.remove('active'); // close context menu
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
});
