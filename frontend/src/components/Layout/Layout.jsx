import React from 'react'
import Navbar from '../Navbar/Navbar.jsx'
import { Outlet } from 'react-router-dom'
import Footer from '../footer/footer.jsx'

function Layout() {
  return (
    <div>
     <Navbar/>
     <Outlet/>
     <Footer/>
    </div>
  )
}

export default Layout
