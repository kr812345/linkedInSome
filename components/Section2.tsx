import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { motion, useAnimation, useInView } from 'motion/react';

gsap.registerPlugin(useGSAP);

const section2 = () => {
  const container = useRef(null);

  const isInView = useInView(container, { amount: 0.5 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({
        x: ['0%', '-50%'],
        transition: {
          duration: 18,
          ease: 'linear',
          repeat: Infinity,
        },
      })
    } else {
      controls.stop(); // stops GPU work, which saves load due to animation.
    }
  }, [isInView, controls])

  return (
    <>
      <div className='relative z-10 w-full min-h-screen flex flex-col justify-evenly items-center px-4 sm:px-0 py-20 sm:py-0'>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className='relative w-full max-w-3xl h-auto px-6 py-10 sm:py-14 flex flex-col items-center justify-center gap-4 border border-[#ff2f00] rounded-xl text-white'>
          <div className="flex flex-col gap-6 text-center">
            <h2 className='text-xl sm:text-2xl font-bold tracking-tight'>Likes are not clients.</h2>
            <p className='text-sm sm:text-lg text-gray-300 font-medium leading-relaxed px-4'>
              A polished profile that never names who you help will not fill a calendar. Founders do not need another template. They need a presence that starts conversations.
            </p>
            <p className='text-sm sm:text-lg font-bold text-[#ff2f00] italic px-2'>
              If a buyer cannot tell what you do in five seconds, they will not become a client.
            </p>
          </div>
          <Image className='absolute translate-y-45 -z-1 not-sm:!translate-y-41 sm:block' src={'./shadow.svg'} width={1000} height={100} alt='______' />
        </motion.div>
        <div ref={container} className='h-20 gap-8 text-xl sm:text-3xl w-full whitespace-nowrap overflow-hidden border text-white font-medium tracking-wide flex justify-center items-center border-y-[#ff2f00] border-x-0 text-shadow-md text-shadow-[#ff2f00]'>
          <motion.div className='flex gap-8 '
            animate={controls}
          >
            <span className='container-text mr-4 '>&quot;Posts that get likes, not leads&quot;, </span>
            <span className='container-text mr-4 '>&quot;Nobody can tell who you help&quot;, </span>
            <span className='container-text mr-4 '>&quot;Busy profile, empty pipeline&quot;, </span>
            <span className='container-text mr-4 '>&quot;Hooks that die in the first line&quot;</span>
            <span className='container-text mr-4 '>&quot;Proof missing. CTA missing.&quot;</span>
            <span className='container-text mr-4 '>&quot;Posts that get likes, not leads&quot;, </span>
            <span className='container-text mr-4 '>&quot;Nobody can tell who you help&quot;, </span>
            <span className='container-text mr-4 '>&quot;Busy profile, empty pipeline&quot;, </span>
            <span className='container-text mr-4 '>&quot;Hooks that die in the first line&quot;</span>
            <span className='container-text mr-4 '>&quot;Proof missing. CTA missing.&quot;</span>
            <span className='container-text mr-4 '>&quot;Posts that get likes, not leads&quot;, </span>
            <span className='container-text mr-4 '>&quot;Nobody can tell who you help&quot;, </span>
            <span className='container-text mr-4 '>&quot;Busy profile, empty pipeline&quot;, </span>
            <span className='container-text mr-4 '>&quot;Hooks that die in the first line&quot;</span>
            <span className='container-text mr-4 '>&quot;Proof missing. CTA missing.&quot;</span>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default section2