// import { useState, useEffect } from 'react';
// import {
//   Mail, Phone, Users, Plus, Trash2, RefreshCw,
//   ToggleLeft, ToggleRight, Loader2, UserCheck, Calendar, Clock
// } from 'lucide-react';
// import { useTranslation } from 'react-i18next';
// import { API_BASE_URL } from '../../apiConfig';
// import { fetchWithAuth } from "../../auth/fetchWithAuth";

// const API_BASE = `${API_BASE_URL}/api`;

// const Modal = ({ isOpen, onClose, children, title }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-8">
//       <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
//         <div className="flex justify-between items-center p-4 border-b border-gray-200">
//           <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>
//         <div className="p-6">{children}</div>
//       </div>
//     </div>
//   );
// };

// export default function InviteEmployeePage() {
//   const { t } = useTranslation();

//   const [shopId, setShopId] = useState(null);
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [invitations, setInvitations] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
  
//   // Active tab: 'employees' or 'invitations'
//   const [activeTab, setActiveTab] = useState('employees');

//   useEffect(() => {
//     const storedShopId = localStorage.getItem("id");
//     if (storedShopId) {
//       setShopId(parseInt(storedShopId, 10));
//     } else {
//       console.warn("Shop ID not found in localStorage");
//     }
//   }, []);

//   const fetchData = async () => {
//     if (!shopId) return;
//     setFetching(true);
//     try {
//       const [invRes, empRes] = await Promise.all([
//         fetchWithAuth(`${API_BASE}/employee/invitationList?shopId=${shopId}`, { credentials: 'include' }),
//         fetchWithAuth(`${API_BASE}/employee/listOfEmployee?shopId=${shopId}`, { credentials: 'include' })
//       ]);
//       if (!invRes.ok || !empRes.ok) throw new Error('Failed to load');
//       const [invData, empData] = await Promise.all([invRes.json(), empRes.json()]);
//       setInvitations(invData);
//       setEmployees(empData);
//     } catch (err) {
//       alert(t('employee.alerts.loadFailed'));
//     } finally {
//       setFetching(false);
//     }
//   };

//   useEffect(() => {
//     if (shopId) fetchData();
//   }, [shopId]);

