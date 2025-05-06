import React, { useState, useEffect } from 'react';

const User = () => {
  const [formData, setFormData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: {
      street: '',
      city: '',
      zip: '',
      country: '',
    },
    createdDate: '',
    updatedDate: '',
    shopId: '',
  });

  // Simulate auto-generated ID and date setup
  useEffect(() => {
    const generatedId = `USER-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    setFormData((prev) => ({
      ...prev,
      id: generatedId,
      createdDate: now,
      updatedDate: now,
    }));
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
        updatedDate: new Date().toISOString().slice(0, 10),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User Data:', formData);
    // Future API call placeholder
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h3 className="text-2xl font-semibold mb-6">User </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ID (Read-only) */}
        <input
          type="text"
          value={formData.id}
          readOnly
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
          placeholder="User ID"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="First Name"
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Last Name"
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Phone"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Email"
          />
          <input
            type="text"
            name="street"
            value={formData.address.street}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Street"
          />
          <input
            type="text"
            name="city"
            value={formData.address.city}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="City"
          />
          <input
            type="text"
            name="zip"
            value={formData.address.zip}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="ZIP Code"
          />
          <input
            type="text"
            name="country"
            value={formData.address.country}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Country"
          />
        </div>

        <input
          type="text"
          name="shopId"
          value={formData.shopId}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          placeholder="Shop ID"
        />

        {/* Created & Updated Date - Readonly */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            value={formData.createdDate}
            readOnly
            className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
            placeholder="Created Date"
          />
          <input
            type="text"
            value={formData.updatedDate}
            readOnly
            className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
            placeholder="Last Updated"
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

export default User;
