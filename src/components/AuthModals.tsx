import React, { useState } from 'react';
import { 
  X, 
  User, 
  Video, 
  Mail, 
  Lock, 
  Building, 
  Phone, 
  Sparkles, 
  CheckCircle2, 
  ArrowLeft,
  Zap,
  CreditCard,
  Camera,
  Layers
} from 'lucide-react';
import { UserSession, PaymentMethodType } from '../types';
import { DEMO_CLIENT, DEMO_CREATOR } from '../data/mockData';

interface ClientAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: UserSession) => void;
  onSwitchToCreator: () => void;
}

export const ClientAuthModal: React.FC<ClientAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  onSwitchToCreator
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clientUser: UserSession = {
      id: `client-${Date.now()}`,
      name: name || (email.split('@')[0]) || 'عميل ريل ستور',
      email: email || 'client@business.eg',
      phone: phone || '01019283746',
      role: 'client',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
      companyName: companyName || 'شركة تجارية'
    };
    onSuccess(clientUser);
    onClose();
  };

  const handleQuickDemo = () => {
    onSuccess(DEMO_CLIENT);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-cyan-300 dark:border-cyan-500/30 shadow-2xl p-6 sm:p-8 text-right overflow-hidden">
        
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 left-0 h-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600"></div>

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="إغلاق"
          className="absolute top-4 left-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-xl transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Client Badge & Site Logo */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 opacity-60 blur-xs"></div>
            <img 
              src="/logo.png" 
              alt="أيقونة موقع reel store" 
              className="relative w-12 h-12 rounded-2xl object-contain bg-white dark:bg-slate-800 p-1 border border-cyan-200 dark:border-cyan-700 shadow-md"
            />
          </div>
          <div>
            <span className="text-[11px] font-bold text-cyan-600 dark:text-cyan-400">
              بوابة الشركات والمتاجر • reel store
            </span>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              {isLogin ? 'تسجيل دخول العميل' : 'إنشاء حساب عميل جديد'}
            </h3>
          </div>
        </div>

        {/* Quick Demo Access banner */}
        <div className="mb-5 p-3 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 flex items-center justify-between">
          <div className="text-xs">
            <span className="font-bold text-cyan-900 dark:text-cyan-200">لتجربة التطبيق مباشرة:</span>
            <div className="text-[10px] text-cyan-700 dark:text-cyan-400">دخول تلقائي ببيانات عميل حقيقي</div>
          </div>
          <button
            type="button"
            onClick={handleQuickDemo}
            className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs transition shadow-sm"
          >
            دخول فوري ⚡
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          
          {!isLogin && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  الاسم الكامل:
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="محمد عبد الرحمن"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  اسم المتجر أو الشركة:
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={e => setCompanyName(e.target.value)}
                  placeholder="براند ملابس أو متجر إلكتروني..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              البريد الإلكتروني للعمل:
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="client@company.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 pl-10"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              كلمة المرور:
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 pl-10"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl font-black text-white text-sm bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 shadow-xl shadow-cyan-500/25 hover:opacity-95 transition"
          >
            {isLogin ? 'تسجيل الدخول كعميل' : 'إنشاء حساب جديد والبدء بالطلب'}
          </button>
        </form>

        {/* Toggle between login / signup */}
        <div className="mt-4 text-center text-xs text-slate-500">
          {isLogin ? 'ليس لديك حساب بعد؟ ' : 'لديك حساب بالفعل؟ '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="font-bold text-cyan-600 dark:text-cyan-400 hover:underline"
          >
            {isLogin ? 'سجل حساب جديد الآن' : 'تسجيل الدخول'}
          </button>
        </div>

        {/* Switch to Creator Modal Link */}
        <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-500">هل أنت صانع فيديوهات وتريد العمل؟</span>
          <button
            onClick={() => {
              onClose();
              onSwitchToCreator();
            }}
            className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            <span>دخول صانع إعلانات</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};

interface CreatorAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: UserSession) => void;
  onSwitchToClient: () => void;
}

