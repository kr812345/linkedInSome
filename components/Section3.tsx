import React from 'react'
import { MoveRight } from 'lucide-react'

const Section3 = () => {
  return (
    <>
    <div className='h-screen flex flex-col items-center justify-evenly text-white'>
            <h1 className='text-5xl font-bold'>
                A Complete package for your LinkedIn
            </h1>
            <div className='border border-[#ff2f00] font-semibold flex justify-evenly w-[50%] py-8 rounded-2xl shadow-[#ff2f00]  shadow-md'>
                <h1>Get the FeedBack</h1>
                <p>{<MoveRight/>}</p>
                <h1>Fix your profile</h1>
                <p>{<MoveRight/>}</p>
                <h1>Get the Opportunity</h1>
            </div>
    </div>
    </>
  )
}

export default Section3