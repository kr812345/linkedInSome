"use client";
import React from 'react';
import Section from '@/components/Section';

const TermsPage = () => {
  return (
    <Section withSun={true}>
      <div className="max-w-4xl w-full text-white/90 space-y-8 backdrop-blur-sm bg-black/20 p-8 rounded-2xl border border-white/5">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold font-serif text-[#ff2f00]">Terms of Service</h1>
          <p className="text-gray-500 text-sm">Last updated: April 30, 2026</p>
        </div>

        <div className="space-y-6 text-sm sm:text-base leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">1. Acceptance of Terms</h2>
            <p>
              By accessing and using LinkRoast, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the service.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">2. Description of Service</h2>
            <p>
              LinkRoast provides AI-powered analysis and refinement suggestions for LinkedIn profiles and resumes. The service is provided "as is" and we make no guarantees regarding the accuracy of the AI-generated feedback.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">3. Data Privacy</h2>
            <p>
              We respect your privacy. Uploaded profile screenshots and resumes are processed by third-party AI providers (Google Gemini, OpenAI). Please refer to our Privacy Policy for more details on how we handle your data.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">4. User Responsibilities</h2>
            <p>
              You are responsible for the content you upload. You must not upload sensitive personal information that you are not comfortable sharing with AI processing services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">5. Limitations of Liability</h2>
            <p>
              LinkRoast shall not be liable for any career decisions or consequences resulting from the use of our AI-generated advice. The "Roast" is for entertainment and strategic refinement purposes only.
            </p>
          </section>
        </div>
      </div>
    </Section>
  );
};

export default TermsPage;
