import React from 'react';
import { 
  ShieldCheck, 
  Zap, 
  Smartphone, 
  Building2, 
  Heart, 
  Lock,
  Sparkles
} from 'lucide-react';

interface FooterProps {
  onSelectView: (view: any) => void;
  onOpenClientAuth: () => void;
  onOpenCreatorAuth: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectView,
  onOpenClientAuth,
  onOpenCreatorAuth
}) => {
  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#070b14] text-slate-600 dark:text-slate-400 text-right transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/assets/aistudio/image_db2927bc.png" 
                alt="reel store" 
                className="w-10 h-10 object-contain rounded-xl bg-white dark:bg-slate-900 p-1 border border-cyan-300 dark:border-cyan-700" 
              />
              <span className="text-2xl font-black text-slate-900 dark:text-white uppercase font-['Plus_Jakarta_Sans',sans-serif]">
                reel<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600">store</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
              المنصة المتخصصة الأولى لتأجير وتوظيف صناع الفيديوهات والإعلانات بمقابل مادي. نربط أصحاب المتاجر والشركات بأفضل المواهب لإنتاج ريلز وتيك توك وإعلانات ترفع المبيعات بنظام دفع آمن وضمان كامل.
            </p>

            <div className="flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                <Lock className="w-3.5 h-3.5 text-cyan-500" />
                دفع آمن بنظام الضمان
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
                فيديوهات مرخصة تجارياً
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-black text-sm text-slate-900 dark:text-white">
              روابط المنصة
            </h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <button onClick={() => onSelectView('marketplace')} className="hover:text-cyan-500 transition">
                  استكشاف صناع الفيديوهات
                </button>
              </li>
              <li>
                <button onClick={() => onSelectView('payment_info')} className="hover:text-cyan-500 transition">
                  طرق الدفع (انستا باي، محافظ، بنك)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectView('how_it_works')} className="hover:text-cyan-500 transition">
                  كيف يعمل ريل ستور؟
                </button>
              </li>
              <li>
                <button onClick={onOpenClientAuth} className="hover:text-cyan-500 transition">
                  بوابة تسجيل دخول العميل
                </button>
              </li>
              <li>
                <button onClick={onOpenCreatorAuth} className="hover:text-cyan-500 transition">
                  بوابة صناع المحتوى والإعلانات
                </button>
              </li>
            </ul>
          </div>

          {/* Supported Payments footer column */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-black text-sm text-slate-900 dark:text-white">
              وسائل الدفع المقبولة
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <Zap className="w-4 h-4 text-purple-500 shrink-0" />
                <div>
                  <div className="font-bold text-slate-800 dark:text-slate-200">انستا باي (InstaPay Egypt)</div>
                  <div className="text-[10px] text-slate-400">تحويل فوري بدون عمولات</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <Smartphone className="w-4 h-4 text-rose-500 shrink-0" />
                <div>
                  <div className="font-bold text-slate-800 dark:text-slate-200">فودافون كاش والمحافظ الذكية</div>
                  <div className="text-[10px] text-slate-400">إيداع وسحب عبر جميع شبكات المحمول</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <Building2 className="w-4 h-4 text-blue-500 shrink-0" />
                <div>
                  <div className="font-bold text-slate-800 dark:text-slate-200">التحويل البنكي الرسمي</div>
                  <div className="text-[10px] text-slate-400">حسابات بنك CIB والبنك الأهلي</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 جميع الحقوق محفوظة لمنصة <strong>reel store</strong> - ريل ستور
          </div>
          <div className="flex items-center gap-1">
            <span>صُنعت لتطوير صناعة الإعلانات والمحتوى المرئي</span>
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          </div>
        </div>
      </div>
    </footer>
  );
};
