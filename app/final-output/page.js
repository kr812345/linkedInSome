'use client'
import React from 'react'

const page = () => {
  return (
    <>
     <div className="w-2/3 h-full overflow-y-auto pl-8">
        <div className="p-6 rounded-lg shadow-md" style={{ backgroundColor: 'var(--surface)'}}>
          {/* Banner */}
          <div className="h-40 rounded-t-lg" style={{ backgroundColor: 'var(--primary)' }}></div>

          {/* Profile Picture & Info */}
          <div className="relative flex items-end px-6 -mt-16">
            <div className="w-28 h-28 bg-gray-300 rounded-full flex items-center justify-center border-4" style={{ borderColor: 'var(--surface)'}}>
              <span style={{ color: 'var(--text-secondary)'}}>Logo</span>
            </div>
            <div className="ml-4 pb-2">
              <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)'}}>Your Name</h2>
              <p style={{ color: 'var(--text-secondary)'}}>Your Professional Headline</p>
            </div>
          </div>

          <div className="p-6">
            {/* Bio */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)'}}>Bio</h3>
              <p style={{ color: 'var(--text-secondary)'}}>
                Dynamic and results-oriented professional with a proven track record of success. Eager to leverage skills in a challenging new role.
              </p>
            </div>

            {/* About */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)'}}>About</h3>
              <p style={{ color: 'var(--text-secondary)'}}>
                A brief but engaging summary of your career, skills, and professional aspirations. This is a great place to showcase your personality and what drives you.
              </p>
            </div>

            {/* Featured */}
            <div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)'}}>Featured</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="h-36 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--background-light)', border: '1px solid var(--border)'}}>
                  <span style={{ color: 'var(--text-secondary)'}}>Project 1</span>
                </div>
                <div className="h-36 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--background-light)', border: '1p solid var(--border)'}}>
                  <span style={{ color: 'var(--text-secondary)'}}>Project 2</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default page