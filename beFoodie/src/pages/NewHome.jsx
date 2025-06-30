import React from 'react'
import Login from './Login'

function NewHome() {
  return (
    <>
    <button>Click Me</button>
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
      <div className='absolute inset-0 backdrop-blur-sm'></div> {/* This div is responsible for the background blur */}
      <div className='relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md mt-10 flex flex-col gap-5'>
        <Login />
      </div>
    </div>

    </>
  )
}

export default NewHome