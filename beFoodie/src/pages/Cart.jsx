import React from 'react';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import axios from 'axios'

function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();

    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center fs-3'>The Cart is Empty !! </div>
            </div>
        )
    }
    const handleCheckOut = async ()=> {
        let userEmail = localStorage.getItem("userEmail")
        console.log("This is the User Email : ", userEmail)
        let response = await fetch("http://localhost:5000/api/orderdata", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email: userEmail,
                orderData: data,
                date: new Date().toDateString()
            })
        })
        console.log("Order Response:", response);
        if(response.status === 200) {
            dispatch({type:"DROP"})
        }
    }

    // const handleCheckOut = async (req, res)=>  {
    //     e.preventDefault();
    //     let userEmail = localStorage.getItem("")
    //     try {
    //       const response = await axios.post("http://localhost:5000/api/createuser", {
    //         email: 
    //       });
    //       console.log(response.data);
    //       if (!response.data.success) {
    //         alert("Enter valid credentials");
    //       }
    //       else {
    //         navigate("/");
    //       }
    //     } catch (error) {
    //       console.error("Error:", error);
    //       alert("An error occurred while submitting the form");
    //     }
    // }



    
    // Calculate total price
    let totalPrice = data.reduce((total, food) => total + food.price, 0);

    return (
        <>
            <div>
                <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
                    <table className="table table-hover">
                        <thead className="text-success fd-4">
                            <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>Name</th>
                                <th scope='col'>Quantity</th>
                                <th scope='col'>Option</th>
                                <th scope='col'>Amount</th>
                                <th scope='col'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((food, index) => (
                                <tr key={index}>
                                    <th scope='row'>{index + 1}</th>
                                    <td>{food.name}</td>
                                    <td>{food.qty}</td>
                                    <td>{food.size}</td>
                                    <td>{food.price}</td>
                                    <td>
                                        <button type='button' className='btn p-0' onClick={() => dispatch({ type: "REMOVE", index: index })}>
                                            Del
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Display total price */}
                    <div className="text-end">
                        <strong>Total Price: Rs.{totalPrice}/-</strong>
                    </div>

                    <div>
                        <button className='btn bg-success mt-5' onClick={handleCheckOut}>Check Out</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart;
