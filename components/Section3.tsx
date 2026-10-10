import React from 'react'
import { MoveRight, MoveDown } from 'lucide-react'

const Section3 = () => {
  return (
    <>
      <div className='min-h-screen flex flex-col items-center justify-evenly text-white px-6'>
        <h1 className='text-2xl sm:text-4xl lg:text-5xl font-bold text-center'>
          From screenshot to client conversations
        </h1>
        <div className='border border-[#ff2f00] font-semibold flex flex-col sm:flex-row items-center justify-evenly w-[90%] sm:w-[70%] lg:w-[60%] py-6 sm:py-8 gap-4 sm:gap-2 rounded-2xl shadow-[#ff2f00] shadow-md'>
          <h1 className='text-sm sm:text-base'>Get the feedback</h1>
          <p className='hidden sm:block'>{<MoveRight />}</p>
          <p className='sm:hidden'>{<MoveDown />}</p>
          <h1 className='text-sm sm:text-base'>Fix the profile and the posts</h1>
          <p className='hidden sm:block'>{<MoveRight />}</p>
          <p className='sm:hidden'>{<MoveDown />}</p>
          <h1 className='text-sm sm:text-base'>Start the conversations</h1>
        </div>
      </div>
    </>
  )
}

export default Section3