// import { useState, useEffect } from 'react';
// import { 
//   Inbox, 
//   Reply, 
//   Send, 
//   Loader2, 
//   AlertCircle,
//   CheckCircle,
//   User,
//   Store,
//   Users,
//   Calendar,
//   Mail,
//   ChevronLeft,
//   MessageSquare,
//   Filter
// } from 'lucide-react';
// import { useTranslation } from 'react-i18next';

// const API_BASE = 'https://loyalty-backend-java.onrender.com/api/loyalty_homePage';

// export default function AdminSupportInbox() {
//   const { t } = useTranslation();

//   const [messages, setMessages] = useState([]);
//   const [filteredMessages, setFilteredMessages] = useState([]);
//   const [selectedMessage, setSelectedMessage] = useState(null);
//   const [replyText, setReplyText] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [replyLoading, setReplyLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [isDetailView, setIsDetailView] = useState(false);
//   const [selectedRole, setSelectedRole] = useState('ALL'); 
//   const [selectedStatus, setSelectedStatus] = useState('ALL');

//   useEffect(() => {
//     fetchMessages();
//   }, []);

//   const fetchMessages = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const res = await fetch(`${API_BASE}/inboxMessages`, {
//         credentials: 'include'
//       });
//       if (!res.ok) throw new Error('Failed to load messages');
//       const data = await res.json();
      
//       // Sort by priority: EMPLOYEE > SHOPKEEPER > USER > Guest
//       const sorted = data.sort((a, b) => {
//         // const priority = { EMPLOYEE: 1, SHOPKEEPER: 2, USER: 3 };
//         const priority = { SHOPKEEPER: 1, EMPLOYEE: 2, USER: 3 };
//         return (priority[a.role] || 4) - (priority[b.role] || 4);
//       });
      
//       setMessages(sorted);
//       setFilteredMessages(sorted); // Initial: show all
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Filter messages when selectedRole changes
//   useEffect(() => {
//     let filtered = messages;

//     if (selectedRole !== 'ALL') {
//       filtered = filtered.filter(msg => msg.role === selectedRole);
//     }

//     if (selectedStatus !== 'ALL') {
//       filtered = filtered.filter(msg => msg.status === selectedStatus);
//     }

//     setFilteredMessages(filtered);
//   }, [selectedRole, selectedStatus, messages]);

//   const handleReply = async () => {
//     if (!replyText.trim()) return;
//     setReplyLoading(true);
//     setSuccess('');
//     setError('');

//     try {
//       const res = await fetch(`${API_BASE}/reply/${selectedMessage.id}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify({ reply: replyText })
//       });

//       if (!res.ok) throw new Error('Failed to send reply');

//       setSuccess('Reply sent successfully!');
//       setReplyText('');
//       setSelectedMessage({ ...selectedMessage, status: 'REPLIED' });
//       fetchMessages();
//       setTimeout(() => setSuccess(''), 4000);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setReplyLoading(false);
//     }
//   };

//   const handleMessageSelect = (msg) => {
//     setSelectedMessage(msg);
//     setIsDetailView(true);
//   };

//   const getRoleBadge = (role) => {
//     const badges = {
//       EMPLOYEE: { color: 'bg-indigo-100 text-indigo-800 border-indigo-300', icon: Users },
//       SHOPKEEPER: { color: 'bg-orange-100 text-orange-800 border-orange-300', icon: Store },
//       USER: { color: 'bg-cyan-100 text-cyan-800 border-cyan-300', icon: User },
//     };
//     const badge = badges[role] || { color: 'bg-gray-100 text-gray-800 border-gray-300', icon: null };
//     const Icon = badge.icon;
//     return (
//       <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${badge.color}`}>
//         {Icon && <Icon className="w-3.5 h-3.5" />}
//         {role || 'Guest'}
//       </span>
//     );
//   };

