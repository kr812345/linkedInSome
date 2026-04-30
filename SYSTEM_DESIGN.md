# Landing Page System Design: LinkRoast

LinkRoast is a high-performance profile optimization engine with a "Technical Luxury" aesthetic. The landing page is designed to convert professional visitors through strategic analysis and high-impact visual storytelling.

## 1. Architectural Overview
The landing page is built using **Next.js 15 (App Router)** with a focus on client-side interactivity and performance.

| Layer | Technology | Responsibility |
| :--- | :--- | :--- |
| **Framework** | Next.js 15 | Routing, SEO, and Server-Side Rendering (SSR). |
| **Styling** | Tailwind CSS | Utility-first styling with high-contrast design tokens. |
| **Motion/Animation** | GSAP & Framer Motion | Scroll-triggered reveals, infinite marquees, and transitions. |
| **State Management** | React Hooks | Local UI state and form controls. |
| **Feedback Loop** | Sonner | Real-time user notifications. |

---

## 2. Visual Identity & Design System
The "Technical Luxury" philosophy is implemented through a specific set of design tokens defined in `globals.css` and `tailwind.config.ts`.

### Color Palette
- **Base Background**: `#050505` (Deep Onyx)
- **Primary Accent**: `#ff2f00` (Electric Orange/Red)
- **Text Primary**: `#263238` (Dark Charcoal - used in light contexts or specific components)
- **Text Muted**: `#90A4AE` (Blue-tinted Grey)
- **Glassmorphism**: Backdrop blur with orange-tinted borders for navigation and cards.

### Typography
- **Primary Font**: `Inter` (San-serif) used for technical legibility.
- **Heading Font**: Serif-style fonts (e.g., `font-serif` in Hero) for a premium, authoritative feel.
- **Attributes**: High weight (700+) for headings, low letter-spacing for professional impact.

---

## 3. Component Hierarchy
The landing page (`app/page.tsx`) follows a sequential storytelling structure:

1.  **Navbar**: Fixed glassmorphic navigation with a rounded-full design.
2.  **Hero Section**:
    *   **Visuals**: Multi-layered SVG sunrays and graphic backgrounds (`bg_sun.svg`).
    *   **Hooks**: "Get Roasted" CTA and "Waiting List" integration.
3.  **Critical Analysis (Marquee)**:
    *   Uses **Framer Motion** for a smooth, infinite marquee highlighting common profile weaknesses (e.g., "Generic bio no one reads").
4.  **Value Propositions (Sections 2-5)**:
    *   Iterative sections focusing on social proof (10,000+ profiles) and methodology.
5.  **FAQs**: Accordion-style layout for conversion optimization.
6.  **Footer**: Minimalist branding and navigation credits.

---

## 4. Technical Implementation Details

### Animation Strategy
- **Infinite Marquees**: Implemented in `Section2.tsx` using Framer Motion's `useAnimation` and `useInView` to save GPU resources when off-screen.
- **Scroll Reveals**: Sections use `whileInView` with `viewport` triggers to create an organic, responsive feel.
- **Background Depth**: Absolute-positioned SVG graphics with subtle `animate-bounce` or parallax-like placement.

### Form Handling & API
- **Waiting List**: The `WaitingList` component uses `axios` to push lead data to `/api/v1/waitinglist`.
- **Validation**: Regex-based email validation in the client.

### SEO & Performance
- **Layout**: `layout.tsx` defines high-level metadata (LinkRoast - Roast your profile).
- **Favicon**: High-res favicon assets included for professional branding.
- **Antialiased**: Global body classing for crisp font rendering in dark mode.
