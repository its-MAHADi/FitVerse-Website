import React from 'react'
import Footer from '../pages/Shared/Footer/Footer'
import { Outlet } from 'react-router'
import StickyNavbar from '../pages/Shared/Navbar/StickyNavbar'

const RootLayout = () => {
  return (
    <div className='max-w-7xl mx-auto'>
      <StickyNavbar></StickyNavbar>
     <div className='min-h-[calc(100vh-471px)] max-w-7xl mx-auto'>
       <Outlet></Outlet>
     </div>
      <Footer></Footer>
    </div>
  )
}

export default RootLayout
