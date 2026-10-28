import React, { useState } from 'react';
import { 
  Briefcase, 
  Wallet, 
  ArrowUpRight, 
  Video, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Upload, 
  Sparkles, 
  TrendingUp, 
  Zap, 
  Building2, 
  Smartphone,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { VideoOrder, UserSession, PaymentMethodType } from '../types';
import { formatCurrencyEGP } from '../utils/pricing';

interface CreatorDashboardProps {
  orders: VideoOrder[];
  currentUser: UserSession;
  onSubmitDraft: (orderId: string, videoUrl: string, notes: string) => void;
}

export const CreatorDashboard: React.FC<CreatorDashboardProps> = ({
  orders,
  currentUser,
  onSubmitDraft
}) => {
  const [balance, setBalance] = useState<number>(currentUser.balance || 6850);
  const [pendingBalance, setPendingBalance] = useState<number>(currentUser.pendingBalance || 1943);
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [payoutMethod, setPayoutMethod] = useState<PaymentMethodType>('instapay');
  const [payoutAmount, setPayoutAmount] = useState<number>(3000);
  const [payoutIdentifier, setPayoutIdentifier] = useState('karim.visuals@instapay');
  const [payoutSuccess, setPayoutSuccess] = useState(false);

  // Upload Draft Modal State
  const [activeUploadOrder, setActiveUploadOrder] = useState<VideoOrder | null>(null);
  const [draftUrl, setDraftUrl] = useState('https://assets.mixkit.co/videos/preview/mixkit-man-wearing-wireless-headphones-listening-to-music-41487-large.mp4');
  const [draftNotes, setDraftNotes] = useState('تم تصوير ومونتاج الإعلان بدقة 4K مع إضافة 3 مؤثرات صوتية وهوك إعلاني أول 3 ثواني.');

  const handleRequestPayout = (e: React.FormEvent) => {
    e.preventDefault();
    if (payoutAmount > balance) return;

    setBalance(prev => prev - payoutAmount);
    setPayoutSuccess(true);
    setTimeout(() => {
      setPayoutSuccess(false);
      setShowPayoutModal(false);
    }, 2200);
  };

  const handleSendDraft = () => {
    if (!activeUploadOrder) return;
    onSubmitDraft(activeUploadOrder.id, draftUrl, draftNotes);
    setActiveUploadOrder(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-right">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-600/10 via-indigo-600/15 to-violet-600/15 border border-indigo-200 dark:border-indigo-800/80 mb-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"></span>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
              بوابة صانع الإعلانات المعتمد
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            مرحباً بك يا {currentUser.name} 🎬
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
            إدارة طلبات إنتاج الإعلانات، استلام المدفوعات، وسحب أرباحك لحظياً عبر انستا باي، المحافظ، أو البنك.
          </p>
        </div>

        <button
          onClick={() => setShowPayoutModal(true)}
          className="px-6 py-3.5 rounded-2xl font-black text-white text-sm bg-gradient-to-r from-emerald-500 to-teal-600 shadow-xl shadow-emerald-500/20 hover:opacity-95 transition flex items-center gap-2 shrink-0"
        >
          <ArrowUpRight className="w-5 h-5" />
          <span>سحب الأرباح الآن</span>
        </button>
      </div>

      {/* Wallet & Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        
        {/* Available for Payout */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              الرصيد المتاح للسحب
            </span>
            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-sans">
            {formatCurrencyEGP(balance)}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
            جاهز للسحب الفوري إلى محفظتك أو حسابك البنكي
          </p>
        </div>

        {/* Pending Escrow */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              أرباح في مرحلة التنفيذ (ضمان Escrow)
            </span>
            <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400 font-sans">
            {formatCurrencyEGP(pendingBalance)}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
            تتحول لرصيدك المتاح فور اعتماد العميل للمسودة
          </p>
        </div>

        {/* Total Completed */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              إجمالي الإعلانات المنجزة
            </span>
            <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-sans">
            {currentUser.completedJobsCount || 245} إعلان
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
            تقييمك الحالي: ⭐ 4.98 (صانع موثق ومميز)
          </p>
        </div>

      </div>

      {/* Incoming Video Requests & Production Pipeline */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-indigo-500" />
              طلبات الإعلانات المكلف بها (Active Gigs)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              يمكنك الاطلاع على تفاصيل سكريبت العميل ورفع المسودة فور الانتهاء من التصوير
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {orders.map(order => (
            <div 
              key={order.id}
              className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 flex flex-col md:flex-row md:items-center justify-between gap-5"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                    {order.orderNumber}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    order.status === 'completed'
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600'
                      : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-600'
                  }`}>
                    {order.status === 'completed' ? 'مكتمل ومعتمد' : 'مطلوب التسليم'}
                  </span>
                  <span className="text-xs text-slate-500">
                    العميل: <strong className="text-slate-800 dark:text-slate-200">{order.clientName}</strong>
                  </span>
                </div>

                <h4 className="font-bold text-base text-slate-900 dark:text-white">
                  {order.productName || order.serviceTitle}
                </h4>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                  السكريبت والملاحظات: "{order.scriptNotes}"
                </p>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span>المدة: <strong>{order.durationSeconds} ثانية</strong></span>
                  <span>الأبعاد: <strong>{order.aspectRatio}</strong></span>
                  {order.addOns.rushDelivery && (
                    <span className="text-rose-500 font-bold">⚡ تسليم سريع 24 ساعة</span>
                  )}
                  {order.addOns.scriptWriting && (
                    <span className="text-indigo-500 font-bold">✍️ يتطلب كتابة هوك إعلاني</span>
                  )}
                </div>
              </div>

              {/* Price and Upload Draft Button */}
              <div className="flex md:flex-col items-center md:items-end justify-between gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-200 dark:border-slate-700">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400">قيمة مشروعك:</span>
                  <div className="font-black text-lg text-emerald-600 dark:text-emerald-400 font-sans">
                    {formatCurrencyEGP(order.pricing.basePrice + order.pricing.addonsTotal)}
                  </div>
                </div>

                <button
                  onClick={() => setActiveUploadOrder(order)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-95 text-white shadow-md flex items-center gap-1.5 transition"
                >
                  <Upload className="w-4 h-4" />
                  <span>{order.draftVideoUrl ? 'تحديث مسودة الفيديو' : 'رفع مسودة الفيديو الأولية'}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Payout Modal */}
      {showPayoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-indigo-300 dark:border-indigo-500/30 p-6 sm:p-8 space-y-5 shadow-2xl">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    طلب سحب الأرباح إلى حسابك
                  </h3>
                  <p className="text-xs text-slate-500">
                    رصيدك القابل للسحب: {formatCurrencyEGP(balance)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowPayoutModal(false)}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            {payoutSuccess ? (
              <div className="p-6 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </div>
                <h4 className="font-black text-lg text-slate-900 dark:text-white">
                  تم إرسال طلب السحب بنجاح!
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  سيصلك المبلغ خلال دقائق معدودة إلى عنوانك المحدد.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRequestPayout} className="space-y-4">
                
                {/* Method selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                    اختر وسيلة استلام الأرباح:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'instapay' as const, label: 'انستا باي مصر', icon: Zap },
                      { id: 'vodafone_cash' as const, label: 'فودافون كاش ومحافظ', icon: Smartphone },
                      { id: 'bank_transfer' as const, label: 'حساب بنكي رسمي', icon: Building2 }
                    ].map(m => {
                      const Icon = m.icon;
                      const isSel = payoutMethod === m.id;
                      return (
                        <button
                          type="button"
                          key={m.id}
                          onClick={() => setPayoutMethod(m.id)}
                          className={`p-3 rounded-2xl text-xs font-bold border transition flex flex-col items-center gap-1.5 ${
                            isSel
                              ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-600 text-indigo-600 dark:text-indigo-400 shadow-sm'
                              : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{m.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    المبلغ المراد سحبه (ج.م):
                  </label>
                  <input
                    type="number"
                    max={balance}
                    min={100}
                    value={payoutAmount}
                    onChange={e => setPayoutAmount(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {payoutMethod === 'instapay' && 'عنوان الدفع اللحظي (IPA) أو رقم الهاتف في انستا باي:'}
                    {payoutMethod === 'vodafone_cash' && 'رقم محفظة فودافون كاش لاستلام المبلغ:'}
                    {payoutMethod === 'bank_transfer' && 'رقم الحساب البنكي / الآيبان (IBAN):'}
                  </label>
                  <input
                    type="text"
                    required
                    value={payoutIdentifier}
                    onChange={e => setPayoutIdentifier(e.target.value)}
                    placeholder="name@instapay أو 010xxxxxxxx"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl font-black text-white text-sm bg-gradient-to-r from-emerald-500 to-teal-600 shadow-xl shadow-emerald-500/25 hover:opacity-95 transition"
                >
                  تأكيد التحويل الآن ({formatCurrencyEGP(payoutAmount)})
                </button>
              </form>
            )}

          </div>
        </div>
      )}

      {/* Upload Draft Modal */}
      {activeUploadOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-cyan-300 dark:border-cyan-500/30 p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  تسليم مسودة الإعلان للعميل
                </h3>
                <p className="text-xs text-slate-500">
                  طلب: {activeUploadOrder.productName} ({activeUploadOrder.orderNumber})
                </p>
              </div>
              <button
                onClick={() => setActiveUploadOrder(null)}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  رابط الفيديو (MP4 / Google Drive / Dropbox / Vimeo):
                </label>
                <input
                  type="url"
                  value={draftUrl}
                  onChange={e => setDraftUrl(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  ملاحظاتك للعميل حول المسودة:
                </label>
                <textarea
                  rows={3}
                  value={draftNotes}
                  onChange={e => setDraftNotes(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
                ></textarea>
              </div>

              <button
                onClick={handleSendDraft}
                className="w-full py-3.5 rounded-2xl font-black text-white text-sm bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 shadow-xl shadow-cyan-500/25 hover:opacity-95 transition"
              >
                إرسال المسودة للعميل للمعاينة
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
