import React from 'react'
import Header from './components/Header/Header'
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
    </div>
  );
};

export default Layout
