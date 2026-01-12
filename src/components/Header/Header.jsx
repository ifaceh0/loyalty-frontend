// import { useState, useEffect } from 'react';
// import {
//   Link,
//   NavLink,
//   useLocation,
//   useNavigate,
// } from 'react-router-dom';
// import { FaUser, FaSignOutAlt } from 'react-icons/fa';
// import { Menu, X, LayoutDashboard, List,PanelRightOpen } from 'lucide-react';
// import { useSidebar } from '../../context/SidebarContext';

// const LOGOUT_API =
//   'https://loyalty-backend-java.onrender.com/api/auth/logout';

// export default function Header() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userName, setUserName] = useState('');
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const location = useLocation();
//   const navigate = useNavigate();
//   const { setSidebarOpen } = useSidebar();

//   useEffect(() => {
//     const login = localStorage.getItem('isLoggedIn') === 'true';
//     setIsLoggedIn(login);
//     const name = localStorage.getItem('name');
//     if (name) setUserName(name);
//     setMobileMenuOpen(false);
//   }, [location]);

//   const handleLogout = async () => {
//     try {
//       await fetch(LOGOUT_API, { method: 'POST', credentials: 'include' });
//     } catch (e) {
//       console.error(e);
//     } finally {
//       localStorage.removeItem('isLoggedIn');
//       localStorage.removeItem('id');
//       localStorage.removeItem('name');
//       localStorage.removeItem('CompanyEmail');
//       navigate('/signin');
//       setMobileMenuOpen(false);
//     }
//   };

//   const navLinkClasses = ({ isActive }) =>
//     `relative px-3 py-2 rounded-md transition-all duration-200 font-medium
//      ${isActive
//        ? 'text-white bg-emerald-500'
//        : 'text-black hover:text-emerald-600'
//      }`;

//   // Mobile Drawer for GUEST
//   const GuestMobileDrawer = () => (
//     <div className="flex flex-col gap-4 p-4">
//       <NavLink to="/" className={navLinkClasses} onClick={() => setMobileMenuOpen(false)}>
//         Home
//       </NavLink>
//       <NavLink to="/features" className={navLinkClasses} onClick={() => setMobileMenuOpen(false)}>
//         Features
//       </NavLink>
//       {/* <a
//         href="https://subscription-frontend-psi.vercel.app/subscription"
//         className="px-3 py-2 rounded-md text-black hover:text-white hover:bg-emerald-500 transition font-medium"
//         onClick={() => setMobileMenuOpen(false)}
//       >
//         Subscription
//       </a> */}
//       <NavLink to="/resources" className={navLinkClasses} onClick={() => setMobileMenuOpen(false)}>
//         Resources
//       </NavLink>
//       <NavLink to="/onboarding-guide" className={navLinkClasses} onClick={() => setMobileMenuOpen(false)}>
//         How It Works
//       </NavLink>
//       <NavLink to="/contact" className={navLinkClasses} onClick={() => setMobileMenuOpen(false)}>
//         Contact
//       </NavLink>

//       <div className="mt-4">
//         <p className="font-medium text-gray-700 mb-1">Sign up as</p>
//         <div className="flex flex-col gap-1">
//           <NavLink
//             to="/signup-shopkeeper"
//             className="px-3 py-2 text-sm text-emerald-700 hover:bg-emerald-200 rounded-md font-medium"
//             onClick={() => setMobileMenuOpen(false)}
//           >
//             Shopkeeper
//           </NavLink>
//           <NavLink
//             to="/signup-user"
//             className="px-3 py-2 text-sm text-emerald-700 hover:bg-emerald-200 rounded-md font-medium"
//             onClick={() => setMobileMenuOpen(false)}
//           >
//             User
//           </NavLink>
//         </div>
//       </div>

//       <NavLink
//         to="/signin"
//         className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md text-sm px-5 py-2.5 transition shadow-md text-center"
//         onClick={() => setMobileMenuOpen(false)}
//       >
//         Sign in
//       </NavLink>
//     </div>
//   );

//   // Mobile Drawer for LOGGED-IN USER
//   const LoggedInMobileDrawer = () => (
//     <div className="flex flex-col gap-2 p-2">
//       <div className="flex items-center gap-3 p-2 border-b border-gray-200">
//         <FaUser className="w-6 h-6 text-emerald-600" />
//         <div>
//           <p className="font-semibold text-gray-800">{userName || 'User'}</p>
//           <p className="text-xs text-gray-500">Welcome back!</p>
//         </div>
//       </div>

//       <button
//         onClick={() => {
//           setSidebarOpen(true);
//           setMobileMenuOpen(false);
//         }}
//         className="text-left px-3 py-2 text-emerald-700 hover:bg-emerald-100 rounded-md font-medium"
//       >
//         Open Dashboard
//       </button>