//   const getStatusBadge = (status) => {
//     return status === 'NEW' 
//       ? <span className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-medium border border-red-200">New</span>
//       : <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium border border-gray-300">Replied</span>;
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-white to-sky-50 py-6 px-4">
//       <div className="max-w-7xl mx-auto">
//         <div className="bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden">
          
//           {/* Header */}
//           <div className="bg-gradient-to-r from-sky-500 to-cyan-600 text-white p-4">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//               <div className="flex items-center gap-5">
//                 <div className="p-3 bg-white/20 rounded-md">
//                   <Inbox className="w-8 h-8" />
//                 </div>
//                 <div>
//                   <h1 className="text-3xl sm:text-4xl font-extrabold">Support Inbox</h1>
//                   <p className="text-sky-100 mt-1">Helping our users, one message at a time 💙</p>
//                 </div>
//               </div>

//               {/* Role Filter Dropdown */}
//               <div className="flex items-center gap-3">
//                 <Filter className="w-5 h-5 text-sky-100" />
//                 <select
//                   value={selectedRole}
//                   onChange={(e) => setSelectedRole(e.target.value)}
//                   className="px-4 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-sky-200 focus:outline-none focus:ring-2 focus:ring-white/50"
//                 >
//                   <option value="ALL" className="text-gray-900">All Messages</option>
//                   <option value="EMPLOYEE" className="text-gray-900">Employees</option>
//                   <option value="SHOPKEEPER" className="text-gray-900">Shop Owners</option>
//                   <option value="USER" className="text-gray-900">Customers</option>
//                   <option value="" className="text-gray-900">Guests</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           <div className="p-4 sm:p-8">
//             {loading && (
//               <div className="flex flex-col items-center justify-center py-32">
//                 <Loader2 className="w-10 h-10 animate-spin text-sky-600 mb-4" />
//                 <p className="text-gray-600 text-lg">Loading messages...</p>
//               </div>
//             )}

//             {error && (
//               <div className="mb-8 p-6 bg-red-50 border-2 border-red-300 rounded-xl text-red-700 text-center">
//                 <AlertCircle className="w-10 h-10 mx-auto mb-3" />
//                 <p className="text-xl font-semibold">{error}</p>
//               </div>
//             )}

//             {!loading && !error && (
//               <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                
//                 {/* Message List */}
//                 <div className={`xl:col-span-1 ${isDetailView ? 'hidden xl:block' : 'block'}`}>
//                   <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
//                     <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
//                       <MessageSquare className="w-5 h-5 text-sky-500" />
//                       Messages ({filteredMessages.length})
//                     </h2>
//                   </div>

//                   <div className="flex gap-2 mb-5 border-b border-gray-200">
//                     {['ALL', 'NEW', 'REPLIED'].map((tab) => (
//                       <button
//                         key={tab}
//                         onClick={() => setSelectedStatus(tab)}
//                         className={`px-5 py-2 font-medium text-sm rounded-t-lg transition-all ${
//                           selectedStatus === tab
//                             ? 'bg-sky-600 text-white shadow-md'
//                             : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
//                         }`}
//                       >
//                         {tab === 'ALL' ? 'All' : tab === 'NEW' ? 'New' : 'Replied'}
//                       </button>
//                     ))}
//                   </div>
                  
//                   <div className="space-y-3 max-h-[80vh] overflow-y-auto pr-1">
//                     {filteredMessages.length === 0 ? (
//                       <div className="text-center py-16 bg-gray-50 rounded-xl">
//                         <Inbox className="w-16 h-16 mx-auto mb-4 text-gray-300" />
//                         <p className="text-lg text-gray-500 font-medium">
//                           {selectedRole === 'ALL' ? 'No messages yet' : `No messages from ${selectedRole || 'Guests'}`}
//                         </p>
//                       </div>
//                     ) : (
//                       filteredMessages.map((msg) => (
//                         <div
//                           key={msg.id}
//                           onClick={() => handleMessageSelect(msg)}
//                           className={`p-3 rounded-md cursor-pointer transition-all duration-300 border ${
//                             selectedMessage?.id === msg.id
//                               ? 'bg-sky-50 border-sky-400 shadow-md ring-2 ring-sky-200'
//                               : msg.status === 'NEW'
//                                 ? 'bg-white border-red-100 hover:border-red-300 hover:shadow-sm'
//                                 : 'bg-white border-gray-200 hover:border-sky-200 hover:shadow-sm'
//                           }`}
//                         >
//                           <div className="flex justify-between items-start mb-2">
//                             <h3 className={`font-bold text-gray-900 text-base line-clamp-1 ${msg.status === 'NEW' ? 'text-red-700' : ''}`}>
//                               {msg.subject}
//                             </h3>
//                             {getStatusBadge(msg.status)}
//                           </div>
                          
