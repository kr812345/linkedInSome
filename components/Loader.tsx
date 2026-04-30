import React, { useEffect, useState } from 'react'

const Loader = () => {
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  // useEffect(()=> {
  //   if (state === true) {
  //     setIsLoading(p=>!p);
  //   } else {
  //     setIsLoading(false);
  //   }
  // },[]); 

  return (
    <div className='flex flex-col items-center gap-4 py-8'>
      <div className='w-10 h-10 rounded-full border-2 border-dashed animate-[spin_1.5s_linear_infinite] border-[#ff2f00]'></div>
      <p className='text-[#ff2f00] font-medium text-sm tracking-widest animate-pulse uppercase'>
        Thinking...
      </p>
    </div>
  )
}

export default Loader