import React, { useState, useEffect } from 'react';
import './Home.css'
import Card from '../components/Card';

function Navbar() {
  const [foodItem, setFoodItem] = useState([]);
  const [foodCategory, setFoodCategory] = useState([]);

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
      setFoodCategory(response[1]);
      // console.log(response[1]);
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
    <div class="flex justify-center">
    <div class="inline-block">
          <img 
            src="https://images.pexels.com/photos/941869/pexels-photo-941869.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Food" 
            className="rounded-xl h-[80vh]"
            style={{ animationName: 'fadeIn', animationDuration: '1s' }}
          />
    </div>
    </div>
    <div className="">
  {foodCategory && foodCategory.length > 0 ? (
    foodCategory.map((category, index) => (
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