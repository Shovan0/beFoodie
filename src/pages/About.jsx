import React from 'react';
import customer from '../assets/customer.png';
import kitchenStaff from '../assets/kitchen_staff.png';

function About() {
  return (
    <div className="bg-white py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-emerald-600 mb-12">
          About Us
        </h2>

        {/* Section 1 - Who We Are */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16">
          <img
            src={customer}
            alt="Happy Customer"
            className="w-full rounded-2xl shadow-md object-cover"
          />
          <div>
            <h3 className="text-2xl font-semibold text-emerald-700 mb-4">
              Who We Are
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Welcome to <span className="font-semibold text-emerald-600">beFoodie</span> —
              your trusted partner in delicious moments! We’re a passionate team of food
              lovers committed to bringing your favorite dishes from top local restaurants
              straight to your doorstep.
            </p>
          </div>
        </div>

        {/* Section 2 - What We Offer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16">
          <div>
            <h3 className="text-2xl font-semibold text-emerald-700 mb-4">
              What We Offer
            </h3>
            <p className="text-gray-700 leading-relaxed">
              From spicy street snacks to gourmet main courses, we offer a wide range of
              freshly prepared meals. Whether you're craving Indian, Chinese, continental,
              or something quick and comforting — we’ve got your hunger covered.
            </p>
          </div>
          <img
            src={kitchenStaff}
            alt="Kitchen Staff"
            className="w-full rounded-2xl shadow-md object-cover"
          />
        </div>

        {/* Section 3 - How We Operate */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-emerald-700 mb-4 text-center">
            How We Operate
          </h3>
          <p className="text-gray-700 text-center max-w-3xl mx-auto leading-relaxed">
            Our user-friendly website and fast delivery system ensure you get hot,
            fresh food — quickly and hassle-free. We collaborate with local restaurants
            and trained delivery partners to bring meals to your door with care.
          </p>
        </div>

        {/* Section 4 - Why Choose Us */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-emerald-700 mb-4 text-center">
            Why Choose Us
          </h3>
          <p className="text-gray-700 text-center max-w-3xl mx-auto leading-relaxed">
            What makes us different? We prioritize quality, affordability, and exceptional
            customer service. With every order, we aim to give you a smooth, satisfying
            experience that keeps you coming back.
          </p>
        </div>

        {/* Section 5 - Closing Note */}
        <div className="text-center">
          <p className="text-gray-800 font-medium">
            Thank you for choosing <span className="text-emerald-600 font-semibold">beFoodie</span>.
            We're here to serve happiness — one meal at a time.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
