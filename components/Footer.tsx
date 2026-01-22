import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <>
    <div className='h-100 w-full text-white bg-[#ff2f0050] flex justify-around'>
            <h1 className='text-2xl font-bold w-fit h-fit px-4 py-10 '>Roast.AI</h1>
            <div className='w-6/12 p-10 grid grid-cols-2 '>
                <div>
                <h1 className='font-semibold'>Product</h1>
                    <Link href={'/roster'} className='text-gray-400'>Roster</Link>
                </div>
                <div>
                    <h1 className='font-semibold'>Contact</h1>
                    <Link href='mailto:jackwatsen0@gmail.com' className='font-light text-gray-400'>email: jackwatsen0@gmail.com</Link>
                </div>
            </div>
    </div>
    </>
)
}

export default Footer