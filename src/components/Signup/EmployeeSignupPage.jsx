// src/pages/EmployeeSignupPage.jsx
import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const API_BASE = 'https://loyalty-backend-java.onrender.com/api';

export default function EmployeeSignupPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    password: '',
    countryCode: '+91', // Default for India, can be made a select if needed
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); // State for displaying API errors

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    if (!token) {
      setError('Invalid or missing invitation token.');
      return;
    }
    if (!form.firstName || !form.lastName || !form.password) {
        setError('Please fill in all required fields.');
        return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/employee/signup`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, token }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Signup failed. Please try again.');
      }

      alert('🎉 Account created successfully! You can now log in.');
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- Render for Invalid Token ---
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 p-4">
        <div className="bg-white p-8 rounded-xl shadow-xl text-center max-w-sm w-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-2xl font-bold text-red-700 mb-3">Invalid Link</h2>
          <p className="text-gray-600 mb-6">It looks like this invitation link is invalid or has expired. Please contact your shop manager for a new one.</p>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 transition duration-200 shadow-md"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    );
  }

  // --- Main Signup Form Render ---
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full animate-fade-in-up">
        <div className="text-center mb-8">
            {/* Employee Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-indigo-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          <h2 className="text-3xl font-extrabold text-gray-900">Complete Your Employee Profile</h2>
          <p className="text-gray-600 mt-2">Just a few steps to join your team!</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="John"
              value={form.firstName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Doe"
              value={form.lastName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Create a strong password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
              required
            />
          </div>
          <div>
            <label htmlFor="countryCode" className="block text-sm font-medium text-gray-700 mb-1">Country Code (e.g., +91)</label>
            <input
              id="countryCode"
              name="countryCode"
              type="text" // Could be a select dropdown for better UX
              placeholder="+91"
              value={form.countryCode}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
            />
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 text-red-700 p-3 rounded-md" role="alert">
              <p className="font-bold">Error!</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'} text-white py-3 px-4 rounded-lg font-semibold transition duration-200 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed`}
          >
            {loading ? 'Creating Account...' : 'Complete Signup'}
          </button>
        </form>
      </div>
    </div>
  );
}