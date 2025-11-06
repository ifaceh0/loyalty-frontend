import { useState, useEffect } from 'react';
import {
  Mail, Phone, Users, Plus, Trash2, RefreshCw,
  ToggleLeft, ToggleRight, Loader2, UserCheck, Calendar, Clock
} from 'lucide-react';

const API_BASE = 'https://loyalty-backend-java.onrender.com/api';

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
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
  const [shopId, setShopId] = useState(null);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [invitations, setInvitations] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      alert('Failed to load data. Please try again.');
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
      if (!res.ok) throw new Error('Failed to send invitation');
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
    if (!confirm('Resend this invitation?')) return;
    try {
      const res = await fetch(`${API_BASE}/employee/resendInvitation?inviteId=${inviteId}`, {
        method: 'POST',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Resend failed');
      fetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  const deleteInvite = async (inviteId) => {
    if (!confirm('Delete this invitation?')) return;
    try {
      const res = await fetch(`${API_BASE}/employee/deleteInvitation?inviteId=${inviteId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Delete failed');
      fetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  const toggleStatus = async (userId, current) => {
    const willBeActive = !current;
    if (!confirm(`${willBeActive ? 'Activate' : 'Deactivate'} this employee?`)) return;

    try {
      const res = await fetch(`${API_BASE}/employee/toggleEmployeeStatus?userId=${userId}&active=${willBeActive}`, {
        method: 'PATCH',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Update failed');
      fetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  const pendingInvitations = invitations.filter(inv => inv.status !== 'SUCCESS');

  return (
    <>
      <div className="min-h-screen">
        <div className="max-w-8xl mx-auto p-2 space-y-8">

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                <Users className="w-8 h-8 text-indigo-600" />
                Employee Management
              </h1>
              <p className="text-slate-600 mt-1">Invite, manage, and track your team</p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <Plus className="w-5 h-5" />
              Invite Employee
            </button>
          </div>

          {fetching && (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
          )}

          {!fetching && (
            <div className="grid gap-8">           
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-6 text-white">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <UserCheck className="w-6 h-6" />
                    All Employees
                    <span className="ml-2 bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                      {employees.length}
                    </span>
                  </h2>
                </div>

                <div className="p-6">
                  {employees.length === 0 ? (
                    <div className="text-center py-12 text-slate-500">
                      <Users className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                      <p>No employees yet</p>
                      <p className="text-sm mt-1">Invite your first team member!</p>
                    </div>
                  ) : (
                    <div className="max-h-96 overflow-y-auto space-y-4">
                      {employees.map(emp => (
                        <div
                          key={emp.userId}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-slate-50 rounded-lg hover:bg-slate-100 transition"
                        >
                          <div className="flex items-start gap-4 flex-1">
                            <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                              {emp.firstName[0]}{emp.lastName[0]}
                            </div>

                            <div className="space-y-1.5 flex-1">
                              <p className="font-semibold text-slate-900">
                                {emp.firstName} {emp.lastName}
                              </p>

                              {emp.email && (
                                <p className="text-sm text-slate-600 flex items-center gap-1">
                                  <Mail className="w-4 h-4" />
                                  {emp.email}
                                </p>
                              )}

                              {emp.phone && (
                                <p className="text-sm text-slate-600 flex items-center gap-1">
                                  <Phone className="w-4 h-4" />
                                  {emp.phone}
                                </p>
                              )}

                              <div className="flex items-center gap-2">
                                {emp.isActive ? (
                                  <ToggleRight className="w-7 h-7 text-emerald-600" />
                                ) : (
                                  <ToggleLeft className="w-7 h-7 text-slate-400" />
                                )}
                                <span className={`text-sm font-medium ${emp.isActive ? 'text-emerald-600' : 'text-slate-400'}`}>
                                  {emp.isActive ? 'Active' : 'Inactive'}
                                </span>
                              </div>

                              <p className="text-xs text-slate-500 flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />
                                Joined: {new Date(emp.createdDate).toLocaleDateString()}
                              </p>
                            </div>
                          </div>

                          <button
                            onClick={() => toggleStatus(emp.userId, emp.isActive)}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition mt-4 sm:mt-0 ${
                              emp.isActive
                                ? 'bg-red-50 text-red-600 hover:bg-red-100'
                                : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                            }`}
                          >
                            {emp.isActive ? 'Deactivate' : 'Activate'}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-gradient-to-r from-teal-500 to-cyan-600 p-6 text-white">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Mail className="w-6 h-6" />
                    Pending Invitations
                    <span className="ml-2 bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                      {pendingInvitations.length}
                    </span>
                  </h2>
                </div>

                <div className="p-6">
                  {pendingInvitations.length === 0 ? (
                    <div className="text-center py-12 text-slate-500">
                      <Mail className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                      <p>No pending invitations</p>
                    </div>
                  ) : (
                    <div className="max-h-96 overflow-y-auto space-y-4">
                      {pendingInvitations.map(inv => (
                        <div
                          key={inv.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-slate-50 rounded-lg hover:bg-slate-100 transition"
                        >
                          <div className="flex items-start gap-4 flex-1">
                            <div className="bg-indigo-100 p-2 rounded-lg">
                              {inv.email ? <Mail className="w-5 h-5 text-indigo-600" /> : <Phone className="w-5 h-5 text-indigo-600" />}
                            </div>

                            <div className="space-y-1.5 flex-1">
                              <p className="font-semibold text-slate-900">
                                {inv.email || inv.phone || '—'}
                              </p>

                              {inv.email && inv.phone && (
                                <p className="text-sm text-slate-600 flex items-center gap-1">
                                  <Phone className="w-4 h-4" />
                                  {inv.phone}
                                </p>
                              )}

                              <div>
                                <span
                                  className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                                    inv.status === 'PENDING'
                                      ? 'bg-amber-100 text-amber-800'
                                      : inv.status === 'EXPIRED'
                                      ? 'bg-red-100 text-red-800'
                                      : 'bg-gray-100 text-gray-700'
                                  }`}
                                >
                                  {inv.status}
                                </span>
                              </div>

                              <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3.5 h-3.5" />
                                  Sent: {new Date(inv.createdDate).toLocaleDateString()}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3.5 h-3.5" />
                                  {new Date(inv.createdDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                              <div className="text-xs text-slate-500">
                                Expires: {new Date(inv.expiryDate).toLocaleString()}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 mt-4 sm:mt-0">
                            <button
                              onClick={() => resendInvite(inv.id)}
                              className="text-indigo-600 hover:text-indigo-700 p-2 hover:bg-indigo-50 rounded-lg transition"
                              title="Resend"
                            >
                              <RefreshCw className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteInvite(inv.id)}
                              className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Invite New Employee">
        <form onSubmit={handleInvite} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          {/* <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Phone Number <span className="text-slate-400">(optional)</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 123-4567"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div> */}

          <button
            type="submit"
            disabled={loading || !email.trim()}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-400 text-white font-medium py-3 rounded-lg transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Mail className="w-5 h-5" />
                Send Invitation
              </>
            )}
          </button>
        </form>
      </Modal>
    </>
  );
}