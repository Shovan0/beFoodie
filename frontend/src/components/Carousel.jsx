import React from 'react'
import './Carousel.css'

function Carousel() {
  return (
    <div className="w-full">
      <div className="relative w-full h-56 sm:h-72 md:h-96 overflow-hidden rounded-xl">
        <img
          src="https://images.pexels.com/photos/941869/pexels-photo-941869.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
      </div>
    </div>
  )
}

export default Carousel