export const CreatorAuthModal: React.FC<CreatorAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  onSwitchToClient
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('ugc');
  const [payoutMethod, setPayoutMethod] = useState<PaymentMethodType>('instapay');
  const [payoutIdentifier, setPayoutIdentifier] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const creatorUser: UserSession = {
      id: `creator-${Date.now()}`,
      name: name || (email.split('@')[0]) || 'صانع ريل ستور',
      email: email || 'creator@reelstore.io',
      role: 'creator',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      balance: 4200,
      pendingBalance: 1450,
      completedJobsCount: 18,
      payoutMethodPreferred: payoutMethod,
      payoutIdentifier: payoutIdentifier || 'creator@instapay'
    };
    onSuccess(creatorUser);
    onClose();
  };

  const handleQuickDemo = () => {
    onSuccess(DEMO_CREATOR);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-indigo-300 dark:border-indigo-500/30 shadow-2xl p-6 sm:p-8 text-right overflow-hidden">
        
        {/* Ambient Top Glow in Blue to Indigo */}
        <div className="absolute top-0 right-0 left-0 h-2 bg-gradient-to-r from-blue-500 via-indigo-600 to-violet-600"></div>

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="إغلاق"
          className="absolute top-4 left-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-xl transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Creator Badge & Site Logo */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 opacity-60 blur-xs"></div>
            <img 
              src="/logo.png" 
              alt="أيقونة موقع reel store" 
              className="relative w-12 h-12 rounded-2xl object-contain bg-white dark:bg-slate-800 p-1 border border-indigo-200 dark:border-indigo-700 shadow-md"
            />
          </div>
          <div>
            <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
              بوابة صناع المحتوى والإعلانات • reel store
            </span>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              {isLogin ? 'تسجيل دخول صانع الفيديوهات' : 'انضم كصانع إعلانات بمقابل مادي'}
            </h3>
          </div>
        </div>

        {/* Quick Demo Access banner */}
        <div className="mb-5 p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 flex items-center justify-between">
          <div className="text-xs">
            <span className="font-bold text-indigo-900 dark:text-indigo-200">لتجربة حساب الصانع فوراً:</span>
            <div className="text-[10px] text-indigo-700 dark:text-indigo-400">دخول بلوحة تحكم الصانع والأرباح</div>
          </div>
          <button
            type="button"
            onClick={handleQuickDemo}
            className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs transition shadow-sm"
          >
            دخول فوري ⚡
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          
          {!isLogin && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  اسمك الكامل أو اسم البراند الإعلاني:
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="مثال: يوسف ميديا / سارة أحمد"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  تخصصك الرئيسي:
                </label>
                <select
                  value={specialty}
                  onChange={e => setSpecialty(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="ugc">صانع إعلانات UGC وريلز تيك توك</option>
                  <option value="motion">موشن جرافيك وأنيميشن 2D/3D</option>
                  <option value="spokesperson">مقدم إعلانات وممثل كاميرا</option>
                  <option value="ecommerce">تصوير منتجات احترافي</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  طريقة استلام أرباحك المفضلة:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'instapay' as const, label: 'انستا باي' },
                    { id: 'vodafone_cash' as const, label: 'فودافون كاش' },
                    { id: 'bank_transfer' as const, label: 'حساب بنكي' }
                  ].map(m => (
                    <button
                      type="button"
                      key={m.id}
                      onClick={() => setPayoutMethod(m.id)}
                      className={`py-2 rounded-xl text-xs font-bold border transition ${
                        payoutMethod === m.id
                          ? 'bg-indigo-600 text-white border-transparent'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              البريد الإلكتروني:
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="creator@email.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 pl-10"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              كلمة المرور:
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 pl-10"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl font-black text-white text-sm bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 shadow-xl shadow-indigo-500/25 hover:opacity-95 transition"
          >
            {isLogin ? 'تسجيل دخول إلى لوحة الصانع' : 'بدء استقبال طلبات الإعلانات والربح'}
          </button>
        </form>

        {/* Toggle between login / signup */}
        <div className="mt-4 text-center text-xs text-slate-500">
          {isLogin ? 'صانع محتوى جديد؟ ' : 'لديك حساب بالفعل؟ '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            {isLogin ? 'انضم لصناع ريل ستور' : 'تسجيل الدخول'}
          </button>
        </div>

        {/* Switch to Client Modal Link */}
        <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-500">هل أنت شركة أو عميل تبحث عن صانع؟</span>
          <button
            onClick={() => {
              onClose();
              onSwitchToClient();
            }}
            className="font-bold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
          >
            <span>دخول العميل</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
