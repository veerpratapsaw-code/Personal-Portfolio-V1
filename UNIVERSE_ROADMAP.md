# Interactive Universe Codebase Roadmap

If you want to fully understand this code so that you can modify it, learn from it, or build something similar in the future, diving straight into the 500+ lines of math will be overwhelming.

Instead, read the code in this exact **step-by-step order**. This path follows how the data flows from the foundation up to the complex physics.

---

### Step 1: The Skeleton (The HTML & CSS Foundation)
**Files to read:** 
- `index.html` (Search for `<div id="universe-modal">`)
- `css/universe-core.css`

**Goal:** Understand the layers.
**What to look for:** Notice how the structure is built like a sandwich. At the very bottom is the `<canvas id="bg-space-canvas">`. On top of that is the invisible `<div id="universe-canvas">` which holds all the cards. On top of that is the HUD (`universe-dashboard`). Look at the CSS to see how absolute positioning layers them perfectly on top of each other.

---

### Step 2: The Data & Core Engine
**Files to read:** 
- `js/data/projects.js` 
- `js/universe-core.js`

**Goal:** Understand how the universe is mathematically populated.
**What to look for:** Look at how simple the data is in `projects.js`. Then, in `universe-core.js`, read the `renderUniverseProjects()` function. This is the most important function. Watch how it loops through your project data, uses `Math.cos()` and `Math.sin()` to calculate circular orbits, and dynamically creates `<div class="u-card">` elements and injects them into the HTML.

---

### Step 3: Moving the Universe (Event Listeners)
**Files to read:** 
- `js/universe-events.js`

**Goal:** Understand how dragging and zooming works.
**What to look for:** Skip the complex multi-touch math at first. Just look at the `mousemove` and `wheel` (scroll) events. Notice that all they do is change three simple variables: `translateX`, `translateY`, and `currentScale`. Once those variables change, they call `updateCanvasTransform()` (from Step 2), which actually applies the CSS movement to the screen.

---

### Step 4: The User Interface (Modals & Menus)
**Files to read:** 
- `js/universe-ui.js`

**Goal:** Understand the "game-like" interactions.
**What to look for:** Read how the Big Bang opening sequence works using `setTimeout` to orchestrate the blinding flash and the cinematic blur. Then look at how clicking a project card populates the Hologram Data-Pad with text and images.

---

### Step 5: The Canvas Masterclass
**Files to read:** 
- `js/space-bg.js`

**Goal:** Understand the 60 FPS graphics engine.
**What to look for:** Save this for last. Once you understand how the DOM moves, look at the `SpaceEngine` class here. Notice how it takes the exact same camera coordinates that the DOM uses and uses them to calculate the `drawX` and `drawY` of the stars using the HTML5 Canvas `ctx.lineTo()` drawing API.
