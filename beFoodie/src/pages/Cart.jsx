import React from 'react';
import { useCart, useDispatchCart } from '../components/ContextReducer';

function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();

    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center fs-3'>The Cart is Empty !! </div>
            </div>
        );
    }

    let totalPrice = data.reduce((total, food) => total + food.price, 0);
    let userEmail = localStorage.getItem("userEmail");

    const handleCheckOut = async () => {
        try {
            // First, post to the checkout API to get the order details
            const checkoutResponse = await fetch("http://localhost:5000/api/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ totalPrice })
            });

            const { order } = await checkoutResponse.json();

            // Next, get the Razorpay key
            const keyResponse = await fetch("http://localhost:5000/api/getkey");
            const { key } = await keyResponse.json();
            console.log("Order created : ", order);

            const options = {
                key: key,
                amount: order.amount,
                currency: "INR",
                name: "Shovan Nath",
                description: `You have ordered food worth Rs. ${totalPrice}`,
                image: "https://i.pinimg.com/564x/1c/b2/73/1cb2738b9cf909d4507298a6052c5761.jpg",
                order_id: order.id,
                callback_url: "http://localhost:5000/api/paymentverification",
                prefill: {
                    name: "You",
                    email: "gaurav.kumar@example.com",
                    contact: "9000090000"
                },
                notes: {
                    "address": "Razorpay Corporate Office"
                },
                theme: {
                    color: "#121212"
                }
            };

            const razor = new window.Razorpay(options);
            razor.open();
        } catch (error) {
            console.error("Error during checkout:", error);
            // Handle error here
        }

        try {
            // After successful payment, post the order data
            const orderResponse = await fetch("http://localhost:5000/api/orderdata", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: userEmail,
                    orderData: data,
                    date: new Date().toDateString()
                })
            });

            if (orderResponse.ok) {
                dispatch({ type: "DROP" });
            }
        } catch (error) {
            console.log("Cart.jsx line 83 ", error);
        }
    };

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
    );
}

export default Cart;
