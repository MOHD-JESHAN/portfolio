/**
 * Main Application Logic
 * Interactive Portfolio Controller with Terminal CLI, Project Filters, Case Studies, and Theme Engine.
 */

document.addEventListener('DOMContentLoaded', () => {
  const data = window.PORTFOLIO_DATA;
  if (!data) {
    console.error('Portfolio data not loaded.');
    return;
  }

  // --- 1. Sound FX Engine (Web Audio API - Zero External Dependencies) ---
  const SoundFX = {
    enabled: localStorage.getItem('sound-fx-enabled') === 'true',
    ctx: null,

    init() {
      if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
      }
    },

    playTone(freq = 440, type = 'sine', duration = 0.08, gainVal = 0.04) {
      if (!this.enabled) return;
      try {
        this.init();
        if (this.ctx && this.ctx.state === 'suspended') {
          this.ctx.resume();
        }
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      } catch (e) {
        // Audio policy or unsupported
      }
    },

    click() { this.playTone(600, 'triangle', 0.05, 0.03); },
    pop() { this.playTone(850, 'sine', 0.08, 0.04); },
    success() {
      this.playTone(523.25, 'sine', 0.08, 0.04);
      setTimeout(() => this.playTone(659.25, 'sine', 0.08, 0.04), 80);
      setTimeout(() => this.playTone(783.99, 'sine', 0.12, 0.04), 160);
    },
    terminalKey() { this.playTone(400 + Math.random() * 200, 'sine', 0.03, 0.015); }
  };

  // --- 2. Toast Notification System ---
  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast-item glass-panel px-4 py-3 rounded-lg shadow-xl text-sm flex items-center gap-3 border ${
      type === 'success' ? 'border-emerald-500/40 text-emerald-400' : 'border-sky-500/40 text-sky-300'
    }`;

    const iconName = type === 'success' ? 'check-circle' : 'info';
    toast.innerHTML = `
      <i data-lucide="${iconName}" class="w-4 h-4 flex-shrink-0"></i>
      <span class="text-slate-200 font-medium">${message}</span>
    `;

    container.appendChild(toast);
    lucide.createIcons();

    setTimeout(() => toast.classList.add('show'), 10);
    SoundFX.pop();

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 350);
    }, 3800);
  }

  // --- 3. Theme Engine ---
  const themes = ['dark', 'light', 'cyber'];
  let currentTheme = localStorage.getItem('portfolio-theme') || 'dark';

  function applyTheme(theme) {
    document.documentElement.classList.remove('light-theme', 'cyber-theme');
    if (theme === 'light') document.documentElement.classList.add('light-theme');
    if (theme === 'cyber') document.documentElement.classList.add('cyber-theme');

    localStorage.setItem('portfolio-theme', theme);
    currentTheme = theme;

    const themeLabel = document.getElementById('current-theme-label');
    if (themeLabel) {
      themeLabel.textContent = theme.charAt(0).toUpperCase() + theme.slice(1);
    }

    if (window.refreshCanvasTheme) {
      window.refreshCanvasTheme();
    }
  }

  applyTheme(currentTheme);

  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      SoundFX.click();
      const nextIndex = (themes.indexOf(currentTheme) + 1) % themes.length;
      applyTheme(themes[nextIndex]);
      showToast(`Switched to ${themes[nextIndex]} mode`);
    });
  }

  // Audio Toggle Button
  const soundToggleBtn = document.getElementById('sound-toggle-btn');
  if (soundToggleBtn) {
    function updateSoundBtnUI() {
      const icon = soundToggleBtn.querySelector('i');
      if (SoundFX.enabled) {
        soundToggleBtn.classList.add('text-sky-400');
        soundToggleBtn.setAttribute('title', 'Audio FX: On');
      } else {
        soundToggleBtn.classList.remove('text-sky-400');
        soundToggleBtn.setAttribute('title', 'Audio FX: Off');
      }
    }

    updateSoundBtnUI();

    soundToggleBtn.addEventListener('click', () => {
      SoundFX.enabled = !SoundFX.enabled;
      localStorage.setItem('sound-fx-enabled', SoundFX.enabled);
      updateSoundBtnUI();
      if (SoundFX.enabled) {
        SoundFX.success();
        showToast('Sound feedback enabled');
      } else {
        showToast('Sound feedback muted');
      }
    });
  }

  // --- 4. Hero Dynamic Typing Effect ---
  const typingElement = document.getElementById('typing-text');
  if (typingElement) {
    const phrases = [
      "Computer Science Engineering Student",
      "Full-Stack Web Developer (React, Next.js, Node)",
      "UI/UX Designer & Wireframe Prototyper",
      "Generative AI & OCR Technology Enthusiast",
      "Innovator behind Medivision"
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 70;

    function typeLoop() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 35;
      } else {
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 75;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 2200; // Pause at end of phrase
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 450;
      }

      setTimeout(typeLoop, typingSpeed);
    }

    typeLoop();
  }

  // --- 5. Render Profile Stats ---
  const statsContainer = document.getElementById('hero-stats-container');
  if (statsContainer && data.profile.stats) {
    statsContainer.innerHTML = data.profile.stats.map(stat => `
      <div class="glass-panel p-4 rounded-xl text-center flex flex-col justify-center border border-slate-700/40">
        <div class="text-2xl sm:text-3xl font-extrabold text-sky-400 tracking-tight font-mono">
          ${stat.prefix || ''}${stat.value}${stat.suffix || ''}
        </div>
        <div class="text-xs sm:text-sm text-slate-400 mt-1 font-medium">${stat.label}</div>
      </div>
    `).join('');
  }

  // --- 6. Render Skills Matrix ---
  const skillsContainer = document.getElementById('skills-grid');
  if (skillsContainer && data.skills) {
    skillsContainer.innerHTML = data.skills.map(group => `
      <div class="glass-panel p-6 rounded-2xl flex flex-col">
        <div class="flex items-center gap-3 mb-5">
          <div class="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
            <i data-lucide="${group.icon}" class="w-5 h-5"></i>
          </div>
          <h3 class="text-lg font-bold text-slate-100">${group.category}</h3>
        </div>
        <div class="space-y-4 flex-1">
          ${group.items.map(item => `
            <div>
              <div class="flex justify-between items-center text-xs mb-1.5">
                <span class="font-medium text-slate-200 flex items-center gap-1.5">
                  ${item.name}
                  <span class="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-sky-300 border border-slate-700/60 font-mono">${item.tag}</span>
                </span>
                <span class="text-slate-400 font-mono">${item.level}%</span>
              </div>
              <div class="h-1.5 w-full bg-slate-800/80 rounded-full overflow-hidden">
                <div class="skill-bar-fill h-full bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full" style="width: ${item.level}%"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  // --- 7. Projects Showcase & Filtering ---
  const projectsGrid = document.getElementById('projects-grid');
  const projectFilters = document.querySelectorAll('.project-filter-btn');

  function renderProjects(filter = 'all') {
    if (!projectsGrid || !data.projects) return;

    const filtered = filter === 'all'
      ? data.projects
      : data.projects.filter(p => p.category === filter);

    projectsGrid.innerHTML = filtered.map(project => `
      <div class="glass-panel rounded-2xl overflow-hidden flex flex-col group hover:-translate-y-1 transition duration-300">
        <div class="relative h-48 sm:h-52 overflow-hidden bg-slate-900 border-b border-slate-800/80">
          <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90 group-hover:opacity-100" loading="lazy">
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
          <div class="absolute top-3 right-3 flex items-center gap-1.5">
            <span class="px-2.5 py-1 text-xs font-mono font-semibold rounded-full bg-slate-900/90 text-sky-300 border border-sky-500/30 backdrop-blur-md">
              ${project.category.toUpperCase()}
            </span>
          </div>
          <div class="absolute bottom-3 left-4 right-4">
            <p class="text-xs font-mono text-emerald-400 font-medium">${project.metrics}</p>
          </div>
        </div>

        <div class="p-6 flex-1 flex flex-col">
          <h3 class="text-xl font-bold text-slate-100 group-hover:text-sky-400 transition-colors">
            ${project.title}
          </h3>
          <p class="text-sm text-slate-400 mt-2.5 line-clamp-3 leading-relaxed flex-1">
            ${project.description}
          </p>

          <div class="flex flex-wrap gap-1.5 mt-4">
            ${project.tags.map(t => `
              <span class="text-[11px] px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/50 font-mono">
                ${t}
              </span>
            `).join('')}
          </div>

          <div class="flex items-center justify-between gap-3 pt-5 mt-5 border-t border-slate-800/60">
            <button class="open-case-study-btn text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1 transition" data-id="${project.id}">
              <span>Architecture & Case Study</span>
              <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
            </button>
            <div class="flex items-center gap-2">
              <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="p-2 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800/80 transition" title="View Source">
                <i data-lucide="github" class="w-4 h-4"></i>
              </a>
              <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="p-2 text-slate-400 hover:text-sky-400 rounded-lg hover:bg-slate-800/80 transition" title="Live Preview">
                <i data-lucide="external-link" class="w-4 h-4"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    lucide.createIcons();
    attachProjectModalListeners();
  }

  projectFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      SoundFX.click();
      projectFilters.forEach(b => {
        b.classList.remove('bg-sky-500', 'text-slate-950', 'active');
        b.classList.add('bg-slate-800/60', 'text-slate-300');
      });
      btn.classList.add('bg-sky-500', 'text-slate-950', 'active');
      btn.classList.remove('bg-slate-800/60', 'text-slate-300');
      renderProjects(btn.dataset.category);
    });
  });

  renderProjects('all');

  // --- 8. Case Study Modal ---
  const modalBackdrop = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('close-modal-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalMetrics = document.getElementById('modal-metrics');
  const modalTags = document.getElementById('modal-tags');
  const modalOverview = document.getElementById('modal-overview');
  const modalChallenge = document.getElementById('modal-challenge');
  const modalSolution = document.getElementById('modal-solution');
  const modalGithubLink = document.getElementById('modal-github-link');
  const modalLiveLink = document.getElementById('modal-live-link');

  function openProjectModal(projectId) {
    const project = data.projects.find(p => p.id === projectId);
    if (!project || !modalBackdrop) return;

    modalTitle.textContent = project.title;
    modalMetrics.textContent = project.metrics;
    modalOverview.textContent = project.overview || project.description;
    modalChallenge.textContent = project.challenge || "Engineering at high scale with low overhead.";
    modalSolution.textContent = project.solution || "Leveraging modern architectural paradigms and zero-copy protocols.";

    modalTags.innerHTML = project.tags.map(tag => `
      <span class="text-xs px-2.5 py-1 rounded bg-slate-800 text-sky-300 border border-slate-700/80 font-mono">${tag}</span>
    `).join('');

    modalGithubLink.href = project.githubUrl;
    modalLiveLink.href = project.liveUrl;

    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
    SoundFX.pop();
    lucide.createIcons();
  }

  function closeProjectModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
    SoundFX.click();
  }

  function attachProjectModalListeners() {
    document.querySelectorAll('.open-case-study-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openProjectModal(btn.dataset.id);
      });
    });
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeProjectModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
      closeCommandPalette();
    }
  });

  // --- 9. Experience Timeline ---
  const experienceContainer = document.getElementById('experience-timeline');
  if (experienceContainer && data.experience) {
    experienceContainer.innerHTML = data.experience.map((exp, index) => `
      <div class="relative pl-8 pb-10 border-l border-slate-800 last:border-l-transparent last:pb-0">
        <div class="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-slate-900 border-2 border-sky-400 flex items-center justify-center">
          <div class="w-1.5 h-1.5 rounded-full bg-sky-400"></div>
        </div>
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
          <h4 class="text-lg font-bold text-slate-100">${exp.role} <span class="text-sky-400">@ ${exp.company}</span></h4>
          <span class="text-xs font-mono text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/60 w-fit">${exp.period}</span>
        </div>
        <p class="text-xs text-slate-400 mb-3">${exp.location}</p>
        <p class="text-sm text-slate-300 leading-relaxed mb-4">${exp.description}</p>
        <ul class="space-y-2">
          ${exp.highlights.map(h => `
            <li class="text-xs sm:text-sm text-slate-400 flex items-start gap-2.5">
              <span class="text-sky-400 mt-1">▹</span>
              <span>${h}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    `).join('');
  }

  // --- 10. Testimonials Carousel / Grid ---
  const testimonialsContainer = document.getElementById('testimonials-grid');
  if (testimonialsContainer && data.testimonials) {
    testimonialsContainer.innerHTML = data.testimonials.map(t => `
      <div class="glass-panel p-6 rounded-2xl flex flex-col justify-between">
        <p class="text-slate-300 text-sm leading-relaxed italic mb-6">
          "${t.text}"
        </p>
        <div class="flex items-center gap-3 pt-4 border-t border-slate-800/60">
          <img src="${t.avatar}" alt="${t.name}" class="w-11 h-11 rounded-full object-cover border border-slate-700" loading="lazy">
          <div>
            <h5 class="text-sm font-bold text-slate-100">${t.name}</h5>
            <p class="text-xs text-sky-400">${t.role}</p>
          </div>
        </div>
      </div>
    `).join('');
  }

  // --- 11. Interactive Terminal CLI ---
  const terminalInput = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');
  let commandHistory = [];
  let historyIdx = -1;

  const terminalCommands = {
    help: () => `
<span class="text-sky-400 font-bold">AVAILABLE COMMANDS:</span>
  <span class="text-emerald-400">about</span>      - Professional summary & background
  <span class="text-emerald-400">skills</span>     - Categorized skills & competencies
  <span class="text-emerald-400">projects</span>   - List featured projects & repositories
  <span class="text-emerald-400">medivision</span> - Flagship AI patient case-taking project concept
  <span class="text-emerald-400">education</span>  - Academic degree & core coursework
  <span class="text-emerald-400">theme &lt;name&gt;</span>- Change theme ('dark', 'light', 'cyber')
  <span class="text-emerald-400">sound &lt;on/off&gt;</span>- Toggle UI audio synthesis
  <span class="text-emerald-400">contact</span>    - Show LinkedIn, GitHub & direct email
  <span class="text-emerald-400">sudo hire</span>  - Fast-track internship / role inquiry
  <span class="text-emerald-400">clear</span>      - Clear terminal logs
`,
    about: () => `
<span class="text-sky-300 font-semibold">${data.profile.name}</span> — ${data.profile.title}
${data.profile.bio}
<span class="text-slate-400">Location:</span> ${data.profile.location}
<span class="text-slate-400">Status:</span> ${data.profile.status}
`,
    skills: () => {
      let out = `<span class="text-sky-400 font-bold">TECHNICAL SKILLS OVERVIEW:</span>\n`;
      data.skills.forEach(g => {
        out += `\n<span class="text-slate-200 font-semibold">[${g.category}]</span>\n`;
        out += g.items.map(i => `  • ${i.name.padEnd(26)} ${'█'.repeat(Math.round(i.level / 10))}${'░'.repeat(10 - Math.round(i.level / 10))} ${i.level}%`).join('\n');
      });
      return out;
    },
    projects: () => {
      let out = `<span class="text-sky-400 font-bold">KEY INNOVATION PROJECTS:</span>\n`;
      data.projects.forEach(p => {
        out += `\n⚡ <span class="text-emerald-300 font-semibold">${p.title}</span>\n   ${p.description}\n   <span class="text-slate-400 font-mono">${p.metrics}</span>\n`;
      });
      return out;
    },
    medivision: () => `
<span class="text-emerald-400 font-bold">MEDIVISION — PATIENT CASE-TAKING SOFTWARE CONCEPT</span>
  • Simplifies patient intake through multilingual regional voice input.
  • Intelligent OCR document & prescription extraction.
  • AI-assisted structured clinical summaries for doctors.
  • Intuitive doctor review dashboards & offline synchronization.
`,
    education: () => `
<span class="text-sky-400 font-bold">EDUCATION & COURSEWORK:</span>
  Degree: Bachelor of Technology in Computer Science & Engineering
  Focus: Core algorithmic problem solving, software engineering, UI/UX & AI
  Coursework: DSA, OOP (C++/Java), DBMS, OS, Computer Networks, Web Technologies
`,
    experience: () => {
      let out = `<span class="text-sky-400 font-bold">PROJECT & INITIATIVE HISTORY:</span>\n`;
      data.experience.forEach(e => {
        out += `\n💼 <span class="text-slate-100 font-bold">${e.role}</span> @ <span class="text-sky-300">${e.company}</span> (${e.period})\n   ${e.description}\n`;
      });
      return out;
    },
    contact: () => `
<span class="text-sky-400 font-bold">DIRECT COMMUNICATIONS:</span>
  LinkedIn: <a href="${data.profile.socials.linkedin}" target="_blank" class="text-sky-300 underline">${data.profile.socials.linkedin}</a>
  GitHub:   <a href="${data.profile.socials.github}" target="_blank" class="text-sky-300 underline">${data.profile.socials.github}</a>
  Email:    <a href="mailto:${data.profile.socials.email}" class="text-sky-300 underline">${data.profile.socials.email}</a>
`,
    theme: (args) => {
      const mode = args[0] ? args[0].toLowerCase() : '';
      if (['dark', 'light', 'cyber'].includes(mode)) {
        applyTheme(mode);
        return `Theme switched to <span class="text-emerald-400 font-bold">${mode}</span>.`;
      }
      return `Usage: <span class="text-amber-400">theme [dark | light | cyber]</span>`;
    },
    sound: (args) => {
      const state = args[0] ? args[0].toLowerCase() : '';
      if (state === 'on') {
        SoundFX.enabled = true;
        localStorage.setItem('sound-fx-enabled', true);
        return `Audio synthesis <span class="text-emerald-400">ENABLED</span>.`;
      } else if (state === 'off') {
        SoundFX.enabled = false;
        localStorage.setItem('sound-fx-enabled', false);
        return `Audio synthesis <span class="text-amber-400">MUTED</span>.`;
      }
      return `Usage: <span class="text-amber-400">sound [on | off]</span>`;
    },
    'sudo hire': () => {
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
          const messageInput = document.getElementById('contact-message');
          if (messageInput) {
            messageInput.value = "Hi Mohd Jeshan, I reviewed your portfolio and Medivision concept. We'd love to connect regarding an internship / software engineer opportunity!";
            messageInput.focus();
          }
        }
      }, 400);
      return `<span class="text-emerald-400 font-bold">ACCESS GRANTED.</span> Forwarding to consultation briefing for Mohd Jeshan...`;
    },
    clear: () => {
      if (terminalOutput) terminalOutput.innerHTML = '';
      return '';
    }
  };

  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      SoundFX.terminalKey();

      if (e.key === 'Enter') {
        const fullCmd = terminalInput.value.trim();
        if (!fullCmd) return;

        commandHistory.push(fullCmd);
        historyIdx = commandHistory.length;

        // Print input line
        const cmdEcho = document.createElement('div');
        cmdEcho.className = 'mt-2 text-slate-300 flex items-center gap-2';
        cmdEcho.innerHTML = `<span class="text-emerald-400 font-mono font-bold">$</span> <span>${fullCmd}</span>`;
        terminalOutput.appendChild(cmdEcho);

        const [baseCmd, ...args] = fullCmd.split(' ');
        const lookup = baseCmd.toLowerCase();
        let result = '';

        if (terminalCommands[fullCmd.toLowerCase()]) {
          result = terminalCommands[fullCmd.toLowerCase()](args);
        } else if (terminalCommands[lookup]) {
          result = terminalCommands[lookup](args);
        } else {
          result = `<span class="text-rose-400">zsh: command not found: ${baseCmd}</span>. Type <span class="text-sky-400">help</span> for valid commands.`;
        }

        if (result && lookup !== 'clear') {
          const resEl = document.createElement('div');
          resEl.className = 'text-slate-300 whitespace-pre-wrap leading-relaxed text-xs sm:text-sm mt-1';
          resEl.innerHTML = result;
          terminalOutput.appendChild(resEl);
        }

        terminalInput.value = '';
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
      } else if (e.key === 'ArrowUp') {
        if (historyIdx > 0) {
          historyIdx--;
          terminalInput.value = commandHistory[historyIdx];
        }
      } else if (e.key === 'ArrowDown') {
        if (historyIdx < commandHistory.length - 1) {
          historyIdx++;
          terminalInput.value = commandHistory[historyIdx];
        } else {
          historyIdx = commandHistory.length;
          terminalInput.value = '';
        }
      }
    });
  }

  // Quick terminal helper buttons (pill clicks)
  document.querySelectorAll('.term-quick-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.dataset.cmd;
      if (terminalInput) {
        terminalInput.value = cmd;
        terminalInput.focus();
        terminalInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      }
    });
  });

  // --- 12. Contact Form & Clipboard Copy ---
  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(data.profile.socials.email).then(() => {
        showToast('Email copied to clipboard!', 'success');
        SoundFX.success();
      }).catch(() => {
        showToast(`Email: ${data.profile.socials.email}`);
      });
    });
  }

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalHTML = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg> Sending Transmission...
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalHTML;
        contactForm.reset();
        SoundFX.success();
        showToast('Message sent! I will respond within 24 hours.', 'success');
      }, 1000);
    });
  }

  // --- 13. Command Palette (Cmd + K / Ctrl + K) ---
  const cmdPalette = document.getElementById('command-palette');
  const cmdSearchInput = document.getElementById('cmd-search-input');

  function openCommandPalette() {
    if (!cmdPalette) return;
    cmdPalette.classList.add('active');
    document.body.style.overflow = 'hidden';
    SoundFX.pop();
    setTimeout(() => {
      if (cmdSearchInput) cmdSearchInput.focus();
    }, 50);
  }

  function closeCommandPalette() {
    if (!cmdPalette) return;
    cmdPalette.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (cmdPalette.classList.contains('active')) {
        closeCommandPalette();
      } else {
        openCommandPalette();
      }
    }
  });

  document.querySelectorAll('.open-cmd-palette-btn').forEach(btn => {
    btn.addEventListener('click', openCommandPalette);
  });

  if (cmdPalette) {
    cmdPalette.addEventListener('click', (e) => {
      if (e.target === cmdPalette) closeCommandPalette();
    });
  }

  document.querySelectorAll('.cmd-palette-item').forEach(item => {
    item.addEventListener('click', () => {
      closeCommandPalette();
      const action = item.dataset.action;
      if (action.startsWith('#')) {
        const el = document.querySelector(action);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (action.startsWith('theme:')) {
        applyTheme(action.split(':')[1]);
      }
    });
  });

  // --- 14. Mobile Menu Drawer ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');
  if (mobileMenuBtn && mobileMenuDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      SoundFX.click();
      mobileMenuDrawer.classList.toggle('hidden');
    });

    mobileMenuDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuDrawer.classList.add('hidden');
      });
    });
  }

  // Initialize Lucide icons
  lucide.createIcons();
});
