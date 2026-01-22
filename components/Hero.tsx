import React from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react';
import { toast, Toaster } from 'sonner';

const Hero = () => {

  const handleGetRoasted = () => {
    toast("yeah, you are handling well.")
  }

  return (
    <>
    <div className='relative overflow-hidden min-h-screen pt-16'>
      <div className='absolute flex inset-0 z-0'>
        <Image className='translate-x-100 translate-y-0 absolute' alt='sun_light_graphic' draggable='false' src={'./sm_sun.svg'} width={1000} height={1000} ></Image>
        <Image className=' right-0 absolute' alt='sun_light_graphic' draggable='false' src={'./bg_sun.svg'} width={1000} height={1000} ></Image>
      </div>
      <div className='absolute flex inset-0 z-0 opacity-40'>
        <Image className='translate-x-300 -translate-y-50' alt='sun_ray_graphic' draggable='false' src={'./sun_ray_1.svg'} width={500} height={500} ></Image>
        <Image className='translate-x-250 -translate-y-60' alt='sun_ray_graphic' draggable='false' src={'./sun_ray_2.svg'} width={500} height={500} ></Image>  
        <Image className=' translate-x-180 -translate-y-50' alt='sun_ray_graphic' draggable='false' src={'./sun_ray_3.svg'} width={200} height={200} ></Image>  
      </div>

      <div className='min-h-screen w-screen absolute h-screen z-10'>
          {/* <div className='z-100 w-full h-20 bg-black'>Navbar</div> */}
          <div className='grid-cols-2 grid pt-20 pl-20 h-full text-white'>
              {/* Left Side */} 
              <div className='h-full -mt-20 flex flex-col justify-center'>
                <h1 className='text-7xl font-bold text-white font-serif'>Your LinkedIn Profile, Roasted & Refined.</h1>
                <p className='text-gray-400 pt-4'>The AI-powered profile reviewer that uses Gemini to give you honest feedback—and just enough heat—to fix what’s weak, highlight what works, and help you stand out where it matters.</p>
                <div className='flex  gap-4 mt-10 ml-4'>
                  <button onClick={()=>handleGetRoasted} className='border border-orange-600 tracking-tight hover:shadow-[0_0_2px_2px_#ff2f00] bg-orange-700 font-medium rounded-full px-3 py-2 flex'>Get Roasted <Play className='size-5 ml-1'/></button>
                  <button onClick={()=>handleGetRoasted} className='border border-orange-600 tracking-tight rounded-full font-medium px-3 py-2'>See Example</button>
                </div>
              </div>

              {/* Right Side */}
              <div className='flex justify-center flex-col items-center'>
                <Image src={'./linkedin_graghic.svg'} width={600} height={600} alt='linked_graphic'/>
              </div>
              <div className='flex justify-end items-center -translate-y-10'>
                <Image className='animate-bounce' src={'./scroll_down.svg'} width={25} height={25} alt='\/'/>
              </div>
          </div>
      </div>
    </div>
    </>
  )
}

export default Hero