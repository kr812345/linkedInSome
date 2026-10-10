"use client";
import React from 'react';
import Section from '@/components/Section';

const PrivacyPage = () => {
  return (
    <Section withSun={true}>
      <div className="max-w-4xl w-full text-white/90 space-y-8 backdrop-blur-sm bg-black/20 p-8 rounded-2xl border border-white/5">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold font-serif text-[#ff2f00]">Privacy Policy</h1>
          <p className="text-gray-500 text-sm">Last updated: October 10, 2026</p>
        </div>

        <div className="space-y-6 text-sm sm:text-base leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">1. Information We Collect</h2>
            <p>
              We collect the images and PDF documents you upload for analysis. If you unlock the full roast, we also collect the name and email you submit, plus the roast mode and score. We collect basic technical data such as IP addresses for rate limiting.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">2. How We Use Your Data</h2>
            <p>
              Uploads are used to generate the roast or the profile rewrite you asked for. Images and PDFs are processed through Google Gemini or OpenAI. Your name and email are used to unlock the full roast and to follow up about it. We do not sell personal data.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">3. Data Retention</h2>
            <p>
              Uploaded screenshots and resumes are deleted from our servers as soon as processing finishes, which is inside the 10-minute window we promise. The full roast text is kept only long enough for you to unlock it (about 30 minutes) and is not stored on the lead record. Name and email are kept so we can follow up. AI providers have their own retention policies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">4. Cookies</h2>
            <p>
              We use minimal cookies for site functionality and analytics (via Vercel Analytics).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">5. Third-Party Services</h2>
            <p>
              By using LinkRoast, you acknowledge that your data will be processed by Google (Gemini) and/or OpenAI. We recommend reviewing their privacy policies.
            </p>
          </section>
        </div>
      </div>
    </Section>
  );
};

export default PrivacyPage;
