"use client";
import React from 'react';
import Section from '@/components/Section';

const PrivacyPage = () => {
  return (
    <Section withSun={true}>
      <div className="max-w-4xl w-full text-white/90 space-y-8 backdrop-blur-sm bg-black/20 p-8 rounded-2xl border border-white/5">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold font-serif text-[#ff2f00]">Privacy Policy</h1>
          <p className="text-gray-500 text-sm">Last updated: April 30, 2026</p>
        </div>

        <div className="space-y-6 text-sm sm:text-base leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">1. Information We Collect</h2>
            <p>
              We collect the images and PDF documents you upload for analysis. We also collect basic technical data like IP addresses for rate limiting purposes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">2. How We Use Your Data</h2>
            <p>
              Your data is used solely to provide the AI analysis requested. Images and PDFs are processed through Google Gemini or OpenAI APIs. We do not sell your personal data to third parties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">3. Data Retention</h2>
            <p>
              Uploaded files are deleted from our local servers immediately after processing. AI providers have their own retention policies which are governed by their respective terms of service.
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
