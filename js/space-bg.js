/**
 * Advanced Multi-Layer Parallax Space Background Engine
 */

class Star {
  constructor(canvasWidth, canvasHeight, isForeground) {
    this.isForeground = isForeground;
    this.reset(canvasWidth, canvasHeight);
  }

  reset(canvasWidth, canvasHeight) {
    // 30% evenly distributed, 70% clustered into "nebulae"
    if (Math.random() < 0.3) {
      this.x = Math.random() * canvasWidth;
      this.y = Math.random() * canvasHeight;
    } else {
      // Pick one of 4 rough quadrant centers for clustering
      const cx = (Math.random() > 0.5 ? 0.3 : 0.7) * canvasWidth;
      const cy = (Math.random() > 0.5 ? 0.3 : 0.7) * canvasHeight;
      
      // Gaussian (Normal) distribution for realistic clumping
      let u = 0, v = 0;
      while(u === 0) u = Math.random();
      while(v === 0) v = Math.random();
      let numX = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
      let numY = Math.sqrt(-2.0 * Math.log(u)) * Math.sin(2.0 * Math.PI * v);
      
      this.x = cx + numX * (canvasWidth / 6);
      this.y = cy + numY * (canvasHeight / 6);
    }
    
    // Z-depth for parallax
    // Background stars: z between 0.05 and 0.5 (move very slowly)
    // Foreground stars/dust: z between 1.5 and 4 (move quickly, passing in front)
    if (this.isForeground) {
      this.z = Math.random() * 2.5 + 1.5; 
      this.baseSize = Math.random() * 2.5 + 0.5;
      // Slight ambient drift
      this.dx = (Math.random() - 0.5) * 0.2;
      this.dy = (Math.random() - 0.5) * 0.2;
    } else {
      this.z = Math.random() * 0.45 + 0.05;
      this.baseSize = Math.random() * 1.5 + 0.2;
      this.dx = 0;
      this.dy = 0;
    }
    
    this.opacity = Math.random() * 0.8 + 0.2;
    this.twinkleSpeed = Math.random() * 0.02 + 0.005;
    this.twinkleDir = Math.random() > 0.5 ? 1 : -1;
    
    // Add subtle colors to some stars (blue, white, slight orange)
    const colors = ['255, 255, 255', '200, 220, 255', '255, 220, 200', '180, 180, 255'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  draw(ctx, canvasWidth, canvasHeight, panX, panY, zoom, vx, vy, isForeground) {
    // Twinkle
    this.opacity += this.twinkleSpeed * this.twinkleDir;
    if (this.opacity > 1) { this.opacity = 1; this.twinkleDir = -1; }
    if (this.opacity < 0.1) { this.opacity = 0.1; this.twinkleDir = 1; }

    this.x += this.dx;
    this.y += this.dy;

    // Apply Parallax offset based on Z-depth
    let drawX = this.x + (panX * this.z);
    let drawY = this.y + (panY * this.z);

    // Infinite seamless wrapping
    drawX = ((drawX % canvasWidth) + canvasWidth) % canvasWidth;
    drawY = ((drawY % canvasHeight) + canvasHeight) % canvasHeight;

    // Dynamic sizing based on zoom
    let drawSize = this.baseSize;
    if (this.isForeground) {
      drawSize *= Math.max(0.5, zoom); 
    }

    ctx.beginPath();
    ctx.lineCap = 'round';
    ctx.lineWidth = drawSize;
    
    // Adjust opacity for foreground
    const finalOpacity = isForeground ? this.opacity * 0.7 : this.opacity;
    ctx.strokeStyle = `rgba(${this.color}, ${finalOpacity})`;

    ctx.moveTo(drawX, drawY);

    // Warp speed motion blur tail
    // Scales based on speed (vx, vy) and depth (z)
    let tailX = -vx * this.z * 1.5;
    let tailY = -vy * this.z * 1.5;

    // Cap the maximum tail length to prevent massive lines during fast auto-panning
    const maxTailLength = 20; 
    const currentTailLength = Math.hypot(tailX, tailY);
    if (currentTailLength > maxTailLength) {
      const scale = maxTailLength / currentTailLength;
      tailX *= scale;
      tailY *= scale;
    }

    // If perfectly still, draw a minimal line to make a round dot
    if (Math.abs(tailX) < 1.0 && Math.abs(tailY) < 1.0) {
      tailX = 1.0;
      tailY = 0.5;
    }

    ctx.lineTo(drawX + tailX, drawY + tailY);
    ctx.stroke();
  }
}

class SpaceEngine {
  constructor() {
    this.bgCanvas = document.getElementById('bg-space-canvas');
    
    if (!this.bgCanvas) return;

    this.bgCtx = this.bgCanvas.getContext('2d');
    this.bgStars = [];

    // Global state passed from universe.js
    this.targetPanX = 0;
    this.targetPanY = 0;
    this.smoothPanX = 0;
    this.smoothPanY = 0;
    this.lastPanX = 0;
    this.lastPanY = 0;
    this.zoom = 1;

    this.resize();
    window.addEventListener('resize', () => this.resize());

    // Generate stars based on screen size (density)
    this.generateStars();

    // Start render loop
    requestAnimationFrame(() => this.render());
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    
    // Handle high-DPI displays for crisp rendering
    const dpr = window.devicePixelRatio || 1;
    
    this.bgCanvas.width = this.width * dpr;
    this.bgCanvas.height = this.height * dpr;
    this.bgCtx.scale(dpr, dpr);
  }

  generateStars() {
    this.bgStars = [];
    this.fgStars = [];
    
    const area = this.width * this.height;
    // About 1 background star per 3500 pixels (previously 2000)
    const bgCount = Math.floor(area / 3500); 

    for (let i = 0; i < bgCount; i++) {
      this.bgStars.push(new Star(this.width, this.height, false));
    }
  }

  setCamera(panX, panY, zoom) {
    this.targetPanX = panX;
    this.targetPanY = panY;
    this.zoom = zoom;
    
    // Snap immediately on first pan
    if (this.smoothPanX === undefined) {
      this.smoothPanX = panX;
      this.smoothPanY = panY;
      this.lastPanX = panX;
      this.lastPanY = panY;
    }
  }

  render() {
    // Spring physics for smooth panning
    if (this.smoothPanX !== undefined) {
      this.smoothPanX += (this.targetPanX - this.smoothPanX) * 0.15;
      this.smoothPanY += (this.targetPanY - this.smoothPanY) * 0.15;
    } else {
      this.smoothPanX = 0;
      this.smoothPanY = 0;
      this.lastPanX = 0;
      this.lastPanY = 0;
    }

    // Calculate instantaneous velocity of the camera
    let vx = this.smoothPanX - this.lastPanX;
    let vy = this.smoothPanY - this.lastPanY;
    
    this.lastPanX = this.smoothPanX;
    this.lastPanY = this.smoothPanY;

    // Clear canvas
    this.bgCtx.clearRect(0, 0, this.width, this.height);

    // Draw Background Stars
    this.bgStars.forEach(star => {
      star.draw(this.bgCtx, this.width, this.height, this.smoothPanX, this.smoothPanY, this.zoom, vx, vy, false);
    });

    requestAnimationFrame(() => this.render());
  }
}

// Initialize engine globally so universe.js can update the camera
let globalSpaceEngine;
document.addEventListener("DOMContentLoaded", () => {
  globalSpaceEngine = new SpaceEngine();
});
