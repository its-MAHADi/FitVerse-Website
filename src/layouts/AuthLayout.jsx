
import React from 'react'
import { Outlet } from 'react-router'
import StickyNavbar from '../pages/Shared/Navbar/StickyNavbar'

const AuthLayout = () => {
  return (
   <div>
     <header>
        <StickyNavbar></StickyNavbar>
     </header>
     <main>
        <Outlet></Outlet>
     </main>
   </div>
  )
}

export default AuthLayout
