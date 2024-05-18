import React from 'react'
import { useSearchParams } from 'react-router-dom'

const PaymentSuccess = () => {
  const searchq = useSearchParams()[0]
  const reference = searchq.get("reference")
  return (
    <div className=" flex justify-center items-center h-screen">
    <div className='flex flex-col items-center'>
       <p className='text-4xl text-white'>PAYMENT SUCCESSFUL</p>
       <p className='text-2xl'>Payment ID - {reference}</p>
    </div>
    </div>
  )
}

export default PaymentSuccess;