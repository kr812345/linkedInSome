# ⚡ LINKROAST

> **Is your LinkedIn bringing you clients?**

LinkRoast is a free, no-login roast for founders and business owners. Upload a LinkedIn profile screenshot, or up to five recent posts, and Gemini scores whether the content would attract clients. A short teaser is free. Name and email unlock the full roast and the rewrites. The last block on every roast offers a call for a free sample post (Founder Content Engine). No price is shown on the site.

---

## ✨ Core Features

- **🔥 Profile roast:** Upload a profile screenshot. Score plus notes on headline, about, proof, and whether a buyer would book.
- **📝 Posts roast:** Upload up to five post screenshots and/or paste the text. Scored on hook, who you help, clarity, consistency, proof, CTA, and client attraction, with paste-ready rewrites.
- **✉️ Email gate:** The response shows the score and the top two notes. Name, email, and a consent line unlock the rest. No account.
- **📅 Call offer:** Every full roast ends with a booking link for a free sample post.
- **✨ The Refine step:** Upload a resume and who you want as clients. Still available at `/userNiche`.
- **🖼️ Before & After:** Visual comparison of profile transformations to demonstrate immediate value.
- **📋 Smart Copy:** One-click copy for all generated headlines, bios, and posts with instant clipboard feedback.
- **💎 Premium Aesthetic:** A meticulously crafted dark-mode interface with glassmorphic depth, synchronized GSAP motion, and precision typography.

---

## 🛠️ Technical Architecture

Custom-built for speed and precision, using a decoupled Next.js frontend and Express API architecture.

| Layer | Technology |
| :--- | :--- |
| **Frontend** | Next.js 15 (App Router), React 19 |
| **Backend API** | Express.js (Node.js) |
| **Database/Cache** | Redis (Upstash) - High-speed caching |
| **Asset Storage** | Cloudinary - Secure image processing |
| **Styling & UI** | Tailwind CSS, Lucide Icons, Glassmorphism |
| **Animation & Motion** | GSAP, Framer Motion |
| **AI Intelligence** | Google Gemini 2.0 Flash (Vision), OpenAI |
| **File Processing** | Multer, Sharp (Image Optimization), UnPDF |

---

## 🚀 Getting Started

Follow these steps to set up and run the LinkRoast application locally.

### Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/en/) (v18 or higher)
- [pnpm](https://pnpm.io/) (Package manager)
- [Redis](https://redis.io/) (Local or Cloud instance)

### Installation

1. **Clone the repository and install dependencies:**
   ```bash
   pnpm install
   ```

2. **Configure Environment Variables:**
   Create a `.env` or `.env.prod` for the Express API (loaded from the repo root) and `.env.local` for the Next.js app.

   ```env
   # Server
   PORT=5000
   CORS_ORIGIN=http://localhost:3000
   REDIS_URL=rediss://default:your_password@your_endpoint.upstash.io:6379

   # AI
   GEMINI_API_KEY=your_gemini_api_key_here

   # Optional. When set, new roast leads are also POSTed here (existing Make.com hook).
   WEBHOOK_URL=

   # Optional. Defaults to backend/data/leads.jsonl (gitignored).
   LEADS_FILE=

   # Local testing only. Serves a fixed roast and skips Gemini. Never set this in production.
   MOCK_LLM=false
   ```

   ```env
   # .env.local (Next.js — exposed to the browser)
   NEXT_PUBLIC_SERVER_URL=http://localhost:5000

   # Where "Book a call" goes. Any https booking link.
   # If unset, the button opens mailto:krishnay812345@gmail.com
   # with the subject "Free sample post — Founder Content Engine".
   NEXT_PUBLIC_BOOKING_URL=
   ```

   `NEXT_PUBLIC_*` values are inlined at build time. Set them in the Vercel project before building the frontend.

### Leads

Unlocking a roast stores `{ name, email, consent, mode, score, roastId, createdAt }`. The roast text itself is not stored on the lead.

- **File:** `backend/data/leads.jsonl` (one JSON object per line). This is the durable log on a long-running host such as Railway. Override the path with `LEADS_FILE`.
- **Redis:** the same record is appended to the list `leads:unlock` when `REDIS_URL` connects. Read it with `LRANGE leads:unlock 0 -1`.
- **Webhook:** if `WEBHOOK_URL` is set, the lead is also POSTed there. A webhook failure does not block the unlock.

The full roast is cached in memory and, when Redis is up, at `roast:session:<id>` for 30 minutes so the email gate can reveal it. Screenshots are deleted as soon as the request finishes.

3. **Launch the Development Servers:**
   ```bash
   pnpm run dev
   ```

---

## 🚀 Deployment Strategy

For production, we use a **Multi-Cloud Hybrid** approach to ensure high performance and bypass AI generation timeouts.

*   **Frontend (Vercel):** Optimized for Next.js hosting, Edge functions, and SEO.
*   **Backend (Railway):** Used for the Express API to handle long-running Gemini AI requests (15s+) without the strict 10s timeout limits of Vercel Hobby.
*   **Redis (Upstash):** Serverless Redis for global, low-latency caching of AI responses.

---

## 📡 API Reference

The backend exposes a REST API powered by Express.js.

### 1. Profile roast
- **Endpoint:** `POST /v1/api/roast`
- **Payload:** `file` (one image)
- **Response:** `{ roastId, mode: "profile", teaser: { score, verdict, highlights, lockedCount } }`
- The full roast is not in this response.

### 2. Posts roast
- **Endpoint:** `POST /v1/api/roast-posts`
- **Payload:** `files` (up to 5 images) and/or `postsText`
- **Response:** same teaser shape, `mode: "posts"`

### 3. Unlock
- **Endpoint:** `POST /v1/api/unlock`
- **JSON body:** `{ roastId, name, email, consent: true }`
- **Response:** the full roast (`sections`, `rewrites`, score, highlights) and a stored lead.

### 4. The refine endpoint
- **Endpoint:** `POST /v1/api/improve`
- **Payload:** `resume` (PDF), `goal` (string), `model`
- **Response:** headline, about, and post drafts. This path is not email-gated.

Run the gate tests without a Gemini key:

```bash
pnpm test:roast
```

---

## 🎨 Design Philosophy

LinkRoast adheres to a minimalist, technical aesthetic.

- **Technical Luxury:** A dark-mode primary interface with glassmorphic depth.
- **Synchronized Motion:** GSAP-driven entrance sequences.
- **Precision Typography:** Modern sans-serif fonts optimized for technical legibility.

---

<div align="center">
  <p><b>DEVELOPED BY KRISHNA YADAV</b></p>
  <p>© 2026 LINKROAST. ALL RIGHTS RESERVED.</p>
</div>
