document.addEventListener("DOMContentLoaded", () => {
    // 1. Grab our elements from the HTML
    const wrapper = document.querySelector('.magic-wrapper');
    const track = document.querySelector('.horizontal-track');

    // 2. Listen for the user scrolling their mouse wheel anywhere on the page
    window.addEventListener('scroll', () => {
        
        // 3. Get the exact mathematical coordinates of the wrapper on your screen
        const rect = wrapper.getBoundingClientRect();
        
        // `rect.top` tells us how far the TOP of the wrapper is from the TOP of your monitor.
        // When you first reach the sticky section, rect.top is 0. 
        // As you continue scrolling down INSIDE the wrapper, rect.top becomes a negative number (e.g., -500px).
        // We flip it to a positive number so it's easier to work with:
       
        
        // 4. Calculate the maximum distance we can scroll inside the wrapper
        // It's the total height of the wrapper (400vh) minus the height of your monitor (100vh)
        const maxScroll = rect.height - window.innerHeight;
        
        const scrolled = -rect.top;

        // 5. Are we currently inside the sticky window?
        if (scrolled >= 0 && scrolled <= maxScroll) {
            
            // 6. Calculate a "Progress Percentage" (from 0.0 to 1.0)
            // If we have scrolled exactly halfway down the trap, progress is 0.5 (50%)
            const progress = scrolled / maxScroll;
            
            // 7. Calculate how far we need to push the track to the left
            // `track.scrollWidth` is the total width of all boxes combined.
            // We subtract `window.innerWidth` so it stops perfectly when the last box is on screen.
            const maxTranslate = track.scrollWidth - window.innerWidth;
            console.log(maxTranslate)
            
            // Multiply the maximum distance by our progress percentage
            const currentTranslate = maxTranslate * progress;
            console.log(currentTranslate)
            // 8. THE MAGIC: Apply the math to the CSS!
            // This pushes the track to the left (negative X) as you scroll down
            track.style.transform = `translateX(${-currentTranslate}px)`;
        }
    });
});
