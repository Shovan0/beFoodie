import React, { useEffect, useRef, useState } from 'react'
import {useCart, useDispatchCart} from "./ContextReducer"
import { Link } from 'react-router-dom';

function Card(props) {
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  let priceref = useRef();
  let data = useCart();
  let dispatch = useDispatchCart();
  let options = props.options;
  let priceOptions = Object.keys(options)
  
  const foodItem = props.foodItem;
  const handleAddToCart = async ()=> {
    // let food = [];
    // for(const item of data)  {
    //   if(data._id === props.foodItem._id) {
    //     food = item;
    //     break;
    //   }
    // }
    // if(food != []) {
    //   console.log("Card.jsx line 24");
    //   if(food.size === size)  {
    //     console.log("Card.jsx line 26")
    //     await dispatch({
    //       type: "UPDATE",
    //       item: {
    //         id: props.foodItem._id, price: finalPrice, qty: qty
    //       }
    //     })
    //   }
    // }
    // else  {
    //   await dispatch({
    //   type: "ADD",
    //   item: {
    //       _id: foodItem._id, 
    //       name: foodItem.name, 
    //       qty: qty, 
    //       size: size, 
    //       price: finalPrice, 
    //       img: foodItem.img 
    //   }
    // });
  // }
  await dispatch({
    type: "ADD",
    item: {
        _id: foodItem._id, 
        name: foodItem.name, 
        qty: qty, 
        size: size, 
        price: finalPrice, 
        img: foodItem.img 
    }
  });
    console.log(data);
  }
  

  let finalPrice = qty * parseInt(options[size]);
  useEffect(()=>{
    setSize(priceref.current.value)
  })
  return (
    <>
    <div className="card m-3" style={{ "width": "18rem", "maxHeight":"380px" }}>
      <img src={props.foodItem.img} className="card-img-top" alt="..." style={{height:"200px", objectFit:"fill"}}/>
      <div className="card-body">
        <h5 className="card-title">{props.foodItem.name}</h5>
        <p className="card-text">This is description.</p>
        <div className="container w-100">
            <select className="m-2 h-100 bg-success rounded" onChange={(e)=> setQty(e.target.value)}>
                {Array.from(Array(6), (e,i)=>{
                    return (
                        <option key={i+1} value={i+1}>{i+1}</option>
                    )
                })}
            </select>
            <select className='m-2 h-100 bg-success rounded' ref={priceref} onChange={(e)=> setSize(e.target.value)}>
              {
                priceOptions.map((data)=>{
                  return (
                    <option key={data} value={data}>{data}</option>
                  )
                })
              }
            </select>
            <div className='d-inline h-100 fs-5'>
              Rs.{finalPrice}/-
              {(localStorage.getItem("authToken"))?
              <div>
                <button className='bg-success text-white' onClick={handleAddToCart}>Add To Cart</button>
              </div>
              :
              <div>
                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
              </div>
              }
            </div>
        </div>
      </div>
    </div>

    </>
  )
}

export default Card