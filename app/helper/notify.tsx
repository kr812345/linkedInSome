'use client'

import React from 'react';

const Notify = ({text}: {text: string}) => {
  return (
    <>
    <div className='fixed top-10 mx-auto transition-transform rounded-2xl px-2 py-3 bg-purple-700 text-blue-600'>
    {text}
    </div>
    </>
  )
}

export default Notify;