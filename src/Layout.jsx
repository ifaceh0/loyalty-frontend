import React from 'react'
import Header from './components/Header/Header'
import Footer from './Footer.jsx'
import { Outlet } from 'react-router-dom' 
import { useLocation } from 'react-router-dom';

function Layout() {
  const location = useLocation();
  
  const hideFooter = location.pathname.startsWith('/user/dashboard') ||
                     location.pathname.startsWith('/shopkeeper/dashboard') ||
                     location.pathname.startsWith('/employee/dashboard');
  return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 overflow-hidden">
          <Outlet />
        </div>
        {!hideFooter && <Footer />}
    </div>
  );
};

export default Layout
