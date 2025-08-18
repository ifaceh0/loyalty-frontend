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
      alert("⚠️ Please verify you're not a robot.");
      return;
    }

    console.log('Form Submitted:', formData);
    setSubmitted(true);

    setFormData({
      fullName: '',
      email: '',
      subject: '',
      message: '',
      isHuman: false,
    });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-blue-100 mt-12 mb-8">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        📬 Contact Loyalty Support
      </h2>

      {submitted && (
        <div className="mb-6 p-4 bg-green-100 border border-green-300 text-green-800 rounded-lg text-center font-semibold">
          ✅ Thank you! Your message has been sent successfully.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Subject</label>
          <input
            type="text"
            name="subject"
            placeholder="What's your query about?"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Message</label>
          <textarea
            name="message"
            rows="5"
            placeholder="Write your message here..."
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isHuman"
            checked={formData.isHuman}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <label htmlFor="isHuman" className="text-sm text-gray-700">I am not a robot</label>
        </div>

        <div className="text-center pt-2">
          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 text-gold font-semibold px-8 py-2 rounded-xl transition duration-300 shadow-md"
          >
            📨 Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactUs;
