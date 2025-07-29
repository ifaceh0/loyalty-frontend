import React, { useState, useEffect } from 'react';

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
      const userId = parseInt(localStorage.getItem('id'), 10); // Ensure userId is a number
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
        console.error('Update error response:', errorData); // Log for debugging
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
    setError(null); // Clear errors when toggling edit mode
  };

  return (
    <div className="flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-md w-full bg-white/95 backdrop-blur-lg rounded-3xl shadow-xl p-6 sm:p-8 space-y-6 transition-all duration-300 hover:shadow-2xl">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-indigo-900 tracking-tight">
            User Profile
          </h2>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg text-sm">
            {error}
          </div>
        )}

        {isLoading && (
          <div className="text-center text-gray-600">
            <span>Loading...</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-indigo-800">First Name</label>
            <input
              type="text"
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
              className={`mt-1 w-full border-2 ${
                isEditing ? 'border-indigo-300' : 'border-gray-200'
              } rounded-lg p-3 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200`}
              placeholder="Enter first name"
              disabled={!isEditing}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-indigo-800">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
              className={`mt-1 w-full border-2 ${
                isEditing ? 'border-indigo-300' : 'border-gray-200'
              } rounded-lg p-3 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200`}
              placeholder="Enter last name"
              disabled={!isEditing}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-indigo-800">Phone</label>
            <input
              type="tel"
              name="phone"
              value={userData.phone}
              onChange={handleChange}
              className={`mt-1 w-full border-2 ${
                isEditing ? 'border-indigo-300' : 'border-gray-200'
              } rounded-lg p-3 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200`}
              placeholder="Enter 10-digit phone number"
              disabled={!isEditing}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-indigo-800">Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className={`mt-1 w-full border-2 ${
                isEditing ? 'border-indigo-300' : 'border-gray-200'
              } rounded-lg p-3 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200`}
              placeholder="Enter email address"
              disabled={!isEditing}
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={handleEditToggle}
              className="w-full py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
            >
              {isEditing ? 'Cancel' : <span>✏️ Edit Profile</span>}
            </button>
            {isEditing && (
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-xl font-semibold text-white shadow-md transition-all duration-300 flex items-center justify-center gap-2 ${
                  isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-pink-600 hover:bg-pink-700 hover:shadow-lg'
                }`}
              >
                {isLoading ? 'Updating...' : <span>💾 Save Changes</span>}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;