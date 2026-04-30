"use client";
import React from 'react';
import Section from '@/components/Section';
import { Mail, MessageSquare, Twitter } from 'lucide-react';

const ContactPage = () => {
  return (
    <Section withSun={true}>
      <div className="max-w-2xl w-full text-white/90 space-y-8 backdrop-blur-sm bg-black/20 p-8 rounded-2xl border border-white/5">
        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-bold font-serif text-[#ff2f00]">Get in Touch</h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Have questions or feedback about LinkRoast? We're here to help.
          </p>
        </div>

        <div className="grid gap-6 mt-8">
          <div className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/5 hover:border-[#ff2f00]/30 transition-all">
            <div className="p-3 rounded-full bg-[#ff2f00]/10 text-[#ff2f00]">
              <Mail size={24} />
            </div>
            <div>
              <h3 className="font-semibold">Email</h3>
              <p className="text-sm text-gray-400">krishnay812345@gmail.com</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/5 hover:border-[#ff2f00]/30 transition-all">
            <div className="p-3 rounded-full bg-[#ff2f00]/10 text-[#ff2f00]">
              <Twitter size={24} />
            </div>
            <div>
              <h3 className="font-semibold">Twitter</h3>
              <p className="text-sm text-gray-400">@kr812345</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/5 hover:border-[#ff2f00]/30 transition-all">
            <div className="p-3 rounded-full bg-[#ff2f00]/10 text-[#ff2f00]">
              <MessageSquare size={24} />
            </div>
            <div>
              <h3 className="font-semibold">LinkedIn</h3>
              <p className="text-sm text-gray-400">krishna-yadav-kr812345</p>
            </div>
          </div>
        </div>

        <div className="pt-8 text-center">
            <p className="text-xs text-gray-600 uppercase tracking-widest">Technical Luxury Experience</p>
        </div>
      </div>
    </Section>
  );
};

export default ContactPage;
