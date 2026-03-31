import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Layout.jsx'
import Features from './components/Features/Features.jsx'
import Home from './components/Home/Home.jsx'
import {Subscription} from "global-subscription";
import ProtectedRoute from "./auth/ProtectedRoute";
import PublicRoute from "./auth/PublicRoute";




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
import EmployeeSignupPage from './components/Signup/EmployeeSignupPage.jsx';
import InviteEmployeePage from './components/Employee/InviteEmployeePage.jsx';
import DailyTransactionReport from './components/Customer/DailyTransaction.jsx'
import ShopkeeperGuide from './components/Home/ShopkeeperGuide.jsx'
import InactiveShopsPage from './components/Employee/InactiveShopsPage.jsx'
import EmployeeDashboard from './components/Dashboards/EmployeeDashboard.jsx';
import AdminSupportInbox from './components/Contact/AdminSupportInbox.jsx';
import PrivacyPolicy from './components/policy/PrivacyPolicy.jsx';
import TermsOfService from './components/policy/TermsOfService.jsx';
import FAQPage from './components/policy/FAQPage.jsx';
import ShopDetails from './components/ShopList/ShopDetails.jsx';

import './i18n';

const router = createBrowserRouter([
   {
    path:'/',
    element: <Layout/>,
    children:[
      {path:"",element:<Home/>},
      {
        path: "/shopkeeper/customer-lookup",
        element: (
          <ProtectedRoute allowedRoles={["SHOPKEEPER"]}>
            <CustomerLookup />
          </ProtectedRoute>
        )
      },
      {
        path: "/shopkeeper/qr-scanner",
        element: (
          <ProtectedRoute allowedRoles={["SHOPKEEPER"]}>
            <QrScanner />
          </ProtectedRoute>
        )
      },
      {
        path:"/shopkeeper/dashboard",
        element: (
          <ProtectedRoute allowedRoles={["SHOPKEEPER"]}>
            <Shopdashboard />
          </ProtectedRoute>
        )
      },
      {
        path:"/shopkeeper/profile",
        element: (
          <ProtectedRoute allowedRoles={["SHOPKEEPER"]}>
            <ShopkeeperProfile/>
          </ProtectedRoute>
        )
      },
      {
        path:"/shopkeeper/subscription-dashboard",
        element: (
          <ProtectedRoute allowedRoles={["SHOPKEEPER"]}>
            <SubscriptionDashboard/>
          </ProtectedRoute>
        )
      },
      {
        path:"/shopkeeper/invite-employee",
        element: (
          <ProtectedRoute allowedRoles={["SHOPKEEPER"]}>
            <InviteEmployeePage/>
          </ProtectedRoute>
        )
      },
      {
        path:"/shopkeeper/daily-transaction-report",
        element: (
          <ProtectedRoute allowedRoles={["SHOPKEEPER"]}>
            <DailyTransactionReport/>
          </ProtectedRoute>
        )
      },
      {
        path:"/user/dashboard",
        element: (
          <ProtectedRoute allowedRoles={["USER"]}>
            <Userdashboard />
          </ProtectedRoute>
        )
      },
      {
        path:"/user/dashboard/:shopId",
        element: (
          <ProtectedRoute allowedRoles={["USER"]}>
            <ShopDetails />
          </ProtectedRoute>
        )
      },
      {
        path:"/employee/inactive-shops",
        element: (
          <ProtectedRoute allowedRoles={["EMPLOYEE"]}>
            <InactiveShopsPage/>
          </ProtectedRoute>
        )
      },
      {
        path:"/employee/dashboard",
        element: (
          <ProtectedRoute allowedRoles={["EMPLOYEE"]}>
            <EmployeeDashboard />
          </ProtectedRoute>
        )
      },
      {
        path:"signin",
        element: (
          <PublicRoute>
            <Signin />
          </PublicRoute>
        )
      },
      {path:"/employee/signup",element:<EmployeeSignupPage/>},
      {path:"/forgot-password",element:<ForgotPassword/>},
      {path:"/reset-password",element:<ResetPassword/>},
      {path:"signup-user",element:<User/>},
      {path:"features",element:<Features/>},
      {path:"subscription",element:<Subscription/>},
      {path:"resources",element:<Resources/>},
      {path:"contact",element:<Contact/>},
      {path:"signup-shopkeeper",element:<Shopkeeper/>},
      {path:"/support-inbox",element:<AdminSupportInbox/>},
      {path:"onboarding-guide",element:<ShopkeeperGuide/>},
      {path:"/privacy",element:<PrivacyPolicy/>},
      {path:"/terms", element:<TermsOfService/>},
      {path:"/faq", element:<FAQPage/>}
    ]
   }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <SidebarProvider>
      <RouterProvider router={router} />
    </SidebarProvider>
  </StrictMode>,
)
