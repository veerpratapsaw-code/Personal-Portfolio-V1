document.addEventListener("DOMContentLoaded", () => {
  // Skills Modal Logic
  const skillsContent = {
    "Self Learning": `
      <h2>Self Learning — 95%</h2>
      <h3>Overview</h3>
      <p>I am a self-taught student who consistently learns new technologies and applies them through real projects. Most of my learning comes from documentation, experimentation, AI tools, YouTube, and building projects.</p>
      <h3>Learning Journey</h3>
      <ul>
        <li>June 2024 — Got my first personal laptop</li>
        <li>August 2024 — Started exploring AI tools</li>
        <li>Late 2024 — Began learning Python</li>
        <li>2025 — Started Web Development</li>
        <li>2025 — Built Arduino and Robotics projects</li>
        <li>2026 — Building SaaS ideas and advanced portfolio projects</li>
      </ul>
      <h3>Evidence</h3>
      <ul>
        <li>Created spaceX landing page clone website</li>
        <li>Created a personal portfolio website</li>
        <li>Built an Arduino-based Smart Classroom project</li>
        <li>Built a self driven AI rover</li>
        <li>Built AI jarvis type assistant</li>
        <li>Consistently learning new tools and technologies</li>
      </ul>
      <h3>Why 95%</h3>
      <p>I can independently learn unfamiliar topics, find resources, understand concepts, and apply them in practical projects without requiring constant guidance.</p>
    `,
    "Problem Solving": `
      <h2>Problem Solving — 88%</h2>
      <h3>Overview</h3>
      <p>I enjoy breaking large problems into smaller steps and finding practical solutions through experimentation and persistence.</p>
      <h3>Evidence</h3>
      <h4>Spotify Clone</h4>
      <p><strong>Challenge:</strong> Creating a functional music player and managing playlists.<br>
      <strong>Solution:</strong> Built custom JavaScript functionality and debugging logic.</p>
      <h4>12WD RC robo fight car</h4>
      <p><strong>Challenge:</strong> Designing a powerful and stable remote-controlled robot capable of handling rough movements and impacts during robo fights. Managing multiple motors, ensuring proper power distribution, and maintaining control responsiveness were key challenges.<br>
      <strong>Solution:</strong> Built a 12-wheel drive system using multiple motors for better traction and stability. Implemented efficient wiring and motor control using Arduino and motor drivers. Optimized weight distribution and control system to ensure smooth movement and reliable performance during operation.</p>
      <h4>Netflix Clone</h4>
      <p><strong>Challenge:</strong> Recreating a professional streaming platform interface.<br>
      <strong>Solution:</strong> Designed and implemented the layout from scratch with some help of AI agents in only some advanced concepts.</p>
      <h4>Smart Classroom Project</h4>
      <p><strong>Challenge:</strong> Automatically detecting room occupancy.<br>
      <strong>Solution:</strong> Created a people-counting system using Arduino and IR sensors.</p>
      <h4>Portfolio Development</h4>
      <p><strong>Challenge:</strong> Building a modern responsive portfolio.<br>
      <strong>Solution:</strong> Designed and deployed a complete website independently.</p>
      <h3>Why 88%</h3>
      <p>I can solve most beginner and intermediate-level technical problems independently. More experience with large-scale systems is still needed.</p>
      <h3>Metrics</h3>
      <ul>
        <li>Multiple completed projects</li>
        <li>Hundreds of debugging sessions</li>
        <li>Experience across software and hardware projects</li>
      </ul>
      <p><strong>Final Score: 88%</strong></p>
    `,
    "Technical Research": `
      <h2>Technical Research — 85%</h2>
      <h3>Overview</h3>
      <p>I regularly explore new technologies, compare tools, study market opportunities, and test emerging software.</p>
      <h3>Research Areas</h3>
      <ul>
        <li>Artificial Intelligence</li>
        <li>Web Development</li>
        <li>Robotics</li>
        <li>Arduino Systems</li>
        <li>SaaS Business Models</li>
        <li>Productivity Tools</li>
      </ul>
      <h3>Evidence</h3>
      <ul>
        <li>Explored dozens of AI tools</li>
        <li>Researched business opportunities in multiple industries</li>
        <li>Compared technologies before selecting project stacks</li>
        <li>Continuously evaluate new development tools</li>
      </ul>
      <h3>Why 85%</h3>
      <p>I actively investigate technologies before using them and enjoy understanding how different systems work. I continue to improve the depth of my technical research.</p>
      <p><strong>Final Score: 85%</strong></p>
    `,
    "Prompt Engineering": `
      <h2>Prompt Engineering — 82%</h2>
      <h3>Overview</h3>
      <p>I use AI systems daily for coding, learning, research, content generation, project planning, and problem solving.</p>
      <h3>Experience</h3>
      <ul>
        <li>Extensive use of ChatGPT</li>
        <li>Experience with Gemini</li>
        <li>Experience with Claude</li>
        <li>Experience with AI image generation tools</li>
        <li>Experience with AI coding assistants</li>
      </ul>
      <h3>Applications</h3>
      <ul>
        <li>Website development</li>
        <li>Learning acceleration</li>
        <li>Research assistance</li>
        <li>Project planning</li>
        <li>Content generation</li>
      </ul>
      <h3>Evidence</h3>
      <ul>
        <li>Have experience of 50k+ lines of prompts</li>
        <li>Used AI to accelerate project development</li>
        <li>Created structured prompts for coding and research tasks</li>
        <li>Refined prompts through experimentation and iteration</li>
      </ul>
      <h3>Why 82%</h3>
      <p>I can reliably obtain useful results from AI systems and understand prompt refinement techniques. Advanced agent workflows and automation systems are areas I am still learning.</p>
      <p><strong>Final Score: 82%</strong></p>
    `,
    "Leadership": `
      <h2>Leadership — 62%</h2>
      <h3>Overview</h3>
      <p>I take initiative in personal projects and can guide small groups, but I am still developing experience leading larger teams.</p>
      <h3>Evidence</h3>
      <ul>
        <li>Led development of the Smart AI Rover project</li>
        <li>Presented projects during exhibitions</li>
        <li>Explained technical concepts to visitors and judges</li>
        <li>Helped classmates understand technology-related topics</li>
        <li>Managed project planning and documentation</li>
      </ul>
      <h3>Why 62%</h3>
      <p>I am comfortable taking responsibility and leading small project efforts. However, large-team management and long-term leadership experience are still developing.</p>
      <p><strong>Final Score: 62%</strong></p>
    `
  };

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
