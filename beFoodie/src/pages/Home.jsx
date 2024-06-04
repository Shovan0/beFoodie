import React, { useState, useEffect } from 'react';
import './Home.css'
import Card from '../components/Card';

function Navbar() {
  const [foodItem, setFoodItem] = useState([]);
  const [foodCatagory, setFoodCatagory] = useState([]);

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/fooddata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });
      response = await response.json();
      setFoodItem(response[0]);
      setFoodCatagory(response[1]);
      } 
      catch (error) {
        console.error("Error loading data:", error);
    }
  } 

  useEffect(() => {

    loadData();
  }, []);

  return (
    <>
    {/* <Header /> */}
    <div class="flex justify-center">
    <div class="inline-block">
          <img 
            src="https://images.pexels.com/photos/941869/pexels-photo-941869.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Food" 
            className="rounded-xl h-[80vh]"
            style={{ animationName: 'fadeIn', animationDuration: '1s' }}
          />
          {/* <div className='absolute bottom-0 left-0 p-4 text-white bg-opacity-50 rounded-t-lg' style={{ animationName: 'fadeIn', animationDuration: '3s' }}>
            <h2 className="font-medium text-[4.5vw] text-white bg-opacity-50">
              Order your food from here
            </h2>
            <button className="border-none text-[#000000] font-medium px-[1vw] py-[1.5vw] bg-white text-[1vw] rounded-[50px]">
              Show Menu
            </button>
          </div> */}
    </div>
    </div>
    <div className="">
  {foodCatagory && foodCatagory.length > 0 ? (
    foodCatagory.map((category, index) => (
      <div key={index} className="my-6">
        <div className="text-center text-2xl font-bold mb-4">{category.CategoryName}</div>
        <hr className="mb-6" />
        <div className="flex flex-wrap justify-center gap-6">
          {foodItem && foodItem.length > 0 ? 
            foodItem.filter((item) => item.CategoryName === category.CategoryName)
              .map((filterItem) => (
                <div key={filterItem._id} className="w-full md:w-1/2 lg:w-1/4 p-3">
                  <Card foodItem={filterItem} options={filterItem.options[0]} />
                </div>
              ))
            : (
              <div className="w-full text-center">No such data found</div>
            )}
        </div>
      </div>
    ))
  ) : (
    <div className="text-center">No categories found</div>
  )}
</div>

    </>
  )
}

export default Navbar