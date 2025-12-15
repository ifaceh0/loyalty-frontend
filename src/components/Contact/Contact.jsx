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










//translate
'use client';

import React, { useState } from 'react';
import { CheckCircle, Send, Sparkles } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';

export default function ContactUs() {
  const { t } = useTranslation();
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
      alert(t('contact.humanCheck') + ' ' + t('contact.humanCheck')); // fallback
      return;
    }

    console.log('Contact Form Submitted:', formData);
    setSubmitted(true);

    setTimeout(() => {
      setFormData({
        fullName: '',
        email: '',
        subject: '',
        message: '',
        isHuman: false,
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-3xl mx-auto">
        <div className="relative bg-white/70 backdrop-blur-lg rounded p-8 shadow-xl border border-emerald-200 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full blur-3xl opacity-20 -z-10" />

          <h2 className="text-3xl sm:text-4xl font-extrabold text-emerald-600 text-center mb-8 flex items-center justify-center gap-2">
            <Send className="w-8 h-7" />
            {t('contact.title')}
          </h2>

          {submitted && (
            <div className="mb-6 p-5 bg-emerald-50 border border-emerald-200 rounded text-emerald-800 text-center font-semibold flex items-center justify-center gap-2 animate-in fade-in slide-in-from-top duration-500">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
              {t('contact.success')}
              <Sparkles className="w-5 h-5 text-emerald-500" />
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {t('contact.fullName')}
              </label>
              <input
                type="text"
                name="fullName"
                placeholder={t('contact.fullNamePlaceholder')}
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 placeholder:text-gray-400"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {t('contact.email')}
              </label>
              <input
                type="email"
                name="email"
                placeholder={t('contact.emailPlaceholder')}
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 placeholder:text-gray-400"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {t('contact.subject')}
              </label>
              <input
                type="text"
                name="subject"
                placeholder={t('contact.subjectPlaceholder')}
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 placeholder:text-gray-400"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {t('contact.message')}
              </label>
              <textarea
                name="message"
                rows={5}
                placeholder={t('contact.messagePlaceholder')}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 placeholder:text-gray-400 resize-none"
              />
            </div>

            {/* Human Verification */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="checkbox"
                  name="isHuman"
                  id="isHuman"
                  checked={formData.isHuman}
                  onChange={handleChange}
                  className="sr-only"
                />
                <label
                  htmlFor="isHuman"
                  className={`flex items-center justify-center w-6 h-6 rounded border-2 transition-all cursor-pointer ${
                    formData.isHuman
                      ? 'bg-emerald-600 border-emerald-600'
                      : 'bg-white border-gray-300 hover:border-emerald-400'
                  }`}
                >
                  {formData.isHuman && (
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </label>
              </div>
              <label htmlFor="isHuman" className="text-sm text-gray-700 cursor-pointer">
                {t('contact.humanCheck')}
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-4 text-center">
              <button
                type="submit"
                className="group inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!formData.isHuman}
              >
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                {t('contact.sendButton')}
              </button>
            </div>
          </form>
        </div>

        <p className="text-center text-sm text-gray-500 mt-8">
          <Trans
            i18nKey="contact.responseTime"
            components={{ 1: <span className="font-medium text-emerald-600" /> }}
          />
        </p>
      </div>
    </section>
  );
}