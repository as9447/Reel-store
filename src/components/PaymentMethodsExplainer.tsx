import React, { useState } from 'react';
import { 
  Zap, 
  Smartphone, 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  Copy, 
  ArrowLeft,
  Lock,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { PAYMENT_METHODS } from '../data/mockData';

interface PaymentMethodsExplainerProps {
  onBackToExplore: () => void;
}

export const PaymentMethodsExplainer: React.FC<PaymentMethodsExplainerProps> = ({
  onBackToExplore
}) => {
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-right">
      
      {/* Top Breadcrumb & Title */}
      <div className="mb-10 text-center max-w-3xl mx-auto space-y-4">
        <button
          onClick={onBackToExplore}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>العودة إلى استكشاف صناع الفيديوهات</span>
        </button>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800 text-cyan-800 dark:text-cyan-300 text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-cyan-500" />
          <span>طرق دفع معتمدة وآمنة 100% داخل جمهورية مصر العربية والوطن العربي</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          3 طرق دفع سهلة وسريعة مع حماية{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600">
            Escrow
          </span>
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          في موقع <strong>reel store</strong>، صممنا نظام دفع يضمن كامل حقوق العميل وصانع الفيديو معاً. المبلغ يظل مؤمناً لدينا ولا يتم تحويله للصانع إلا بعد رضاك التام عن الإعلان النهائي.
        </p>
      </div>

      {/* 3 Payment Methods Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {PAYMENT_METHODS.map(method => (
          <div 
            key={method.id}
            className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-xl hover:border-cyan-400 dark:hover:border-cyan-500 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl text-white bg-gradient-to-br ${method.brandColor} shadow-md`}>
                  {method.id === 'instapay' && <Zap className="w-6 h-6" />}
                  {method.id === 'vodafone_cash' && <Smartphone className="w-6 h-6" />}
                  {method.id === 'bank_transfer' && <Building2 className="w-6 h-6" />}
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                  {method.badge}
                </span>
              </div>

              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1">
                {method.arabicTitle}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                {method.subtitle}
              </p>

              {/* Account Box */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1 mb-4">
                <span className="text-[10px] text-slate-400 font-bold block">
                  الحساب المعتمد للمنصة:
                </span>
                <div className="font-mono font-bold text-xs sm:text-sm text-slate-900 dark:text-white break-all flex items-center justify-between gap-2">
                  <span>{method.accountIdentifier}</span>
                  <button
                    onClick={() => handleCopy(method.id, method.accountIdentifier)}
                    className="p-1 text-slate-400 hover:text-cyan-500 transition"
                    title="نسخ"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-[10px] text-cyan-600 dark:text-cyan-400 font-medium">
                  {method.accountName}
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <div className="font-bold text-slate-800 dark:text-slate-200">خطوات التحويل:</div>
                {method.instructions.map((inst, i) => (
                  <div key={i} className="flex items-start gap-2 text-[11px] leading-relaxed">
                    <span className="w-4 h-4 rounded-full bg-slate-100 dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{inst}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-5 mt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">السرعة:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {method.id === 'instapay' ? 'فوري في ثوانٍ' : method.id === 'vodafone_cash' ? 'فوري خلال دقائق' : 'نفس يوم العمل'}
              </span>
            </div>

          </div>
        ))}
      </div>

      {/* Escrow System Explanation */}
      <div className="rounded-3xl bg-gradient-to-r from-cyan-500/10 via-blue-600/10 to-indigo-600/15 border border-cyan-300 dark:border-cyan-800 p-8 sm:p-10">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500 text-white flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                كيف يحمي نظام ريل ستور أموالك وحقوقك؟
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                الأمان التام للعميل وصانع الإعلانات على حد سواء
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="text-cyan-500 font-black text-lg">01. حجز آمن</div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                عند الدفع عبر أي وسيلة، يتم تجميد المبلغ في حساب وسيط (Escrow) كضمان، ويبدأ الصانع بالعمل فوراً.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="text-blue-500 font-black text-lg">02. معاينة وتعديل</div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                يصلك الفيديو بمسودة أولية مع إمكانية طلب أي تعديلات مجانية على المونتاج، الهوك، أو المؤثرات.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="text-indigo-500 font-black text-lg">03. اعتماد وتحويل</div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                فقط عندما توافق على الفيديو 100%، نقوم بتحويل الأرباح للصانع إلى انستا باي أو محفظته.
              </p>
            </div>
          </div>

          <div className="pt-4 text-center">
            <button
              onClick={onBackToExplore}
              className="px-8 py-3.5 rounded-2xl font-black text-white text-sm bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 shadow-xl shadow-cyan-500/25 hover:opacity-95 transition"
            >
              جاهز لتجربة حجز صانع فيديو الآن
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
