import React from 'react'
import { Outlet } from 'react-router'
import { StickyNavbar } from '../../pages/Shared/Navbar/StickyNavbar'
import Footer from '../../pages/Shared/Footer/Footer'

const RootLayout = () => {
  return (
    <div className='max-w-7xl mx-auto'>
       <StickyNavbar></StickyNavbar>
     <div className='min-h-[calc(100vh-461px)] mx-auto'>
       <Outlet></Outlet>
     </div>
      <Footer></Footer>
    </div>
  )
}

export default RootLayout
