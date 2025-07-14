import React from 'react'
import { Outlet } from 'react-router'
import { StickyNavbar } from '../../pages/Shared/Navbar/StickyNavbar'

const RootLayout = () => {
  return (
    <div>
       <StickyNavbar></StickyNavbar>
      <Outlet></Outlet>
    </div>
  )
}

export default RootLayout
