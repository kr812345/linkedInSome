import React from 'react'

const Section5 = () => {
  return (
    <>
      <div className='relative min-h-screen w-full text-white flex flex-col sm:grid sm:grid-cols-2'>
        <div className='flex flex-col items-center justify-evenly py-10 sm:py-0'>
          <h1 className='text-2xl sm:text-4xl font-semibold'>Before</h1>
          <div className='h-48 sm:h-[60%] w-[70%] sm:w-[40%] rounded-xl'></div>
        </div>
        <div className='flex flex-col items-center justify-evenly py-10 sm:py-0'>
          <h1 className='text-2xl sm:text-4xl font-semibold'>After</h1>
          <div className='h-48 sm:h-[60%] w-[70%] sm:w-[40%] rounded-xl'></div>
        </div>

        <div className='absolute h-fit w-full flex items-center self-center justify-center z-10'>
          <div className='self-center bg-[#1F1C1B] text-shadow-[#ff2f00] text-shadow-md font-semibold border-2 border-[#ff2f00] w-36 h-36 sm:w-48 sm:h-48 flex justify-center items-center text-base sm:text-lg shadow-[#ff2f00] shadow-lg rounded-xl text-wrap'>Coming Soon</div>
        </div>
      </div>
    </>
  )
}

export default Section5