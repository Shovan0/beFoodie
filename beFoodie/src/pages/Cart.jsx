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
    let totalPrice = data.reduce((total, food) => total + food.price, 0);
    let userEmail = localStorage.getItem("userEmail")
    const handleCheckOut = async ()=> {
        try {
            console.log(window);
            const { data: { order } } = await axios.post("http://localhost:5000/api/checkout", {
                totalPrice
            });
            const { data: { key } } = await axios.get("http://localhost:5000/api/getkey");
            const options = {
                key: key, // Enter the Key ID generated from the Dashboard
                amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                currency: "INR",
                name: "Shovan Nath", // your business name
                description: `You have ordered food worth Rs. ${totalPrice}`,
                image: "https://i.pinimg.com/564x/1c/b2/73/1cb2738b9cf909d4507298a6052c5761.jpg",
                order_id: order.id, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                callback_url: "http://localhost:5000/api/paymentverification",
                prefill: { // We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                    name: "You", // your customer's name
                    email: "gaurav.kumar@example.com",
                    contact: "9000090000" // Provide the customer's phone number for better conversion rates 
                },
                notes: {
                    "address": "Razorpay Corporate Office"
                },
                theme: {
                    "color": "#121212"
                }
            };
            const razor = new window.Razorpay(options);
            razor.open();
        } catch (error) {
            console.error("Error during checkout:", error);
            // Handle error here
        }


















        try {
            let response = await axios.post("http://localhost:5000/api/orderdata", {
                email: userEmail,
                orderData: data,
                date: new Date().toDateString()
            });
            console.log("Order Response:", response);
            
            if (response && response.status === 200) {
                dispatch({type: "DROP"});
            }
        } catch (error) {
            console.log("Cart.jsx line 83 ", error);
        }
        
    }
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