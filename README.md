# ⚡ LINKROAST

> **Intelligent LinkedIn Optimization Platform**

LinkRoast is a high-performance optimization engine designed to elevate your professional presence. Powered by direct AI integrations, it provides deep critical analysis and strategic refinements to transform standard LinkedIn profiles into high-converting, standout professional identities. Built with a focus on precision, actionable feedback, and a premium "technical luxury" experience.

---

## ✨ Core Features

- **🔥 The Roast (Critical Analysis):** Upload a screenshot of your profile and get a ruthless analysis. Identifies superficial language, generic positioning, and structural weaknesses.
- **✨ The Refine (Strategic Enhancement):** Upload your resume and specific career goals. Reconstructs your identity using high-impact, ATS-optimized terminology.
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
   Create a `.env.prod` (for backend) and `.env.local` (for frontend) with the following:
   
   ```env
   # Server Configuration
   PORT=5000
   CORS_ORIGIN=http://localhost:3000
   REDIS_URL=rediss://default:your_password@your_endpoint.upstash.io:6379
   
   # Cloudinary (Asset Storage)
   CLOUDINARY_URL=your_cloudinary_url
   
   # AI Provider Keys
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

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

### 1. The Roast Endpoint
Analyzes a LinkedIn profile screenshot using Gemini Vision.

- **Endpoint:** `POST /v1/api/roast`
- **Payload:** `file` (Image)
- **Response:** Structured JSON containing roast feedback.

### 2. The Refine Endpoint
Improves a professional profile using a resume PDF and goals.

- **Endpoint:** `POST /v1/api/improve`
- **Payload:** `resume` (PDF), `goal` (String)
- **Response:** ATS-optimized Headlines, Bios, and Featured Posts.

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
