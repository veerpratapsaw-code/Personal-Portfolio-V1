const words = [
  "Frontend Developer",
  "Python Developer",
  "Robotics Engineer"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const element = document.getElementById("typewriter");
  if (!element) return;

  const currentWord = words[wordIndex];

  if (!isDeleting) {
    element.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1500);
      return;
    }
  } else {
    element.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  let delayTime = isDeleting ? 60 : 100;
  setTimeout(typeEffect, delayTime);
}

// Start the typewriter effect
document.addEventListener("DOMContentLoaded", () => {
  typeEffect();
});
