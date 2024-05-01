import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MyOrder = () => {

  // const fetchMyOrder = async () => {
  //   try {
  //     const response = await fetch("http://localhost:5000/api/myorderdata", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({
  //         email: localStorage.getItem("userEmail")
  //       })
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       setOrderData(data.orderData);
  //     } else {
  //       console.error("Failed to fetch order data:", response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching order data:", error);
  //   }
  // }

  // useEffect(() => {
  //   fetchMyOrder();
  // }, []);

  return (
    <>
      <Header />
      
      <Footer />
    </>
  );
}

export default MyOrder;























// import React, { useEffect, useState } from 'react';
// import Header from '../components/Header';
// import Footer from '../components/Footer';

// const MyOrder = () => {
//   const [orderData, setOrderData] = useState("")
//   const fetchMyOrder = async () => {
//     console.log(localStorage.getItem("userEmail"));
//     await fetch("http://localhost:5000/api/myorderdata",{
//       // credentials:"include",
//       // Origin:"http://localhost:5173/login"
//       method:"POST",
//       headers:{
//         "Content-Type":"application/json"
//       },
//       body: JSON.stringify({
//         email: localStorage.getItem("userEmail")
//       })
//     }).then(async (res)=> {
//       let response = await res.json()
//       await setOrderData(response)
//     })
//   }
//   useEffect(()=>{
//     fetchMyOrder()
//   },[])
//   return (
//     <>
//     <div><Header /></div>

//     <div className='container'>
//       <div className='row'>

//         {orderData != {} ? Array(orderData).map(data => {
//           return (
//             data.orderData ?
//               data.orderData.orderData.slice(0).reverse().map((item)=> {
//                 return (
//                   item.map((arrayData)=> {
//                     return (
//                       <div>
//                         <div className='m-auto mt-5'>
//                           Date should be there
//                           <hr />
//                         </div>
//                         <div className='col-12 col-md-6 col-lg-3'>
//                             <div className='card mt-3' style={{width:"16rem", maxHeight:"360px"}}>
//                               img
//                               <div className="card-body">
//                                 <h5 className="card-title">{arrayData.name}</h5>
//                                 <div className="container w-100 p-0" style={{height:"38px"}}>
//                                   <span className='m-1'>{arrayData.qty}</span>
//                                   <span className='m-1'>{arrayData.size}</span>
//                                   <span className='m-1'>{data}</span>
//                                   <div className='d-inline ms-2 h-100 w-20 fs-5'>
//                                       Rs.{arrayData.price}/-
//                                   </div>
//                                 </div>
//                               </div>

//                             </div>
//                         </div>
//                       </div>
//                     )
//                   })
//                 )
//               })
//               :""
//           )
//         })
        
//         :""

//         }
//       </div>

//     </div>

//     <div></div>





    
//     </>
//   )
// }

// export default MyOrder































// import React, { useState, useEffect, useCallback } from 'react';
// import Header from '../components/Header';
// import Footer from '../components/Footer';

// function MyOrder() {
//   const [orderData, setOrderData] = useState([]);

//   const fetchOrderData = useCallback(async () => {
//     const userEmail = localStorage.getItem("userEmail");
//       if (!userEmail) {
//         console.error("User email not found in localStorage");
//         return;
//       }
    
//       try {
//         const response = await fetch("http://localhost:5000/api/myorderdata", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify({
//             email: userEmail
//           })
//         });
      
//         if (response.ok) {
//           const data = await response.json();
//           setOrderData(data);
//           console.log("MyOrder.js line 29",orderData);
//         } else {
//           console.error("Failed to fetch order data:", response.statusText);
//         }
//       } catch (error) {
//         console.error("Error fetching order data:", error);
//       }


//     // try {
//     //   const response = await fetch("http://localhost:5000/api/myorderdata");
//     //   console.log("MyOrder.jsx line 11", response)
//     //   if (response.ok) {
//     //     const data = await response.json();
//     //     setOrderData(data);
//     //   } else {
//     //     console.error("Failed to fetch order data:", response.statusText);
//     //   }
//     // } catch (error) {
//     //   console.error("Error fetching order data:", error);
//     // }
//   }, []);

//   useEffect(() => {
//     fetchOrderData();
//   }, []);

//   return (
//     <>
//       <Header />
//       <div className="container">
//         <h2>My Orders</h2>
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Item</th>
//               <th>Quantity</th>
//               <th>Size</th>
//               <th>Price</th>
//               <th>Image</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orderData.map((order, index) => (
//               <tr key={index}>
//                 <td>{order.name}</td>
//                 <td>{order.qty}</td>
//                 <td>{order.size}</td>
//                 <td>${order.price}</td>
//                 <td><img src={order.img} alt={order.name} style={{width: '100px'}} /></td>
//               </tr>
//             ))}
//               {/* <tr>
//                 <td>{orderData.name}</td>
//                 <td>{orderData.qty}</td>
//                 <td>{orderData.size}</td>
//                 <td>${orderData.price}</td>
//                 <td><img src={orderData.img} alt={orderData.name} style={{width: '100px'}} /></td>
//               </tr> */}
//           </tbody>
//         </table>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default MyOrder;
// 47