// import { useState, useEffect } from 'react';
// import {
//   Link,
//   NavLink,
//   useLocation,
//   useNavigate,
// } from 'react-router-dom';
// import { FaUser, FaSignOutAlt, FaChevronDown } from 'react-icons/fa';
// import { X, List, Menu, Globe, LayoutDashboard  } from 'lucide-react';
// import { useSidebar } from '../../context/SidebarContext';
// import { useTranslation } from 'react-i18next';
// import { motion, AnimatePresence } from 'framer-motion';
// import { API_BASE_URL } from '../../apiConfig';
// import LanguageSelector from './LanguageSelector';
// import logo from '../../assets/logo.png';

// const LOGOUT_API = `${API_BASE_URL}/api/auth/logout`;

// export default function Header() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userName, setUserName] = useState('');
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const location = useLocation();
//   const navigate = useNavigate();
//   const { setSidebarOpen } = useSidebar();
//   const { t, i18n } = useTranslation();

//   useEffect(() => {
//     const login = localStorage.getItem('isLoggedIn') === 'true';
//     setIsLoggedIn(login);
//     const name = localStorage.getItem('name');
//     if (name) setUserName(name);
//     setMobileMenuOpen(false);
//   }, [location]);

//   const handleLogout = async () => {
//     localStorage.clear();
//     document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

//     navigate('/signin');
//     setMobileMenuOpen(false);

//     fetch(LOGOUT_API, {
//       method: 'POST',
//       credentials: 'include',
//     }).catch(err => {
//       console.log("Backend logout failed (server asleep?), but client session cleared");
//     });
//   };

//   const UserOnlineIcon = () => (
//     <div className="relative">
//       <FaUser className="w-6 h-6 text-gray-600" />
//       <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white animate-pulse"></span>
//     </div>
//   );

//   const navLinkClasses = ({ isActive }) =>
//     `relative px-3 py-2 text-sm font-medium transition-all duration-200
//      ${isActive
//         ? 'text-emerald-600'
//         : 'text-slate-600 hover:text-emerald-500'
//       } `;

//   const GuestMobileDrawer = () => (
//     <div className="flex flex-col gap-5 p-6 pb-10">
//       <NavLink to="/" className={navLinkClasses} onClick={() => setMobileMenuOpen(false)}>
//         {t('header.home')}
//       </NavLink>
//       <NavLink to="/features" className={navLinkClasses} onClick={() => setMobileMenuOpen(false)}>
//         {t('header.features')}
//       </NavLink>
//       <NavLink to="/resources" className={navLinkClasses} onClick={() => setMobileMenuOpen(false)}>
//         {t('header.resources')}
//       </NavLink>
//       <a
//         href="https://subscription-frontend-psi.vercel.app/subscription"
//         target="_blank"
//         rel="noopener noreferrer"
//         className="px-3 py-2 text-sm font-medium transition-all duration-200 text-slate-600 hover:text-emerald-500"
//         onClick={() => setMobileMenuOpen(false)}
//       >
//         {t('header.subscription')}
//       </a>
//       <NavLink to="/onboarding-guide" className={navLinkClasses} onClick={() => setMobileMenuOpen(false)}>
//         {t('header.faq')}
//       </NavLink>
//       <NavLink to="/contact" className={navLinkClasses} onClick={() => setMobileMenuOpen(false)}>
//         {t('header.contact')}
//       </NavLink>

//       <div className="mt-6">
//         <p className="font-medium text-gray-700 mb-4 text-[17px]">{t('header.signUp')} as</p>
//         <div className="flex flex-col gap-4">
//           <a
//             href="https://subscription-frontend-psi.vercel.app/subscription"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="px-6 py-2 text-[15px] sm:text-base font-medium text-slate-700 hover:bg-emerald-50 rounded-full border border-slate-200 transition flex items-center justify-center shadow-sm"
//             onClick={() => setMobileMenuOpen(false)}
//           >
//             {t('header.signUpShopkeeper')}
//           </a>
//           <NavLink
//             to="/signup-user"
//             className="px-6 py-2 text-[15px] sm:text-base font-medium text-slate-700 hover:bg-emerald-50 rounded-full border border-slate-200 transition flex items-center justify-center shadow-sm"
//             onClick={() => setMobileMenuOpen(false)}
//           >
//             {t('header.signUpUser')}
//           </NavLink>
//         </div>
//       </div>

//       <NavLink
//         to="/signin"
//         className="mt-4 bg-slate-700 hover:bg-emerald-600 active:bg-slate-700 text-white font-medium rounded-full text-[17px] sm:text-lg px-8 py-2 transition shadow-md text-center flex items-center justify-center"
//         onClick={() => setMobileMenuOpen(false)}
//       >
//         {t('header.signIn')}
//       </NavLink>
//     </div>
//   );

//   const LoggedInMobileDrawer = () => (
//     <div className="flex flex-col gap-3 p-4">
//       <div className="flex items-center gap-4 p-2 rounded">
//         <FaUser className="w-7 h-7 text-gray-600" />
//         <div>
//           <p className="font-semibold text-gray-800 text-[17px]">{userName || 'User'}</p>
//           <p className="text-sm text-gray-600">Welcome back!</p>
//         </div>
//       </div>

//       <button
//         onClick={() => {
//           setSidebarOpen(true);
//           setMobileMenuOpen(false);
//         }}
//         className="text-left gap-3 px-5 py-2 text-[17px] text-blue-600 hover:bg-blue-50 rounded font-medium transition flex items-center"
//       >
//         <LayoutDashboard className="w-5 h-5" />
//         {t('header.openDashboard')}
//       </button>

//       <button
//         onClick={handleLogout}
//         className="flex items-center gap-3 px-5 py-2 text-[17px] text-red-600 hover:bg-red-50 rounded font-medium transition"
//       >
//         <FaSignOutAlt className="w-5 h-5" />
//         {t('header.logout')}
//       </button>
//     </div>
//   );

//   const sidebarVariants = {
//     hidden: { x: "100%" },
//     visible: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
//     exit: { x: "100%", transition: { duration: 0.3 } }
//   };

//   return (
//     <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
//       <nav className="px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
//         <div className="flex items-center">
//           {isLoggedIn ? (
//             <button
//               onClick={() => setSidebarOpen(true)}
//               className="transition p-2 -ml-1 text-slate hover:bg-slate-200 rounded-full"
//             >
//               <Menu size={28} strokeWidth={2.2} />
//             </button>
//           ) : (
//            <Link to="/" className="flex items-center">
//               <img
//                 src={logo}
//                 alt="Loyalty Rewards"
//                 className="h-12 sm:h-14 w-auto object-contain"
//               />
//            </Link>
//           )}
//         </div>

//         <div className="hidden lg:flex items-center gap-2">
//           {!isLoggedIn && (
//             <>
//               <NavLink to="/" className={navLinkClasses}>{t('header.home')}</NavLink>
//               <NavLink to="/features" className={navLinkClasses}>{t('header.features')}</NavLink>
//               <NavLink to="/resources" className={navLinkClasses}>{t('header.resources')}</NavLink>
//               <a
//                 href="https://subscription-frontend-psi.vercel.app/subscription"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="px-3 py-2 text-sm font-medium transition-all duration-200 text-slate-600 hover:text-emerald-500"
//               >
//                 {t('header.subscription')}
//               </a>
//               <NavLink to="/onboarding-guide" className={navLinkClasses}>{t('header.faq')}</NavLink>
//               <NavLink to="/contact" className={navLinkClasses}>{t('header.contact')}</NavLink>
//             </>
//           )}
//         </div>

//         <div className="flex items-center gap-4">
//           {/* Desktop Language */}
//           <div className="hidden lg:block">
//             <LanguageSelector />
//           </div>

//           {/* Desktop Auth */}
//           <div className="hidden lg:flex items-center gap-2">
//             {!isLoggedIn ? (
//               <>
//                 <div className="relative group">
//                   <button className="flex items-center gap-2 bg-slate-900 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-emerald-600 transition shadow-lg shadow-slate-200">
//                     {t('header.signUp')} <FaChevronDown size={10} />
//                   </button>
//                   <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-lg shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0">
//                     <a
//                       href="https://subscription-frontend-psi.vercel.app/subscription"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="block px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 transition"
//                     >
//                       {t('header.signUpShopkeeper')}
//                     </a>
//                     <NavLink
//                       to="/signup-user"
//                       className="block px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 transition"
//                     >
//                       {t('header.signUpUser')}
//                     </NavLink>
//                   </div>
//                 </div>

//                 <NavLink
//                   to="/signin"
//                   className="text-gray-800 border border-gray-300 hover:bg-gray-100 rounded-full text-sm font-semibold px-6 py-2 transition text-center"
//                 >
//                   {t('header.signIn')}
//                 </NavLink>
//               </>
//             ) : (
//               <div className="relative group">
//                 {/* Trigger Button */}
//                 <button className="flex items-center gap-3 px-3 py-1 rounded-full transition-all duration-300 hover:bg-slate-100 focus:outline-none">
//                   <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-200 text-slate-500 border border-white shadow-sm">
//                     <FaUser size={12} />
//                   </div>
//                   <span className="text-sm font-bold tracking-tight text-slate-700">
//                     {userName || 'User'}
//                   </span>
//                   <FaChevronDown 
//                     size={10} 
//                     className="text-slate-400 transition-transform duration-300 group-hover:rotate-180" 
//                   />
//                 </button>

//                 {/* Soft Dropdown Menu */}
//                 <div className="absolute top-[110%] right-0 w-48 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
//                   <div className="bg-white/80 backdrop-blur-xl border border-slate-100 rounded-[0.5rem] p-1 shadow-[0_20px_40px_rgba(0,0,0,0.06)] ring-1 ring-stone-900/5">
                    
//                     {/* Menu Item */}
//                     <button
//                       onClick={handleLogout}
//                       className="group/item flex items-center w-full p-1.5 text-[13px] font-bold text-slate-600 hover:text-red-500 rounded-lg transition-all duration-200 hover:bg-red-50/50"
//                     >
//                       <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-50 text-slate-400 group-hover/item:bg-red-100 group-hover/item:text-red-500 transition-colors mr-3">
//                         <FaSignOutAlt size={12} />
//                       </div>
//                       {t('header.logout')}
//                     </button>               
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Mobile Toggle */}
//           <button
//             onClick={() => setMobileMenuOpen(v => !v)}
//             className="lg:hidden transition flex items-center"
//           >
//             {mobileMenuOpen ? (
//               <X size={28} strokeWidth={2.2} />
//             ) : isLoggedIn ? (
//               <UserOnlineIcon />
//             ) : (
//               <List className="text-slate-800" size={28} strokeWidth={2.2} />
//             )}
//           </button>
//         </div>
//       </nav>

//       {/* Right-side Mobile Sidebar */}
//       <AnimatePresence>
//         {mobileMenuOpen && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 0.4 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               className="fixed inset-0 bg-black z-40 lg:hidden"
//               onClick={() => setMobileMenuOpen(false)}
//             />

//             <motion.div
//               variants={sidebarVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               className="fixed top-0 right-0 h-full w-1/2 max-w-md bg-white shadow-2xl z-50 lg:hidden overflow-y-auto"
//             >
//               <div className="flex items-center justify-between p-4">
//                   <button onClick={() => setMobileMenuOpen(false)}>
//                     <X size={24} className="text-gray-500" strokeWidth={2.2} />
//                   </button>
//                   <LanguageSelector />
//               </div>

//               {isLoggedIn ? <LoggedInMobileDrawer /> : <GuestMobileDrawer />}
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// }









import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaUser, FaSignOutAlt, FaChevronDown } from 'react-icons/fa';
import { X, Menu, LayoutDashboard, LogOut, User, CreditCard, List } from 'lucide-react'; // Added List icon
import { useSidebar } from '../../context/SidebarContext';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { API_BASE_URL } from '../../apiConfig';
import LanguageSelector from './LanguageSelector';
import logo from '../../assets/logo.png';

