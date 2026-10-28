import React from 'react';
import { 
  Sun, 
  Moon, 
  Video, 
  User, 
  Sparkles, 
  LogOut, 
  Briefcase, 
  ShoppingBag,
  CreditCard,
  Layers,
  ChevronDown
} from 'lucide-react';
import { UserSession } from '../types';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  currentUser: UserSession | null;
  onOpenClientAuth: () => void;
  onOpenCreatorAuth: () => void;
  onSelectView: (view: 'marketplace' | 'client_dashboard' | 'creator_dashboard' | 'payment_info' | 'how_it_works') => void;
  activeView: string;
  onSwitchUser: (type: 'client' | 'creator' | 'guest') => void;
  onLogout: () => void;
  orderCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  setDarkMode,
  currentUser,
  onOpenClientAuth,
  onOpenCreatorAuth,
  onSelectView,
  activeView,
  onSwitchUser,
  onLogout,
  orderCount
}) => {
  const [roleMenuOpen, setRoleMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 dark:bg-[#070b14]/85 border-b border-cyan-100 dark:border-slate-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <div 
          onClick={() => onSelectView('marketplace')}
          className="flex items-center gap-3.5 cursor-pointer group select-none"
        >
          <div className="relative">
            <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-600 to-violet-600 opacity-75 blur-md group-hover:opacity-100 group-hover:blur-lg transition duration-300"></div>
            <img 
              src="/assets/aistudio/image_bd9282cd.png" 
              alt="أيقونة موقع reel store" 
              className="relative w-12 h-12 object-contain rounded-2xl bg-white dark:bg-slate-900 p-1.5 shadow-lg shadow-cyan-500/20 border border-cyan-300/80 dark:border-cyan-500/40 ring-1 ring-cyan-400/30 transform group-hover:scale-110 group-hover:-rotate-2 transition-all duration-300" 
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white uppercase font-['Plus_Jakarta_Sans',sans-serif]">
                reel<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600">store</span>
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800">
                ريل ستور
              </span>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
              سوق تأجير وصناعة الفيديوهات والإعلانات
            </span>
          </div>
        </div>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <button
            onClick={() => onSelectView('marketplace')}
            className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
              activeView === 'marketplace'
                ? 'bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-300 shadow-sm border border-cyan-200/60 dark:border-cyan-800/60'
                : 'text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
            }`}
          >
            <Layers className="w-4 h-4" />
            استكشف الصناع
          </button>

          <button
            onClick={() => onSelectView('payment_info')}
            className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
              activeView === 'payment_info'
                ? 'bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-300 shadow-sm border border-cyan-200/60 dark:border-cyan-800/60'
                : 'text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
            }`}
          >
            <CreditCard className="w-4 h-4 text-cyan-500" />
            طرق الدفع (انستا باي/محافظ/بنك)
          </button>

          <button
            onClick={() => onSelectView('how_it_works')}
            className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
              activeView === 'how_it_works'
                ? 'bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-300 shadow-sm border border-cyan-200/60 dark:border-cyan-800/60'
                : 'text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
            }`}
          >
            <Sparkles className="w-4 h-4 text-indigo-500" />
            كيف يعمل الموقع؟
          </button>

          {/* Quick links to active portals if user has active role */}
          {currentUser?.role === 'client' && (
            <button
              onClick={() => onSelectView('client_dashboard')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                activeView === 'client_dashboard'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              طلباتي
              {orderCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[11px] font-bold flex items-center justify-center">
                  {orderCount}
                </span>
              )}
            </button>
          )}

          {currentUser?.role === 'creator' && (
            <button
              onClick={() => onSelectView('creator_dashboard')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                activeView === 'creator_dashboard'
                  ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-md'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              لوحة الصانع (الأرباح والمشاريع)
            </button>
          )}
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Dark / Light Mode Switcher */}
          <button
            onClick={() => setDarkMode(prev => !prev)}
            aria-label="تبديل الوضع الداكن والفاتح"
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 text-slate-700 dark:text-cyan-400 hover:scale-105 active:scale-95 transition-all duration-200 shadow-sm"
            title={darkMode ? 'التحويل للوضع الفاتح' : 'التحويل للوضع الداكن'}
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-amber-400 animate-spin-slow" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-600" />
            )}
          </button>

          {/* Quick Role Switcher Demo Tool */}
          <div className="relative">
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold border border-cyan-300 dark:border-cyan-800/80 bg-cyan-50/70 dark:bg-cyan-950/40 text-cyan-800 dark:text-cyan-300 hover:bg-cyan-100/80 transition"
              title="تجربة فورية للحسابات"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {currentUser ? (currentUser.role === 'client' ? 'حساب: عميل' : 'حساب: صانع إعلانات') : 'تجربة سريعة'}
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {roleMenuOpen && (
              <div 
                className="absolute left-0 mt-2 w-56 rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                onClick={() => setRoleMenuOpen(false)}
              >
                <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  تبديل تجريبي فوري للحساب
                </div>
                <button
                  onClick={() => onSwitchUser('client')}
                  className="w-full text-right px-3.5 py-2 text-xs font-semibold hover:bg-cyan-50 dark:hover:bg-cyan-950/40 text-slate-700 dark:text-slate-200 flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4 text-cyan-500" />
                    دخول سريع كـ عميل براند
                  </span>
                  {currentUser?.role === 'client' && <span className="text-cyan-500">✓</span>}
                </button>
                <button
                  onClick={() => onSwitchUser('creator')}
                  className="w-full text-right px-3.5 py-2 text-xs font-semibold hover:bg-cyan-50 dark:hover:bg-cyan-950/40 text-slate-700 dark:text-slate-200 flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-indigo-500" />
                    دخول سريع كـ صانع إعلانات
                  </span>
                  {currentUser?.role === 'creator' && <span className="text-indigo-500">✓</span>}
                </button>
                <button
                  onClick={() => onSwitchUser('guest')}
                  className="w-full text-right px-3.5 py-2 text-xs font-semibold hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center gap-2 border-t border-slate-100 dark:border-slate-800 mt-1"
                >
                  <LogOut className="w-4 h-4" />
                  وضع الزائر (تسجيل الخروج)
                </button>
              </div>
            )}
          </div>

          {/* User Status / Login Buttons */}
          {currentUser ? (
            <div className="flex items-center gap-2">
              <div 
                onClick={() => onSelectView(currentUser.role === 'client' ? 'client_dashboard' : 'creator_dashboard')}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 cursor-pointer hover:border-cyan-400 transition"
              >
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.name} 
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-cyan-500" 
                />
                <div className="hidden sm:block text-right">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-tight">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] text-cyan-600 dark:text-cyan-400 font-medium">
                    {currentUser.role === 'client' ? 'عميل أعمال' : 'صانع معتمد ⭐'}
                  </div>
                </div>
              </div>
              <button
                onClick={onLogout}
                title="تسجيل الخروج"
                className="p-2 text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 rounded-lg transition"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {/* Client Login Button */}
              <button
                onClick={onOpenClientAuth}
                className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-cyan-700 dark:text-cyan-300 bg-cyan-100/70 dark:bg-cyan-950/60 hover:bg-cyan-200/80 dark:hover:bg-cyan-900/60 border border-cyan-300 dark:border-cyan-800 transition shadow-sm flex items-center gap-1.5"
              >
                <User className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span className="hidden xs:inline">تسجيل</span> دخول عميل
              </button>

              {/* Creator Login Button */}
              <button
                onClick={onOpenCreatorAuth}
                className="relative group px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white shadow-lg overflow-hidden transition transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 transition-all duration-300 group-hover:scale-105"></div>
                <div className="relative flex items-center gap-1.5">
                  <Video className="w-4 h-4" />
                  <span>انضم كصانع إعلانات</span>
                </div>
              </button>
            </div>
          )}

        </div>
      </div>
    </header>
  );
};
