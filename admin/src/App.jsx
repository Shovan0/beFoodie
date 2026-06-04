import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Dashboard from './pages/Dashboard'

export default function App(){
  return (
    <div className="app-root">
      <Header />
      <main className="container">
        <Dashboard />
      </main>
      <Footer />
    </div>
  )
}
