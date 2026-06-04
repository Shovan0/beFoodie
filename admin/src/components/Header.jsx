import React from 'react'

export default function Header(){
  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="brand">beFoodie Admin</div>
        <div className="nav-actions">
          <button className="btn">Dashboard</button>
          <button className="btn">Orders</button>
          <button className="btn">Products</button>
        </div>
      </div>
    </header>
  )
}
