# 🚀 Coding Club CUH

> The official digital ecosystem for CUH Coding Club — built for students, by students.

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Payload CMS](https://img.shields.io/badge/Payload_CMS-3.56-black?style=for-the-badge&logo=payloadcms)](https://payloadcms.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

---

## 📸 Visual Preview

<div align="center">
  <img src="public/ccc_logo.png" alt="Coding Club Platform Preview" width="800px" style="border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.15);" />
  <p><em>Coding Club student hub, events portal, and dynamic CMS platform.</em></p>
</div>

---

## ✨ Features

- **Headless CMS Engine**: Full content control powered by Payload CMS 3.x.
- **Certificate Verification**: Instant QR-code validation with client-side PDF export.
- **Events & Hackathons**: Complete management for club events, workshops, and registrations.
- **Student Project Showcase**: Community directory highlighting student projects and achievements.
- **Live Preview Editing**: Multi-device breakpoint preview in the admin dashboard.
- **Telegram Bot Alerts**: Automated event notifications via Telegraf integration.
- **Fluid Motion & Theming**: Dark/Light mode with silky Framer Motion animations.
- **SEO & Performance Ready**: Dynamic OpenGraph images and automated sitemap generation.

---

## 🚀 Quick Start / Installation

### Prerequisites

Ensure you have the following installed locally:
- **Node.js**: `v20.x` or later
- **Package Manager**: `pnpm` (recommended), `npm`, or `yarn`

### Step-by-Step Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/itsmeaj27/codingclub.git
   cd codingclub
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```

   | Variable | Description | Example / Default |
   | :--- | :--- | :--- |
   | `DATABASE_URI` | Database connection string | `file:payload.db` |
   | `PAYLOAD_SECRET` | Encryption secret for auth | `your-secure-payload-secret` |
   | `NEXT_PUBLIC_SERVER_URL` | Base application URL | `http://localhost:3001` |
   | `TELEGRAM_BOT_TOKEN` | Bot token for alerts *(Optional)* | `your-telegram-bot-token` |
   | `TELEGRAM_CHAT_ID` | Telegram channel ID *(Optional)* | `your-telegram-chat-id` |

4. **Generate types & import map**
   ```bash
   pnpm run generate
   ```

5. **Run the development server**
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3001](http://localhost:3001) in your browser.

---

## 🛠️ Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Framework** | Next.js 15 (App Router), React 19 |
| **Language** | TypeScript 5.7 |
| **CMS & API** | Payload CMS 3.56, GraphQL, REST |
| **Styling** | Tailwind CSS v4, Radix UI Primitives, Lucide Icons |
| **Animations** | Framer Motion, Magic UI Components |
| **Database** | SQLite (`@payloadcms/db-sqlite`) / PostgreSQL support |
| **Utilities** | jsPDF, html2canvas, qrcode.react, Telegraf, Next-Sitemap |
| **Testing** | Vitest, Playwright |

---

## 📖 Usage Examples

### Access the Admin Dashboard
Create your first admin account to manage collections and content:
```text
http://localhost:3001/admin
```

### Verify a Certificate
Validate authenticity and inspect verified recipient credentials:
```text
http://localhost:3001/verify/<CERTIFICATE_ID>
```

### Common CLI Tasks
```bash
# Execute unit & end-to-end tests
pnpm test

# Build production bundle & sitemaps
pnpm build

# Start production server
pnpm start
```

---

## 🤝 Contributing

Contributions are always welcome!

1. Fork the Project.
2. Create a Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'feat: add AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the **MIT License**. See the `LICENSE` file for details.
