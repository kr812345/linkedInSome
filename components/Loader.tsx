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
    <>
    { <div className='px-12 w-full flex justify-center'>
                    <div className='w-8 h-8 rounded-full border-2 border-dashed animate-[spin_1.3s_linear_infinite] rotate-45 border-[#ff2f00]'>
                    </div>
                  </div>}
    </>
  )
}

export default Loader