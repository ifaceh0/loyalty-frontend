import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
    isHuman: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.isHuman) {
      alert("Please verify you're not a robot.");
      return;
    }

    // Placeholder for backend API submission
    console.log('Form Submitted:', formData);
    setSubmitted(true);

    // Reset
    setFormData({
      fullName: '',
      email: '',
      subject: '',
      message: '',
      isHuman: false,
    });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
      {submitted && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
          Thank you! Your message has been sent.
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          required
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          rows="5"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          required
        />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isHuman"
            checked={formData.isHuman}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <label htmlFor="isHuman">I am not a robot</label>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
