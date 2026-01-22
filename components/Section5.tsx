import React from 'react'

const Section5 = () => {
  return (
  <>
  <div className='relative min-h-screen w-screen text-white grid grid-cols-2 '>
        <div className='flex flex-col items-center justify-evenly'>
            <h1 className='text-4xl font-semibold'>Before</h1>
            <div className='h-[60%] w-[40%]  rounded-xl'></div>
        </div>
        <div className='flex flex-col items-center justify-evenly'>
            <h1 className='text-4xl font-semibold'>After</h1>
            <div className='h-[60%] w-[40%]  rounded-xl'></div>
        </div>

        <div className='absolute h-fit w-full flex items-center self-center justify-center z-10 '>
        <div className='self-center bg-[#1F1C1B]  text-shadow-[#ff2f00]  text-shadow-md font-semibold border-2 border-[#ff2f00] w-48 h-48 flex justify-center items-center text-lg shadow-[#ff2f00] shadow-lg rounded-xl text-wrap'>Coming Soon</div>
        </div>
  </div>
  </>
  )
}

export default Section5