//       <button
//         onClick={handleLogout}
//         className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-md font-medium"
//       >
//         <FaSignOutAlt className="w-4 h-4" />
//         Logout
//       </button>
//     </div>
//   );

//   return (
//     <header className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-200">
//       <nav className="px-4 lg:px-8 py-2 flex items-center justify-between">
//         {/* Left: Logo or Hamburger */}
//         <div className="flex items-center">
//           {isLoggedIn ? (
//             <button
//               onClick={() => setSidebarOpen(true)}
//               className="text-blue-600 hover:text-blue-700 transition"
//             >
//               <List size={24} />
//             </button>
//           ) : (
//             <Link
//               to="/"
//               className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent drop-shadow-sm"
//             >
//               LoyaltyHub
//             </Link>
//           )}
//         </div>

//         {/* Desktop Navigation */}
//         <div className="hidden lg:flex items-center gap-6">
//           {!isLoggedIn && (
//             <>
//               <NavLink to="/" className={navLinkClasses}>Home</NavLink>
//               <NavLink to="/features" className={navLinkClasses}>Features</NavLink>
//               {/* <a
//                 href="https://subscription-frontend-psi.vercel.app/subscription"
//                 className="px-3 py-2.5 rounded-md text-black hover:text-white hover:bg-emerald-500 transition font-medium"
//               >
//                 Subscription
//               </a> */}
//               <NavLink to="/resources" className={navLinkClasses}>Resources</NavLink>
//               <NavLink to="/onboarding-guide" className={navLinkClasses}>How It Works</NavLink>
//               <NavLink to="/contact" className={navLinkClasses}>Contact</NavLink>
//             </>
//           )}
//         </div>

//         {/* Right: Auth + Mobile Toggle */}
//         <div className="flex items-center gap-4">
//           {/* Desktop Auth */}
//           <div className="hidden lg:flex items-center gap-4">
//             {!isLoggedIn ? (
//               <>
//                 <div className="relative group">
//                   <div className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium rounded-md text-sm px-5 py-2.5 cursor-pointer transition shadow-md">
//                     Sign up
//                   </div>
//                   <div className="absolute right-0 mt-2 bg-white rounded-md shadow-xl z-10 min-w-[160px] opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 border border-gray-200">
//                     <NavLink
//                       to="/signup-shopkeeper"
//                       className="block px-4 py-2.5 text-sm text-emerald-700 hover:bg-emerald-100 transition rounded-t-md"
//                     >
//                       Shopkeeper
//                     </NavLink>
//                     <NavLink
//                       to="/signup-user"
//                       className="block px-4 py-2.5 text-sm text-emerald-700 hover:bg-emerald-100 transition rounded-b-md"
//                     >
//                       User
//                     </NavLink>
//                   </div>
//                 </div>

//                 <NavLink
//                   to="/signin"
//                   className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md text-sm px-5 py-2.5 transition shadow-md"
//                 >
//                   Sign in
//                 </NavLink>
//               </>
//             ) : (
//               <div className="relative group">
//                 <button className="flex items-center space-x-2 focus:outline-none">
//                   <FaUser className="text-blue-600" />
//                   <span className="text-blue-600 font-medium">{userName || 'User'}</span>
//                 </button>

//                 <div className="hidden group-hover:block absolute top-full right-0 w-40 bg-white shadow-lg border rounded-md p-2">
//                   <button
//                     onClick={handleLogout}
//                     className="flex w-full items-center py-1 px-2 text-sm hover:bg-gray-100 text-left text-red-600"
//                   >
//                     <FaSignOutAlt className="mr-2" />
//                     <span>Logout</span>
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Mobile Menu Toggle */}
//           <button
//             onClick={() => setMobileMenuOpen((v) => !v)}
//             className="lg:hidden text-emerald-600 hover:text-emerald-700"
//           >
//             {mobileMenuOpen ? <X size={22} /> : <PanelRightOpen size={24} />}
//           </button>
//         </div>
//       </nav>

//       {/* MOBILE MENU – Always shown when open */}
//       {mobileMenuOpen && (
//         <div className="fixed inset-0 z-40 flex flex-col bg-white lg:hidden">
//           <div className="flex items-center justify-between p-4 border-b border-gray-200">
//             <p className="text-xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">LoyaltyHub</p>
//             <button
//               onClick={() => setMobileMenuOpen(false)}
//               className="text-emerald-600"
//             >
//               <X size={22} />
//             </button>
//           </div>

//           <div className="flex-1 overflow-y-auto px-2 py-2">
//             {isLoggedIn ? <LoggedInMobileDrawer /> : <GuestMobileDrawer />}
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }







//language select
import { useState, useEffect } from 'react';
import Flag from "react-flagkit";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import { Menu, X, List, PanelRightOpen, Globe } from 'lucide-react';
import { useSidebar } from '../../context/SidebarContext';

