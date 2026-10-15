# 🚀 Next-Gen Developer & Systems Architect Portfolio

An ultra-modern, responsive, high-performance personal portfolio designed for senior software engineers, systems architects, and creative technologists.

Built with **HTML5, Tailwind CSS, Lucide Icons, and Vanilla JavaScript** — zero build step required, zero external npm package dependencies, and 100% compatible with double-clicking `index.html` to run locally.

---

## ✨ Features

- **⚡ Instant 60 FPS Canvas Background**: Interactive particle constellation mesh reacting to cursor velocity and theme toggling.
- **💻 Embedded Interactive CLI Terminal**:
  - Functional terminal supporting `help`, `about`, `skills`, `projects`, `experience`, `theme <name>`, `sudo hire`, and `clear`.
  - Command history navigation with `Up` and `Down` arrow keys.
- **🎨 Triple Theme Switcher**:
  - **Modern Slate Dark** (Default)
  - **Clean Crisp Light**
  - **Cyber Matrix / OLED Green**
  - Persistent theme memory in `localStorage`.
- **🔊 Zero-Dependency Web Audio Synthesizer**: Subtle, elegant micro-sound feedback for button clicks, terminal typing, and success messages using native browser `AudioContext`.
- **⌨️ Command Palette (`Cmd+K` / `Ctrl+K`)**: Rapid keyboard-first navigation dialog.
- **📂 Interactive Project Showcase with Case Studies**:
  - Filterable by Category (`All`, `AI / Agents`, `Distributed Systems`, `UI & Systems`, `Full-Stack`).
  - Architectural deep-dive modal displaying overview, challenges, solutions, and live links.
- **📊 Dynamic Skill Matrix**: Visual proficiency progress bars and stack category breakdown.
- **📱 Fully Mobile Responsive**: Seamlessly adapts to smartphones, tablets, and widescreen desktop monitors.
- **🔔 Toast Notification System**: Animated feedback for contact form actions and clipboard copies.

---

## 🛠️ How to Open & Run

### Method 1: Instant Local Preview (Zero Install)
Simply double-click the `index.html` file or open it in any web browser (Chrome, Edge, Firefox, Safari):
```powershell
# Open directly in Windows default browser
Start-Process "C:\Users\Sk Computer\.gemini\antigravity\scratch\modern-portfolio\index.html"
```

### Method 2: Local HTTP Server (Optional)
If you prefer running a local development server, you can use any static server or VS Code's "Live Server" extension.

---

## ✏️ How to Customize with Your Own Information

All content (name, biography, projects, skills, social links, and experience) is cleanly isolated in **`assets/js/data.js`**. You don't need to sift through HTML to change your information!

1. Open `assets/js/data.js` in your favorite editor.
2. Edit the `profile` object:
   ```javascript
   profile: {
     name: "Your Name",
     handle: "@yourhandle",
     title: "Your Professional Title",
     tagline: "Your mission statement",
     bio: "A short story of your experience...",
     location: "City, Country",
     socials: {
       github: "https://github.com/yourusername",
       linkedin: "https://linkedin.com/in/yourusername",
       twitter: "https://twitter.com/yourusername",
       email: "your.email@example.com"
     }
   }
   ```
3. Update `projects`, `skills`, and `experience` arrays to match your achievements.
4. Save the file and refresh `index.html`!

---

## 🌐 Free 1-Click Deployment

You can deploy this portfolio to the internet in under 60 seconds completely free:

### Option A: GitHub Pages
1. Push this folder to a GitHub repository.
2. Go to **Settings > Pages**.
3. Under **Branch**, select `main` and root `/`, then click **Save**.
4. Your site will be live at `https://<username>.github.io/<repo-name>`.

### Option B: Netlify / Vercel Drop
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop the `modern-portfolio` folder into the browser.
3. Your portfolio goes live instantly with an HTTPS domain.
