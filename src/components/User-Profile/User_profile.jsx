import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const UserProfile = () => {
  const [userData, setUserData] = useState({
    userId: null,
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch user ID from localStorage and user details on mount
  useEffect(() => {
    const userId = localStorage.getItem('id');
    if (userId) {
      fetchUserDetails(userId);
    } else {
      setError('No user ID found. Please log in.');
    }
  }, []);

  // Fetch user details using the GET /get-profile endpoint
  const fetchUserDetails = async (userId) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://loyalty-backend-java.onrender.com/api/user/get-profile?userId=${userId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const user = await response.json();
        setUserData({
          userId: user.userId || null,
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          phone: user.phone || '',
          email: user.email || '',
        });
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to fetch user details');
      }
    } catch (error) {
      setError('Error fetching user details');
      console.error('Fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate form data
  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    if (!userData.firstName.trim()) return 'First name is required';
    if (!userData.lastName.trim()) return 'Last name is required';
    if (!phoneRegex.test(userData.phone)) return 'Phone number must be 10 digits';
    if (!emailRegex.test(userData.email)) return 'Invalid email format';
    return null;
  };

  // Submit updated profile using the PUT /update-profile endpoint
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Client-side validation
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      return;
    }

    try {
      const userId = parseInt(localStorage.getItem('id'), 10);
      if (isNaN(userId)) {
        throw new Error('Invalid user ID');
      }

      const payload = {
        userId,
        firstName: userData.firstName.trim(),
        lastName: userData.lastName.trim(),
        phone: userData.phone.trim(),
        email: userData.email.trim(),
      };

      const response = await fetch(
        'https://loyalty-backend-java.onrender.com/api/user/update-profile',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        alert('Profile updated successfully!');
        setIsEditing(false);
        fetchUserDetails(userId); // Refresh data
      } else {
        const errorData = await response.json();
        console.error('Update error response:', errorData);
        setError(errorData.message || 'Error updating profile');
      }
    } catch (error) {
      setError('Submission error: ' + error.message);
      console.error('Submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setError(null);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="p-8 max-w-md w-full text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            <span className="text-xl font-semibold text-gray-800">Loading Profile...</span>
          </div>
          <p className="text-gray-600">Please wait while we fetch your profile details.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-md w-full bg-white/95 backdrop-blur-lg rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl">
        <nav className="bg-gradient-to-r from-green-400 via-teal-500 to-blue-600 text-white px-5 py-4 flex items-center gap-20">
          <h2 className="text-2xl font-bold">Update User Profile</h2>
          <div className="flex items-center gap-4">
            {!isEditing ? (
              <button
                onClick={handleEditToggle}
                className="bg-white text-teal-600 border border-teal-500 hover:bg-gray-100 font-semibold px-4 py-2 rounded-lg shadow-md transition duration-200"
              >
                <span>✏️ Edit</span>
              </button>
            ) : (
              <button
                onClick={handleEditToggle}
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center gap-2"
              >
                <FiX size={20} />
                <span>Close</span>
              </button>
            )}
          </div>
        </nav>

        <div className="p-6 sm:p-8 space-y-6">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-blue-800">First Name</label>
              <input
                type="text"
                name="firstName"
                value={userData.firstName}
                onChange={handleChange}
                className={`mt-1 w-full border-2 ${
                  isEditing ? 'border-blue-300' : 'border-gray-200'
                } rounded-lg p-3 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200`}
                placeholder="Enter first name"
                disabled={!isEditing}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-800">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
                className={`mt-1 w-full border-2 ${
                  isEditing ? 'border-blue-300' : 'border-gray-200'
                } rounded-lg p-3 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200`}
                placeholder="Enter last name"
                disabled={!isEditing}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-800">Phone</label>
              <input
                type="tel"
                name="phone"
                value={userData.phone}
                onChange={handleChange}
                className={`mt-1 w-full border-2 ${
                  isEditing ? 'border-blue-300' : 'border-gray-200'
                } rounded-lg p-3 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200`}
                placeholder="Enter 10-digit phone number"
                disabled={!isEditing}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-800">Email</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className={`mt-1 w-full border-2 ${
                  isEditing ? 'border-blue-300' : 'border-gray-200'
                } rounded-lg p-3 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200`}
                placeholder="Enter email address"
                disabled={!isEditing}
                required
              />
            </div>

            {isEditing && (
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-blue-600 text-white py-3 rounded-lg font-semibold transition duration-200 flex items-center justify-center gap-2 ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                }`}
              >
                {isLoading ? <span>Saving...</span> : <span>💾 Save Changes</span>}
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;