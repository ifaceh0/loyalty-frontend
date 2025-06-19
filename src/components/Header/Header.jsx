import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loginStatus);
    setMenuOpen(false); // Close menu on route change
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    localStorage.removeItem("role");
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="shadow sticky z-50 top-0 bg-white">
      <nav className="px-4 lg:px-6 py-3 max-w-screen-xl mx-auto flex items-center justify-between relative">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-fuchsia-600">MyApp</Link>

        {/* Hamburger Icon */}
        <div className="lg:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-800">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-8">
          <NavLink to="/" className={({ isActive }) => isActive ? "text-fuchsia-700" : "text-gray-800"}>Home</NavLink>
          <NavLink to="/features" className={({ isActive }) => isActive ? "text-fuchsia-700" : "text-gray-800"}>Features</NavLink>
          <NavLink to="/subscription" className={({ isActive }) => isActive ? "text-fuchsia-700" : "text-gray-800"}>Subscription</NavLink>
          <NavLink to="/resources" className={({ isActive }) => isActive ? "text-fuchsia-700" : "text-gray-800"}>Resources</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? "text-fuchsia-700" : "text-gray-800"}>Contact</NavLink>

          {/* Auth buttons */}
          {!isLoggedIn ? (
            <>
              <div className="relative group inline-block">
                <div className="text-white bg-orange-700 hover:bg-orange-600 font-medium rounded-lg text-sm px-4 py-2 cursor-pointer">
                  Sign up
                </div>
                <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg z-10 min-w-[150px] opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
                  <NavLink to="/signup-shopkeeper" className="block px-4 py-2 text-sm text-gray-800 hover:bg-orange-100">Shopkeeper</NavLink>
                  <NavLink to="/signup-user" className="block px-4 py-2 text-sm text-gray-800 hover:bg-orange-100">User</NavLink>
                </div>
              </div>
              <NavLink to="/signin" className="text-white bg-blue-700 hover:bg-blue-600 font-medium rounded-lg text-sm px-4 py-2">
                Sign in
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to={localStorage.getItem("userType") === "user" ? "/user/dashboard" : "/shopkeeper/dashboard"}
                className="text-white bg-green-600 hover:bg-green-500 font-medium rounded-lg text-sm px-4 py-2"
              >
                Dashboard
              </NavLink>
              <button onClick={handleLogout} className="text-white bg-red-600 hover:bg-red-500 font-medium rounded-lg text-sm px-4 py-2">
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t shadow-md z-50 py-4">
            <div className="flex flex-col items-center gap-4">
              <NavLink to="/" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? "text-fuchsia-700" : "text-gray-800"}>Home</NavLink>
              <NavLink to="/features" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? "text-fuchsia-700" : "text-gray-800"}>Features</NavLink>
              <NavLink to="/subscription" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? "text-fuchsia-700" : "text-gray-800"}>Subscription</NavLink>
              <NavLink to="/resources" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? "text-fuchsia-700" : "text-gray-800"}>Resources</NavLink>
              <NavLink to="/contact" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? "text-fuchsia-700" : "text-gray-800"}>Contact</NavLink>

              {!isLoggedIn ? (
                <>
                  <div className="relative group inline-block">
                    <div className="text-white bg-orange-700 hover:bg-orange-600 font-medium rounded-lg text-sm px-5 py-2 cursor-pointer">
                      Sign up
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-white rounded-lg shadow-lg z-10 min-w-[150px] opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
                      <NavLink to="/signup-shopkeeper" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-800 hover:bg-orange-100">Shopkeeper</NavLink>
                      <NavLink to="/signup-user" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-800 hover:bg-orange-100">User</NavLink>
                    </div>
                  </div>

                  <NavLink to="/signin" onClick={() => setMenuOpen(false)} className="text-white bg-blue-700 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2">
                    Sign in
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to={localStorage.getItem("userType") === "user" ? "/user/dashboard" : "/shopkeeper/dashboard"}
                    onClick={() => setMenuOpen(false)}
                    className="text-white bg-green-600 hover:bg-green-500 font-medium rounded-lg text-sm px-5 py-2"
                  >
                    Dashboard
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="text-white bg-red-600 hover:bg-red-500 font-medium rounded-lg text-sm px-5 py-2"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