// ---- NEW: i18n ----
import { useTranslation } from 'react-i18next';
// ------------------

const LOGOUT_API =
  'https://loyalty-backend-java.onrender.com/api/auth/logout';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { setSidebarOpen } = useSidebar();
  const { t, i18n } = useTranslation(); // <-- i18n

  useEffect(() => {
    const login = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(login);
    const name = localStorage.getItem('name');
    if (name) setUserName(name);
    setMobileMenuOpen(false);
  }, [location]);

  // const handleLogout = async () => {
  //   try {
  //     await fetch(LOGOUT_API, { method: 'POST', credentials: 'include' });
  //   } catch (e) {
  //     console.error(e);
  //   } finally {
  //     localStorage.removeItem('isLoggedIn');
  //     localStorage.removeItem('id');
  //     localStorage.removeItem('name');
  //     localStorage.removeItem('CompanyEmail');
  //     navigate('/signin');
  //     setMobileMenuOpen(false);
  //   }
  // };

  // Updated handleLogout
  const handleLogout = async () => {
  
    localStorage.clear();
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; 

    navigate('/signin');
    setMobileMenuOpen(false);

    fetch(LOGOUT_API, {
      method: 'POST',
      credentials: 'include',
    }).catch(err => {
      console.log("Backend logout failed (server asleep?), but client session cleared");
    });
  };

  const navLinkClasses = ({ isActive }) =>
    `relative px-3 py-1.5 rounded transition-all duration-200
     ${isActive
       ? 'text-white bg-emerald-500'
       : 'text-black hover:text-emerald-600'
     }`;

  // ---- Language Selector ----
  const LanguageSelector = () => {
    const [open, setOpen] = useState(false);

    const changeLang = (lang) => {
      i18n.changeLanguage(lang);
      setOpen(false);
    };

    return (
      <div className="relative">
        {/* Globe Icon Button */}
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <Globe className="w-4 h-4 text-gray-700" />
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 shadow-lg rounded py-1 z-50">
            <p className='w-full text-left px-4 py-2 text-sm flex items-center gap-2'>Language</p>
            <button
              onClick={() => changeLang("en")}
              className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-100 ${
                i18n.language === "en" ? "font-semibold text-emerald-600" : ""
              }`}
            >
              <Flag country="US" size={18} /> English
            </button>
            <button
              onClick={() => changeLang("es")}
              className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-100 ${
                i18n.language === "es" ? "font-semibold text-emerald-600" : ""
              }`}
            >
              <Flag country="ES" size={18} /> Español
            </button>
          </div>
        )}
      </div>
    );
  };
  // ---------------------------

  const GuestMobileDrawer = () => (
    <div className="flex flex-col gap-4 p-4">
      <NavLink to="/" className={navLinkClasses} onClick={() => setMobileMenuOpen(false)}>
        {t('header.home')}
      </NavLink>
      <NavLink to="/features" className={navLinkClasses} onClick={() => setMobileMenuOpen(false)}>
        {t('header.features')}
      </NavLink>
      <NavLink to="/resources" className={navLinkClasses} onClick={() => setMobileMenuOpen(false)}>
        {t('header.resources')}
      </NavLink>
      <a
        href="https://subscription-frontend-psi.vercel.app/subscription"
        target="_blank"
        rel="noopener noreferrer"
        className="text-black hover:text-emerald-600 px-3 py-1.5"
        onClick={() => setMobileMenuOpen(false)}
      >
        {t('header.subscription')}
      </a>
      <NavLink to="/onboarding-guide" className={navLinkClasses} onClick={() => setMobileMenuOpen(false)}>
        {t('header.faq')}
      </NavLink>
      <NavLink to="/contact" className={navLinkClasses} onClick={() => setMobileMenuOpen(false)}>
        {t('header.contact')}
      </NavLink>

      <div className="mt-4">
        <p className="font-medium text-gray-700 mb-1">{t('header.signUp')} as</p>
        <div className="flex flex-col gap-1">
          {/* <NavLink
            to="/signup-shopkeeper"
            className="px-2 py-2 text-sm text-emerald-700 hover:bg-emerald-200 rounded font-medium"
            onClick={() => setMobileMenuOpen(false)}
          > */}
          <a
            href="https://subscription-frontend-psi.vercel.app/subscription"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2 py-2 text-sm text-emerald-700 hover:bg-emerald-200 rounded font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            {t('header.signUpShopkeeper')}
          </a>
          {/* </NavLink> */}
          <NavLink
            to="/signup-user"
            className="px-2 py-2 text-sm text-emerald-700 hover:bg-emerald-200 rounded font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            {t('header.signUpUser')}
          </NavLink>
        </div>
      </div>

      <NavLink
        to="/signin"
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded text-sm px-5 py-2 transition shadow-md text-center"
        onClick={() => setMobileMenuOpen(false)}
      >
        {t('header.signIn')}
      </NavLink>
    </div>
  );

  const LoggedInMobileDrawer = () => (
    <div className="flex flex-col gap-2 p-2">
      <div className="flex items-center gap-3 p-2 border-b border-gray-200">
        <FaUser className="w-6 h-6 text-emerald-600" />
        <div>
          <p className="font-semibold text-gray-800">{userName || 'User'}</p>
          <p className="text-xs text-gray-500">Welcome back!</p>
        </div>
      </div>

      <button
        onClick={() => {
          setSidebarOpen(true);
          setMobileMenuOpen(false);
        }}
        className="text-left px-3 py-2 text-emerald-700 hover:bg-emerald-100 rounded font-medium"
      >
        {t('header.openDashboard')}
      </button>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded font-medium"
      >
        <FaSignOutAlt className="w-4 h-4" />
        {t('header.logout')}
      </button>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-200">
      <nav className="px-4 lg:px-8 py-2 flex items-center justify-between">
        <div className="flex items-center">
          {isLoggedIn ? (
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-blue-600 hover:text-blue-700 transition"
            >
              <List size={24} />
            </button>
          ) : (
            <Link
              to="/"
              className="text-xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent drop-shadow-sm"
            >
              LoyaltyHub
            </Link>
          )}
        </div>

        <div className="hidden lg:flex items-center gap-6">
          {!isLoggedIn && (
            <>
              <NavLink to="/" className={navLinkClasses}>{t('header.home')}</NavLink>
              <NavLink to="/features" className={navLinkClasses}>{t('header.features')}</NavLink>
              <NavLink to="/resources" className={navLinkClasses}>{t('header.resources')}</NavLink>
              <a 
                href="https://subscription-frontend-psi.vercel.app/subscription"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-emerald-600 px-3 py-1.5"
              >
                {t('header.subscription')}
              </a>
              <NavLink to="/onboarding-guide" className={navLinkClasses}>{t('header.faq')}</NavLink>
              <NavLink to="/contact" className={navLinkClasses}>{t('header.contact')}</NavLink>
              <NavLink to="/support-inbox" className={navLinkClasses}>Inbox</NavLink>
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
          {/* Desktop: Language */}
          <div className="hidden lg:block">
            <LanguageSelector />
          </div>

          {/* Desktop Auth */}
          <div className="hidden lg:flex items-center gap-4">
            {!isLoggedIn ? (
              <>
                <div className="relative group">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium rounded text-sm px-3 py-2 cursor-pointer transition shadow-md">
                    {t('header.signUp')}
                  </div>
                  <div className="absolute right-0 mt-2 bg-white rounded shadow-xl z-10 min-w-[160px] opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 border border-gray-200">
                    {/* <NavLink
                      to="/signup-shopkeeper"
                      className="block px-3 py-2 text-sm text-emerald-700 hover:bg-emerald-100 transition rounded-t"
                    > */}
                    <a 
                      href="https://subscription-frontend-psi.vercel.app/subscription"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-3 py-2 text-sm text-emerald-700 hover:bg-emerald-100 transition rounded-t"
                    >
                      {t('header.signUpShopkeeper')}
                    </a>  
                    {/* </NavLink> */}
                    <NavLink
                      to="/signup-user"
                      className="block px-3 py-2 text-sm text-emerald-700 hover:bg-emerald-100 transition rounded-b"
                    >
                      {t('header.signUpUser')}
                    </NavLink>
                  </div>
                </div>

                <NavLink
                  to="/signin"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded text-sm px-3 py-2 transition shadow-md"
                >
                  {t('header.signIn')}
                </NavLink>
              </>
            ) : (
              <div className="relative group">
                <button className="flex items-center space-x-2 focus:outline-none">
                  <FaUser className="text-blue-600" />
                  <span className="text-blue-600 font-medium">{userName || 'User'}</span>
                </button>
                <div className="hidden group-hover:block absolute top-full right-0 w-40 bg-white shadow-lg border rounded p-2">
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center py-2 px-2 text-sm hover:bg-gray-100 text-left text-red-600"
                  >
                    <FaSignOutAlt className="mr-2" />
                    <span>{t('header.logout')}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(v => !v)}
            className="lg:hidden text-blue-600 hover:text-blue-700"
          >
            {mobileMenuOpen ? <X size={22} /> : <PanelRightOpen size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col bg-white lg:hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <p className="text-xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
              LoyaltyHub
            </p>
            <div className="flex items-center gap-2">
              <LanguageSelector />
              <button onClick={() => setMobileMenuOpen(false)} className="text-emerald-600">
                <X size={22} />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-2 py-2">
            {isLoggedIn ? <LoggedInMobileDrawer /> : <GuestMobileDrawer />}
          </div>
        </div>
      )}
    </header>
  );
}