//                           <div className="space-y-1">
//                             <div className="flex items-center gap-2 text-gray-700">
//                               <User className="w-4 h-4 text-gray-500" />
//                               <span className="text-sm font-medium">{msg.fullName}</span>
//                               <span className="text-xs text-gray-500 line-clamp-1">({msg.email})</span>
//                             </div>
                            
//                             <div className="flex items-center gap-2">
//                               <Calendar className="w-4 h-4 text-gray-500" />
//                               <span className="text-xs text-gray-600">
//                                 {new Date(msg.createdDate).toLocaleDateString(undefined, { 
//                                   year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
//                                 })}
//                               </span>
//                             </div>
                            
//                             <div className="pt-1">
//                               {getRoleBadge(msg.role)}
//                             </div>
//                           </div>
//                         </div>
//                       ))
//                     )}
//                   </div>
//                 </div>

//                 {/* Message Details & Reply */}
//                 <div className={`xl:col-span-2 ${isDetailView ? 'block' : 'hidden xl:block'}`}>
//                   {selectedMessage ? (
//                     <div className="bg-white rounded-lg p-6 shadow-inner border border-sky-100">
                      
//                       {/* Mobile Back Button */}
//                       <button 
//                         onClick={() => setIsDetailView(false)} 
//                         className="flex items-center text-sky-600 hover:text-sky-800 mb-4 xl:hidden font-medium text-md"
//                       >
//                         <ChevronLeft className="w-6 h-6" /> Back to Messages
//                       </button>

//                       <div className="mb-4 border-b pb-6 border-gray-100">
//                         <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
//                           {selectedMessage.subject}
//                         </h2>
//                         <div className="flex flex-wrap items-center gap-4 text-gray-600">
//                           <div className="flex items-center gap-2">
//                             <User className="w-5 h-5 text-sky-500" />
//                             <span className="font-semibold">{selectedMessage.fullName}</span>
//                           </div>
//                           <div className="flex items-center gap-2">
//                             <Mail className="w-5 h-5 text-sky-500" />
//                             <span>{selectedMessage.email}</span>
//                           </div>
//                           {getRoleBadge(selectedMessage.role)}
//                         </div>
//                         <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
//                           <Calendar className="w-5 h-5" />
//                           <span>{new Date(selectedMessage.createdDate).toLocaleDateString(undefined, { 
//                                   year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
//                                 })}</span>
//                         </div>
//                       </div>

//                       <div className="bg-gray-50 p-2 rounded-lg border border-gray-200 mb-4">
//                         <p className="text-gray-800 leading-relaxed text-base whitespace-pre-wrap">
//                           {selectedMessage.message}
//                         </p>
//                       </div>

