// import { useState, useEffect } from 'react';
// import {
//   Mail, Phone, Users, Plus, Trash2, RefreshCw,
//   ToggleLeft, ToggleRight, Loader2, UserCheck, Calendar, Clock
// } from 'lucide-react';

// const API_BASE = 'https://loyalty-backend-java.onrender.com/api';

// const Modal = ({ isOpen, onClose, children, title }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-md shadow-xl w-full max-w-md">
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
//   const [shopId, setShopId] = useState(null);
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [invitations, setInvitations] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);

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
//         fetch(`${API_BASE}/employee/invitationList?shopId=${shopId}`, { credentials: 'include' }),
//         fetch(`${API_BASE}/employee/listOfEmployee?shopId=${shopId}`)
//       ]);
//       if (!invRes.ok || !empRes.ok) throw new Error('Failed to load');
//       const [invData, empData] = await Promise.all([invRes.json(), empRes.json()]);
//       setInvitations(invData);
//       setEmployees(empData);
//     } catch (err) {
//       alert('Failed to load data. Please try again.');
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
//       const res = await fetch(`${API_BASE}/employee/inviteEmployee?shopId=${shopId}`, {
//         method: 'POST',
//         credentials: 'include',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email: email.trim(), phone: phone.trim() || null }),
//       });
//       if (!res.ok) throw new Error('Failed to send invitation');
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
//     if (!confirm('Resend this invitation?')) return;
//     try {
//       const res = await fetch(`${API_BASE}/employee/resendInvitation?inviteId=${inviteId}`, {
//         method: 'POST',
//         credentials: 'include',
//       });
//       if (!res.ok) throw new Error('Resend failed');
//       fetchData();
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   const deleteInvite = async (inviteId) => {
//     if (!confirm('Delete this invitation?')) return;
//     try {
//       const res = await fetch(`${API_BASE}/employee/deleteInvitation?inviteId=${inviteId}`, {
//         method: 'DELETE',
//         credentials: 'include',
//       });
//       if (!res.ok) throw new Error('Delete failed');
//       fetchData();
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   const toggleStatus = async (userId, current) => {
//     const willBeActive = !current;
//     if (!confirm(`${willBeActive ? 'Activate' : 'Deactivate'} this employee?`)) return;

//     try {
//       const res = await fetch(`${API_BASE}/employee/toggleEmployeeStatus?userId=${userId}&active=${willBeActive}`, {
//         method: 'PATCH',
//         credentials: 'include',
//       });
//       if (!res.ok) throw new Error('Update failed');
//       fetchData();
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   const pendingInvitations = invitations.filter(inv => inv.status !== 'SUCCESS');

//   return (
//     <>
//       <div className="min-h-screen">
//         <div className="max-w-8xl mx-auto p-2 space-y-4">

//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//             <div>
//               <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
//                 <Users className="w-8 h-8 text-indigo-600" />
//                 Employee Management
//               </h1>
//               <p className="text-slate-600 mt-1">Invite, manage, and track your team</p>
//             </div>
//             <button
//               onClick={() => setIsModalOpen(true)}
//               className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2 rounded-md shadow-lg hover:shadow-xl transition-all"
//             >
//               <Plus className="w-5 h-5" />
//               Invite Employee
//             </button>
//           </div>

//           {fetching && (
//             <div className="flex justify-center py-20">
//               <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
//             </div>
//           )}

//           {!fetching && (
//             <div className="grid gap-4">           
//               <div className="bg-white rounded-md shadow-sm border border-slate-200 overflow-hidden">
//                 <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-4 text-white">
//                   <h2 className="text-xl font-semibold flex items-center gap-2">
//                     <UserCheck className="w-6 h-6" />
//                     All Employees
//                     <span className="ml-2 bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
//                       {employees.length}
//                     </span>
//                   </h2>
//                 </div>

//                 <div className="p-4">
//                   {employees.length === 0 ? (
//                     <div className="text-center py-12 text-slate-500">
//                       <Users className="w-12 h-12 mx-auto mb-3 text-slate-300" />
//                       <p>No employees yet</p>
//                       <p className="text-sm mt-1">Invite your first team member!</p>
//                     </div>
//                   ) : (
//                     <div className="max-h-96 overflow-y-auto space-y-4">
//                       {employees.map(emp => (
//                         <div
//                           key={emp.userId}
//                           className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-slate-50 rounded-lg hover:bg-slate-100 transition"
//                         >
//                           <div className="flex items-start gap-4 flex-1">
//                             <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
//                               {emp.firstName[0]}{emp.lastName[0]}
//                             </div>

//                             <div className="space-y-1.5 flex-1">
//                               <p className="font-semibold text-slate-900">
//                                 {emp.firstName} {emp.lastName}
//                               </p>

//                               {emp.email && (
//                                 <p className="text-sm text-slate-600 flex items-center gap-1">
//                                   <Mail className="w-4 h-4" />
//                                   {emp.email}
//                                 </p>
//                               )}

//                               {emp.phone && (
//                                 <p className="text-sm text-slate-600 flex items-center gap-1">
//                                   <Phone className="w-4 h-4" />
//                                   {emp.phone}
//                                 </p>
//                               )}

//                               <div className="flex items-center gap-2">
//                                 {emp.isActive ? (
//                                   <ToggleRight className="w-7 h-7 text-emerald-600" />
//                                 ) : (
//                                   <ToggleLeft className="w-7 h-7 text-slate-400" />
//                                 )}
//                                 <span className={`text-sm font-medium ${emp.isActive ? 'text-emerald-600' : 'text-slate-400'}`}>
//                                   {emp.isActive ? 'Active' : 'Inactive'}
//                                 </span>
//                               </div>

//                               <p className="text-xs text-slate-500 flex items-center gap-1">
//                                 <Calendar className="w-3.5 h-3.5" />
//                                 Joined: {new Date(emp.createdDate).toLocaleDateString()}
//                               </p>
//                             </div>
//                           </div>

//                           <button
//                             onClick={() => toggleStatus(emp.userId, emp.isActive)}
//                             className={`px-4 py-2 rounded-md font-medium text-sm transition mt-4 sm:mt-0 ${
//                               emp.isActive
//                                 ? 'bg-red-50 text-red-600 hover:bg-red-100'
//                                 : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
//                             }`}
//                           >
//                             {emp.isActive ? 'Deactivate' : 'Activate'}
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="bg-white rounded-md shadow-sm border border-slate-200 overflow-hidden">
//                 <div className="bg-gradient-to-r from-teal-500 to-cyan-600 p-4 text-white">
//                   <h2 className="text-xl font-semibold flex items-center gap-2">
//                     <Mail className="w-6 h-6" />
//                     Pending Invitations
//                     <span className="ml-2 bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
//                       {pendingInvitations.length}
//                     </span>
//                   </h2>
//                 </div>

//                 <div className="p-4">
//                   {pendingInvitations.length === 0 ? (
//                     <div className="text-center py-12 text-slate-500">
//                       <Mail className="w-12 h-12 mx-auto mb-3 text-slate-300" />
//                       <p>No pending invitations</p>
//                     </div>
//                   ) : (
//                     <div className="max-h-96 overflow-y-auto space-y-4">
//                       {pendingInvitations.map(inv => (
//                         <div
//                           key={inv.id}
//                           className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-slate-50 rounded-lg hover:bg-slate-100 transition"
//                         >
//                           <div className="flex items-start gap-4 flex-1">
//                             <div className="bg-indigo-100 p-2 rounded-lg">
//                               {inv.email ? <Mail className="w-5 h-5 text-indigo-600" /> : <Phone className="w-5 h-5 text-indigo-600" />}
//                             </div>

//                             <div className="space-y-1.5 flex-1">
//                               <p className="font-semibold text-slate-900">
//                                 {inv.email || inv.phone || '—'}
//                               </p>

//                               {inv.email && inv.phone && (
//                                 <p className="text-sm text-slate-600 flex items-center gap-1">
//                                   <Phone className="w-4 h-4" />
//                                   {inv.phone}
//                                 </p>
//                               )}

//                               <div>
//                                 <span
//                                   className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
//                                     inv.status === 'PENDING'
//                                       ? 'bg-amber-100 text-amber-800'
//                                       : inv.status === 'EXPIRED'
//                                       ? 'bg-red-100 text-red-800'
//                                       : 'bg-gray-100 text-gray-700'
//                                   }`}
//                                 >
//                                   {inv.status}
//                                 </span>
//                               </div>

//                               <div className="flex flex-wrap gap-3 text-xs text-slate-500">
//                                 <span className="flex items-center gap-1">
//                                   <Calendar className="w-3.5 h-3.5" />
//                                   Sent: {new Date(inv.createdDate).toLocaleDateString()}
//                                 </span>
//                                 <span className="flex items-center gap-1">
//                                   <Clock className="w-3.5 h-3.5" />
//                                   {new Date(inv.createdDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                                 </span>
//                               </div>
//                               <div className="text-xs text-slate-500">
//                                 Expires: {new Date(inv.expiryDate).toLocaleString()}
//                               </div>
//                             </div>
//                           </div>

//                           <div className="flex items-center gap-2 mt-4 sm:mt-0">
//                             <button
//                               onClick={() => resendInvite(inv.id)}
//                               className="text-indigo-600 hover:text-indigo-700 p-2 hover:bg-indigo-50 rounded-md transition"
//                               title="Resend"
//                             >
//                               <RefreshCw className="w-4 h-4" />
//                             </button>
//                             <button
//                               onClick={() => deleteInvite(inv.id)}
//                               className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-md transition"
//                               title="Delete"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                             </button>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Invite New Employee">
//         <form onSubmit={handleInvite} className="space-y-5">
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-2">
//               Email Address <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="john@example.com"
//               className="w-full px-4 py-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading || !email.trim()}
//             className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-400 text-white font-medium py-3 rounded-md transition flex items-center justify-center gap-2"
//           >
//             {loading ? (
//               <>
//                 <Loader2 className="w-5 h-5 animate-spin" />
//                 Sending...
//               </>
//             ) : (
//               <>
//                 <Mail className="w-5 h-5" />
//                 Send Invitation
//               </>
//             )}
//           </button>
//         </form>
//       </Modal>
//     </>
//   );
// }












//translated version
// import { useState, useEffect } from 'react';
// import {
//   Mail, Phone, Users, Plus, Trash2, RefreshCw,
//   ToggleLeft, ToggleRight, Loader2, UserCheck, Calendar, Clock
// } from 'lucide-react';
// import { useTranslation } from 'react-i18next'; // ← AÑADIDO

// const API_BASE = 'https://loyalty-backend-java.onrender.com/api';

// const Modal = ({ isOpen, onClose, children, title }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-md shadow-xl w-full max-w-md">
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
//   const { t } = useTranslation(); // ← AÑADIDO

//   const [shopId, setShopId] = useState(null);
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [invitations, setInvitations] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);

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
//         fetch(`${API_BASE}/employee/invitationList?shopId=${shopId}`, { credentials: 'include' }),
//         fetch(`${API_BASE}/employee/listOfEmployee?shopId=${shopId}`)
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
//       const res = await fetch(`${API_BASE}/employee/inviteEmployee?shopId=${shopId}`, {
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
//       const res = await fetch(`${API_BASE}/employee/resendInvitation?inviteId=${inviteId}`, {
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
//       const res = await fetch(`${API_BASE}/employee/deleteInvitation?inviteId=${inviteId}`, {
//         method: 'DELETE',
//         credentials: 'include',
//       });
//       if (!res.ok) throw new Error(t('employee.alerts.deleteFailed'));
//       fetchData();
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   const toggleStatus = async (userId, current) => {
//     const willBeActive = !current;
//     if (!confirm(t('employee.confirm.toggle', { action: willBeActive ? t('employee.status.activate') : t('employee.status.deactivate') }))) return;

//     try {
//       const res = await fetch(`${API_BASE}/employee/toggleEmployeeStatus?userId=${userId}&active=${willBeActive}`, {
//         method: 'PATCH',
//         credentials: 'include',
//       });
//       if (!res.ok) throw new Error(t('employee.alerts.toggleFailed'));
//       fetchData();
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   const pendingInvitations = invitations.filter(inv => inv.status !== 'SUCCESS');

//   return (
//     <>
//       <div className="min-h-screen">
//         <div className="max-w-6xl mx-auto p-2 space-y-4">

//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//             <div>
//               <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
//                 <Users className="w-8 h-8 text-indigo-600" />
//                 {t('employee.page.title')}
//               </h1>
//               <p className="text-slate-600 mt-1">{t('employee.page.subtitle')}</p>
//             </div>
//             <button
//               onClick={() => setIsModalOpen(true)}
//               className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2 rounded-sm shadow-lg hover:shadow-xl transition-all"
//             >
//               <Plus className="w-5 h-5" />
//               {t('employee.buttons.invite')}
//             </button>
//           </div>

//           {fetching && (
//             <div className="flex justify-center py-20">
//               <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
//             </div>
//           )}

//           {!fetching && (
//             <div className="grid gap-4">           
//               <div className="bg-white rounded-md shadow-sm border border-slate-200 overflow-hidden">
//                 <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-4 text-white">
//                   <h2 className="text-xl font-semibold flex items-center gap-2">
//                     <UserCheck className="w-6 h-6" />
//                     {t('employee.sections.employees.title')}
//                     <span className="ml-2 bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
//                       {employees.length}
//                     </span>
//                   </h2>
//                 </div>

//                 <div className="p-4">
//                   {employees.length === 0 ? (
//                     <div className="text-center py-12 text-slate-500">
//                       <Users className="w-12 h-12 mx-auto mb-3 text-slate-300" />
//                       <p>{t('employee.sections.employees.empty')}</p>
//                       <p className="text-sm mt-1">{t('employee.sections.employees.emptyHint')}</p>
//                     </div>
//                   ) : (
//                     <div className="max-h-96 overflow-y-auto space-y-4">
//                       {employees.map(emp => (
//                         <div
//                           key={emp.userId}
//                           className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-slate-50 rounded-lg hover:bg-slate-100 transition"
//                         >
//                           <div className="flex items-start gap-4 flex-1">
//                             <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
//                               {emp.firstName[0]}{emp.lastName[0]}
//                             </div>

//                             <div className="space-y-1.5 flex-1">
//                               <p className="font-semibold text-slate-900">
//                                 {emp.firstName} {emp.lastName}
//                               </p>

//                               {emp.email && (
//                                 <p className="text-sm text-slate-600 flex items-center gap-1">
//                                   <Mail className="w-4 h-4" />
//                                   {emp.email}
//                                 </p>
//                               )}

//                               {emp.phone && (
//                                 <p className="text-sm text-slate-600 flex items-center gap-1">
//                                   <Phone className="w-4 h-4" />
//                                   {emp.phone}
//                                 </p>
//                               )}

//                               <div className="flex items-center gap-2">
//                                 {emp.isActive ? (
//                                   <ToggleRight className="w-7 h-7 text-emerald-600" />
//                                 ) : (
//                                   <ToggleLeft className="w-7 h-7 text-slate-400" />
//                                 )}
//                                 <span className={`text-sm font-medium ${emp.isActive ? 'text-emerald-600' : 'text-slate-400'}`}>
//                                   {emp.isActive ? t('employee.status.active') : t('employee.status.inactive')}
//                                 </span>
//                               </div>

//                               <p className="text-xs text-slate-500 flex items-center gap-1">
//                                 <Calendar className="w-3.5 h-3.5" />
//                                 {t('employee.labels.joined')}: {new Date(emp.createdDate).toLocaleDateString()}
//                               </p>
//                             </div>
//                           </div>

//                           <button
//                             onClick={() => toggleStatus(emp.userId, emp.isActive)}
//                             className={`px-4 py-2 rounded-md font-medium text-sm transition mt-4 sm:mt-0 ${
//                               emp.isActive
//                                 ? 'bg-red-50 text-red-600 hover:bg-red-100'
//                                 : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
//                             }`}
//                           >
//                             {emp.isActive ? t('employee.buttons.deactivate') : t('employee.buttons.activate')}
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="bg-white rounded-md shadow-sm border border-slate-200 overflow-hidden">
//                 <div className="bg-gradient-to-r from-teal-500 to-cyan-600 p-4 text-white">
//                   <h2 className="text-xl font-semibold flex items-center gap-2">
//                     <Mail className="w-6 h-6" />
//                     {t('employee.sections.invitations.title')}
//                     <span className="ml-2 bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
//                       {pendingInvitations.length}
//                     </span>
//                   </h2>
//                 </div>

//                 <div className="p-4">
//                   {pendingInvitations.length === 0 ? (
//                     <div className="text-center py-12 text-slate-500">
//                       <Mail className="w-12 h-12 mx-auto mb-3 text-slate-300" />
//                       <p>{t('employee.sections.invitations.empty')}</p>
//                     </div>
//                   ) : (
//                     <div className="max-h-96 overflow-y-auto space-y-4">
//                       {pendingInvitations.map(inv => (
//                         <div
//                           key={inv.id}
//                           className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-slate-50 rounded-lg hover:bg-slate-100 transition"
//                         >
//                           <div className="flex items-start gap-4 flex-1">
//                             <div className="bg-indigo-100 p-2 rounded-lg">
//                               {inv.email ? <Mail className="w-5 h-5 text-indigo-600" /> : <Phone className="w-5 h-5 text-indigo-600" />}
//                             </div>

//                             <div className="space-y-1.5 flex-1">
//                               <p className="font-semibold text-slate-900">
//                                 {inv.email || inv.phone || '—'}
//                               </p>

//                               {inv.email && inv.phone && (
//                                 <p className="text-sm text-slate-600 flex items-center gap-1">
//                                   <Phone className="w-4 h-4" />
//                                   {inv.phone}
//                                 </p>
//                               )}

//                               <div>
//                                 <span
//                                   className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
//                                     inv.status === 'PENDING'
//                                       ? 'bg-amber-100 text-amber-800'
//                                       : inv.status === 'EXPIRED'
//                                       ? 'bg-red-100 text-red-800'
//                                       : 'bg-gray-100 text-gray-700'
//                                   }`}
//                                 >
//                                   {inv.status}
//                                 </span>
//                               </div>

//                               <div className="flex flex-wrap gap-3 text-xs text-slate-500">
//                                 <span className="flex items-center gap-1">
//                                   <Calendar className="w-3.5 h-3.5" />
//                                   {t('employee.labels.sent')}: {new Date(inv.createdDate).toLocaleDateString()}
//                                 </span>
//                                 <span className="flex items-center gap-1">
//                                   <Clock className="w-3.5 h-3.5" />
//                                   {new Date(inv.createdDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                                 </span>
//                               </div>
//                               <div className="text-xs text-slate-500">
//                                 {t('employee.labels.expires')}: {new Date(inv.expiryDate).toLocaleString()}
//                               </div>
//                             </div>
//                           </div>

//                           <div className="flex items-center gap-2 mt-4 sm:mt-0">
//                             <button
//                               onClick={() => resendInvite(inv.id)}
//                               className="text-indigo-600 hover:text-indigo-700 p-2 hover:bg-indigo-50 rounded-md transition"
//                               title={t('employee.buttons.resend')}
//                             >
//                               <RefreshCw className="w-4 h-4" />
//                             </button>
//                             <button
//                               onClick={() => deleteInvite(inv.id)}
//                               className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-md transition"
//                               title={t('employee.buttons.delete')}
//                             >
//                               <Trash2 className="w-4 h-4" />
//                             </button>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={t('employee.modal.title')}>
//         <form onSubmit={handleInvite} className="space-y-5">
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-2">
//               {t('employee.modal.emailLabel')} <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="john@example.com"
//               className="w-full px-4 py-3 border border-slate-300 rounded-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading || !email.trim()}
//             className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-400 text-white font-medium py-3 rounded-sm transition flex items-center justify-center gap-2"
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
  ToggleLeft, ToggleRight, Loader2, UserCheck, Calendar, Clock
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

const API_BASE = 'https://loyalty-backend-java.onrender.com/api';

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
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
        fetch(`${API_BASE}/employee/invitationList?shopId=${shopId}`, { credentials: 'include' }),
        fetch(`${API_BASE}/employee/listOfEmployee?shopId=${shopId}`)
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
      const res = await fetch(`${API_BASE}/employee/inviteEmployee?shopId=${shopId}`, {
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
      const res = await fetch(`${API_BASE}/employee/resendInvitation?inviteId=${inviteId}`, {
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
      const res = await fetch(`${API_BASE}/employee/deleteInvitation?inviteId=${inviteId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) throw new Error(t('employee.alerts.deleteFailed'));
      fetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  // const toggleStatus = async (userId, current) => {
  //   const willBeActive = !current;
  //   if (!confirm(t('employee.confirm.toggle', { action: willBeActive ? t('employee.status.activate') : t('employee.status.deactivate') }))) return;

  //   try {
  //     const res = await fetch(`${API_BASE}/employee/toggleEmployeeStatus?userId=${userId}&active=${willBeActive}`, {
  //       method: 'PATCH',
  //       credentials: 'include',
  //     });
  //     if (!res.ok) throw new Error(t('employee.alerts.toggleFailed'));
  //     fetchData();
  //   } catch (err) {
  //     alert(err.message);
  //   }
  // };
  const toggleStatus = async (userId, current, shopId) => {
    const willBeActive = !current;
    if (!confirm(t('employee.confirm.toggle', { action: willBeActive ? t('employee.status.activate') : t('employee.status.deactivate') }))) return;

    try {
      const res = await fetch(
        `${API_BASE}/employee/toggleEmployeeStatus?shopId=${shopId}&userId=${userId}&active=${willBeActive}`,
        {
          method: 'PATCH',
          credentials: 'include',
        }
      );

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || t('employee.alerts.toggleFailed'));
      }

      fetchData(); // Refresh lists
    } catch (err) {
      alert(err.message);
    }
  };

  const pendingInvitations = invitations.filter(inv => inv.status !== 'SUCCESS');

  return (
    <>
      <div className="min-h-screen">
        <div className="max-w-6xl mx-auto p-2 space-y-6">

          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                <Users className="w-8 h-8 text-indigo-600" />
                {t('employee.page.title')}
              </h1>
              <p className="text-slate-600 mt-1">{t('employee.page.subtitle')}</p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2 rounded shadow-lg hover:shadow-xl transition-all"
            >
              <Plus className="w-5 h-5" />
              {t('employee.buttons.invite')}
            </button>
          </div>

          {fetching ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
          ) : (
            <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden">
              {/* Tabs - Fully Responsive */}
              <div className="border-b border-slate-200">
                <div className="flex flex-col sm:flex-row">
                  <button
                    onClick={() => setActiveTab('employees')}
                    className={`flex-1 px-4 py-4 sm:px-6 text-sm font-semibold transition-all flex items-center justify-center sm:justify-start gap-2 
                      ${activeTab === 'employees'
                        ? 'text-indigo-600 border-b-2 sm:border-b-4 border-indigo-600 bg-indigo-50'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                  >
                    <UserCheck className="w-5 h-5" />
                    {t('employee.sections.employees.title')}
                    <span className="ml-2 bg-white px-2.5 py-0.5 rounded-full text-xs font-medium">
                      {employees.length}
                    </span>
                  </button>
                  <button
                    onClick={() => setActiveTab('invitations')}
                    className={`flex-1 px-4 py-4 sm:px-6 text-sm font-semibold transition-all flex items-center justify-center sm:justify-start gap-2 
                      ${activeTab === 'invitations'
                        ? 'text-teal-600 border-b-2 sm:border-b-4 border-teal-600 bg-teal-50'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                  >
                    <Mail className="w-5 h-5" />
                    {t('employee.sections.invitations.title')}
                    <span className="ml-2 bg-white px-2.5 py-0.5 rounded-full text-xs font-medium">
                      {pendingInvitations.length}
                    </span>
                  </button>
                </div>
              </div>

              {/* Scrollable Content Area - Perfect on ALL screens */}
              <div className="p-3 sm:p-5 md:p-6">
                <div 
                  className="max-h-[58vh] sm:max-h-[62vh] md:max-h-[68vh] lg:max-h-[72vh] 
                            overflow-y-auto 
                            scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-slate-100 
                            hover:scrollbar-thumb-slate-500 
                            scrollbar-thumb-rounded-full scrollbar-track-rounded-full
                            pr-2"
                >
                  {/* EMPLOYEES TAB */}
                  {activeTab === 'employees' && (
                    <div className="space-y-4 pb-4">
                      {employees.length === 0 ? (
                        <div className="text-center py-16 text-slate-500">
                          <Users className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                          <p className="text-lg font-medium">{t('employee.sections.employees.empty')}</p>
                          <p className="text-sm mt-2">{t('employee.sections.employees.emptyHint')}</p>
                        </div>
                      ) : (
                        employees.map(emp => (
                          <div
                            key={emp.userId}
                            className="flex flex-col sm:flex-row gap-4 p-4 sm:p-5 bg-slate-50 rounded hover:bg-slate-100 transition-all"
                          >
                            <div className="flex items-start gap-4 flex-1">
                              <div className="w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg shrink-0">
                                {emp.firstName[0]}{emp.lastName[0]}
                              </div>

                              <div className="space-y-2 flex-1 min-w-0">
                                <p className="font-semibold text-slate-900 truncate">
                                  {emp.firstName} {emp.lastName}
                                </p>
                                {emp.email && (
                                  <p className="text-xs sm:text-sm text-slate-600 flex items-center gap-1 truncate">
                                    <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                                    <span className="truncate">{emp.email}</span>
                                  </p>
                                )}
                                {emp.phone && (
                                  <p className="text-xs sm:text-sm text-slate-600 flex items-center gap-1">
                                    <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                                    {emp.phone}
                                  </p>
                                )}
                                <div className="flex items-center gap-2 text-xs sm:text-sm">
                                  {emp.isActive ? (
                                    <ToggleRight className="w-6 h-6 text-emerald-600" />
                                  ) : (
                                    <ToggleLeft className="w-6 h-6 text-slate-400" />
                                  )}
                                  <span className={`font-medium ${emp.isActive ? 'text-emerald-600' : 'text-slate-400'}`}>
                                    {emp.isActive ? t('employee.status.active') : t('employee.status.inactive')}
                                  </span>
                                </div>
                                <p className="text-xs text-slate-500 flex items-center gap-1">
                                  <Calendar className="w-3.5 h-3.5" />
                                  {t('employee.labels.joined')}: {new Date(emp.createdDate).toLocaleDateString()}
                                </p>
                              </div>
                            </div>

                            {/* <button
                              onClick={() => toggleStatus(emp.userId, emp.isActive)}
                              className={`px-4 py-2.5 rounded font-medium text-sm transition mt-2 sm:mt-0 w-full sm:w-auto
                                ${emp.isActive
                                  ? 'bg-red-100 text-red-600 hover:bg-red-200'
                                  : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
                                }`}
                            >
                              {emp.isActive ? t('employee.buttons.deactivate') : t('employee.buttons.activate')}
                            </button> */}
                            <button
                              onClick={() => toggleStatus(emp.userId, emp.isActive, shopId)}
                              disabled={loading}
                              className={`px-5 py-2.5 rounded font-medium text-sm transition-all mt-2 sm:mt-0 w-full sm:w-auto flex items-center justify-center gap-2 shadow-sm
                                ${emp.isActive 
                                  ? 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200' 
                                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'}
                                ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'}
                              `}
                            >
                              {emp.isActive ? (
                                <>Deactivate <ToggleRight className="w-5 h-5" /></>
                              ) : (
                                <>Activate <ToggleLeft className="w-5 h-5" /></>
                              )}
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  )}

                  {/* INVITATIONS TAB */}
                  {activeTab === 'invitations' && (
                    <div className="space-y-4 pb-4">
                      {pendingInvitations.length === 0 ? (
                        <div className="text-center py-16 text-slate-500">
                          <Mail className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                          <p className="text-lg font-medium">{t('employee.sections.invitations.empty')}</p>
                        </div>
                      ) : (
                        pendingInvitations.map(inv => (
                          <div
                            key={inv.id}
                            className="flex flex-col sm:flex-row gap-4 p-4 sm:p-5 bg-slate-50 rounded hover:bg-slate-100 transition-all"
                          >
                            <div className="flex items-start gap-4 flex-1">
                              <div className="bg-indigo-100 p-2 rounded shrink-0">
                                {inv.email ? <Mail className="w-5 h-5 text-indigo-600" /> : <Phone className="w-5 h-5 text-indigo-600" />}
                              </div>

                              <div className="space-y-2 flex-1 min-w-0">
                                <p className="font-semibold text-slate-900 truncate">
                                  {inv.email || inv.phone || '—'}
                                </p>
                                {inv.email && inv.phone && (
                                  <p className="text-sm text-slate-600 flex items-center gap-1">
                                    <Phone className="w-4 h-4" />
                                    {inv.phone}
                                  </p>
                                )}
                                <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                                  inv.status === 'PENDING' ? 'bg-amber-100 text-amber-800' :
                                  inv.status === 'EXPIRED' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-700'
                                }`}>
                                  {inv.status}
                                </span>
                                <div className="text-xs text-slate-500 space-y-1">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {t('employee.labels.sent')}: {new Date(inv.createdDate).toLocaleDateString()}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5" />
                                    {new Date(inv.createdDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </div>
                                  <div>{t('employee.labels.expires')}: {new Date(inv.expiryDate).toLocaleString()}</div>
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-2 justify-end sm:justify-start">
                              <button
                                onClick={() => resendInvite(inv.id)}
                                className="p-2.5 text-indigo-600 hover:bg-indigo-100 rounded transition"
                                title={t('employee.buttons.resend')}
                              >
                                <RefreshCw className="w-4.5 h-4.5" />
                              </button>
                              <button
                                onClick={() => deleteInvite(inv.id)}
                                className="p-2.5 text-red-600 hover:bg-red-100 rounded transition"
                                title={t('employee.buttons.delete')}
                              >
                                <Trash2 className="w-4.5 h-4.5" />
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
      </div>

      {/* Invite Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={t('employee.modal.title')}>
        <form onSubmit={handleInvite} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {t('employee.modal.emailLabel')} <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              className="w-full px-4 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || !email.trim()}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-400 text-white font-medium py-2 rounded transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {t('employee.buttons.sending')}
              </>
            ) : (
              <>
                <Mail className="w-5 h-5" />
                {t('employee.buttons.sendInvite')}
              </>
            )}
          </button>
        </form>
      </Modal>
    </>
  );
}