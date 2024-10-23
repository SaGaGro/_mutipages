import { Outlet } from 'react-router'

import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import Navbar from '../Navbar/Navbar'
import React from 'react'
import './Layout.css'


function Layout({tab, setTab, products, carts, setToken}) {
  return (
    <div>
        <Header></Header>
        <Navbar products={products} carts={carts} tab={tab} setTab={setTab} setToken={setToken}></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}

export default Layout