//                       {/* Reply Box */}
//                       <div className="bg-gradient-to-r from-sky-50 to-cyan-50 rounded-lg p-4 border-2 border-sky-200">
//                         <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-3">
//                           <Reply className="w-6 h-6 text-sky-600" />
//                           Write Your Reply
//                         </h3>
//                         <textarea
//                           value={replyText}
//                           onChange={(e) => setReplyText(e.target.value)}
//                           rows={8}
//                           placeholder="Write a friendly and helpful response..."
//                           className="w-full p-4 text-base border-2 border-gray-300 rounded-lg focus:border-sky-500 focus:ring-4 focus:ring-sky-100 outline-none transition-all"
//                         />
//                         <div className="mt-2 flex justify-end">
//                           <button
//                             onClick={handleReply}
//                             disabled={replyLoading || !replyText.trim()}
//                             className="inline-flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-700 hover:to-cyan-700 text-white text-lg font-bold rounded-md shadow-xl hover:shadow-2xl disabled:opacity-60 transition-all transform hover:-translate-y-1"
//                           >
//                             {replyLoading ? (
//                               <Loader2 className="w-5 h-5 animate-spin" />
//                             ) : (
//                               <Send className="w-5 h-5" />
//                             )}
//                             {replyLoading ? 'Sending Reply...' : 'Send Reply'}
//                           </button>
//                         </div>
//                       </div>

//                       {success && (
//                         <div className="mt-5 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-md text-emerald-800 text-center">
//                           <CheckCircle className="w-6 h-6 mx-auto mb-3" />
//                           <p className="text-xl font-bold">{success}</p>
//                         </div>
//                       )}
//                     </div>
//                   ) : (
//                     <div className="text-center py-32">
//                       <div className="bg-gray-100 rounded-full w-32 h-32 mx-auto mb-8 flex items-center justify-center">
//                         <Inbox className="w-16 h-16 text-gray-400" />
//                       </div>
//                       <p className="text-2xl font-medium text-gray-600">Select a message to view</p>
//                       <p className="text-gray-500 mt-3">Use the filter above to focus on specific user types</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }












