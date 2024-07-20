import React from 'react';
import { useCart, useDispatchCart } from '../components/ContextReducer';

function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();

    if (data.length == 0) {
        return (
            <>
                <Header />
                <div className='flex items-center justify-center min-h-screen bg-red-200'>
                    <div className='text-center text-lg font-bold text-red-800'>
                        The Cart is Empty!!
                    </div>
                </div>
                <Footer />
            </>
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
        } catch (error) {
            console.error("Error during checkout:", error);
            // Handle error here
        }
    };

    return (
        <>
            <div className='flex items-center min-h-[80vh]'>
                <div className='container mx-auto p-6 bg-white rounded-lg shadow-lg'>
                    <div className='overflow-x-auto'>
                        <table className="table-auto w-full text-left rounded-lg overflow-hidden">
                            <thead className="bg-red-500 text-white">
                                <tr>
                                    <th className='px-4 py-2'>#</th>
                                    <th className='px-4 py-2'>Name</th>
                                    <th className='px-4 py-2'>Quantity</th>
                                    <th className='px-4 py-2'>Option</th>
                                    <th className='px-4 py-2'>Amount</th>
                                    <th className='px-4 py-2'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((food, index) => (
                                    <tr key={index} className="hover:bg-red-50">
                                        <td className='border px-4 py-2'>{index + 1}</td>
                                        <td className='border px-4 py-2'>{food.name}</td>
                                        <td className='border px-4 py-2'>{food.qty}</td>
                                        <td className='border px-4 py-2'>{food.size}</td>
                                        <td className='border px-4 py-2'>Rs.{food.price}</td>
                                        <td className='border px-4 py-2 text-center'>
                                            <button
                                                type='button'
                                                className='text-red-500 hover:text-red-700'
                                                onClick={() => dispatch({ type: "REMOVE", index: index })}
                                            >
                                                Del
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-4 text-right">
                        <div className='text-lg font-bold text-red-600'>Total Price: Rs.{totalPrice}/-</div>
                    </div>
                    <div className='flex justify-end mt-6'>
                        <button
                            className='bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600'
                            onClick={handleCheckOut}
                        >
                            Check Out
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cart;
