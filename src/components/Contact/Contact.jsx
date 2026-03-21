import { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle, Send, MapPin, Loader2, RefreshCw, 
  UserCheck, Headphones, Star, Zap, Mail, MessageSquare, User
} from 'lucide-react';
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
    applicationName: 'Loyalty',
    captchaInput: '',
  });
  const [captchaText, setCaptchaText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  useEffect(() => {
    if (isLoggedIn) {
      setFormData(prev => ({
        ...prev,
        fullName: localStorage.getItem("name") || '',
        email: localStorage.getItem("email") || '',
        role: localStorage.getItem("role") || '',
      }));
    }
    generateCaptcha();
  }, [isLoggedIn]);

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let text = "";
    for (let i = 0; i < 6; i++) text += chars.charAt(Math.floor(Math.random() * chars.length));
    setCaptchaText(text);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 150, 50);
    ctx.fillStyle = "#f8fafc";
    ctx.fillRect(0, 0, 150, 50);
    ctx.font = "bold 26px Monospace";
    ctx.fillStyle = "#0f172a";
    ctx.fillText(text, 20, 35);
    ctx.strokeStyle = "#94a3b8";
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * 150, Math.random() * 50);
      ctx.lineTo(Math.random() * 150, Math.random() * 50);
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

    if (formData.captchaInput.toUpperCase() !== captchaText) {
      setError(t('contact.captchaError'));
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

      if (!res.ok) throw new Error(t('contact.error'));

      setSubmitted(true);
      if (isLoggedIn) {
        setFormData(prev => ({ ...prev, subject: '', message: '', captchaInput: '' }));
      } else {
        setFormData({ fullName: '', email: '', subject: '', message: '', role: '', applicationName: 'Loyalty', captchaInput: '' });
      }
      generateCaptcha();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(err.message || t('contact.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8 space-y-2">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900">
            {t('contact.header')} <span className="text-emerald-600">{t('contact.headerHighlight')}</span>
          </h2>
          <p className="text-xl text-gray-600">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-0 overflow-hidden rounded-xl shadow-sm bg-white border border-slate-100">
          
          {/* Sidebar */}
          <div className="lg:col-span-4 bg-slate-900 p-10 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10 space-y-12">
              <div>
                <h3 className="text-2xl font-bold mb-2">{t('contact.getInTouch')}</h3>
                <p className="text-slate-400">{t('contact.exclusiveHelp')}</p>
              </div>

              <div className="space-y-8">
                {[
                  { icon: <Mail className="text-emerald-400" />, title: t('contact.emailUs'), desc: "support@ifaceh.com" },
                  // { icon: <UserCheck className="text-yellow-400" />, title: t('contact.partnerships'), desc: "no-reply@ifaceh.com" },
                  // { icon: <MapPin className="text-pink-400" />, title: t('contact.ourHub'), desc: t('contact.address') },
                  { icon: <Headphones className="text-blue-400" />, title: t('contact.support'), desc: t('contact.alwaysHere') }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-100">{item.title}</h4>
                      <p className="text-sm text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl" />
          </div>

          {/* Form Area */}
          <div className="lg:col-span-8 p-8 md:p-12">
            {submitted && (
              <div className="mb-6 p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 font-bold flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
                <CheckCircle size={20} /> {t('contact.success')}
              </div>
            )}

            {error && (
              <div className="mb-6 p-2 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <User size={14}/> {t('contact.fullName')}
                  </label>
                  <input
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    readOnly={isLoggedIn}
                    placeholder={t('contact.fullName')}
                    className={`w-full px-4 py-2.5 rounded-lg border transition-all outline-none ${isLoggedIn ? 'bg-slate-50 text-slate-400 cursor-not-allowed border-slate-100' : 'focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 border-slate-200'}`}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Mail size={14}/> {t('contact.email')}
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    readOnly={isLoggedIn}
                    placeholder={t('contact.email')}
                    className={`w-full px-4 py-2.5 rounded-lg border transition-all outline-none ${isLoggedIn ? 'bg-slate-50 text-slate-400 cursor-not-allowed border-slate-100' : 'focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 border-slate-200'}`}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Zap size={14}/> {t('contact.subject')}
                </label>
                <input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={t('contact.subjectPlaceholder')}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <MessageSquare size={14}/> {t('contact.message')}
                </label>
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t('contact.messagePlaceholder')}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all resize-none"
                  required
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-4">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="relative group">
                    <canvas ref={canvasRef} width={150} height={50} className="rounded-lg border border-slate-200 bg-white" />
                    <button type="button" onClick={generateCaptcha} className="absolute -top-2 -right-2 p-1.5 bg-white shadow-md rounded-full text-slate-400 hover:text-emerald-500 border border-slate-100">
                      <RefreshCw size={14} />
                    </button>
                  </div>
                  <input
                    name="captchaInput"
                    value={formData.captchaInput}
                    onChange={handleChange}
                    placeholder={t('contact.captchaPlaceholder')}
                    className="flex-1 min-w-[150px] px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="px-6 sm:w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full shadow-lg transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-3"
              >
                {loading ? <Loader2 className="animate-spin" /> : <Send size={20} />}
                {loading ? t('contact.sending') : t('contact.sendButton')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}