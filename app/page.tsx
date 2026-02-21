'use client'
import React from 'react';
import Link from 'next/link';
import Hero from '@/components/Hero';
import Section2 from '@/components/Section2';
import Section3 from '@/components/Section3';
import Section4 from '@/components/Section4';
import Section5 from '@/components/Section5';
import FAQs from '@/components/FAQs';
import Footer from '@/components/Footer';
import { Toaster } from 'sonner';

const page = () => {

  return (
    <main className="w-full overflow-x-hidden h-full min-h-screen bg-[#050505]">
      <Toaster className="bg-[#ff2f00a1] text-white border border-[#ff2f00]" />
      <Hero />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <FAQs />
      <Footer />
    </main>
  )
}

export default page;  