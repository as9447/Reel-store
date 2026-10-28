import React from 'react';
import { 
  Search, 
  Settings, 
  CreditCard, 
  Download, 
  Sparkles, 
  CheckCircle2, 
  ArrowLeft 
} from 'lucide-react';

interface HowItWorksProps {
  onStartOrder: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStartOrder }) => {
  const steps = [
    {
      step: '01',
      title: 'استكشف واشترِ خبرة الصانع',
      desc: 'تصفح قائمة صناع الفيديوهات، شاهد نماذج إعلاناتهم الحقيقية في ريلز وتيك توك، وتعرف على معداتهم وتقييمات العملاء السابقين.',
      icon: Search,
      color: 'from-cyan-400 to-blue-500'
    },
    {
      step: '02',
      title: 'خصص تفاصيل إعلانك وسكريبت الفيديو',
      desc: 'حدد مدة الفيديو (15 أو 30 أو 60 ثانية)، وأبعاد الفيديو، واكتب هدف حملتك مع إمكانية طلب هوك إعلاني أو تسليم سريع في 24 ساعة.',
      icon: Settings,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      step: '03',
      title: 'دفع محمي 100% بنظام الضمان',
      desc: 'ادفع عبر انستا باي (InstaPay)، فودافون كاش ومحافظ المحمول، أو التحويل البنكي الرسمي. يظل المبلغ في أمان ولا يُصرف للصانع إلا بعد موافقتك.',
      icon: CreditCard,
      color: 'from-indigo-600 to-violet-600'
    },
    {
      step: '04',
      title: 'معاينة المسودة، التعديل والتحميل',
      desc: 'يصلك إشعار بالمسودة الأولى، تراجعها وتطلب أي تعديلات مجاناً، ثم تعتمد الفيديو النهائي بدقة 4K جاهزاً لإطلاقه في حملاتك الممولة.',
      icon: Download,
      color: 'from-violet-600 to-cyan-500'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-right">
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800 text-cyan-800 dark:text-cyan-300 text-xs font-bold">
          <Sparkles className="w-4 h-4 text-cyan-500" />
          <span>بساطة، سرعة، واحترافية لا تضاهى</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
          كيف يعمل موقع{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 font-['Plus_Jakarta_Sans',sans-serif]">
            reel store
          </span>
          ؟
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          خطوات واضحة وسريعة من لحظة اختيار الصانع حتى استلام إعلانك الجاهز للنشر
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {steps.map((st, i) => {
          const Icon = st.icon;
          return (
            <div
              key={i}
              className="relative p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-cyan-400 dark:hover:border-cyan-500 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${st.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-black text-slate-300 dark:text-slate-700 font-mono">
                    {st.step}
                  </span>
                </div>

                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">
                  {st.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {st.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] font-bold text-cyan-600 dark:text-cyan-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>مشمول في الضمان</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center pt-4">
        <button
          onClick={onStartOrder}
          className="px-8 py-4 rounded-2xl font-black text-white text-base bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 shadow-xl shadow-cyan-500/25 hover:opacity-95 transition inline-flex items-center gap-2"
        >
          <span>تصفح صناع الإعلانات الآن وابدأ أول طلب</span>
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
