import React from 'react';
import Image from 'next/image';

const SunBackground = () => {
  return (
    <>
      <div className='absolute inset-0 z-0 pointer-events-none overflow-hidden'>
        {/* Background glows */}
        <div className='absolute inset-0 flex'>
          <Image 
            className='translate-x-1/2 -translate-y-1/4 absolute opacity-80' 
            alt='sun_light_glow' 
            draggable='false' 
            src='/sm_sun.svg' 
            width={1000} 
            height={1000} 
          />
          <Image 
            className='right-0 absolute opacity-70' 
            alt='sun_light_glow' 
            draggable='false' 
            src='/bg_sun.svg' 
            width={1000} 
            height={1000} 
          />
        </div>
        
        {/* Sun rays (Desktop only, subtle) - Aligned with sun glow on the right */}
        <div className='absolute inset-0 z-0 opacity-40 hidden lg:flex'>
          <Image 
            className='right-0 translate-x-2/4 -translate-y-0.1/5 absolute' 
            alt='sun_ray_graphic' 
            draggable='false' 
            src='/sun_ray_1.svg' 
            width={600} 
            height={600} 
          />
          <Image 
            className='right-0 translate-x-1/5 -translate-y-1/3 absolute' 
            alt='sun_ray_graphic' 
            draggable='false' 
            src='/sun_ray_2.svg' 
            width={600} 
            height={600} 
          />
          {/* <Image 
            className='right-0 translate-x-1/4 -translate-y-2/7 absolute scale-150' 
            alt='sun_ray_graphic' 
            draggable='false' 
            src='/sun_ray_3.svg' 
            width={300} 
            height={300} 
          /> */}
        </div>
      </div>
    </>
  );
};

export default SunBackground;
