import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <>
            <div className='min-h-fit w-full text-white bg-[#ff2f0050] flex flex-col sm:flex-row justify-around py-10 px-6'>
                <h1 className='text-2xl font-medium w-fit h-fit px-4 py-4 sm:py-10'>LinkRoast</h1>
                <div className='w-full sm:w-6/12 px-4 sm:p-10 grid grid-cols-1 sm:grid-cols-2 gap-6'>
                    <div>
                        <h1 className='font-semibold'>Product</h1>
                        {/* <Link href={'/roster'} className='text-gray-400'>Roster</Link> */}
                        <p>coming soon</p>
                    </div>
                    <div>
                        <h1 className='font-semibold'>Contact</h1>
                        <Link href='mailto:ai.codefire@gmail.com' className='font-light text-gray-400 break-all'>ai.codefire@gmail.com</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer