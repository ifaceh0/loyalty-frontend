// import { useState, useEffect } from 'react';
// import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
// import { FaBars, FaTimes, FaUser, FaCog, FaBell, FaQrcode, FaStore } from "react-icons/fa";
// import { Menu, X } from 'lucide-react';
// import { useSidebar } from '../../context/SidebarContext';

// export default function Header() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { setSidebarOpen } = useSidebar();
//   const [userName, setUserName] = useState("");

//   useEffect(() => {
//     const loginStatus = localStorage.getItem("isLoggedIn") === "true";
//     setIsLoggedIn(loginStatus);
//     const storedName = localStorage.getItem("name"); 
//     if (storedName) {
//       setUserName(storedName); 
//     }
//     setMenuOpen(false); 
//   }, [location]);

//   const handleLogout = () => {
//     localStorage.removeItem("isLoggedIn");
//     localStorage.removeItem("token");
//     localStorage.removeItem("userType");
//     localStorage.removeItem("id");
//     localStorage.removeItem("role");
//     navigate("/");
//     window.location.reload();
//   };

//   return (
//     <header className="sticky top-0 z-50 bg-purple-700 shadow-md text-white">
//       <nav className="px-4 lg:px-8 py-3 flex items-center justify-between">
        
//         {/* Hamburger (mobile) */}
//         <div className="lg:hidden">
//           <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
//             {menuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>

//         {/* Logo */}
//         {/* <div className="hidden lg:flex items-center gap-6">
//           {!isLoggedIn ? (
//             <>
//               <Link to="/" className="text-2xl font-bold text-white">LoyaltyHub</Link>
//             </>
//           ) : null}
//         </div> */}
//         <div className="flex items-center gap-4">
//           {isLoggedIn ? (
//             <>
//               <button onClick={() => setSidebarOpen(true)} className="text-white">
//               <Menu size={24} />
//             </button>
//             </>
//           ) : (
//             <>
//               <Link to="/" className="text-2xl font-bold text-white">LoyaltyHub</Link>
//             </>
//           )}
//         </div>

//         {/* Desktop Nav Links */}
//         <div className="hidden lg:flex items-center gap-6">
//           {!isLoggedIn ? (
//             <>
//               <NavLink to="/" className={({ isActive }) => isActive ? "text-yellow-300 font-semibold" : "hover:text-yellow-200"}>Home</NavLink>
//               <NavLink to="/features" className={({ isActive }) => isActive ? "text-yellow-300 font-semibold" : "hover:text-yellow-200"}>Features</NavLink>
//               <NavLink to="/subscription?app=loyalty" className="hover:text-yellow-300">Subscription</NavLink>
//               <NavLink to="/resources" className={({ isActive }) => isActive ? "text-yellow-300 font-semibold" : "hover:text-yellow-200"}>Resources</NavLink>
//               <NavLink to="/contact" className={({ isActive }) => isActive ? "text-yellow-300 font-semibold" : "hover:text-yellow-200"}>Contact</NavLink>
//             </>
//           ) : null}
//         </div>

//         {/* Right Buttons */}
//         <div className="hidden lg:flex items-center gap-4">
//           {!isLoggedIn ? (
//             <>
//               {/* Sign Up Dropdown */}
//               <div className="relative group inline-block">
//                 <div className="text-white bg-orange-500 hover:bg-orange-400 font-medium rounded-lg text-sm px-4 py-2 cursor-pointer">
//                   Sign up
//                 </div>
//                 <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg z-10 min-w-[150px] opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 text-gray-800">
//                   <NavLink to="/signup-shopkeeper" className="block px-4 py-2 text-sm hover:bg-orange-100">Shopkeeper</NavLink>
//                   <NavLink to="/signup-user" className="block px-4 py-2 text-sm hover:bg-orange-100">User</NavLink>
//                 </div>
//               </div>
//               <NavLink
//                 to="/signin"
//                 className="text-white bg-blue-500 hover:bg-blue-400 font-medium rounded-lg text-sm px-4 py-2"
//               >
//                 Sign in
//               </NavLink>
//             </>
//           ) : (
//             <>
//               {/* <button onClick={() => setSidebarOpen(true)} className="mr-4 text-white">
//                 <Menu size={24} />
//               </button> */}
//               {/* User Dropdown */}
//               <div className="relative group">
//                 <button className="flex items-center space-x-2 focus:outline-none hover:text-yellow-300">
//                   <FaUser />
//                   <span className="hidden md:inline">
//                     {userName || "User"}
//                   </span>
//                 </button>
//                 <div className="hidden group-hover:block absolute top-full right-0 w-40 bg-white shadow-lg text-gray-800 rounded-md p-2 z-50">
//                   <button
//                     onClick={handleLogout}
//                     className="block py-1 px-2 text-sm hover:bg-gray-100 w-full text-left"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>

//         {/* Mobile Menu */}
//         {menuOpen && (
//           <div className="lg:hidden absolute top-full left-0 w-full bg-purple-700 shadow-md border-t z-40">
//             <div className="flex flex-col items-center gap-4 py-4">
//               {!isLoggedIn ? (
//                 <>
//                   <NavLink to="/" onClick={() => setMenuOpen(false)} className="text-white hover:text-yellow-300">Home</NavLink>
//                   <NavLink to="/features" onClick={() => setMenuOpen(false)} className="text-white hover:text-yellow-300">Features</NavLink>
// <NavLink to="/subscription?app=loyalty" className="hover:text-yellow-300">Subscription</NavLink>
//                   <NavLink to="/resources" onClick={() => setMenuOpen(false)} className="text-white hover:text-yellow-300">Resources</NavLink>
//                   <NavLink to="/contact" onClick={() => setMenuOpen(false)} className="text-white hover:text-yellow-300">Contact</NavLink>
//                   <NavLink to="/signup-shopkeeper" onClick={() => setMenuOpen(false)} className="text-white hover:text-yellow-300">Sign up (Shopkeeper)</NavLink>
//                   <NavLink to="/signup-user" onClick={() => setMenuOpen(false)} className="text-white hover:text-yellow-300">Sign up (User)</NavLink>
//                   <NavLink to="/signin" onClick={() => setMenuOpen(false)} className="text-white bg-yellow-500 hover:bg-yellow-400 font-medium rounded px-4 py-1">Sign in</NavLink>
//                 </>
//               ) : (
//                 <button onClick={handleLogout} className="text-white hover:text-yellow-300">Logout</button>
//               )}
//             </div>
//           </div>
//         )}
//       </nav>
//     </header>
//   );
// }



import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { Menu } from 'lucide-react';
import { useSidebar } from '../../context/SidebarContext';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false); // State for user dropdown
  const location = useLocation();
  const navigate = useNavigate();
  const { setSidebarOpen } = useSidebar();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loginStatus);
    const storedName = localStorage.getItem('name');
    if (storedName) {
      setUserName(storedName);
    }
    setUserDropdownOpen(false); // Reset dropdown on location change
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('id');
    localStorage.removeItem('role');
    navigate('/');
    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-50 bg-purple-700 shadow-md text-white">
      <nav className="px-4 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo or Sidebar Toggle */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <button onClick={() => setSidebarOpen(true)} className="text-white">
              <Menu size={24} />
            </button>
          ) : (
            <Link to="/" className="text-2xl font-bold text-white">LoyaltyHub</Link>
          )}
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-6">
          {!isLoggedIn ? (
            <>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? 'text-yellow-300 font-semibold' : 'hover:text-yellow-200'
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/features"
                className={({ isActive }) =>
                  isActive ? 'text-yellow-300 font-semibold' : 'hover:text-yellow-200'
                }
              >
                Features
              </NavLink>
              <NavLink to="/subscription?app=loyalty" className="hover:text-yellow-300">
                Subscription
              </NavLink>
              <NavLink
                to="/resources"
                className={({ isActive }) =>
                  isActive ? 'text-yellow-300 font-semibold' : 'hover:text-yellow-200'
                }
              >
                Resources
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? 'text-yellow-300 font-semibold' : 'hover:text-yellow-200'
                }
              >
                Contact
              </NavLink>
              <NavLink
                to="/shop-list"
                className={({ isActive }) =>
                  isActive ? 'text-yellow-300 font-semibold' : 'hover:text-yellow-200'
                }
              >
                Shop List
              </NavLink>
            </>
          ) : null}
        </div>

        {/* Right Buttons (Desktop and Mobile) */}
        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              {/* Sign Up Dropdown */}
              <div className="relative group inline-block">
                <div className="text-white bg-orange-500 hover:bg-orange-400 font-medium rounded-lg text-sm px-4 py-2 cursor-pointer">
                  Sign up
                </div>
                <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg z-10 min-w-[150px] opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 text-gray-800">
                  <NavLink
                    to="/signup-shopkeeper"
                    className="block px-4 py-2 text-sm hover:bg-orange-100"
                  >
                    Shopkeeper
                  </NavLink>
                  <NavLink
                    to="/signup-user"
                    className="block px-4 py-2 text-sm hover:bg-orange-100"
                  >
                    User
                  </NavLink>
                </div>
              </div>
              <NavLink
                to="/signin"
                className="text-white bg-blue-500 hover:bg-blue-400 font-medium rounded-lg text-sm px-4 py-2"
              >
                Sign in
              </NavLink>
            </>
          ) : (
            <div className="relative group">
              <button className="flex items-center space-x-2 focus:outline-none">
                  <FaUser className="text-white" />
                  <span className="hidden lg:inline">{userName || 'Username'}</span>
                </button>
                <div className="hidden group-hover:block absolute top-full right-0 w-40 bg-white shadow-lg border rounded-md p-2">
                  {/* <NavLink to="shopkeeper/profile" className="block py-1 px-2 text-sm hover:bg-gray-100">
                    <FaUser className="inline mr-2 text-blue-800" /> <span className="text-gray-800">Profile</span>
                  </NavLink>
                  <NavLink to="shopkeeper/dashboard" className="block py-1 px-2 text-sm hover:bg-gray-100">
                    <FaCog className="inline mr-2 text-blue-800" /> <span className="text-gray-800">Settings</span>
                  </NavLink> */}
                  <button 
                    onClick={handleLogout}
                    className="block py-1 px-2 text-sm hover:bg-gray-100 w-full text-left">
                    <FaSignOutAlt className="inline mr-2 text-blue-800" /> <span className="text-gray-800">Logout</span>
                  </button>
                </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}