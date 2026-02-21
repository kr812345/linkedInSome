import React from 'react'
import { Plus, Minus } from 'lucide-react';
import { redirect } from 'next/navigation';

const FAQs = () => {
  const [isVisible, setIsVisible] = React.useState<Number>(0);

  const handleVisible = (idx: Number) => {
    setIsVisible(idx);
  }

  const qna = [
    { q: "Is my screenshot stored?", a: "We delete screenshots after 10 minutes of your feedback processing. " },
    { q: "Is my screenshot stored?", a: "Yes. Your data is encrypted in transit and never shared or sold. We only use it to generate your roast — nothing else." },
    { q: "Does AI actually read images?", a: "Yes. We use vision-capable AI that understands text and layout directly from screenshots, not copied text or manual input." },
    { q: "Can I roast multiple profiles?", a: "Yes. You can roast multiple profiles, including updated versions of your own or completely different profiles." },
    { q: "Is it anonymous?", a: "Yes. No LinkedIn login required. No public posting. Your roast is private and visible only to you." },
  ]

  return (
    <>
      <div className='relative min-h-screen w-full text-white flex flex-col items-center px-6 sm:px-16 lg:px-60 py-4'>
        <h1 className='text-2xl sm:text-3xl lg:text-4xl font-medium text-shadow-md text-shadow-[#ff2f00] mb-10 sm:mb-16 text-center'>Frequently Asked Questions</h1>
        {qna.map((item, idx) => (
          <div key={idx} className='flex flex-col items-center my-3 sm:my-4 w-full overflow-x-clip'>
            <h1 onClick={() => handleVisible(idx)} className='border-y relative shadow-[0_0px_12px_0px_#ff2f00] w-full px-4 py-3 sm:py-4 bg-transparent text-base sm:text-lg font-medium flex justify-between cursor-pointer'>{item.q} {isVisible === idx ? <Minus /> : <span><Plus /></span>}</h1>

            {isVisible === idx ? <p className='px-4 pt-4 self-start transition-normal duration-100 text-sm sm:text-base'>{item.a}</p> : ''}
          </div>
        ))}

        <div className='flex flex-col h-auto py-24 sm:py-24 lg:py-36 justify-center items-center gap-8 sm:gap-20'>
          <span className='absolute h-10 -translate-y-16 w-full max-w-md blur-2xl bg-[#ff2f00]'></span>
          <span className='absolute h-10 -translate-y-16 w-full max-w-md blur-2xl bg-[#ff2f00]'></span>
          <h1 className='relative rounded-full text-sm sm:text-lg tracking-wide font-semibold text-center px-4'>Before recruiters reject you, let our AI do it first.</h1>
          <button onClick={() => redirect('/waiting-list')} className='text-xl sm:text-2xl font-medium px-3 py-3 hover:shadow-[0_0_10px_1px_#ff2f00] bg-[#ff2f00] w-fit rounded-2xl'>Join Waiting List</button>
        </div>
      </div>
    </>
  )
}

export default FAQs