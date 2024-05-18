import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Carousel from '../components/Carousel';

function Home() {
  
  const [foodItem, setFoodItem] = useState([]);
  const [foodCatagory, setFoodCatagory] = useState([]);

  // localStorage.removeItem("authToken")

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
      <Header />
            <div className="container">
            {foodCatagory && foodCatagory.length > 0 ? (
        foodCatagory.map((category, index) => (
          <div key={index} className='row mb-3'>
            <div className='fs-4'>{category.CategoryName}</div>
            <hr />
            {foodItem && foodItem.length > 0 ? 
              foodItem.filter((item) => item.CategoryName === category.CategoryName)
                .map((filterItem) => (
                  <div key={filterItem._id} className='m-3 col-12 col-md-6 col-lg-3'>
                    <Card foodItem={filterItem} options={filterItem.options[0]} />
                  </div>
                ))
              : (
                <div>No such data found</div>
              )}
          </div>
        ))
      ) : (
        <div>No categories found</div>
      )}

      </div>
      <Footer />
    </>
  );
}

export default Home;
