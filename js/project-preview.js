document.addEventListener("DOMContentLoaded", () => {
  const previewContainer = document.getElementById('project-preview-image');
  let previewImg = previewContainer ? previewContainer.querySelector('img') : null;
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
});