//   const handleInvite = async (e) => {
//     e.preventDefault();
//     if (!email.trim()) return;
//     setLoading(true);
//     try {
//       const res = await fetchWithAuth(`${API_BASE}/employee/inviteEmployee?shopId=${shopId}`, {
//         method: 'POST',
//         credentials: 'include',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email: email.trim(), phone: phone.trim() || null }),
//       });
//       if (!res.ok) throw new Error(t('employee.alerts.inviteFailed'));
//       setEmail(''); setPhone('');
//       setIsModalOpen(false);
//       fetchData();
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resendInvite = async (inviteId) => {
//     if (!confirm(t('employee.confirm.resend'))) return;
//     try {
//       const res = await fetchWithAuth(`${API_BASE}/employee/resendInvitation?inviteId=${inviteId}`, {
//         method: 'POST',
//         credentials: 'include',
//       });
//       if (!res.ok) throw new Error(t('employee.alerts.resendFailed'));
//       fetchData();
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   const deleteInvite = async (inviteId) => {
//     if (!confirm(t('employee.confirm.delete'))) return;
//     try {
//       const res = await fetchWithAuth(`${API_BASE}/employee/deleteInvitation?inviteId=${inviteId}`, {
//         method: 'DELETE',
//         credentials: 'include',
//       });
//       if (!res.ok) throw new Error(t('employee.alerts.deleteFailed'));
//       fetchData();
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   // const toggleStatus = async (userId, current) => {
//   //   const willBeActive = !current;
//   //   if (!confirm(t('employee.confirm.toggle', { action: willBeActive ? t('employee.status.activate') : t('employee.status.deactivate') }))) return;

//   //   try {
//   //     const res = await fetch(`${API_BASE}/employee/toggleEmployeeStatus?userId=${userId}&active=${willBeActive}`, {
//   //       method: 'PATCH',
//   //       credentials: 'include',
//   //     });
//   //     if (!res.ok) throw new Error(t('employee.alerts.toggleFailed'));
//   //     fetchData();
//   //   } catch (err) {
//   //     alert(err.message);
//   //   }
//   // };
//   const toggleStatus = async (userId, current, shopId) => {
//     const willBeActive = !current;
//     if (!confirm(t('employee.confirm.toggle', { action: willBeActive ? t('employee.status.activate') : t('employee.status.deactivate') }))) return;

//     try {
//       const res = await fetchWithAuth(
//         `${API_BASE}/employee/toggleEmployeeStatus?shopId=${shopId}&userId=${userId}&active=${willBeActive}`, {
//           method: 'PATCH',
//           credentials: 'include',
//         });

//       if (!res.ok) {
//         const errData = await res.json();
//         throw new Error(errData.error || t('employee.alerts.toggleFailed'));
//       }

//       fetchData(); // Refresh lists
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   const pendingInvitations = invitations.filter(inv => inv.status !== 'SUCCESS');

//   return (
//     <>
//       <div className="min-h-screen p-3 sm:p-6 md:p-8">
//         <div className="max-w-7xl mx-auto p-2 space-y-8">

//           {/* Header */}
//           <div className="flex flex-col sm:flex-row justify-between items-center sm:items-center gap-4 border-b border-gray-200 pb-4">
//             <div>
//               <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 flex items-center gap-3">
//                 <Users className="w-8 h-8 text-blue-600" />
//                 {t('employee.page.title')}
//               </h1>
//               <p className="text-slate-600 mt-1">{t('employee.page.subtitle')}</p>
//             </div>
//             <button
//               onClick={() => setIsModalOpen(true)}
//               className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 sm:px-3 py-1.5 rounded-full shadow-lg hover:shadow-xl transition-all"
//             >
//               <Plus className="w-5 h-5" />
//               {t('employee.buttons.invite')}
//             </button>
//           </div>

//           {fetching ? (
//             <div className="flex justify-center py-20">
//               <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
//             </div>
//           ) : (
//             <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
//               {/* Tabs - Fully Responsive */}
//               <div className="border-b border-gray-200">
//                 <div className="flex flex-col sm:flex-row">
//                   <button
//                     onClick={() => setActiveTab('employees')}
//                     className={`flex-1 px-4 py-4 sm:px-6 text-sm font-semibold transition-all flex items-center justify-center sm:justify-center gap-2 
//                       ${activeTab === 'employees'
//                         ? 'text-blue-600 border-b-2 sm:border-b-4 border-blue-600 bg-blue-50'
//                         : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
//                       }`}
//                   >
//                     <UserCheck className="w-5 h-5" />
//                     {t('employee.sections.employees.title')}
//                     <span className="ml-2 bg-white px-2 p-0.5 rounded-full text-xs font-medium">
//                       {employees.length}
//                     </span>
//                   </button>
//                   <button
//                     onClick={() => setActiveTab('invitations')}
//                     className={`flex-1 px-4 py-4 sm:px-6 text-sm font-semibold transition-all flex items-center justify-center sm:justify-center gap-2 
//                       ${activeTab === 'invitations'
//                         ? 'text-violet-600 border-b-2 sm:border-b-4 border-violet-600 bg-violet-50'
//                         : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
//                       }`}
//                   >
//                     <Mail className="w-5 h-5" />
//                     {t('employee.sections.invitations.title')}
//                     <span className="ml-2 bg-white px-2 p-0.5 rounded-full text-xs font-medium">
//                       {pendingInvitations.length}
//                     </span>
//                   </button>
//                 </div>
//               </div>

//               {/* Scrollable Content Area - Perfect on ALL screens */}
//               <div className="p-3 sm:p-5 md:p-6">
//                 <div 
//                   className="max-h-[58vh] sm:max-h-[62vh] md:max-h-[68vh] lg:max-h-[72vh] 
//                             overflow-y-auto 
//                             scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-slate-100 
//                             hover:scrollbar-thumb-slate-500 
//                             scrollbar-thumb-rounded-full scrollbar-track-rounded-full
//                             pr-2"
//                 >
//                   {/* EMPLOYEES TAB */}
//                   {activeTab === 'employees' && (
//                     <div className="space-y-4 pb-4">
//                       {employees.length === 0 ? (
//                         <div className="text-center py-16 text-slate-500">
//                           <Users className="w-16 h-16 mx-auto mb-4 text-slate-300" />
//                           <p className="text-lg font-medium">{t('employee.sections.employees.empty')}</p>
//                           <p className="text-sm mt-2">{t('employee.sections.employees.emptyHint')}</p>
//                         </div>
//                       ) : (
//                         employees.map(emp => (
//                           <div
//                             key={emp.userId}
//                             className="flex flex-row sm:flex-row items-center gap-4 p-2 sm:p-5 rounded-xl border border-gray-200 hover:border-gray-300 transition-all"
//                           >
//                             <div className="flex items-start gap-4 flex-1">
//                               <div className="w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg shrink-0">
//                                 {emp.firstName[0]}{emp.lastName[0]}
//                               </div>

//                               <div className="space-y-2 flex-1 min-w-0">
//                                 <p className="font-semibold text-slate-900 truncate">
//                                   {emp.firstName} {emp.lastName}
//                                 </p>
//                                 {emp.email && (
//                                   <p className="text-xs sm:text-sm text-slate-600 flex items-center gap-1 truncate">
//                                     <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
//                                     <span className="truncate">{emp.email}</span>
//                                   </p>
//                                 )}
//                                 {emp.phone && (
//                                   <p className="text-xs sm:text-sm text-slate-600 flex items-center gap-1">
//                                     <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
//                                     {emp.phone}
//                                   </p>
//                                 )}
//                                 <div className="flex items-center gap-2 text-xs sm:text-sm">
//                                   {emp.isActive ? (
//                                     <ToggleRight className="w-6 h-6 text-emerald-600" />
//                                   ) : (
//                                     <ToggleLeft className="w-6 h-6 text-slate-400" />
//                                   )}
//                                   <span className={`font-medium ${emp.isActive ? 'text-emerald-600' : 'text-slate-400'}`}>
//                                     {emp.isActive ? t('employee.status.active') : t('employee.status.inactive')}
//                                   </span>
//                                 </div>
//                                 <p className="text-xs text-slate-500 flex items-center gap-1">
//                                   <Calendar className="w-3.5 h-3.5" />
//                                   {t('employee.labels.joined')}: {new Date(emp.createdDate).toLocaleDateString()}
//                                 </p>
//                               </div>
//                             </div>

//                             {/* <button
//                               onClick={() => toggleStatus(emp.userId, emp.isActive)}
//                               className={`px-4 py-2.5 rounded font-medium text-sm transition mt-2 sm:mt-0 w-full sm:w-auto
//                                 ${emp.isActive
//                                   ? 'bg-red-100 text-red-600 hover:bg-red-200'
//                                   : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
//                                 }`}
//                             >
//                               {emp.isActive ? t('employee.buttons.deactivate') : t('employee.buttons.activate')}
//                             </button> */}
//                             <button
//                               onClick={() => toggleStatus(emp.userId, emp.isActive, shopId)}
//                               disabled={loading}
//                               className={`px-3 py-1.5 rounded-full font-medium text-sm transition-all mt-2 sm:mt-0 sm:w-auto flex items-center justify-center gap-2
//                                 ${emp.isActive 
//                                   ? 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200' 
//                                   : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'}
//                                 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'}
//                               `}
//                             >
//                               {emp.isActive ? (
//                                 <>
//                                   {t('employee.buttons.deactivate')}
//                                   <ToggleRight className="w-5 h-5" />
//                                 </>
//                               ) : (
//                                 <>
//                                   {t('employee.buttons.activate')}
//                                   <ToggleLeft className="w-5 h-5" />
//                                 </>
//                               )}
//                             </button>
//                           </div>
//                         ))
//                       )}
//                     </div>
//                   )}

//                   {/* INVITATIONS TAB */}
//                   {activeTab === 'invitations' && (
//                     <div className="space-y-4 pb-4">
//                       {pendingInvitations.length === 0 ? (
//                         <div className="text-center py-16 text-slate-500">
//                           <Mail className="w-16 h-16 mx-auto mb-4 text-slate-300" />
//                           <p className="text-lg font-medium">{t('employee.sections.invitations.empty')}</p>
//                         </div>
//                       ) : (
//                         pendingInvitations.map(inv => (
//                           <div
//                             key={inv.id}
//                             className="flex flex-col sm:flex-row items-center gap-4 p-3 sm:p-5 rounded-xl border border-gray-200 transition-all"
//                           >
//                             <div className="flex items-start gap-4 flex-1">
//                               <div className="bg-violet-100 p-2 rounded-full shrink-0">
//                                 {inv.email ? <Mail className="w-5 h-5 text-violet-600" /> : <Phone className="w-5 h-5 text-violet-600" />}
//                               </div>

//                               <div className="space-y-2 flex-1 min-w-0">
//                                 <p className="font-semibold text-slate-900 truncate">
//                                   {inv.email || inv.phone || '—'}
//                                 </p>
//                                 {inv.email && inv.phone && (
//                                   <p className="text-sm text-slate-600 flex items-center gap-1">
//                                     <Phone className="w-4 h-4" />
//                                     {inv.phone}
//                                   </p>
//                                 )}
//                                 <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
//                                   inv.status === 'PENDING' ? 'bg-amber-100 text-amber-800' :
//                                   inv.status === 'EXPIRED' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-700'
//                                 }`}>
//                                   {inv.status}
//                                 </span>
//                                 <div className="text-xs text-slate-500 space-y-1">
//                                   <div className="flex items-center gap-1">
//                                     <Calendar className="w-3.5 h-3.5" />
//                                     {t('employee.labels.sent')}: {new Date(inv.createdDate).toLocaleDateString()}
//                                   </div>
//                                   <div className="flex items-center gap-1">
//                                     <Clock className="w-3.5 h-3.5" />
//                                     {new Date(inv.createdDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                                   </div>
//                                   <div>{t('employee.labels.expires')}: {new Date(inv.expiryDate).toLocaleString()}</div>
//                                 </div>
//                               </div>
//                             </div>

//                             <div className="flex gap-2 justify-end sm:justify-start">
//                               <button
//                                 onClick={() => resendInvite(inv.id)}
//                                 className="p-1.5 px-3 bg-violet-600 hover:bg-violet-700 text-white rounded-full transition"
//                                 title={t('employee.buttons.resend')}
//                               >
//                                 {/* <RefreshCw className="w-4.5 h-4.5" /> */}
//                                 <p className="text-xs">{t('employee.buttons.resend')}</p>
//                               </button>
//                               <button
//                                 onClick={() => deleteInvite(inv.id)}
//                                 className="p-1.5 px-3 bg-red-600 hover:bg-red-700 text-white rounded-full transition"
//                                 title={t('employee.buttons.delete')}
//                               >
//                                 {/* <Trash2 className="w-4.5 h-4.5" /> */}
//                                 <p className="text-xs">{t('employee.buttons.delete')}</p>
//                               </button>
//                             </div>
//                           </div>
//                         ))
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Invite Modal */}
//       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={t('employee.modal.title')}>
//         <form onSubmit={handleInvite} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-2">
//               {t('employee.modal.emailLabel')} <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="john@example.com"
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading || !email.trim()}
//             className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-400 text-white font-medium py-2 rounded-full transition flex items-center justify-center gap-2"
//           >
//             {loading ? (
//               <>
//                 <Loader2 className="w-5 h-5 animate-spin" />
//                 {t('employee.buttons.sending')}
//               </>
//             ) : (
//               <>
//                 <Mail className="w-5 h-5" />
//                 {t('employee.buttons.sendInvite')}
//               </>
//             )}
//           </button>
//         </form>
//       </Modal>
//     </>
//   );
// }














