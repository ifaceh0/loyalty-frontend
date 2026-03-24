import { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle, Send, Loader2, RefreshCw, 
  Headphones, Zap, Mail, MessageSquare, User, Info
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
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
    <section className="py-20 px-6 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            {t('contact.header')} <span className="text-blue-600">{t('contact.headerHighlight')}</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-light">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-0 overflow-hidden rounded-[2rem] bg-white border border-slate-100 shadow-2xl shadow-blue-500/5">
          
          {/* Sidebar - Visual Dark Mode */}
          <div className="lg:col-span-4 bg-slate-900 p-12 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10 space-y-12">
              <div>
                <h3 className="text-2xl font-bold mb-3">{t('contact.getInTouch')}</h3>
                <p className="text-slate-400 font-light leading-relaxed">{t('contact.exclusiveHelp')}</p>
              </div>

              <div className="space-y-10">
                {[
                  { icon: <Mail className="text-blue-400" />, title: t('contact.emailUs'), desc: "support@ifaceh.com" },
                  { icon: <Headphones className="text-indigo-400" />, title: t('contact.support'), desc: t('contact.alwaysHere') }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-5 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-blue-500/20 transition-all">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-100 mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-400 font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Soft decorative blur */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px]" />
          </div>

          {/* Form Area */}
          <div className="lg:col-span-8 p-8 md:p-16">
            <AnimatePresence>
              {submitted && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: 'auto' }} 
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-8 p-3 bg-blue-50 border border-blue-100 rounded-2xl text-blue-700 font-bold flex items-center gap-3"
                >
                  <CheckCircle size={20} className="text-blue-600" /> {t('contact.success')}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Full Name */}
                <div className="space-y-2.5">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    <User size={14}/> {t('contact.fullName')}
                  </label>
                  <div className="relative">
                    <input
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleChange}
                      readOnly={isLoggedIn}
                      className={`w-full px-5 py-2 rounded-xl border transition-all outline-none font-medium ${isLoggedIn ? 'bg-slate-50 text-slate-400 border-slate-100 cursor-default' : 'focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 border-slate-200 text-slate-700'}`}
                      required
                    />
                    {isLoggedIn && <Info size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" />}
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2.5">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    <Mail size={14}/> {t('contact.email')}
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    readOnly={isLoggedIn}
                    className={`w-full px-5 py-2 rounded-xl border transition-all outline-none font-medium ${isLoggedIn ? 'bg-slate-50 text-slate-400 border-slate-100 cursor-default' : 'focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 border-slate-200 text-slate-700'}`}
                    required
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-2.5">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Zap size={14}/> {t('contact.subject')}
                </label>
                <input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={t('contact.subjectPlaceholder')}
                  className="w-full px-5 py-2 rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all font-medium text-slate-700"
                  required
                />
              </div>

              {/* Message */}
              <div className="space-y-2.5">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <MessageSquare size={14}/> {t('contact.message')}
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t('contact.messagePlaceholder')}
                  className="w-full px-5 py-2 rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all resize-none font-medium text-slate-700"
                  required
                />
              </div>

              {/* Captcha Section */}
              <div className="p-5 bg-slate-50/50 rounded-3xl border border-slate-100 flex flex-col md:flex-row items-center gap-6">
                <div className="relative shrink-0">
                  <canvas ref={canvasRef} width={150} height={50} className="rounded-xl border border-slate-200 bg-white" />
                  <button 
                    type="button" 
                    onClick={generateCaptcha} 
                    className="absolute -top-2 -right-2 p-2 bg-white shadow-lg rounded-full text-slate-400 hover:text-blue-600 border border-slate-100 transition-colors"
                  >
                    <RefreshCw size={14} />
                  </button>
                </div>
                <input
                  name="captchaInput"
                  value={formData.captchaInput}
                  onChange={handleChange}
                  placeholder={t('contact.captchaPlaceholder')}
                  className="w-full px-5 py-2.5 rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 outline-none font-bold text-slate-700"
                  required
                />
              </div>

              {error && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-bold text-red-500">
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto px-10 py-2 bg-slate-900 hover:bg-blue-600 text-white font-bold rounded-full shadow-xl shadow-slate-200 transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-3"
              >
                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Send size={18} />}
                {loading ? t('contact.sending') : t('contact.sendButton')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}