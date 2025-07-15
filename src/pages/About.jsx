import React from 'react'
import Header from '../components/Header'
import kitchenStaff from '../assets/kitchen_staff.png'
import customer from '../assets/customer.png'

function About() {
  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* Image Section */}
        <div>
          {/* 👉 Replace the src URL below with your image link */}
          <img
            src={kitchenStaff}
            alt="Delicious Food Delivery"
            className="w-full rounded-2xl shadow-md object-cover"
          />
        </div>

        {/* Content Section */}
        <div>
          <h2 className="text-3xl font-bold text-emerald-600 mb-4">About Us</h2>

          {/* Who We Are */}
          <p className="text-gray-700 mb-4">
            Welcome to <span className="font-semibold text-emerald-600">beFoodie</span> — your trusted partner in delicious moments! We’re a passionate team of food lovers committed to bringing your favorite dishes from top local restaurants straight to your doorstep.
          </p>

          {/* What We Offer */}
          <p className="text-gray-700 mb-4">
            From spicy street snacks to gourmet main courses, we offer a wide range of freshly prepared meals. Whether you're craving Indian, Chinese, continental, or something quick and comforting, we’ve got your hunger covered.
          </p>

          {/* How We Operate */}
          <p className="text-gray-700 mb-4">
            Our user-friendly website and fast delivery system ensure you get hot, fresh food — quickly and hassle-free. We collaborate with local restaurants and trained delivery partners to bring meals to your door with care.
          </p>

          {/* Why Choose Us */}
          <p className="text-gray-700 mb-4">
            What makes us different? We prioritize quality, affordability, and exceptional customer service. With every order, we aim to give you a smooth, satisfying experience that keeps you coming back.
          </p>

          {/* Team Message */}
          <p className="text-gray-700">
            Thank you for choosing <span className="font-semibold text-emerald-600">beFoodie</span>. We're here to serve happiness—one meal at a time.
          </p>
        </div>
      </div>

    </>
  )
}

export default About