// import React, { useState } from 'react';
// import { CheckCircle, Send, Sparkles } from 'lucide-react';

// export default function ContactUs() {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     subject: '',
//     message: '',
//     isHuman: false,
//   });

//   const [submitted, setSubmitted] = useState(false);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!formData.isHuman) {
//       alert('Please verify you are not a robot.');
//       return;
//     }

//     console.log('Contact Form Submitted:', formData);
//     setSubmitted(true);

//     // Reset form
//     setTimeout(() => {
//       setFormData({
//         fullName: '',
//         email: '',
//         subject: '',
//         message: '',
//         isHuman: false,
//       });
//       setSubmitted(false);
//     }, 3000);
//   };

//   return (
//     <section className="py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
//       <div className="max-w-4xl mx-auto">
//         {/* Card */}
//         <div className="relative bg-white/70 backdrop-blur-lg rounded-md p-8 shadow-xl border border-emerald-200 overflow-hidden">
//           {/* Gradient accent */}
//           <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full blur-3xl opacity-20 -z-10" />

//           <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent text-center mb-8 flex items-center justify-center gap-2">
//             <Send className="w-8 h-8" />
//             Contact Loyalty Support
//           </h2>

//           {/* Success Message */}
//           {submitted && (
//             <div className="mb-6 p-5 bg-emerald-50 border border-emerald-200 rounded-md text-emerald-800 text-center font-semibold flex items-center justify-center gap-2 animate-in fade-in slide-in-from-top duration-500">
//               <CheckCircle className="w-6 h-6 text-emerald-600" />
//               Thank you! Your message has been sent.
//               <Sparkles className="w-5 h-5 text-emerald-500" />
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Full Name */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 name="fullName"
//                 placeholder="John Doe"
//                 value={formData.fullName}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 placeholder:text-gray-400"
//               />
//             </div>

//             {/* Email */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="john@example.com"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 placeholder:text-gray-400"
//               />
//             </div>

//             {/* Subject */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                 Subject
//               </label>
//               <input
//                 type="text"
//                 name="subject"
//                 placeholder="How can we help?"
//                 value={formData.subject}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 placeholder:text-gray-400"
//               />
//             </div>

//             {/* Message */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                 Your Message
//               </label>
//               <textarea
//                 name="message"
//                 rows={5}
//                 placeholder="Tell us more..."
//                 value={formData.message}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 placeholder:text-gray-400 resize-none"
//               />
//             </div>

//             {/* Human Verification */}
//             <div className="flex items-center gap-3">
//               <div className="relative">
//                 <input
//                   type="checkbox"
//                   name="isHuman"
//                   id="isHuman"
//                   checked={formData.isHuman}
//                   onChange={handleChange}
//                   className="sr-only"
//                 />
//                 <label
//                   htmlFor="isHuman"
//                   className={`flex items-center justify-center w-6 h-6 rounded-sm border-2 transition-all cursor-pointer ${
//                     formData.isHuman
//                       ? 'bg-emerald-600 border-emerald-600'
//                       : 'bg-white border-gray-300 hover:border-emerald-400'
//                   }`}
//                 >
//                   {formData.isHuman && (
//                     <svg
//                       className="w-4 h-4 text-white"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={3}
//                         d="M5 13l4 4L19 7"
//                       />
//                     </svg>
//                   )}
//                 </label>
//               </div>
//               <label htmlFor="isHuman" className="text-sm text-gray-700 cursor-pointer">
//                 I am not a robot
//               </label>
//             </div>

//             {/* Submit Button */}
//             <div className="pt-4 text-center">
//               <button
//                 type="submit"
//                 className="group inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//                 disabled={!formData.isHuman}
//               >
//                 <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                 Send Message
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* Optional footer note */}
//         <p className="text-center text-sm text-gray-500 mt-8">
//           We typically respond within <span className="font-medium text-emerald-600">24 hours</span>.
//         </p>
//       </div>
//     </section>
//   );
// }










// //translate
// import React, { useState } from 'react';
// import { CheckCircle, Send, Sparkles } from 'lucide-react';
// import { useTranslation, Trans } from 'react-i18next';

// export default function ContactUs() {
//   const { t } = useTranslation();
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     subject: '',
//     message: '',
//     isHuman: false,
//   });

//   const [submitted, setSubmitted] = useState(false);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!formData.isHuman) {
//       alert(t('contact.humanCheck') + ' ' + t('contact.humanCheck')); // fallback
//       return;
//     }

//     console.log('Contact Form Submitted:', formData);
//     setSubmitted(true);

//     setTimeout(() => {
//       setFormData({
//         fullName: '',
//         email: '',
//         subject: '',
//         message: '',
//         isHuman: false,
//       });
//       setSubmitted(false);
//     }, 3000);
//   };

//   return (
//     <section className="py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
//       <div className="max-w-3xl mx-auto">
//         <div className="relative bg-white/70 backdrop-blur-lg rounded p-8 shadow-xl border border-emerald-200 overflow-hidden">
//           <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full blur-3xl opacity-20 -z-10" />

