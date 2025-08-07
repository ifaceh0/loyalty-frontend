import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Layout.jsx'
import Features from './components/Features/Features.jsx'
import Home from './components/Home/Home.jsx'
//import Subscription from './components/Subscription/Subscription.jsx'
// ✅ CORRECT
import {Subscription} from "global-subscription"; // ✅ Correct




import Resources from './components/Resources/Resources.jsx'
import Contact from './components/Contact/Contact.jsx'
import Userdashboard from './components/Dashboards/Userdashboard.jsx'
import ForgotPassword from './components/Forget_pass/ForgotPassword.jsx'
import ResetPassword from './components/Reset_pass/ResetPassword.jsx'

import Signin from './components/Signin/Signin.jsx'
import Shopkeeper from './components/Signup/Shopkeeper.jsx'
import User from './components/Signup/User.jsx'
import Shopdashboard from './components/Dashboards/Shopdashboard.jsx'
import CustomerLookup from './components/Customer/CustomerLookup.jsx'
import QrScanner from './components/Customer/QrScanner.jsx';
import ShopkeeperProfile from './components/Shopkeeper_profile/Shopkeeper_profile.jsx'
import { SidebarProvider } from './context/SidebarContext.jsx';
import SubscriptionDashboard from './components/Subscription/SubscriptionDashboard.jsx';
import UserShopList from './components/ShopList/UserShopList.jsx';

const router = createBrowserRouter([
   {
    path:'/',
    element: <Layout/>,
    children:[
      {
        path:"",
        element:<Home/>
      },
      {
        path:"features",
        element:<Features/>
      },
      {
        path:"subscription",
        element:<Subscription/>
      },
      {
        path:"resources",
        element:<Resources/>
      },
      {
        path:"contact",
        element:<Contact/>
      },
      {
        path:"signup-shopkeeper",
        element:<Shopkeeper/>
      },
      {
        path: "/shopkeeper/customer-lookup",
        element: <CustomerLookup />
      },
      {
        path: "/shopkeeper/qr-scanner",
        element: <QrScanner />
      },
      {
        path:"signup-user",
        element:<User/>
      },
      {
        path:"signin",
        element:<Signin/>
      },
      {
        path:"/user/dashboard",
        element:<Userdashboard/>
      },
      {
        path:"/shopkeeper/dashboard",
        element:<Shopdashboard/>
      },

      {
        path:"/forgot-password",
        element:<ForgotPassword/>
      },

      {
        path:"/reset-password",
        element:<ResetPassword/>
      },

      {
        path:"/shopkeeper/profile",
        element:<ShopkeeperProfile/>
      },

      {
        path:"/shopkeeper/subscription-dashboard",
        element:<SubscriptionDashboard/>
      },

      {
        path:"shop-list",
        element:<UserShopList/>
      }

    ]

   }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
   {/* <RouterProvider router={router}/> */}
   <SidebarProvider>
      <RouterProvider router={router} />
    </SidebarProvider>
  </StrictMode>,
)
