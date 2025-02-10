import React from 'react'
import Navbar from './Navbar'
import Dashboard from './Dashboard'

function Layout() {
  return (
    <>
       <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
     <Dashboard/>
    </div>
    </>
  )
}

export default Layout
