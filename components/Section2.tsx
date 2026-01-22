import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { motion, useAnimation, useInView } from 'motion/react';

gsap.registerPlugin(useGSAP);

const section2 = () => {
  const container = useRef(null);

  const isInView = useInView(container, {amount: 0.5});
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({
          x: ['0%','-50%'],
          transition: {
            duration: 18,
            ease: 'linear',
            repeat: Infinity,
          },
      })
    } else {
      controls.stop(); // stops GPU work, which saves load due to animation.
    }
  },[isInView, controls])
  
  return (
    <>
    <div className='relative z-10 w-screen min-h-screen flex flex-col justify-evenly items-center'>
      <motion.div 
          initial={{opacity: 0, y: 40}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, amount: 0.3}}
          transition={{duration: 0.5}} 
          className='relative h-100 w-200 flex flex-col items-center justify-center gap-4 border border-[#ff2f00] rounded-xl text-white'>
        <p className='text-xl font-semibold'>10,000 Profiles Roasted</p>
        <p className='text-xl font-semibold'>Used by students from IITs, startup & creators</p>
        <p className='text-xl font-semibold'>92% Profiles had "passionate learner" 🤡</p>
        <Image className='absolute translate-y-55 -z-1' src={'./shadow.svg'} width={1000} height={100} alt='______'/>
      </motion.div>
      <div ref={container} className='infi h-20 gap-8 text-3xl w-screen whitespace-nowrap overflow-hidden border text-white font-medium tracking-wide flex justify-center items-center border-y-[#ff2f00] border-x-0 text-shadow-md text-shadow-[#ff2f00]'>
        <motion.div className='flex gap-8 '
          animate={controls}
          >
        <span className='container-text mr-4 '>“Generic bio no one reads”, </span>
        <span className='container-text mr-4 '>“Buzzwords without impact”, </span>
        <span className='container-text mr-4 '>“Looks professional but says nothing”, </span>  
        <span className='container-text mr-4 '>“Low profile views, no replies”</span>
        <span className='container-text mr-4 '>“Generic bio no one reads”, </span>
        <span className='container-text mr-4 '>“Buzzwords without impact”, </span>
        <span className='container-text mr-4 '>“Looks professional but says nothing”, </span>  
        <span className='container-text mr-4 '>“Low profile views, no replies”</span>
        <span className='container-text mr-4 '>“Generic bio no one reads”, </span>
        <span className='container-text mr-4 '>“Buzzwords without impact”, </span>
        <span className='container-text mr-4 '>“Looks professional but says nothing”, </span>  
        <span className='container-text mr-4 '>“Low profile views, no replies”</span>
        </motion.div>
      </div>
    </div>
    </>
  )
}

export default section2