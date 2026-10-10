import React from 'react'
import Image from 'next/image'

const Section5 = () => {
  return (
    <>
      <div className='relative min-h-screen w-full text-white flex flex-col'>
        <div className='text-center px-6 pt-16 max-w-3xl mx-auto'>
          <h2 className='text-2xl sm:text-4xl font-bold'>Before a buyer books, the profile has to sell the conversation.</h2>
          <p className='text-gray-400 mt-3 text-sm sm:text-base'>Same person. One version introduces you. The other gives a client a reason to reply.</p>
        </div>
        <div className='flex-1 flex flex-col sm:grid sm:grid-cols-2'>
        <div className='flex flex-col items-center justify-evenly py-10 sm:py-0'>
          <h1 className='text-2xl sm:text-4xl font-semibold'>Before</h1>
          <div className='h-auto sm:h-[60%] w-[80%] sm:w-[70%] rounded-xl overflow-hidden border border-white/10'>
            <Image src='/old_profile.svg' alt='Old Profile' width={800} height={800} className='w-full h-full object-contain' />
          </div>
        </div>
        <div className='flex flex-col items-center justify-evenly py-10 sm:py-0'>
          <h1 className='text-2xl sm:text-4xl font-semibold'>After</h1>
          <div className='h-auto sm:h-[60%] w-[80%] sm:w-[70%] rounded-xl overflow-hidden border border-[#ff2f00]/30 shadow-[0_0_20px_rgba(255,47,0,0.2)]'>
            <Image src='/new_profile.svg' alt='New Profile' width={800} height={800} className='w-full h-full object-contain' />
          </div>
        </div>
        </div>
      </div>
    </>
  )
}

export default Section5