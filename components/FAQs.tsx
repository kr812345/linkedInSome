'use client'
import React from 'react'
import { Plus, Minus } from 'lucide-react';
import { useRouter } from 'next/navigation';

const FAQs = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = React.useState<number>(0);

  const handleVisible = (idx: number) => {
    setIsVisible((current) => (current === idx ? -1 : idx));
  }

  const qna = [
    {
      q: "Is my screenshot stored?",
      a: "No. Screenshots are deleted from our servers as soon as the roast is generated, always within 10 minutes. We do not keep the image. The full write-up is held only long enough for you to unlock it (about 30 minutes), then it expires.",
    },
    {
      q: "Why do you ask for my email?",
      a: "The free teaser — your score and the top notes — shows up immediately. Your name and email unlock the full roast and the rewrites. There is no account and no LinkedIn login. We store that contact so we can send what you asked for. We do not sell it.",
    },
    {
      q: "Does the AI actually read images?",
      a: "Yes. A vision model reads the text and the layout from the screenshot. You can also paste post text if you would rather not upload images.",
    },
    {
      q: "Can I roast posts, not just the profile?",
      a: "Yes. Profile roast takes one screenshot. Posts roast takes up to five recent post screenshots, pasted text, or both. You can run it again whenever the profile or the posts change.",
    },
    {
      q: "Is it private?",
      a: "You do not connect LinkedIn, and nothing is posted for you. The roast stays on your screen. Unlocking it uses the name and email you type in.",
    },
    {
      q: "What happens after the roast?",
      a: "You can book a call and get a free sample post written in your voice. That is a conversation about the Founder Content Engine. There is nothing to buy on this page.",
    },
  ]

  return (
    <>
      <div className='relative min-h-screen w-full text-white flex flex-col items-center px-6 sm:px-16 lg:px-60 py-4'>
        <h1 className='text-2xl sm:text-3xl lg:text-4xl font-medium text-shadow-md text-shadow-[#ff2f00] mb-10 sm:mb-16 text-center'>Frequently asked questions</h1>
        {qna.map((item, idx) => (
          <div key={item.q} className='flex flex-col items-center my-3 sm:my-4 w-full overflow-x-clip'>
            <h2 onClick={() => handleVisible(idx)} className='border-y relative shadow-[0_0px_12px_0px_#ff2f00] w-full px-4 py-3 sm:py-4 bg-transparent text-base sm:text-lg font-medium flex justify-between cursor-pointer'>{item.q} {isVisible === idx ? <Minus /> : <span><Plus /></span>}</h2>

            {isVisible === idx ? <p className='px-4 pt-4 self-start transition-normal duration-100 text-sm sm:text-base'>{item.a}</p> : ''}
          </div>
        ))}

        <div className='flex flex-col h-auto py-24 sm:py-24 lg:py-36 justify-center items-center gap-8 sm:gap-12'>
          <span className='absolute h-10 -translate-y-16 w-full max-w-md blur-2xl bg-[#ff2f00]'></span>
          <span className='absolute h-10 -translate-y-16 w-full max-w-md blur-2xl bg-[#ff2f00]'></span>
          <h2 className='relative text-xl sm:text-3xl tracking-wide font-semibold text-center px-4 max-w-3xl'>Before the next buyer scrolls past, let the AI tell you why.</h2>
          <button onClick={() => router.push('/roster')} className='text-xl sm:text-2xl font-medium px-3 py-3 hover:shadow-[0_0_10px_1px_#ff2f00] bg-[#ff2f00] w-fit rounded-2xl'>Roast my LinkedIn</button>
        </div>
      </div>
    </>
  )
}

export default FAQs
