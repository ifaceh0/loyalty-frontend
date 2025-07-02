import React from 'react'
import Header from './components/Header/Header'
import Footer from './Footer.jsx'
import { Outlet } from 'react-router-dom' 

function Layout() {
  return (
    // <>
    //   <Header/>
    //   <Outlet/>
    // </>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 overflow-hidden">
          <Outlet />
        </div>
        <Footer />
    </div>
  );
};

export default Layout
