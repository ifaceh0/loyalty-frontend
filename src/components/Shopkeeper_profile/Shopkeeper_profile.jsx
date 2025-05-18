import React, { useState, useEffect } from 'react';

const ShopkeeperProfile = () => {
  const [formData, setFormData] = useState({
    id: '',
    shopName: '',
    shopOwner: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      country: '',
    
  });

  useEffect(() => {
    const generatedId = `SHOP-${Math.floor(1000 + Math.random() * 9000)}`;
    setFormData((prev) => ({ ...prev, id: generatedId }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name in formData.address) {
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://loyalty-backend-java.onrender.com/api/shop/saveShop', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Shopkeeper profile saved successfully');
      } else {
        alert('Failed to save shopkeeper profile');
      }
    } catch (error) {
      console.error('Error submitting shopkeeper profile:', error);
      alert('An error occurred while saving data');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h3 className="text-2xl font-semibold mb-6">Shopkeeper Profile</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={formData.id}
          readOnly
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
          placeholder="Shopkeeper ID"
        />

        <input
          type="text"
          name="shopName"
          value={formData.shopName}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          placeholder="Shop Name"
        />

        <input
          type="text"
          name="shopOwner"
          value={formData.shopOwner}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          placeholder="Shop Owner"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Street"
          />
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="City"
          />
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="State"
          />
          <input
            type="text"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="ZIP Code"
          />
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Country"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default ShopkeeperProfile;