//           <h2 className="text-3xl sm:text-4xl font-extrabold text-emerald-600 text-center mb-8 flex items-center justify-center gap-2">
//             <Send className="w-8 h-7" />
//             {t('contact.title')}
//           </h2>

//           {submitted && (
//             <div className="mb-6 p-5 bg-emerald-50 border border-emerald-200 rounded text-emerald-800 text-center font-semibold flex items-center justify-center gap-2 animate-in fade-in slide-in-from-top duration-500">
//               <CheckCircle className="w-6 h-6 text-emerald-600" />
//               {t('contact.success')}
//               <Sparkles className="w-5 h-5 text-emerald-500" />
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Full Name */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                 {t('contact.fullName')}
//               </label>
//               <input
//                 type="text"
//                 name="fullName"
//                 placeholder={t('contact.fullNamePlaceholder')}
//                 value={formData.fullName}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 placeholder:text-gray-400"
//               />
//             </div>

//             {/* Email */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                 {t('contact.email')}
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder={t('contact.emailPlaceholder')}
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 placeholder:text-gray-400"
//               />
//             </div>

//             {/* Subject */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                 {t('contact.subject')}
//               </label>
//               <input
//                 type="text"
//                 name="subject"
//                 placeholder={t('contact.subjectPlaceholder')}
//                 value={formData.subject}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 placeholder:text-gray-400"
//               />
//             </div>

//             {/* Message */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                 {t('contact.message')}
//               </label>
//               <textarea
//                 name="message"
//                 rows={5}
//                 placeholder={t('contact.messagePlaceholder')}
//                 value={formData.message}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 placeholder:text-gray-400 resize-none"
//               />
//             </div>

//             {/* Human Verification */}
//             <div className="flex items-center gap-3">
//               <div className="relative">
//                 <input
//                   type="checkbox"
//                   name="isHuman"
//                   id="isHuman"
//                   checked={formData.isHuman}
//                   onChange={handleChange}
//                   className="sr-only"
//                 />
//                 <label
//                   htmlFor="isHuman"
//                   className={`flex items-center justify-center w-6 h-6 rounded border-2 transition-all cursor-pointer ${
//                     formData.isHuman
//                       ? 'bg-emerald-600 border-emerald-600'
//                       : 'bg-white border-gray-300 hover:border-emerald-400'
//                   }`}
//                 >
//                   {formData.isHuman && (
//                     <svg
//                       className="w-4 h-4 text-white"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={3}
//                         d="M5 13l4 4L19 7"
//                       />
//                     </svg>
//                   )}
//                 </label>
//               </div>
//               <label htmlFor="isHuman" className="text-sm text-gray-700 cursor-pointer">
//                 {t('contact.humanCheck')}
//               </label>
//             </div>

//             {/* Submit Button */}
//             <div className="pt-4 text-center">
//               <button
//                 type="submit"
//                 className="group inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//                 disabled={!formData.isHuman}
//               >
//                 <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                 {t('contact.sendButton')}
//               </button>
//             </div>
//           </form>
//         </div>

//         <p className="text-center text-sm text-gray-500 mt-8">
//           <Trans
//             i18nKey="contact.responseTime"
//             components={{ 1: <span className="font-medium text-emerald-600" /> }}
//           />
//         </p>
//       </div>
//     </section>
//   );
// }









import { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, Send, Sparkles, Loader2, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { API_BASE_URL } from '../../apiConfig';

const API_BASE = `${API_BASE_URL}/api/loyalty_homePage/contact`;

export default function ContactUs() {
  const { t } = useTranslation();
  const canvasRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
    role: '',
    captchaInput: '',
  });
  const [captchaText, setCaptchaText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Auto-fill for logged-in users
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      const name = localStorage.getItem("name") || '';
      const email = localStorage.getItem("companyEmail") || '';
      const role = localStorage.getItem("role") || '';

      setFormData(prev => ({
        ...prev,
        fullName: name,
        email: email,
        role: role,
      }));
    }
  }, []);

  // Generate CAPTCHA on mount and reset
  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let text = "";
    for (let i = 0; i < 6; i++) {
      text += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(text);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 140, 50);

    // Background
    ctx.fillStyle = "#f3f4f6";
    ctx.fillRect(0, 0, 140, 50);

    // Text
    ctx.font = "bold 28px Arial";
    ctx.fillStyle = "#1e293b";
    ctx.save();
    ctx.translate(20, 35);
    ctx.rotate(-0.02 * Math.PI);
    ctx.fillText(text, 0, 0);
    ctx.restore();

    // Noise lines
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 2;
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * 140, Math.random() * 50);
      ctx.lineTo(Math.random() * 140, Math.random() * 50);
      ctx.stroke();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // CAPTCHA validation
    if (formData.captchaInput.toUpperCase() !== captchaText) {
      setError(t('contact.captchaError') || 'Invalid CAPTCHA. Please try again.');
      generateCaptcha();
      setFormData(prev => ({ ...prev, captchaInput: '' }));
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || 'Failed to send message');
      }

      setSubmitted(true);
      // setFormData(prev => ({
      //   ...prev,
      //   subject: '',
      //   message: '',
      //   captchaInput: '',
      // }));
      if (isLoggedIn) {
        setFormData(prev => ({
          ...prev,
          subject: '',
          message: '',
          captchaInput: '',
        }));
      } else {
        setFormData({
          fullName: '',
          email: '',
          subject: '',
          message: '',
          role: '',
          captchaInput: '',
        });
      }
      generateCaptcha();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(err.message || t('contact.error'));
    } finally {
      setLoading(false);
    }
  };

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <section className="py-8 px-4 bg-gradient-to-br from-indigo-50 via-white to-teal-50 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/90 backdrop-blur-xl rounded-lg shadow-2xl p-10 md:p-10 border border-gray-100 overflow-hidden relative">
          {/* Decorative background */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-emerald-300 to-teal-400 rounded-full blur-3xl opacity-30 -z-10" />
          {/* <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-tr from-purple-300 to-pink-400 rounded-full blur-3xl opacity-30 -z-10" /> */}
          {/* {isLoggedIn && (
            <div>
              <Link to="/shopkeeper/dashboard" className="text-emerald-600 hover:text-emerald-800 font-medium">
              <ArrowLeft className="w-5 h-5" />
              </Link>
            </div>
          )} */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-extrabold text-emerald-600 mb-4">
              {t('contact.title')}
            </h2>
            <p className="text-md text-gray-600">
              {t('contact.subtitle') || "We're here to help! Send us a message and we'll get back to you soon."}
            </p>
          </div>

          {isLoggedIn && (
            <div className="mb-6 p-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded">
              <p className="text-center text-blue-800 font-semibold text-lg">
                {t('contact.loggedInAs')} <span className="font-bold">{formData.fullName}</span>
                {formData.role && ` (${t(`roles.${formData.role.toLowerCase()}`)})`}
              </p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-2 bg-red-50 border border-red-300 rounded text-red-700 text-center font-medium">
              {error}
            </div>
          )}

          {submitted && (
            <div className="mb-6 p-2 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-300 rounded text-emerald-800 text-center font-bold text-xl flex items-center justify-center gap-4">
              <CheckCircle className="w-5 h-5" />
              {t('contact.success')}
              <Sparkles className="w-5 h-5 text-yellow-500" />
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* <div className="grid md:grid-cols-2 gap-6"> */}
              <div>
                <label className="block text-md font-semibold text-gray-800 mb-1">
                  {t('contact.fullName')}
                  {isLoggedIn && <span className="text-sm font-normal text-gray-500 ml-2">({t('contact.autoFilled')})</span>}
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  readOnly={isLoggedIn}
                  className={`w-full px-6 py-2 text-md rounded-md border-2 ${isLoggedIn ? 'bg-gray-100 cursor-not-allowed border-gray-300' : 'bg-white border-gray-300'} focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all`}
                />
              </div>

              <div>
                <label className="block text-md font-semibold text-gray-800 mb-1">
                  {t('contact.email')}
                  {isLoggedIn && <span className="text-sm font-normal text-gray-500 ml-2">({t('contact.autoFilled')})</span>}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  readOnly={isLoggedIn}
                  className={`w-full px-6 py-2 text-md rounded-md border-2 ${isLoggedIn ? 'bg-gray-100 cursor-not-allowed border-gray-300' : 'bg-white border-gray-300'} focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all`}
                />
              </div>
            {/* </div> */}

            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-1">
                {t('contact.subject')}
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-6 py-2 text-md rounded-md border-2 border-gray-300 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-1">
                {t('contact.message')}
              </label>
              <textarea
                name="message"
                rows={8}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-6 py-2 text-lg rounded-md border-2 border-gray-300 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all"
              />
            </div>

            {/* CAPTCHA */}
            <div className="bg-gray-50 p-2 rounded-md border border-gray-200">
              <label className="block text-lg font-semibold text-gray-800 mb-2">
                {t('contact.captchaLabel') || "Security Check"}
              </label>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex items-center gap-3">
                  <canvas
                    ref={canvasRef}
                    width={150}
                    height={40}
                    className="border-2 border-gray-400 rounded-md bg-white"
                  />
                  <button
                    type="button"
                    onClick={generateCaptcha}
                    className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition"
                    aria-label="Refresh CAPTCHA"
                  >
                    <RefreshCw className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
                <input
                  type="text"
                  name="captchaInput"
                  value={formData.captchaInput}
                  onChange={handleChange}
                  placeholder={t('contact.captchaPlaceholder') || "Enter code above"}
                  required
                  className="flex-1 px-5 py-2 rounded-md border-2 border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all"
                />
              </div>
            </div>

            <div className="text-center pt-2">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-4 px-12 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-xl font-bold rounded-md shadow-2xl hover:shadow-3xl disabled:opacity-60 transition-all transform hover:-translate-y-1"
              >
                {loading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <Send className="w-6 h-6" />
                )}
                {loading ? t('contact.sending') : t('contact.sendButton')}
              </button>
            </div>
          </form>

          <p className="text-center text-gray-600 mt-4 text-sm">
            {t('contact.responseTime') || "We typically respond within 24 hours"}
          </p>
        </div>
      </div>
    </section>
  );
}