import { useState, useEffect } from 'react';
import {
  Mail, Phone, Users, Plus, Trash2, RefreshCw,
  ToggleLeft, ToggleRight, Loader2, UserCheck, Calendar, Clock, X
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { API_BASE_URL } from '../../apiConfig';
import { fetchWithAuth } from "../../auth/fetchWithAuth";

const API_BASE = `${API_BASE_URL}/api`;

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-zinc-950/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-md border border-zinc-200 shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 border-b border-zinc-100 bg-zinc-50/50">
          <h3 className="text-sm font-bold text-zinc-800 uppercase tracking-wide">{title}</h3>
          <button onClick={onClose} className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default function InviteEmployeePage() {
  const { t } = useTranslation();

  const [shopId, setShopId] = useState(null);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [invitations, setInvitations] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Active tab: 'employees' or 'invitations'
  const [activeTab, setActiveTab] = useState('employees');

  useEffect(() => {
    const storedShopId = localStorage.getItem("id");
    if (storedShopId) {
      setShopId(parseInt(storedShopId, 10));
    } else {
      console.warn("Shop ID not found in localStorage");
    }
  }, []);

  const fetchData = async () => {
    if (!shopId) return;
    setFetching(true);
    try {
      const [invRes, empRes] = await Promise.all([
        fetchWithAuth(`${API_BASE}/employee/invitationList?shopId=${shopId}`, { credentials: 'include' }),
        fetchWithAuth(`${API_BASE}/employee/listOfEmployee?shopId=${shopId}`, { credentials: 'include' })
      ]);
      if (!invRes.ok || !empRes.ok) throw new Error('Failed to load');
      const [invData, empData] = await Promise.all([invRes.json(), empRes.json()]);
      setInvitations(invData);
      setEmployees(empData);
    } catch (err) {
      alert(t('employee.alerts.loadFailed'));
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (shopId) fetchData();
  }, [shopId]);

  const handleInvite = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      const res = await fetchWithAuth(`${API_BASE}/employee/inviteEmployee?shopId=${shopId}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), phone: phone.trim() || null }),
      });
      if (!res.ok) throw new Error(t('employee.alerts.inviteFailed'));
      setEmail(''); setPhone('');
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resendInvite = async (inviteId) => {
    if (!confirm(t('employee.confirm.resend'))) return;
    try {
      const res = await fetchWithAuth(`${API_BASE}/employee/resendInvitation?inviteId=${inviteId}`, {
        method: 'POST',
        credentials: 'include',
      });
      if (!res.ok) throw new Error(t('employee.alerts.resendFailed'));
      fetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  const deleteInvite = async (inviteId) => {
    if (!confirm(t('employee.confirm.delete'))) return;
    try {
      const res = await fetchWithAuth(`${API_BASE}/employee/deleteInvitation?inviteId=${inviteId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) throw new Error(t('employee.alerts.deleteFailed'));
      fetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  const toggleStatus = async (userId, current, shopId) => {
    const willBeActive = !current;
    if (!confirm(t('employee.confirm.toggle', { action: willBeActive ? t('employee.status.activate') : t('employee.status.deactivate') }))) return;

    try {
      const res = await fetchWithAuth(
        `${API_BASE}/employee/toggleEmployeeStatus?shopId=${shopId}&userId=${userId}&active=${willBeActive}`, {
          method: 'PATCH',
          credentials: 'include',
        });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || t('employee.alerts.toggleFailed'));
      }

      fetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  const pendingInvitations = invitations.filter(inv => inv.status !== 'SUCCESS');

  return (
    <div className="min-h-screen bg-zinc-50/60 text-zinc-900 antialiased py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Modular Top Dashboard Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 pb-6 border-b border-zinc-200/80">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-0.5">
              <span>Staffing Directory Control</span>
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold text-zinc-900 tracking-tight flex items-center gap-2.5">
              {t('employee.page.title')}
            </h1>
            <p className="text-zinc-500 text-xs font-medium mt-0.5">{t('employee.page.subtitle')}</p>
          </div>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-5 py-2 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-sm rounded-full transition-all shadow-sm active:scale-98 shrink-0"
          >
            <Plus className="w-4 h-4" />
            {t('employee.buttons.invite')}
          </button>
        </div>

        {fetching ? (
          <div className="bg-white border border-zinc-200 rounded-md flex flex-col items-center justify-center py-28 text-center shadow-sm">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mb-3" />
            <p className="text-zinc-500 text-sm font-medium tracking-wide">Retrieving Team Structure...</p>
          </div>
        ) : (
          <div className="bg-white border border-zinc-200/80 rounded-md shadow-sm overflow-hidden">
            
            {/* Tab Controls Bar Container */}
            <div className="border-b border-zinc-100 bg-zinc-50/40 p-2 flex gap-1">
              <button
                onClick={() => setActiveTab('employees')}
                className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-md text-xs font-bold tracking-wider transition-all
                  ${activeTab === 'employees'
                    ? 'bg-white text-indigo-600 shadow-sm border border-zinc-200/60'
                    : 'text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100/60'
                  }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>{t('employee.sections.employees.title')}</span>
                <span className={`ml-1 text-[11px] font-extrabold px-2 py-0.5 rounded-full ${activeTab === 'employees' ? 'bg-indigo-50 text-indigo-700' : 'bg-zinc-200 text-zinc-500'}`}>
                  {employees.length}
                </span>
              </button>
              
              <button
                onClick={() => setActiveTab('invitations')}
                className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-md text-xs font-bold tracking-wider transition-all
                  ${activeTab === 'invitations'
                    ? 'bg-white text-indigo-600 shadow-sm border border-zinc-200/60'
                    : 'text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100/60'
                  }`}
              >
                <Mail className="w-4 h-4" />
                <span>{t('employee.sections.invitations.title')}</span>
                <span className={`ml-1 text-[11px] font-extrabold px-2 py-0.5 rounded-full ${activeTab === 'invitations' ? 'bg-indigo-50 text-indigo-700' : 'bg-zinc-200 text-zinc-500'}`}>
                  {pendingInvitations.length}
                </span>
              </button>
            </div>

            {/* Dynamic Content Frame Viewport */}
            <div className="p-6">
              <div className="max-h-[64vh] overflow-y-auto pr-1 space-y-4">
                
                {/* EMPLOYEES TAB GRID RENDER */}
                {activeTab === 'employees' && (
                  <div className="space-y-3">
                    {employees.length === 0 ? (
                      <div className="text-center py-16">
                        <Users className="w-12 h-12 mx-auto mb-3 text-zinc-300" />
                        <h4 className="text-sm font-bold text-zinc-700">{t('employee.sections.employees.empty')}</h4>
                        <p className="text-xs text-zinc-400 max-w-xs mx-auto mt-1">{t('employee.sections.employees.emptyHint')}</p>
                      </div>
                    ) : (
                      employees.map(emp => (
                        <div
                          key={emp.userId}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white border border-zinc-200 rounded-md gap-4 hover:border-zinc-300 transition-all shadow-inner bg-zinc-50/20"
                        >
                          <div className="flex items-center gap-4 min-w-0">
                            <div className="w-10 h-10 rounded-md bg-indigo-600 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-sm">
                              {emp.firstName?.[0] || ''}{emp.lastName?.[0] || ''}
                            </div>

                            <div className="min-w-0 space-y-0.5">
                              <p className="text-sm font-bold text-zinc-900 truncate">
                                {emp.firstName} {emp.lastName}
                              </p>
                              <div className="flex flex-col gap-0.5 text-xs text-zinc-500">
                                {emp.email && (
                                  <span className="flex items-center gap-1.5 truncate">
                                    <Mail className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                                    <span className="truncate">{emp.email}</span>
                                  </span>
                                )}
                                {emp.phone && (
                                  <span className="flex items-center gap-1.5">
                                    <Phone className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                                    <span>{emp.phone}</span>
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-3 text-[11px] font-semibold mt-1">
                                <span className={`inline-flex items-center gap-1 ${emp.isActive ? 'text-emerald-600' : 'text-zinc-400'}`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${emp.isActive ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-300'}`} />
                                  {emp.isActive ? t('employee.status.active') : t('employee.status.inactive')}
                                </span>
                                <span className="text-zinc-400 inline-flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {t('employee.labels.joined')}: {new Date(emp.createdDate).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => toggleStatus(emp.userId, emp.isActive, shopId)}
                            disabled={loading}
                            className={`w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all disabled:opacity-40
                              ${emp.isActive 
                                ? 'bg-rose-50 text-rose-700 hover:bg-rose-100/80 border-rose-200/60' 
                                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100/80 border-emerald-200/60'}`}
                          >
                            <span>{emp.isActive ? t('employee.buttons.deactivate') : t('employee.buttons.activate')}</span>
                            {emp.isActive ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* INVITATIONS TAB GRID RENDER */}
                {activeTab === 'invitations' && (
                  <div className="space-y-3">
                    {pendingInvitations.length === 0 ? (
                      <div className="text-center py-16">
                        <Mail className="w-12 h-12 mx-auto mb-3 text-zinc-300" />
                        <h4 className="text-sm font-bold text-zinc-700">{t('employee.sections.invitations.empty')}</h4>
                      </div>
                    ) : (
                      pendingInvitations.map(inv => (
                        <div
                          key={inv.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white border border-zinc-200 rounded-md gap-4 hover:border-zinc-300 transition-all shadow-inner bg-zinc-50/20"
                        >
                          <div className="flex items-start gap-3.5 min-w-0">
                            <div className="w-9 h-9 bg-zinc-100 border border-zinc-200 text-zinc-600 rounded-md flex items-center justify-center shrink-0">
                              {inv.email ? <Mail className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                            </div>

                            <div className="min-w-0 space-y-1">
                              <p className="text-sm font-bold text-zinc-900 truncate">
                                {inv.email || inv.phone || '—'}
                              </p>
                              {inv.email && inv.phone && (
                                <p className="text-xs text-zinc-500 inline-flex items-center gap-1.5">
                                  <Phone className="w-3.5 h-3.5 text-zinc-400" />
                                  {inv.phone}
                                </p>
                              )}
                              <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold text-zinc-400">
                                <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-extrabold tracking-wide border ${
                                  inv.status === 'PENDING' ? 'bg-amber-50 text-amber-700 border-amber-200/50' :
                                  inv.status === 'EXPIRED' ? 'bg-rose-50 text-rose-700 border-rose-200/50' : 'bg-zinc-100 text-zinc-600 border-zinc-200'
                                }`}>
                                  {inv.status}
                                </span>
                                <span className="inline-flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {t('employee.labels.sent')}: {new Date(inv.createdDate).toLocaleDateString()} @ {new Date(inv.createdDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                                <span className="inline-flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {t('employee.labels.expires')}: {new Date(inv.expiryDate).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                            <button
                              onClick={() => resendInvite(inv.id)}
                              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1 px-3 py-1.5 bg-white border border-zinc-200 rounded-full text-xs font-bold text-zinc-700 hover:bg-zinc-50 transition shadow-sm hover:border-zinc-300"
                              title={t('employee.buttons.resend')}
                            >
                              <RefreshCw className="w-3.5 h-3.5 text-zinc-400" />
                              <span>{t('employee.buttons.resend')}</span>
                            </button>
                            <button
                              onClick={() => deleteInvite(inv.id)}
                              className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-md transition border border-rose-100"
                              title={t('employee.buttons.delete')}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

              </div>
            </div>
          </div>
        )}
      </div>

      {/* Invite Flow Overlay Modal Popup */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={t('employee.modal.title')}>
        <form onSubmit={handleInvite} className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold tracking-wider text-zinc-400">
              {t('employee.modal.emailLabel')} <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="employee@business.com"
              className="w-full px-4 py-2.5 border border-zinc-200 rounded-md outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5 transition-all text-sm font-medium text-zinc-900"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || !email.trim()}
            className="w-full mt-2 inline-flex items-center justify-center gap-2 px-5 py-2 bg-zinc-900 disabled:bg-zinc-200 text-white font-bold text-sm rounded-full transition-all shadow-sm disabled:text-zinc-400"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{t('employee.buttons.sending')}</span>
              </>
            ) : (
              <>
                <Mail className="w-4 h-4" />
                <span>{t('employee.buttons.sendInvite')}</span>
              </>
            )}
          </button>
        </form>
      </Modal>
    </div>
  );
}