import { useState, useEffect } from 'react';
import { 
  Inbox, 
  Reply, 
  Send, 
  Loader2, 
  AlertCircle,
  CheckCircle,
  User,
  Store,
  Users,
  Calendar,
  Mail,
  ChevronLeft,
  MessageSquare,
  Filter,
  Trash2,
  CheckSquare,
  Square
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

const API_BASE = 'https://loyalty-backend-java.onrender.com/api/loyalty_homePage';

export default function AdminSupportInbox() {
  const { t } = useTranslation();

  // ←←← CHANGED: Now we store paginated data
  const [messages, setMessages] = useState([]); // Current page content
  const [totalMessages, setTotalMessages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [replyLoading, setReplyLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isDetailView, setIsDetailView] = useState(false);

  const [selectedRole, setSelectedRole] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState(''); // ←←← ADDED: Search support

  // ←←← ADDED: Delete feature states
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const PAGE_SIZE = 20; 

  const fetchMessages = async (page = 0, append = false) => {
    const isLoadMore = page > 0;
    if (isLoadMore) setLoadingMore(true);
    else setLoading(true);

    setError('');

    try {
      let url = `${API_BASE}/inboxMessages?page=${page}&size=${PAGE_SIZE}&sortBy=createdDate&sortDir=desc`;

      if (selectedStatus !== 'ALL' && selectedStatus) {
        url += `&status=${selectedStatus}`;
      } else if (selectedRole !== 'ALL' && selectedRole) {
        url += `&role=${selectedRole}`;
      } else if (searchQuery.trim()) {
        url += `&search=${encodeURIComponent(searchQuery.trim())}`;
      }

      const res = await fetch(url, { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to load messages');

      const pageData = await res.json();

      const newMessages = pageData.content || [];

      const priority = { SHOPKEEPER: 1, EMPLOYEE: 2, USER: 3 };
      newMessages.sort((a, b) => (priority[a.role] || 4) - (priority[b.role] || 4));

      if (append) {
        setMessages(prev => [...prev, ...newMessages]);
      } else {
        setMessages(newMessages);
        setSelectedIds(new Set()); // Clear selection on new load
      }

      setTotalMessages(pageData.totalElements);
      setCurrentPage(page);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchMessages(0, false);
  }, [selectedRole, selectedStatus, searchQuery]);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollHeight - scrollTop <= clientHeight + 100 && !loadingMore && messages.length < totalMessages) {
      fetchMessages(currentPage + 1, true);
    }
  };

  const toggleSelectMessage = (id) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);
    setSelectedIds(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === messages.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(messages.map(m => m.id)));
    }
  };

  const handleDelete = async () => {
    if (selectedIds.size === 0) return;
    setIsDeleting(true);

    try {
      const ids = Array.from(selectedIds);
      const res = await fetch(`${API_BASE}/inboxMessages/bulk`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(ids)
      });

      if (!res.ok) throw new Error('Failed to delete messages');

      setSuccess(`${ids.length} message${ids.length > 1 ? 's' : ''} deleted successfully!`);
      setSelectedIds(new Set());
      setShowDeleteConfirm(false);
      fetchMessages(0, false); // Refresh from first page

      if (selectedMessage && ids.includes(selectedMessage.id)) {
        setSelectedMessage(null);
        setIsDetailView(false);
      }

      setTimeout(() => setSuccess(''), 4000);
    } catch (err) {
      setError(err.message || 'Failed to delete');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleReply = async () => {
    if (!replyText.trim()) return;
    setReplyLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch(`${API_BASE}/reply/${selectedMessage.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ reply: replyText })
      });

      if (!res.ok) throw new Error('Failed to send reply');

      setSuccess('Reply sent successfully!');
      setReplyText('');
      setSelectedMessage({ ...selectedMessage, status: 'REPLIED' });
      fetchMessages(currentPage, false); 
      setTimeout(() => setSuccess(''), 4000);
    } catch (err) {
      setError(err.message);
    } finally {
      setReplyLoading(false);
    }
  };

  const handleMessageSelect = (msg) => {
    setSelectedMessage(msg);
    setIsDetailView(true);
  };

  const getRoleBadge = (role) => {
    const badges = {
      EMPLOYEE: { color: 'bg-indigo-100 text-indigo-800 border-indigo-300', icon: Users },
      SHOPKEEPER: { color: 'bg-orange-100 text-orange-800 border-orange-300', icon: Store },
      USER: { color: 'bg-cyan-100 text-cyan-800 border-cyan-300', icon: User },
    };
    const badge = badges[role] || { color: 'bg-gray-100 text-gray-800 border-gray-300', icon: null };
    const Icon = badge.icon;
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${badge.color}`}>
        {Icon && <Icon className="w-3.5 h-3.5" />}
        {role || 'Guest'}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    return status === 'NEW' 
      ? <span className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-medium border border-red-200">New</span>
      : <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium border border-gray-300">Replied</span>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-sky-50 py-4 px-4">
      <div className="max-w-8xl mx-auto">
        <div className="bg-white rounded-md shadow-2xl border border-gray-200 overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-sky-500 to-cyan-600 text-white p-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-5">
                <div className="p-3 bg-white/20 rounded-md">
                  <Inbox className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold">Support Inbox</h1>
                  <p className="text-sky-100 mt-1">Helping our users, one message at a time 💙</p>
                </div>
              </div>

              {/* ←←← ADDED: Search + Role Filter */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* <input
                  type="text"
                  placeholder="Search name, email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-3 py-1 rounded border border-white/30 text-black focus:outline-none focus:ring-2 focus:ring-white/50"
                /> */}
                <div className="flex items-center gap-3">
                  <Filter className="w-5 h-5 text-sky-100" />
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="px-3 py-1 bg-white/20 border border-white/30 rounded text-black focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    <option value="ALL">All Messages</option>
                    <option value="EMPLOYEE">Employees</option>
                    <option value="SHOPKEEPER">Shop Owners</option>
                    <option value="USER">Customers</option>
                    <option value="">Guests</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-8">
            {loading && (
              <div className="flex flex-col items-center justify-center py-32">
                <Loader2 className="w-8 h-8 animate-spin text-sky-600 mb-4" />
                <p className="text-gray-600 text-lg">Loading all messages...</p>
              </div>
            )}

            {error && (
              <div className="mb-6 p-2 bg-red-50 border-2 border-red-300 rounded text-red-700 text-center">
                <AlertCircle className="w-6 h-6 mx-auto mb-2" />
                <p className="text-xl font-semibold">{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-6 p-2 bg-emerald-50 border-2 border-emerald-300 rounded text-emerald-700 text-center">
                <CheckCircle className="w-6 h-6 mx-auto mb-2" />
                <p className="text-lg font-semibold">{success}</p>
              </div>
            )}

            {!loading && (
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                
                {/* Message List */}
                <div className={`xl:col-span-1 ${isDetailView ? 'hidden xl:block' : 'block'}`}>
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <button onClick={toggleSelectAll} className="text-gray-600 hover:text-gray-900">
                        {selectedIds.size === messages.length && messages.length > 0 ? 
                          <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                      </button>
                      <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-sky-500" />
                        Messages ({totalMessages})
                      </h2>
                    </div>

                    {selectedIds.size > 0 && (
                      <button
                        onClick={() => setShowDeleteConfirm(true)}
                        className="flex items-center gap-1 px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded font-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                        ({selectedIds.size})
                      </button>
                    )}
                  </div>

                  {/* Status Tabs */}
                  <div className="flex gap-2 mb-4 border-b border-gray-200">
                    {['ALL', 'NEW', 'REPLIED'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setSelectedStatus(tab)}
                        className={`px-5 py-1 font-medium text-sm rounded-t-lg transition-all ${
                          selectedStatus === tab
                            ? 'bg-sky-600 text-white shadow-md'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                        }`}
                      >
                        {tab === 'ALL' ? 'All' : tab === 'NEW' ? 'New' : 'Replied'}
                      </button>
                    ))}
                  </div>
                  
                  <div 
                    className="space-y-3 max-h-[80vh] overflow-y-auto pr-1"
                    onScroll={handleScroll}
                  >
                    {messages.length === 0 && !loading ? (
                      <div className="text-center py-16 bg-gray-50 rounded-xl">
                        <Inbox className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                        <p className="text-lg text-gray-500 font-medium">No messages found</p>
                      </div>
                    ) : (
                      messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`p-3 rounded-md cursor-pointer transition-all duration-300 border flex items-start gap-3 ${
                            selectedMessage?.id === msg.id
                              ? 'bg-sky-50 border-sky-400 shadow-md ring-2 ring-sky-200'
                              : selectedIds.has(msg.id)
                                ? 'bg-red-50 border-red-300'
                                : msg.status === 'NEW'
                                  ? 'bg-white border-red-100 hover:border-red-300'
                                  : 'bg-white border-gray-200 hover:border-sky-200'
                          }`}
                        >
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleSelectMessage(msg.id); }}
                            className="mt-1"
                          >
                            {selectedIds.has(msg.id) ? 
                              <CheckSquare className="w-5 h-5 text-red-600" /> : 
                              <Square className="w-5 h-5 text-gray-400" />
                            }
                          </button>

                          <div className="flex-1" onClick={() => handleMessageSelect(msg)}>
                            <div className="flex justify-between items-start mb-2">
                              <h3 className={`font-bold text-gray-900 text-base line-clamp-1 ${msg.status === 'NEW' ? 'text-red-700' : ''}`}>
                                {msg.subject}
                              </h3>
                              {getStatusBadge(msg.status)}
                            </div>
                            
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-gray-700">
                                <User className="w-4 h-4 text-gray-500" />
                                <span className="text-sm font-medium">{msg.fullName}</span>
                                <span className="text-xs text-gray-500">({msg.email})</span>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-gray-500" />
                                <span className="text-xs text-gray-600">
                                  {new Date(msg.createdDate).toLocaleDateString(undefined, { 
                                    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                                  })}
                                </span>
                              </div>
                              
                              <div className="pt-1">
                                {getRoleBadge(msg.role)}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}

                    {loadingMore && (
                      <div className="flex justify-center py-4">
                        <Loader2 className="w-5 h-5 animate-spin text-sky-600" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Message Details & Reply - unchanged */}
                <div className={`xl:col-span-2 ${isDetailView ? 'block' : 'hidden xl:block'}`}>
                   {selectedMessage ? (
                    <div className="bg-white rounded-lg p-6 shadow-inner border border-sky-100">
                      
                      {/* Mobile Back Button */}
                      <button 
                        onClick={() => setIsDetailView(false)} 
                        className="flex items-center text-sky-600 hover:text-sky-800 mb-4 xl:hidden font-medium text-md"
                      >
                        <ChevronLeft className="w-6 h-6" /> Back to Messages
                      </button>

                      <div className="mb-4 border-b pb-6 border-gray-100">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                          {selectedMessage.subject}
                        </h2>
                        <div className="flex flex-wrap items-center gap-4 text-gray-600">
                          <div className="flex items-center gap-2">
                            <User className="w-5 h-5 text-sky-500" />
                            <span className="font-semibold">{selectedMessage.fullName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="w-5 h-5 text-sky-500" />
                            <span>{selectedMessage.email}</span>
                          </div>
                          {getRoleBadge(selectedMessage.role)}
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="w-5 h-5" />
                          <span>{new Date(selectedMessage.createdDate).toLocaleDateString(undefined, { 
                                  year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                                })}</span>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-2 rounded-lg border border-gray-200 mb-4">
                        <p className="text-gray-800 leading-relaxed text-base whitespace-pre-wrap">
                          {selectedMessage.message}
                        </p>
                      </div>

                      {/* Reply Box */}
                      <div className="bg-gradient-to-r from-sky-50 to-cyan-50 rounded-lg p-4 border-2 border-sky-200">
                        <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-3">
                          <Reply className="w-6 h-6 text-sky-600" />
                          Write Your Reply
                        </h3>
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          rows={8}
                          placeholder="Write a friendly and helpful response..."
                          className="w-full p-4 text-base border-2 border-gray-300 rounded-lg focus:border-sky-500 focus:ring-4 focus:ring-sky-100 outline-none transition-all"
                        />
                        <div className="mt-2 flex justify-end">
                          <button
                            onClick={handleReply}
                            disabled={replyLoading || !replyText.trim()}
                            className="inline-flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-700 hover:to-cyan-700 text-white text-lg font-bold rounded-md shadow-xl hover:shadow-2xl disabled:opacity-60 transition-all transform hover:-translate-y-1"
                          >
                            {replyLoading ? (
                              <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                              <Send className="w-5 h-5" />
                            )}
                            {replyLoading ? 'Sending Reply...' : 'Send Reply'}
                          </button>
                        </div>
                      </div>

                      {success && (
                        <div className="mt-5 p-2 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-md text-emerald-800 text-center">
                          <CheckCircle className="w-6 h-6 mx-auto mb-3" />
                          <p className="text-xl font-bold">{success}</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-32">
                      <div className="bg-gray-100 rounded-full w-32 h-32 mx-auto mb-8 flex items-center justify-center">
                        <Inbox className="w-16 h-16 text-gray-400" />
                      </div>
                      <p className="text-2xl font-medium text-gray-600">Select a message to view</p>
                      <p className="text-gray-500 mt-3">Use the filter above to focus on specific user types</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ←←← ADDED: Delete Confirmation Modal */}
          {showDeleteConfirm && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-red-100 rounded-full">
                    <Trash2 className="w-5 h-5 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Delete Messages?</h3>
                </div>
                <p className="text-gray-600 mb-8">
                  Permanently delete {selectedIds.size} selected message{selectedIds.size > 1 ? 's' : ''}?
                  This cannot be undone.
                </p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    disabled={isDeleting}
                    className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium flex items-center gap-2"
                  >
                    {isDeleting && <Loader2 className="w-5 h-5 animate-spin" />}
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}