import React, { useState, useEffect } from 'react';

const ShopkeeperProfile = () => {
  const [formData, setFormData] = useState({
    id:'',
    shopName: '',
    shopOwner: '',
    street: '',
    city: '',
    state: '',
    zipCode: '', // Correct key for backend
    country: '',
  });

  useEffect(() => {
    const generatedId = `SHOP-${Math.floor(1000 + Math.random() * 9000)}`;
    setFormData((prev) => ({ ...prev, id: generatedId }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Sending to backend:', formData); // Debug log

    try {
      const response = await fetch(
        'https://loyalty-backend-java.onrender.com/api/shop/saveShop',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert('✅ Shopkeeper profile saved successfully!');
      } else {
        const errorData = await response.json();
        console.error('Backend error response:', errorData);
        alert('❌ Failed to save shopkeeper profile. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting shopkeeper profile:', error);
      alert('⚠️ An error occurred while saving data');
    }
  };

  return (
     <div className="bg-white p-8 rounded-2xl shadow-xl max-w-3xl mx-auto border border-fuchsia-100">
      <h3 className="text-3xl font-bold text-fuchsia-700 mb-6 text-center">
        🧾 Shopkeeper Profile
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Shop Name</label>
            <input
              type="text"
              name="shopName"
              value={formData.shopName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
              placeholder="Shop Name"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Shop Owner</label>
            <input
              type="text"
              name="shopOwner"
              value={formData.shopOwner}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
              placeholder="Shop Owner Name"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Street</label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Street Address"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="City"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="State"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">ZIP Code</label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="ZIP Code"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm text-gray-600 mb-1">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Country"
            />
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-semibold px-8 py-2 rounded-xl transition duration-300"
          >
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShopkeeperProfile;
