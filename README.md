# Password Generator

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Build Status](https://img.shields.io/github/actions/workflow/status/username/password-generator/ci.yml?branch=main)](https://github.com/username/password-generator/actions)

A lightweight, secure password generator application designed to create customized, deterministic, and cryptographically secure credentials. Includes configurable character rules, strength entropy calculation, and optional date-based dynamic logic (such as day-of-month seed rules).

---

## 🚀 Key Features

- **Custom Character Sets:** Enable or disable uppercase, lowercase, numbers, and special symbols on demand.
- **Dynamic Rule Engines:** Optional logic for dynamic passcode parameters (e.g., using the numeric day of the month as a dynamic password token).
- **Cryptographically Secure:** Powered by native browser Web Crypto API (`crypto.getRandomValues`) for unpredictability.
- **Real-Time Entropy Meter:** Live visual feedback on password strength and time-to-crack estimates.
- **One-Click Copy:** Fast clipboard export with auto-clearing functionality for safety.

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3 / Tailwind CSS, JavaScript (ES6+) / TypeScript
- **Security:** Native Web Crypto API
- **Tooling:** Vite / Node.js
- **Hosting:** GitHub Pages / Vercel

---

## 🏁 Quick Start

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- [Node.js](https://nodejs.org/) `>= 18.0.0` (for local development)

### Setup & Run

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/password-generator.git](https://github.com/your-username/password-generator.git)
   cd password-generator
