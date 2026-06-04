import React from 'react'

export default function Dashboard(){
  return (
    <section>
      <h1 style={{fontSize:22,color:'#10b981',marginBottom:12}}>Dashboard</h1>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:12}}>
        <div className="card">
          <h3 style={{margin:0}}>Total Orders</h3>
          <p style={{fontSize:20,fontWeight:700}}>—</p>
        </div>
        <div className="card">
          <h3 style={{margin:0}}>Active Products</h3>
          <p style={{fontSize:20,fontWeight:700}}>—</p>
        </div>
        <div className="card">
          <h3 style={{margin:0}}>Today's Revenue</h3>
          <p style={{fontSize:20,fontWeight:700}}>—</p>
        </div>
      </div>
    </section>
  )
}
