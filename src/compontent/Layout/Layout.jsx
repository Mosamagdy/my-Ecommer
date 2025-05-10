import React from 'react'
import Navdar from '../Navbar/Navdar'

import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div>
    <Navdar/>
     <Outlet/>
    

    </div>
  )
}