const LOGOUT_API = `${API_BASE_URL}/api/auth/logout`;

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { setSidebarOpen } = useSidebar();
  const { t } = useTranslation();

  useEffect(() => {
    const login = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(login);
    const name = localStorage.getItem('name');
    if (name) setUserName(name);
    setMobileMenuOpen(false);
  }, [location]);

  const handleLogout = async () => {
    localStorage.clear();
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate('/signin');
    setMobileMenuOpen(false);
    fetch(LOGOUT_API, { method: 'POST', credentials: 'include' }).catch(() => {});
  };

  const navLinkClasses = ({ isActive }) =>
    `relative px-4 py-1.5 text-sm font-bold tracking-tight transition-all duration-300 rounded-full
     ${isActive ? 'text-blue-600 bg-blue-50/50' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`;

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    opened: { opacity: 1, x: 0 }
  };

  const UserOnlineIcon = () => (
    <div className="relative">
      <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white shadow-lg">
        <User size={20} />
      </div>
      <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white animate-pulse"></span>
    </div>
  );

  const GuestMobileDrawer = () => {
    const linkStyles = "font-black text-slate-800 relative block w-max after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[2px] after:bg-slate-800 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left";

    return (
      <div className="flex flex-col gap-8 p-8 mt-4 flex-1 h-full">
        <motion.div variants={itemVariants} className="flex flex-col gap-4">
          {['home', 'features', 'resources'].map((item) => (
            <NavLink 
              key={item} 
              to={item === 'home' ? '/' : `/${item}`} 
              className={linkStyles} 
              onClick={() => setMobileMenuOpen(false)}
            >
              {t(`header.${item}`)}
            </NavLink>
          ))}
          
          <a 
            href="https://subscription-frontend-psi.vercel.app/subscription" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`${linkStyles} flex items-center gap-2`} 
            onClick={() => setMobileMenuOpen(false)}
          >
            {t('header.subscription')} <CreditCard size={20} />
          </a>

          <NavLink 
            to="/onboarding-guide" 
            className={linkStyles} 
            onClick={() => setMobileMenuOpen(false)}
          >
            {t('header.faq')}
          </NavLink>

          {/* Contact Link */}
          <NavLink 
            to="/contact" 
            className={linkStyles} 
            onClick={() => setMobileMenuOpen(false)}
          >
            {t('header.contact')}
          </NavLink>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-4 pt-4 border-t border-slate-50">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">{t('header.signUp')}</p>
          <div className="grid gap-3">
            <a href="https://subscription-frontend-psi.vercel.app/subscription" className="w-full py-2 bg-slate-50 hover:bg-slate-200 text-slate-700 font-bold rounded-full border border-slate-100 text-center">{t('header.signUpShopkeeper')}</a>
            <NavLink to="/signup-user" className="w-full py-2 bg-slate-50 hover:bg-slate-200 text-slate-700 font-bold rounded-full border border-slate-100 text-center">{t('header.signUpUser')}</NavLink>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-4">
          <NavLink to="/signin" className="w-full py-2 bg-slate-900 hover:bg-blue-600 text-white font-bold rounded-full shadow-md text-center block">
            {t('header.signIn')}
          </NavLink>
        </motion.div>
      </div>
    );
  };

  const LoggedInMobileDrawer = () => (
    <div className="flex flex-col gap-8 p-6 mt-4">
      <motion.div variants={itemVariants} className="flex items-center gap-4 p-3 bg-blue-50/50 rounded-[0.5rem] border border-blue-100/50">
        <div className="w-9 h-9 rounded-full bg-blue-600  shadow-sm flex items-center justify-center text-white border border-white font-black text-xl">
          {userName?.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-lg font-black text-slate-900 leading-tight">{userName || 'User'}</p>
          <span className="text-[8px] font-black text-blue-600 uppercase tracking-widest bg-white px-2 py-0.5 rounded-full border border-blue-100">Online Now</span>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="flex flex-col gap-3">
        <button onClick={() => { setSidebarOpen(true); setMobileMenuOpen(false); }} className="flex items-center gap-4 p-2 bg-slate-900 hover:bg-blue-600 text-white font-bold rounded-md shadow-lg shadow-slate-200">
          <LayoutDashboard size={20} /> {t('header.openDashboard')}
        </button>
        <button onClick={handleLogout} className="flex items-center gap-4 p-2 text-red-500 font-bold bg-red-50 hover:bg-red-100 rounded-md">
          <LogOut size={20} /> {t('header.logout')}
        </button>
      </motion.div>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100">
      <nav className="max-w-8xl mx-auto px-4 sm:px-8 py-2.5 sm:py-2 shadow-md flex items-center justify-between">

        <div className="flex items-center gap-3">
          {isLoggedIn && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-slate-900"
            >
              <Menu size={24} />
            </button>
          )}

          {/* Logo always visible */}
          <div className="flex flex-col items-start gap-0.5">
            {isLoggedIn ? (
              <div className="relative group block select-none cursor-default">
                <span className="text-sm sm:text-md font-extrabold text-slate-800 tracking-tight transition-colors group-hover:text-slate-900">
                  Loyalty
                  <span className="text-blue-500 underline decoration-2 decoration-blue-200 underline-offset-4 group-hover:decoration-blue-400 transition-colors">
                    Platform
                  </span>
                </span>
                <span className="absolute -top-1 -right-2 h-1.5 w-1.5 rounded-full bg-blue-500"></span>
              </div>
            ) : (
              <Link to="/" className="relative group block select-none">
                <span className="text-sm sm:text-md font-extrabold text-slate-800 tracking-tight transition-colors group-hover:text-slate-900">
                  Loyalty
                  <span className="text-blue-500 underline decoration-2 decoration-blue-200 underline-offset-4 group-hover:decoration-blue-400 transition-colors">
                    Platform
                  </span>
                </span>
                <span className="absolute -top-1 -right-2 h-1.5 w-1.5 rounded-full bg-blue-500 transition-transform group-hover:scale-125"></span>
              </Link>
            )}

            <span className="text-[7px] sm:text-[8px] text-slate-400 tracking-wider uppercase">
              powered by <span className="font-bold text-slate-500">interfacehub</span>
            </span>
          </div>
        </div>

        {/* Center: Desktop Nav Pill */}
        <div className="hidden lg:flex items-center bg-slate-100 rounded-full p-0.5 border border-slate-100 ring-4 ring-slate-50/30">
          {!isLoggedIn && (
            <>
              <NavLink to="/" className={navLinkClasses}>{t('header.home')}</NavLink>
              <NavLink to="/features" className={navLinkClasses}>{t('header.features')}</NavLink>
              <NavLink to="/resources" className={navLinkClasses}>{t('header.resources')}</NavLink>
              <a href="https://subscription-frontend-psi.vercel.app/subscription" target="_blank" rel="noopener noreferrer" className="px-4 py-1.5 text-sm font-bold tracking-tight text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-full transition-colors">
                {t('header.subscription')}
              </a>
              <NavLink to="/onboarding-guide" className={navLinkClasses}>{t('header.faq')}</NavLink>
              <NavLink to="/contact" className={navLinkClasses}>{t('header.contact')}</NavLink>
            </>
          )}
        </div>

        {/* Right Area */}
        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <LanguageSelector />
          </div>

          {/* Desktop Auth */}
          {!isLoggedIn ? (
            <div className="hidden lg:flex items-center gap-4 pl-4 border-l border-slate-100">
              <NavLink to="/signin" className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors">{t('header.signIn')}</NavLink>
              <div className="relative group">
                <button className="bg-slate-900 text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-blue-600 transition-all shadow-lg active:scale-95">{t('header.signUp')}</button>
                <div className="absolute right-0 mt-3 w-52 bg-white border border-slate-100 rounded-md shadow-2xl py-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-50 ring-1 ring-black/5">
                  <a href="https://subscription-frontend-psi.vercel.app/subscription" target="_blank" rel="noopener noreferrer" className="block px-5 py-1.5 text-sm font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600 border-b border-slate-50">{t('header.signUpShopkeeper')}</a>
                  <NavLink to="/signup-user" className="block px-5 py-1.5 text-sm font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600">{t('header.signUpUser')}</NavLink>
                </div>
              </div>
            </div>
          ) : (
            <div className="hidden lg:block relative group">
              <button className="flex items-center gap-3 pl-2 pr-4 py-0.5 rounded-full border border-slate-50 hover:bg-slate-50 transition-all">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-inner shadow-white/20">
                  {userName?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span className="text-sm font-bold text-slate-700">{userName}</span>
                <FaChevronDown size={10} className="text-slate-400 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute right-0 mt-2 w-42 bg-white border border-slate-100 rounded-lg shadow-2xl py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-50">
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors">
                  <LogOut size={14} /> {t('header.logout')}
                </button>
              </div>
            </div>
          )}

          {/* Mobile Toggle Button (Conditional Icons) */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="lg:hidden active:scale-90 transition-transform"
          >
            {mobileMenuOpen ? (
              <div className="w-9 h-9 flex items-center justify-center text-slate-900 border border-slate-200 shadow-sm">
                <X size={24} />
              </div>
            ) : isLoggedIn ? (
              <UserOnlineIcon />
            ) : (
              <div className="w-9 h-9 flex items-center justify-center text-slate-900">
                <List size={24} />
              </div>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <>
            <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)}/>
            <div className="fixed top-0 right-0 h-screen w-[85%] max-w-sm bg-white shadow-md z-50 lg:hidden overflow-y-auto rounded-l-[1rem] border-l border-slate-100 flex flex-col">
              <div className="px-3 py-2.5 sm:py-2 flex items-center justify-between border-b border-slate-100 shadow-md">
                {/* <img src={logo} alt="Logo" className="h-8" /> */}
                <div className="flex items-center gap-3 group select-none">
                  <div className="w-1 h-6 bg-blue-500 rounded-full group-hover:h-8 transition-all duration-300 origin-center"></div>
                  <div className="flex flex-col -space-y-1">
                    <span className="text-md font-black text-slate-800 tracking-tight">
                      Loyalty
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-blue-500">
                      Platform
                    </span>
                  </div>
                </div>
                {/* Language Selector added to Mobile Top */}
                <div className="flex items-center gap-2">
                  <LanguageSelector />
                  
                  {/* THE CLOSE BUTTON */}
                  <button 
                    onClick={() => setMobileMenuOpen(false)} 
                    className="text-slate-600 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>
              
              {isLoggedIn ? <LoggedInMobileDrawer /> : <GuestMobileDrawer />}
            </div>
          </>
        )}
    </header>
  );
}