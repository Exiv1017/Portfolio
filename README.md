# Hanz Hendrick Lacsi — Portfolio

Your portfolio’s cover letter. This repo hosts a modern one-page site that introduces who you are, what you’ve built, and how to reach you.

Live demo (GitHub Pages): https://exiv1017.github.io/Portfolio/

## About
IT student at Laguna State Polytechnic University, majoring in Network Administration. Interests include network security and intrusion detection, Linux administration, and cloud platforms. Open to Internship/OJT (Cloud), on-site or hybrid. Locations: Laguna • Manila.

## Highlights
- Clean one-page UX with sticky header and smooth scrolling
- Professional green theme with subtle decorative shapes (blobs, dots, rings, lines)
- Responsive grids and cards with hover accents
- Project carousels (landscape + portrait) with arrows and dots
- PulseSentry split layout (media + description side-by-side on desktop)
- Contact form powered by FormSubmit (AJAX, honeypot, status messages, graceful fallback)
- Downloadable Resume and CV buttons
- Social links: Facebook, Instagram, GitHub, LinkedIn

## Projects (quick tour)
- NIDStoKnow — Network Intrusion Detection System learning/simulation platform using a Cowrie honeypot; safe, hands-on exploration of real-world attack patterns.
- NetMasteryHub — Web-based interactive learning modules and scenarios for Network Administration topics.
- PulseSentry — IoT-based silent alarm smartwatch for hearing‑impaired users; vibration alerts, quick messaging, and real-time location tracking.

## Skills
- Networking: TCP/IP, Routing & Switching, VLANs, Subnetting, OSPF, DHCP/DNS, Wireshark
- Programming: Python, C#, Bash
- Web: HTML, CSS, JavaScript, Responsive Design
- Tools: Packet Tracer, Linux, Git, VS Code, Figma

## Certifications
- DICT — Cyber 101 (PDF included)
- DICT — Cyber Tools (PDF included)
- DICT — Data Privacy Awareness (PDF included)
- EC‑Council — SQL Injection Attacks (image included)

## Repository structure
- `index.html` — Page content and sections (Home, About, Projects, Skills, Certifications, Contact)
- `styles.css` — Theme, layout, and decorative backgrounds
- `script.js` — Smooth scrolling, active nav, carousels, and FormSubmit handling
- `Image/` — Project and profile images
- `LicensesandCertifications/` — Certificates (PDF/JPG)
- `Resume-Lacsi.pdf`, `CV-Lacsi.pdf` — Downloadable documents

## Run locally
Open `index.html` directly, or serve it for a cleaner dev experience.

Windows (PowerShell):
```powershell
# If you have Python installed
python -m http.server 5500
# Then open http://localhost:5500/
```

## Customize
- Edit text/content in `index.html` (About, Projects, Skills, Certifications, Contact).
- Colors/spacing/components in `styles.css`.
- Behavior (carousels, form) in `script.js`.
- Replace `Resume-Lacsi.pdf` and/or `CV-Lacsi.pdf` to update downloads (keep filenames or update the hrefs in `index.html`).

## Contact
Email: hanzlacsi@gmail.com

The contact form sends via FormSubmit. On first submission, confirm the activation email from FormSubmit to start receiving messages.
