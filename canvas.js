/**
 * Interactive Particle Constellation Canvas
 * High-performance, 60fps particle mesh that responds to cursor velocity and theme changes.
 */

(function () {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, radius: 150 };

  // Determine particle styling based on current theme
  function getThemeColors() {
    const isLight = document.documentElement.classList.contains('light-theme');
    const isCyber = document.documentElement.classList.contains('cyber-theme');

    if (isCyber) {
      return {
        particle: 'rgba(16, 185, 129, 0.65)',
        line: 'rgba(16, 185, 129, ',
        glow: '#10b981'
      };
    } else if (isLight) {
      return {
        particle: 'rgba(99, 102, 241, 0.45)',
        line: 'rgba(99, 102, 241, ',
        glow: '#6366f1'
      };
    } else {
      // Default Modern Dark
      return {
        particle: 'rgba(147, 197, 253, 0.55)',
        line: 'rgba(96, 165, 250, ',
        glow: '#38bdf8'
      };
    }
  }

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
  }

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.baseRadius = Math.random() * 2 + 1;
      this.radius = this.baseRadius;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * force * 3;
          this.y -= Math.sin(angle) * force * 3;
          this.radius = this.baseRadius * 1.6;
        } else {
          this.radius = this.baseRadius;
        }
      } else {
        this.radius = this.baseRadius;
      }
    }

    draw(colors) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = colors.particle;
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    // Dynamic particle density based on screen dimensions
    const count = Math.min(Math.floor((width * height) / 12000), 90);
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function connectParticles(colors) {
    const maxDist = 135;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const opacity = (1 - dist / maxDist) * 0.28;
          ctx.beginPath();
          ctx.strokeStyle = `${colors.line}${opacity})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    const colors = getThemeColors();

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw(colors);
    }

    connectParticles(colors);
    animationFrameId = requestAnimationFrame(animate);
  }

  // Event Listeners
  window.addEventListener('resize', resize);

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Touch support for mobile devices
  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Pause when tab not visible to preserve battery
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationFrameId);
    } else {
      animate();
    }
  });

  // Initialize
  resize();
  animate();

  // Expose hook to refresh theme if needed
  window.refreshCanvasTheme = function () {
    // Canvas updates automatically on next animation frame
  };
})();
