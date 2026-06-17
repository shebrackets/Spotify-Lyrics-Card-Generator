# 🎵 Spotify Lyrics Card Generator

A lightweight, modern web application built with native HTML, CSS, and JavaScript that allows users to create, customize, and export personalized music lyric cards inspired by Spotify's design.

## ✨ Features

- **Infinite Customization:** Change the background color, song title, artist names, and lyrics in real time.
- **Local Image Upload:** Upload any static cover art (`.png`, `.jpg`, `.jpeg`, `.webp`) instantly from your device.
- **Smart Validation:** The export button unlocks *only* when all fields are properly filled and a valid cover image is provided.
- **Safety Constraints:** - Strictly rejects animated `.gif` files to prevent rendering issues.
  - Automatically locks text input at **220 characters** to ensure lyrics never overflow and perfectly fit the card boundaries.
  - Keeps the `"Title • "` prefix fixed and unalterable for that authentic Spotify look.
- **High-Quality Export:** Downloads the generated card as a crisp, high-resolution PNG image using `html2canvas`.

---

## 🚀 Live Preview & Look

The interface is split into a clean dual-column layout:
- **Left Side:** Real-time visual card preview with fallback placeholders for missing data or images.
- **Right Side:** User-friendly control panel featuring custom-styled buttons and character counters.

---

## 🛠️ Tech Stack

- **HTML5:** Semantic structure.
- **CSS3:** Modern flexbox layout, custom styling, native color-picker integration, and responsive design.
- **JavaScript (ES6):** Real-time DOM manipulation, file API reader handling, validation logic, and event listeners.
- **External Dependency:** [html2canvas (v1.4.1)](https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js) via CDN for rendering HTML elements into a downloadable image.

---

## 📁 Project Structure

```text
├── index.html       # The main entry point containing the DOM structure
├── style.css        # The UI styling, layout rules, and responsiveness
└── script.js        # Core logic: validation, safety checks, and image export