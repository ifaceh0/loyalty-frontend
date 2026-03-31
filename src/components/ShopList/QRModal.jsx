// import React from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faXmark,
//   faStore,
//   faIdCard,
//   faWallet,
//   faQrcode,
//   faDownload,
//   faCircleInfo,
//   faLightbulb,
// } from '@fortawesome/free-solid-svg-icons';
// import { useTranslation } from 'react-i18next';

// export default function QRModal({ shop, qrData, isOpen, onClose }) {
//   const { t } = useTranslation();

//   if (!isOpen || !shop || !qrData) return null;

//   const handleDownload = () => {
//     const link = document.createElement('a');
//     link.href = qrData.qrCode;
//     link.download = `${shop.shopName}_QRCode.png`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <AnimatePresence>
//       <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4 overflow-y-auto">
//         <motion.div 
//           initial={{ opacity: 0, scale: 0.9, y: 20 }}
//           animate={{ opacity: 1, scale: 1, y: 0 }}
//           exit={{ opacity: 0, scale: 0.9, y: 20 }}
//           className="bg-white w-full max-w-lg rounded-[0.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] overflow-hidden relative border border-slate-100"
//         >
          
//           {/* Soft Header */}
//           <nav className="px-8 py-6 flex justify-between items-center border-b border-slate-50 sticky top-0 bg-white/80 backdrop-blur-sm z-20">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
//                 <FontAwesomeIcon icon={faQrcode} className="text-indigo-600 text-lg" />
//               </div>
//               <div>
//                 <h2 className="text-xl font-bold text-slate-800 tracking-tight leading-tight">
//                   {t('qrModal.title')}
//                 </h2>
//                 <p className="text-xs text-indigo-500 font-semibold truncate max-w-[150px]">
//                   {shop.shopName}
//                 </p>
//               </div>
//             </div>
//             <button
//               onClick={onClose}
//               className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all duration-300"
//             >
//               <FontAwesomeIcon icon={faXmark} />
//             </button>
//           </nav>

//           <div className="p-6 space-y-8 overflow-y-auto max-h-[70vh] scrollbar-hide">
            
//             {/* QR Section */}
//             <div className="flex flex-col items-center">
//               <div className="relative group p-2 bg-slate-50 rounded-[0.5rem] border-2 border-dashed border-slate-200">
//                 <img
//                   src={qrData.qrCode}
//                   alt="QR Code"
//                   className="w-56 sm:h-56 rounded-lg shadow-sm bg-white p-2"
//                 />
//               </div>
              
//               <button
//                 onClick={handleDownload}
//                 className="mt-6 flex items-center gap-2 text-indigo-600 font-bold text-sm hover:underline"
//               >
//                 <FontAwesomeIcon icon={faDownload} />
//                 {t('qrModal.downloadButton')}
//               </button>
//             </div>

//             {/* Usage Explanation - The "Why & Where" */}
//             <div className="bg-indigo-50/50 rounded-xl p-3 space-y-3 border border-indigo-100/50">
//               <div className="flex items-center gap-2 text-indigo-700">
//                 <FontAwesomeIcon icon={faLightbulb} className="text-sm" />
//                 <h4 className="text-sm font-bold uppercase tracking-wider">{t('qrModal.use')}</h4>
//               </div>
//               <p className="text-sm text-indigo-900/70 leading-relaxed">
//                 {t('qrModal.checkout')}
//               </p>
//             </div>

//             {/* Account Details Card */}
//             <div className="space-y-4">
//               <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-2">
//                 {t('qrModal.accountDetails')}
//               </h3>
              
//               <div className="bg-slate-50 rounded-[0.5rem] p-4 space-y-4 border border-white shadow-inner">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <FontAwesomeIcon icon={faStore} className="text-slate-300 text-sm" />
//                     <span className="text-sm text-slate-500">{t('qrModal.shopName')}</span>
//                   </div>
//                   <span className="text-sm font-bold text-slate-700">{shop.shopName}</span>
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <FontAwesomeIcon icon={faIdCard} className="text-slate-300 text-sm" />
//                     <span className="text-sm text-slate-500">{t('qrModal.customerId')}</span>
//                   </div>
//                   <span className="text-sm font-mono font-bold text-slate-700">#{qrData.customerId}</span>
//                 </div>

