import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  Play, 
  AlertCircle, 
  Download, 
  Sparkles, 
  ArrowLeft, 
  MessageSquare,
  ShieldCheck,
  CreditCard
} from 'lucide-react';
import { VideoOrder, UserSession, SampleVideo, CreatorProfile } from '../types';
import { formatCurrencyEGP } from '../utils/pricing';
import { ReliableVideo } from './ReliableVideo';

interface ClientDashboardProps {
  orders: VideoOrder[];
  currentUser: UserSession;
  onExploreMore: () => void;
  onApproveOrder: (orderId: string) => void;
  onRequestRevision: (orderId: string, revisionNotes: string) => void;
  onPreviewVideo: (video: SampleVideo, creator: CreatorProfile) => void;
  creators: CreatorProfile[];
}

export const ClientDashboard: React.FC<ClientDashboardProps> = ({
  orders,
  currentUser,
  onExploreMore,
  onApproveOrder,
  onRequestRevision,
  onPreviewVideo,
  creators
}) => {
  const [selectedOrder, setSelectedOrder] = useState<VideoOrder | null>(orders[0] || null);
  const [revisionText, setRevisionText] = useState('');
  const [showRevisionInput, setShowRevisionInput] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-right">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-cyan-500/10 via-blue-600/10 to-indigo-600/15 border border-cyan-200 dark:border-cyan-800/80 mb-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">
              لوحة تحكم العميل والمشاريع
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            مرحباً بك، {currentUser.name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
            تابع تقدم إنتاج إعلاناتك، شاهد المسودات المرفوعة، واعتمد الفيديوهات للتحميل الفوري.
          </p>
        </div>

        <button
          onClick={onExploreMore}
          className="px-6 py-3.5 rounded-2xl font-black text-white text-sm bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 shadow-xl shadow-cyan-500/20 hover:opacity-95 transition flex items-center gap-2 shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>طلب إعلان وفيديو جديد</span>
        </button>
      </div>

      {/* Orders List & Selected Order Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Orders Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-base text-slate-900 dark:text-white flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-cyan-500" />
              طلبات الفيديو الخاصة بك ({orders.length})
            </h3>
          </div>

          {orders.length === 0 ? (
            <div className="p-8 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <ShoppingBag className="w-12 h-12 text-slate-400 mx-auto" />
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                لا توجد طلبات نشطة حالياً
              </p>
              <button
                onClick={onExploreMore}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition"
              >
                تصفح صناع الإعلانات
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map(order => {
                const isSelected = selectedOrder?.id === order.id;
                return (
                  <div
                    key={order.id}
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowRevisionInput(false);
                    }}
                    className={`p-4 rounded-2xl cursor-pointer border-2 transition-all duration-200 ${
                      isSelected
                        ? 'border-cyan-500 bg-cyan-50/70 dark:bg-cyan-950/40 shadow-lg'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {order.orderNumber}
                      </span>
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                        order.status === 'completed'
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                          : order.status === 'draft_ready'
                          ? 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-800'
                          : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                      }`}>
                        {order.status === 'completed' && 'تم الاعتماد والتسليم ✓'}
                        {order.status === 'draft_ready' && 'المسودة الأولى جاهزة للمعاينة 🎬'}
                        {order.status === 'confirmed' && 'جاري التصوير والمونتاج ⏳'}
                      </span>
                    </div>

                    <div className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1 mb-1">
                      {order.productName || order.serviceTitle}
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span>الصانع: <strong>{order.creatorName}</strong></span>
                      <span className="font-black text-cyan-600 dark:text-cyan-400">
                        {formatCurrencyEGP(order.pricing.total)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Selected Order Detailed View */}
        <div className="lg:col-span-7">
          {selectedOrder ? (
            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
              
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-cyan-600 dark:text-cyan-400">
                      طلب رقم: {selectedOrder.orderNumber}
                    </span>
                    <span className="text-xs text-slate-400">• تم الطلب في {selectedOrder.createdAt}</span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                    {selectedOrder.productName}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <img 
                    src={selectedOrder.creatorAvatar} 
                    alt={selectedOrder.creatorName} 
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-cyan-500"
                  />
                  <div className="text-right">
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      {selectedOrder.creatorName}
                    </div>
                    <div className="text-[10px] text-slate-400">صانع الإعلان</div>
                  </div>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-3">
                  مسار تنفيذ الإعلان:
                </div>
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div className="space-y-1">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto text-[10px] font-bold">✓</div>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">تم الدفع</span>
                    <div className="text-[9px] text-slate-400">{selectedOrder.paymentMethod}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto text-[10px] font-bold">✓</div>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">كتابة السكريبت</span>
                  </div>
                  <div className="space-y-1">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mx-auto text-[10px] font-bold ${
                      selectedOrder.status === 'draft_ready' || selectedOrder.status === 'completed'
                        ? 'bg-emerald-500 text-white'
                        : 'bg-amber-500 text-white animate-pulse'
                    }`}>
                      {selectedOrder.status === 'draft_ready' || selectedOrder.status === 'completed' ? '✓' : '...'}
                    </div>
                    <span className="font-bold text-slate-800 dark:text-slate-200">المسودة الأولى</span>
                  </div>
                  <div className="space-y-1">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mx-auto text-[10px] font-bold ${
                      selectedOrder.status === 'completed' ? 'bg-emerald-500 text-white' : 'bg-slate-300 dark:bg-slate-700 text-slate-600'
                    }`}>
                      {selectedOrder.status === 'completed' ? '✓' : '4'}
                    </div>
                    <span className={selectedOrder.status === 'completed' ? 'font-bold text-emerald-500' : 'text-slate-400'}>
                      الاعتماد والتحميل
                    </span>
                  </div>
                </div>
              </div>

              {/* Draft Review Showcase if draft is ready */}
              {selectedOrder.draftVideoUrl && (
                <div className="p-5 rounded-3xl bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-blue-500/10 border border-purple-200 dark:border-purple-800/80 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-ping"></span>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        المسودة التجريبية للفيديو (جاهزة للمعاينة)
                      </h4>
                    </div>
                    <span className="text-xs text-slate-500 font-medium">
                      متبقي لديك {selectedOrder.revisionsLeft} طلبات تعديل مجانية
                    </span>
                  </div>

                  {/* Video preview player frame */}
                  <div className="relative rounded-2xl bg-black overflow-hidden aspect-[16/9] flex items-center justify-center group">
                    <ReliableVideo
                      src={selectedOrder.draftVideoUrl}
                      fallbackSrc="/assets/videos/aromatic_perfume_ad.mp4"
                      containerClassName="absolute inset-0"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {selectedOrder.feedbackNotes}
                  </p>

                  {/* Approve or Request Revision Action Buttons */}
                  {selectedOrder.status !== 'completed' && (
                    <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                      <button
                        onClick={() => onApproveOrder(selectedOrder.id)}
                        className="w-full sm:flex-1 py-3.5 rounded-xl font-black text-white text-sm bg-gradient-to-r from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/20 hover:opacity-95 transition flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                        <span>اعتماد الفيديو واستلام الملف النهائي 4K</span>
                      </button>

                      <button
                        onClick={() => setShowRevisionInput(!showRevisionInput)}
                        className="w-full sm:w-auto px-5 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center justify-center gap-1.5"
                      >
                        <MessageSquare className="w-4 h-4 text-purple-500" />
                        <span>طلب تعديل على المسودة</span>
                      </button>
                    </div>
                  )}

                  {/* If Completed, Download Button */}
                  {selectedOrder.status === 'completed' && (
                    <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span>تم اعتماد الفيديو بنجاح وإرسال المقابل المادي للصانع.</span>
                      </div>
                      <a
                        href={selectedOrder.draftVideoUrl}
                        download
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-500 transition flex items-center gap-1.5"
                      >
                        <Download className="w-4 h-4" />
                        <span>تحميل الفيديو النهائي</span>
                      </a>
                    </div>
                  )}

                  {/* Revision Request Input */}
                  {showRevisionInput && (
                    <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
                      <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                        اكتب تفاصيل التعديل المطلوب بدقة للصانع:
                      </label>
                      <textarea
                        rows={2}
                        value={revisionText}
                        onChange={e => setRevisionText(e.target.value)}
                        placeholder="مثال: تغيير الموسيقى الخلفية لتكون أسرع، تكبير كود الخصم في الثواني الأخيرة..."
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                      ></textarea>
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setShowRevisionInput(false)}
                          className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800"
                        >
                          إلغاء
                        </button>
                        <button
                          onClick={() => {
                            if (revisionText.trim()) {
                              onRequestRevision(selectedOrder.id, revisionText);
                              setRevisionText('');
                              setShowRevisionInput(false);
                            }
                          }}
                          className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition"
                        >
                          إرسال التعديل للصانع
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* Order Brief Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-slate-400 font-medium">هدف الحملة الإعلانية:</span>
                  <div className="font-bold text-slate-800 dark:text-slate-200">{selectedOrder.projectGoal}</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-slate-400 font-medium">المدة والأبعاد:</span>
                  <div className="font-bold text-slate-800 dark:text-slate-200">
                    {selectedOrder.durationSeconds} ثانية | {selectedOrder.aspectRatio}
                  </div>
                </div>
              </div>

              {/* Payment Summary */}
              <div className="p-4 rounded-2xl bg-cyan-50/50 dark:bg-cyan-950/20 border border-cyan-100 dark:border-cyan-900/40 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-cyan-500" />
                  <span className="text-slate-600 dark:text-slate-300">
                    طريقة الدفع: <strong>{selectedOrder.paymentMethod.toUpperCase()}</strong> ({selectedOrder.paymentDetails.referenceCode})
                  </span>
                </div>
                <div className="font-black text-cyan-600 dark:text-cyan-400 text-sm">
                  {formatCurrencyEGP(selectedOrder.pricing.total)}
                </div>
              </div>

            </div>
          ) : (
            <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500">
              اختر طلباً من القائمة لعرض تفاصيل الإعلان
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
