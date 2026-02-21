import { redirect } from 'next/navigation'
import React from 'react'

const Section4 = () => {

    const items = [
        { i: "01", title: "Upload", desc: "Upload your LinkedIn Profile screenshot" },
        { i: "02", title: "LLM", desc: "AI Reads & Understand your profile" },
        { i: "03", title: "Roast", desc: "AI reads and give feedback on your profile" },
        { i: "04", title: "Improve", desc: "Use the feedback and improve your linkedIn profile" }
    ];

    return (
        <>
            <div className='relative min-h-screen px-6 sm:px-12 lg:px-25 py-16 lg:py-40 flex flex-col lg:grid lg:grid-cols-2 gap-12 text-white'>
                {/* left */}
                <div className='flex flex-col items-center lg:items-start text-center lg:text-left'>
                    <div>
                        <h1 className='text-3xl sm:text-5xl lg:text-6xl font-bold text-shadow-[#ff2f00] text-shadow-md'>How It Works ?</h1>
                        {/* <button onClick={() => (redirect('/roster'))} className='rounded-full px-3 py-2 mt-6 bg-[#ff2f00] shadow-[#ff2f00] drop-shadow-lg drop-shadow-y-[#ff2f00] shadow-md font-semibold'>Try to Roast me</button> */}
                        <button onClick={() => (redirect('/waiting-list'))} className='rounded-full px-3 py-2 mt-6 bg-[#ff2f00] shadow-[#ff2f00] drop-shadow-lg drop-shadow-y-[#ff2f00] shadow-md font-semibold'>Join Waiting List</button>
                    </div>
                </div>

                {/* right */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
                    {items.map((i) => (
                        <div key={i.i}>
                            <h1 className='text-5xl sm:text-7xl lg:text-8xl text-[#7f7f7f] font-bold font-mono'>{i.i}</h1>
                            <h2 className='text-2xl sm:text-3xl lg:text-4xl text-[#e5e5e5] mt-4 font-bold'>{i.title}</h2>
                            <p className='text-[#4d4d4d] mt-2 font-light'>{i.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Section4