//                 <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
//                       <FontAwesomeIcon icon={faWallet} className="text-emerald-600 text-xs" />
//                     </div>
//                     <span className="text-sm font-bold text-slate-800">{t('qrModal.availablePoints')}</span>
//                   </div>
//                   <div className="text-right">
//                     <span className="text-xl font-black text-slate-800">{qrData.availablePoints}</span>
//                     <span className="text-[10px] font-bold text-slate-400 uppercase ml-1">{t('qrModal.points')}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Footer Close Button */}
//           <div className="p-8 pt-0">
//             <button
//               onClick={onClose}
//               className="w-full py-2 bg-slate-900 text-white rounded-full font-bold text-sm shadow-xl shadow-slate-200 hover:bg-indigo-600 transition-all duration-300 active:scale-[0.98]"
//             >
//               {t('qrModal.done')}
//             </button>
//           </div>
//         </motion.div>
//       </div>
//     </AnimatePresence>
//   );
// }








import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faXmark,
  faQrcode,
  faDownload,
  faCircleCheck,
} from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

export default function QRModal({ shop, qrData, isOpen, onClose }) {
  const { t } = useTranslation();

  if (!isOpen || !shop || !qrData) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = qrData.qrCode;
    link.download = `${shop.shopName}_QRCode.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      {/* Overlay Backdrop */}
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0"
          onClick={onClose}
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-white w-full max-w-md max-h-[90vh] rounded-xl shadow-2xl overflow-hidden relative border border-slate-200 z-10 flex flex-col"
        >
          {/* Header - Stays Fixed at Top */}
          <div className="px-6 pt-6 pb-4 flex justify-between items-start bg-white shrink-0">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold text-slate-900 tracking-tight">
                {t('qrModal.title')}
              </h2>
              <div className="flex items-center gap-1.5">
                <span className="text-sm text-slate-500 font-medium truncate max-w-[200px]">
                    {shop.shopName}
                </span>
                <FontAwesomeIcon icon={faCircleCheck} className="text-indigo-500 text-[10px]" />
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all shrink-0"
            >
              <FontAwesomeIcon icon={faXmark} className="text-lg" />
            </button>
          </div>

          {/* Scrollable Body Content */}
          <div className="px-6 pb-6 overflow-y-auto flex-1 space-y-6">
            
            {/* Primary QR Focus Section */}
            <div className="flex flex-col items-center pt-4">
              <div className="bg-white p-5 rounded-3xl ring-1 ring-slate-200 shadow-sm">
                <img
                  src={qrData.qrCode}
                  alt="QR Code"
                  className="w-44 h-44 sm:w-52 sm:h-52 object-contain"
                />
              </div>
              
              <button
                onClick={handleDownload}
                className="mt-4 flex items-center gap-2 px-4 py-2 text-slate-600 font-semibold text-xs hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
              >
                <FontAwesomeIcon icon={faDownload} />
                {t('qrModal.downloadButton')}
              </button>
            </div>

            {/* Account Information */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                {t('qrModal.accountDetails')}
              </span>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">{t('qrModal.customerId')}</span>
                  <span className="text-xs font-mono font-bold text-slate-900 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                    {qrData.customerId}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-slate-50">
                  <span className="text-xs font-medium text-slate-900">{t('qrModal.availablePoints')}</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold text-slate-900 tracking-tighter">
                      {qrData.availablePoints}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                      {t('qrModal.points')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Tip Section */}
            <div className="bg-indigo-50/50 rounded-xl p-3 flex gap-3 items-start border border-indigo-100/50">
              <div className="mt-0.5 text-indigo-500">
                <FontAwesomeIcon icon={faQrcode} className="text-sm" />
              </div>
              <p className="text-[12px] text-slate-600 leading-relaxed">
                {t('qrModal.checkout')}
              </p>
            </div>
          </div>

          {/* Footer - Stays Fixed at Bottom */}
          <div className="px-6 py-4 bg-white border-t border-slate-50 shrink-0">
            <button
              onClick={onClose}
              className="w-full py-2 bg-slate-900 text-white rounded-full font-bold text-sm hover:bg-slate-800 transition-all active:scale-[0.99] shadow-lg shadow-slate-200"
            >
              {t('qrModal.done')}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}