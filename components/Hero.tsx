'use client'
import React from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Hero = () => {
  const router = useRouter();

  return (
    <>
      <div className='relative overflow-hidden min-h-screen pt-16'>
        {/* Background decorative images — hidden on mobile */}
        <div className='absolute flex inset-0 z-0 lg:flex'>
          <Image className='translate-x-100 translate-y-0 absolute' alt='sun_light_graphic' draggable='false' src={'./sm_sun.svg'} width={1000} height={1000} ></Image>
          <Image className=' right-0 absolute' alt='sun_light_graphic' draggable='false' src={'./bg_sun.svg'} width={1000} height={1000} ></Image>
        </div>
        <div className='absolute flex inset-0 z-0 opacity-40 hidden lg:flex'>
          <Image className='translate-x-300 -translate-y-50' alt='sun_ray_graphic' draggable='false' src={'./sun_ray_1.svg'} width={500} height={500} ></Image>
          <Image className='translate-x-250 -translate-y-60' alt='sun_ray_graphic' draggable='false' src={'./sun_ray_2.svg'} width={500} height={500} ></Image>
          <Image className=' translate-x-180 -translate-y-50' alt='sun_ray_graphic' draggable='false' src={'./sun_ray_3.svg'} width={200} height={200} ></Image>
        </div>

        <div className='min-h-screen w-full absolute h-screen z-10'>
          <div className='flex flex-col lg:grid lg:grid-cols-2 pt-10 px-6 sm:px-10 not-lg:-mt-20 lg:pt-30 lg:pl-20 h-full text-white'>
            {/* Left Side */}
            <div className='h-full flex flex-col justify-center lg:-mt-20'>
              <p className='text-[#ff2f00] text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase mb-3'>Free for founders</p>
              <h1 data-testid="hero-headline" className='text-4xl sm:text-5xl lg:text-7xl font-bold text-white font-serif'>Is your LinkedIn bringing you clients?</h1>
              <p className='text-gray-400 pt-4 text-sm sm:text-base'>Roast the profile or the last few posts. Gemini scores whether a buyer would stop, trust you, and book — then shows you the lines to rewrite. No login. No account.</p>
              <div className='flex gap-4 mt-8 sm:mt-10 flex-col items-start sm:flex-row'>
                 <button onClick={() => router.push('/roster?mode=profile')} className='border border-[#ff2f00ff] tracking-tight hover:shadow-[0_0_2px_2px_#ff2f00] bg-orange-700 font-medium rounded-full px-4 py-3 flex text-sm sm:text-base'>Roast my profile<Play className='size-4 sm:size-5 ml-1' /></button>
                 <button onClick={() => router.push('/roster?mode=posts')} className='border border-[#ff2f00] tracking-tight hover:shadow-[0_0_2px_2px_#ff2f00] rounded-full font-medium px-4 py-3 text-sm sm:text-base'>Roast my posts</button>
              </div>
            </div>

            {/* Right Side — Now visible on mobile */}
            <div className='flex justify-center flex-col items-center not-lg:hidden lg:mt-0'>
              <Image src={'./linkedin_graghic.svg'} className="w-[80%] sm:w-[60%] lg:w-[400px]" width={400} height={400} alt='linked_graphic' />
            </div>
            <div className='flex justify-center lg:justify-end items-center mt-8 lg:mt-0 -translate-y-10 not-md:-translate-y-28'>
              <Image className='animate-bounce' src={'./scroll_down.svg'} width={25} height={25} alt='\/' />
            </div>
          </div>
        </div>
      </div>
            <div className='flex justify-center flex-col items-center sm:hidden lg:mt-0'>
              <Image src={'./linkedin_graghic.svg'} className="w-[80%] sm:w-[60%] lg:w-[400px]" width={400} height={400} alt='linked_graphic' />
            </div>
    </>
  )
}

export default Hero
