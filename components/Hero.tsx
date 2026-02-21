import React, { useEffect } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { redirect } from 'next/navigation';
import WaitingList  from './waiting-list';

const Hero = () => {

  // useEffect(() => {
  //   toast("Welcome to EasyLink!")
  // }, [])

  const handleGetRoasted = () => {
    redirect('/roster')
  }

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
              <h1 className='text-4xl sm:text-5xl lg:text-7xl font-bold text-white font-serif'>Your LinkedIn Profile, Roasted & Refined.</h1>
              <p className='text-gray-400 pt-4 text-sm sm:text-base'>The AI-powered profile reviewer that uses Gemini to give you honest feedback—and just enough heat—to fix what's weak, highlight what works, and help you stand out where it matters.</p>
              <div className='flex gap-4 mt-8 sm:mt-10 flex flex-col items-start sm:flex-row'>
                <WaitingList/>
                {/* <button onClick={() => handleGetRoasted()} className='border border-orange-600 tracking-tight rounded-full font-medium px-3 py-2 text-sm sm:text-base'>See Example</button> */}
              </div>
            </div>

            {/* Right Side — hidden on mobile */}
            <div className='hidden lg:flex justify-center flex-col items-center'>
              <Image src={'./linkedin_graghic.svg'} width={600} height={600} alt='linked_graphic' />
            </div>
            <div className='flex justify-center lg:justify-end items-center mt-8 lg:mt-0 -translate-y-10 not-md:-translate-y-28'>
              <Image className='animate-bounce' src={'./scroll_down.svg'} width={25} height={25} alt='\/' />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero