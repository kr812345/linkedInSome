'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

const Section4 = () => {
    const router = useRouter();

    const items = [
        { i: "01", title: "Upload", desc: "Drop a profile screenshot, or up to five recent posts — images, pasted text, or both." },
        { i: "02", title: "Read", desc: "Gemini reads the layout and the words. You do not fill out a form." },
        { i: "03", title: "Roast", desc: "A score, plus a roast on the hook, who you help, proof, and whether it would attract clients." },
        { i: "04", title: "Rewrite", desc: "Unlock the full notes and paste-ready lines. Then book a call if you want the next 30 days written." }
    ]; 
    // remove this line and rewrite the comments, as you might not need 

    return (
        <>
            <div className='relative min-h-screen px-6 sm:px-12 lg:px-25 py-16 lg:py-40 flex flex-col lg:grid lg:grid-cols-2 gap-12 text-white'>
                {/* left */}
                <div className='flex flex-col items-center lg:items-start text-center lg:text-left'>
                    <div>
                        <h1 className='text-3xl sm:text-5xl lg:text-6xl font-bold text-shadow-[#ff2f00] text-shadow-md'>How it works</h1>
                        <button onClick={() => router.push('/roster')} className='rounded-full px-3 py-2 mt-6 bg-[#ff2f00] shadow-[#ff2f00] drop-shadow-lg drop-shadow-y-[#ff2f00] shadow-md font-medium'>Roast mine</button>
                    </div>
                </div>

                {/* right */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
                    {items.map((i) => (
                        <div key={i.i}>
                            <h1 className='text-5xl sm:text-7xl lg:text-8xl text-[#7f7f7f] font-bold font-mono'>{i.i}</h1>
                            <h2 className='text-2xl sm:text-3xl lg:text-4xl text-[#e5e5e5] mt-4 font-bold'>{i.title}</h2>
                            <p className='text-gray-400 mt-2 font-light'>{i.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Section4