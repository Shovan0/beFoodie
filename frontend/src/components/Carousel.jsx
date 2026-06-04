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
          onError={(e)=>{e.currentTarget.src='data:image/svg+xml;utf8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%271200%27 height=%27500%27%3E%3Crect width=%27100%25%27 height=%27100%25%27 fill=%27%23f3f4f6%27/%3E%3Ctext x=%2750%25%27 y=%2750%25%27 dominant-baseline=%27middle%27 text-anchor=%27middle%27 fill=%27%23959e9f%27 font-family=%27Arial, Helvetica, sans-serif%27 font-size=%2728%27%3ENo%20Image%3C/text%3E%3C/svg%3E'}}
        />
      </div>
    </div>
  )
}

export default Carousel