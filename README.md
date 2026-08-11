# PassGen Live 🔑

[![Live Demo](https://img.shields.io/badge/Live_Demo-passgen4live.netlify.app-00C7B7?style=flat&logo=netlify)](https://passgen4live.netlify.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A lightweight, secure web application for generating customizable, cryptographically strong passwords on the fly. 

🌐 **Live URL:** [https://passgen4live.netlify.app](https://passgen4live.netlify.app)

---

## 🚀 Features

- **Web Crypto Security:** Generates passwords client-side using the native `crypto.getRandomValues` API for high entropy and unpredictability.
- **Dynamic Date Logic:** Supports date-based dynamic password rules (e.g., incorporating the current day of the month like `9` for `8/9/2026`).
- **Custom Character Sets:** Enable or disable uppercase, lowercase, numbers, and special symbols.
- **One-Click Copy:** Fast clipboard export with visual status feedback.
- **Zero Data Retention:** Runs 100% in the browser—no passwords or data are ever sent to a server.

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3 / Tailwind CSS, JavaScript (ES6+)
- **Security:** Native Web Crypto API
- **Deployment & Hosting:** [Netlify](https://www.netlify.com/)

---

## 🏁 Quick Start

### Live Usage
Simply open [https://passgen4live.netlify.app](https://passgen4live.netlify.app) in any modern browser.

### Local Development

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/passgen4live.git](https://github.com/your-username/passgen4live.git)
   cd passgen4live

 * Install dependencies:
   npm install

 * Run local server:
   npm run dev

⚙️ How Date Rules Work
When enabled, the generator factors in the current day of the month as part of the password configuration:
 * Date format reference: MM/DD/YYYY
 * Extracted token: DD (e.g., if today is 8/9/2026, the date token used is 9).
☁️ Deployment (Netlify)
This project is configured for continuous deployment on Netlify:
 * Build command: npm run build
 * Publish directory: dist (or root / for vanilla static sites)
📄 License
Distributed under the MIT License. See LICENSE for details.
