import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Zap, 
  Smartphone, 
  Building2, 
  Copy, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  AlertCircle, 
  ArrowLeft, 
  ArrowRight,
  Upload,
  CheckCircle2,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CreatorProfile, PaymentMethodType, VideoOrder, UserSession } from '../types';
import { PAYMENT_METHODS } from '../data/mockData';
import { 
  calculateVideoPrice, 
  validateInstaPayHandle, 
  validateWalletNumber, 
  validateBankTransfer, 
  formatCurrencyEGP 
} from '../utils/pricing';

interface OrderModalProps {
  creator: CreatorProfile | null;
  currentUser: UserSession | null;
  onClose: () => void;
  onOrderCreated: (order: VideoOrder) => void;
  onOpenClientAuth: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  creator,
  currentUser,
  onClose,
  onOrderCreated,
  onOpenClientAuth
}) => {
  if (!creator) return null;

  // Wizard Step: 1 = Brief & Customization, 2 = Payment Method, 3 = Confirmation
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Configuration state
  const [packageType, setPackageType] = useState<'basic' | 'standard' | 'premium'>('standard');
  const [durationSeconds, setDurationSeconds] = useState<number>(30);
  const [aspectRatio, setAspectRatio] = useState<'9:16' | '16:9' | '1:1'>('9:16');
  const [productName, setProductName] = useState('');
  const [projectGoal, setProjectGoal] = useState('زيادة مبيعات المتجر وإطلاق حملة إعلانية ممولة');
  const [scriptNotes, setScriptNotes] = useState('');
  const [clientPhone, setClientPhone] = useState(currentUser?.phone || '01019283746');
  const [clientName, setClientName] = useState(currentUser?.name || 'أحمد سمير');
  const [clientEmail, setClientEmail] = useState(currentUser?.email || 'client@business.eg');

  // Addons
  const [rushDelivery, setRushDelivery] = useState(false);
  const [scriptWriting, setScriptWriting] = useState(true);
  const [subtitles, setSubtitles] = useState(true);
  const [rawFootage, setRawFootage] = useState(false);
  const [actorVoiceover, setActorVoiceover] = useState(false);

  // Payment Selection
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethodType>('instapay');
  const [senderIdentifier, setSenderIdentifier] = useState('');
  const [referenceCode, setReferenceCode] = useState('');
  const [transferProofNote, setTransferProofNote] = useState('');
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<VideoOrder | null>(null);

  // Base price according to package
  const baseRate = creator.packages[packageType].price;
  const pricing = calculateVideoPrice(baseRate, {
    durationSeconds,
    rushDelivery,
    scriptWriting,
    subtitles,
    rawFootage,
    actorVoiceover
  });

  const selectedMethodConfig = PAYMENT_METHODS.find(m => m.id === selectedPaymentMethod)!;

  const handleCopyIdentifier = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleValidateAndPay = () => {
    setPaymentError(null);

    if (!senderIdentifier.trim()) {
      setPaymentError('يرجى كتابة رقم هاتفك أو حسابك المستخدم في التحويل');
      return;
    }

    if (selectedPaymentMethod === 'instapay') {
      const val = validateInstaPayHandle(senderIdentifier);
      if (!val.isValid) {
        setPaymentError(val.error || 'عنوان انستا باي غير صالح');
        return;
      }
    } else if (selectedPaymentMethod === 'vodafone_cash') {
      const val = validateWalletNumber(senderIdentifier);
      if (!val.isValid) {
        setPaymentError(val.error || 'رقم المحفظة الإلكترونية غير صالح');
        return;
      }
    } else if (selectedPaymentMethod === 'bank_transfer') {
      const val = validateBankTransfer(referenceCode || senderIdentifier);
      if (!val.isValid) {
        setPaymentError(val.error || 'يرجى إدخال رقم المعاملة البنكية');
        return;
      }
    }

    // Generate realistic order
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newOrder: VideoOrder = {
      id: `ord-${randomNum}`,
      orderNumber: `RS-${randomNum}`,
      clientId: currentUser?.id || 'guest-client',
      clientName: clientName || 'عميل ريل ستور',
      clientEmail: clientEmail || 'client@reelstore.io',
      clientPhone: clientPhone || '01000000000',
      creatorId: creator.id,
      creatorName: creator.name,
      creatorAvatar: creator.avatar,
      serviceTitle: `فيديو إعلاني احترافي - ${productName || 'حملة إعلانية'}`,
      packageType,
      durationSeconds,
      aspectRatio,
      projectGoal,
      productName: productName || 'منتج تجاري',
      scriptNotes: scriptNotes || 'يرجى تسليم الفيديو بأعلى جودة مع إبراز نقاط القوة للمنتج',
      targetAudience: 'الجمهور المستهدف على منصات السوشيال ميديا',
      addOns: {
        rushDelivery,
        scriptWriting,
        subtitles,
        rawFootage,
        actorVoiceover
      },
      pricing: {
        basePrice: pricing.basePrice,
        addonsTotal: pricing.addonsTotal,
        platformFee: pricing.platformFee,
        total: pricing.total
      },
      paymentMethod: selectedPaymentMethod,
      paymentDetails: {
        senderIdentifier,
        referenceCode: referenceCode || `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
        transferProofNote,
        paidAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
        verified: true
      },
      status: 'confirmed',
      createdAt: new Date().toISOString().slice(0, 10),
      deliveryDueDate: rushDelivery ? 'خلال 24 ساعة' : 'خلال 48-72 ساعة',
      revisionsLeft: creator.packages[packageType].revisions,
      feedbackNotes: 'تم تأكيد الدفع بنجاح وإشعار الصانع للبدء في كتابة وتصوير إعلانك.'
    };

    setCreatedOrder(newOrder);
    onOrderCreated(newOrder);
    setStep(3);

    // Launch celebratory confetti
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {
      // gracefully ignore if canvas confetti is blocked
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl border border-cyan-300 dark:border-cyan-500/30 shadow-2xl overflow-hidden my-auto">
        
        {/* Top Header with Progress Indicator */}
        <div className="p-6 bg-gradient-to-r from-cyan-500/10 via-blue-600/10 to-indigo-600/10 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={creator.avatar} 
              alt={creator.name} 
              className="w-12 h-12 rounded-2xl object-cover ring-2 ring-cyan-500" 
            />
            <div className="text-right">
              <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">
                طلب وتأجير صانع إعلانات
              </span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                حجز خدمة الفيديو مع {creator.name}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400">
              <span className={step >= 1 ? 'text-cyan-500' : ''}>1. تفاصيل الإعلان</span>
              <span>←</span>
              <span className={step >= 2 ? 'text-cyan-500' : ''}>2. اختيار طريقة الدفع</span>
              <span>←</span>
              <span className={step >= 3 ? 'text-cyan-500' : ''}>3. التأكيد</span>
            </div>
            <button
              onClick={onClose}
              aria-label="إغلاق"
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: STEP 1 (Configuration & Brief) */}
        {step === 1 && (
          <div className="p-6 space-y-6 text-right max-h-[75vh] overflow-y-auto">
            
            {/* Package Selector */}
            <div>
              <label className="block text-xs font-black uppercase text-slate-700 dark:text-slate-300 mb-2">
                اختر الباقة المناسبة لميزانيتك:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(['basic', 'standard', 'premium'] as const).map(pkgKey => {
                  const pkg = creator.packages[pkgKey];
                  const isSelected = packageType === pkgKey;
                  return (
                    <div
                      key={pkgKey}
                      onClick={() => setPackageType(pkgKey)}
                      className={`p-4 rounded-2xl cursor-pointer border-2 transition-all duration-200 flex flex-col justify-between ${
                        isSelected
                          ? 'border-cyan-500 bg-cyan-50/70 dark:bg-cyan-950/40 shadow-md'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-sm text-slate-900 dark:text-white">
                            {pkg.title}
                          </span>
                          {isSelected && <Check className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {pkg.duration}
                        </div>
                      </div>
                      <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                        <span className="text-xs text-slate-500">السعر:</span>
                        <span className="font-black text-cyan-600 dark:text-cyan-400 text-sm">
                          {formatCurrencyEGP(pkg.price)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Video Duration & Aspect Ratio */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  مدة الفيديو المطلوبة:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { sec: 15, label: '15 ثانية (سريع)' },
                    { sec: 30, label: '30 ثانية (مثالي)' },
                    { sec: 60, label: '60 ثانية (شامل)' }
                  ].map(dur => (
                    <button
                      type="button"
                      key={dur.sec}
                      onClick={() => setDurationSeconds(dur.sec)}
                      className={`py-2 px-1 rounded-xl text-xs font-bold border transition ${
                        durationSeconds === dur.sec
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-transparent'
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {dur.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  أبعاد ومقاس الفيديو:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { ratio: '9:16' as const, label: 'عمودي 9:16 (ريلز)' },
                    { ratio: '1:1' as const, label: 'مربع 1:1 (بوست)' },
                    { ratio: '16:9' as const, label: 'أفقي 16:9 (يوتيوب)' }
                  ].map(ar => (
                    <button
                      type="button"
                      key={ar.ratio}
                      onClick={() => setAspectRatio(ar.ratio)}
                      className={`py-2 px-1 rounded-xl text-xs font-bold border transition ${
                        aspectRatio === ar.ratio
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-transparent'
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {ar.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Product & Goal Information */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  اسم المنتج أو الخدمة المراد الإعلان عنها: *
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={e => setProductName(e.target.value)}
                  placeholder="مثال: ساعة ذكية، كافيه، تطبيق توصيل، متجر ملابس..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  ملاحظات النص الإعلاني أو الهوك المطلوب (Script Hook):
                </label>
                <textarea
                  rows={2}
                  value={scriptNotes}
                  onChange={e => setScriptNotes(e.target.value)}
                  placeholder="اكتب النقاط الرئيسية التي تريد أن يركز عليها صانع الفيديو (مثال: الشحن المجاني، ميزة مقاومة الماء، كود الخصم)..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                ></textarea>
              </div>
            </div>

            {/* Optional Add-ons */}
            <div>
              <label className="block text-xs font-black uppercase text-slate-700 dark:text-slate-300 mb-2">
                إضافات وترقيات مخصصة:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                
                <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${
                  rushDelivery ? 'border-cyan-500 bg-cyan-50/50 dark:bg-cyan-950/30' : 'border-slate-200 dark:border-slate-800'
                }`}>
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      checked={rushDelivery} 
                      onChange={e => setRushDelivery(e.target.checked)} 
                      className="accent-cyan-500 w-4 h-4 rounded"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">تسليم مستعجل خلال 24 ساعة ⚡</div>
                      <div className="text-[10px] text-slate-500">أولوية إنتاج ومونتاج فوري</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">+350 ج.م</span>
                </label>

                <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${
                  scriptWriting ? 'border-cyan-500 bg-cyan-50/50 dark:bg-cyan-950/30' : 'border-slate-200 dark:border-slate-800'
                }`}>
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      checked={scriptWriting} 
                      onChange={e => setScriptWriting(e.target.checked)} 
                      className="accent-cyan-500 w-4 h-4 rounded"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">كتابة سكريبت وهوك بيعي جذاب ✍️</div>
                      <div className="text-[10px] text-slate-500">نص إعلاني مصمم لزيادة التحويل</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">+250 ج.م</span>
                </label>

                <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${
                  subtitles ? 'border-cyan-500 bg-cyan-50/50 dark:bg-cyan-950/30' : 'border-slate-200 dark:border-slate-800'
                }`}>
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      checked={subtitles} 
                      onChange={e => setSubtitles(e.target.checked)} 
                      className="accent-cyan-500 w-4 h-4 rounded"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">كابتشنز متحركة على الفيديو 💬</div>
                      <div className="text-[10px] text-slate-500">خطوط أنيقة وملفتة تناسب التيك توك</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">+150 ج.م</span>
                </label>

                <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${
                  rawFootage ? 'border-cyan-500 bg-cyan-50/50 dark:bg-cyan-950/30' : 'border-slate-200 dark:border-slate-800'
                }`}>
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      checked={rawFootage} 
                      onChange={e => setRawFootage(e.target.checked)} 
                      className="accent-cyan-500 w-4 h-4 rounded"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">تسليم المقاطع الخام B-Roll 🎞️</div>
                      <div className="text-[10px] text-slate-500">لاستخدامها في إعلانات قادمة</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">+400 ج.م</span>
                </label>

              </div>
            </div>

            {/* Price Preview Card */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
              <div className="flex justify-between text-xs text-slate-600 dark:text-slate-300">
                <span>سعر باقة الفيديو ({creator.packages[packageType].title}):</span>
                <span>{formatCurrencyEGP(pricing.basePrice)}</span>
              </div>
              {pricing.durationSurcharge > 0 && (
                <div className="flex justify-between text-xs text-slate-600 dark:text-slate-300">
                  <span>فارق مدة {durationSeconds} ثانية:</span>
                  <span>+{formatCurrencyEGP(pricing.durationSurcharge)}</span>
                </div>
              )}
              {pricing.addonsTotal > 0 && (
                <div className="flex justify-between text-xs text-slate-600 dark:text-slate-300">
                  <span>الإضافات المختارة:</span>
                  <span>+{formatCurrencyEGP(pricing.addonsTotal)}</span>
                </div>
              )}
              <div className="flex justify-between text-xs text-slate-600 dark:text-slate-300">
                <span>رسوم المنصة والضمان وحماية المشتري (5%):</span>
                <span>{formatCurrencyEGP(pricing.platformFee)}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <span className="font-bold text-sm text-slate-900 dark:text-white">المبلغ الإجمالي للدفع:</span>
                <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-l from-cyan-500 to-blue-600">
                  {formatCurrencyEGP(pricing.total)}
                </span>
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={() => {
                if (!productName.trim()) {
                  setProductName('إعلان منتج تجاري');
                }
                setStep(2);
              }}
              className="w-full py-4 rounded-2xl font-black text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/35 hover:opacity-95 active:scale-98 transition flex items-center justify-center gap-2"
            >
              <span>المتابعة إلى طرق الدفع (انستا باي / محافظ / بنك)</span>
              <ArrowLeft className="w-5 h-5" />
            </button>

          </div>
        )}

        {/* Modal Body: STEP 2 (Payment Method Selection) */}
        {step === 2 && (
          <div className="p-6 space-y-6 text-right max-h-[75vh] overflow-y-auto">
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-black text-slate-900 dark:text-white">
                  اختر وسيلة الدفع لتأكيد حجز صانع الإعلانات
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  لا يتم تحويل المبلغ للصانع إلا بعد استلامك وموافقتك التامة على الفيديو
                </p>
              </div>
              <button
                onClick={() => setStep(1)}
                className="text-xs font-bold text-cyan-600 dark:text-cyan-400 flex items-center gap-1 hover:underline"
              >
                <span>تعديل تفاصيل الطلب</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* 3 Payment Methods Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {PAYMENT_METHODS.map(method => {
                const isSelected = selectedPaymentMethod === method.id;
                return (
                  <div
                    key={method.id}
                    onClick={() => {
                      setSelectedPaymentMethod(method.id);
                      setPaymentError(null);
                    }}
                    className={`p-4 rounded-2xl cursor-pointer border-2 transition-all duration-200 ${
                      isSelected
                        ? 'border-cyan-500 bg-cyan-50/70 dark:bg-cyan-950/40 shadow-lg'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/40 dark:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className={`p-2 rounded-xl text-white bg-gradient-to-br ${method.brandColor}`}>
                        {method.id === 'instapay' && <Zap className="w-5 h-5" />}
                        {method.id === 'vodafone_cash' && <Smartphone className="w-5 h-5" />}
                        {method.id === 'bank_transfer' && <Building2 className="w-5 h-5" />}
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                        {method.badge}
                      </span>
                    </div>

                    <div className="font-bold text-sm text-slate-900 dark:text-white mb-0.5">
                      {method.arabicTitle}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                      {method.title}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Method Detail & Transfer Instructions Box */}
            <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/70 border border-cyan-200 dark:border-cyan-800/60 space-y-4">
              
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-ping"></span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
                    بيانات التحويل المعتمدة لمنصة Reel Store:
                  </span>
                </div>
                <span className="text-xs font-black text-cyan-600 dark:text-cyan-400">
                  المبلغ المطلوب: {formatCurrencyEGP(pricing.total)}
                </span>
              </div>

              {/* Recipient Account Details with 1-click Copy */}
              <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="text-[10px] text-slate-400 font-bold">
                    {selectedPaymentMethod === 'instapay' && 'عنوان الدفع اللحظي (IPA) أو حساب انستا باي:'}
                    {selectedPaymentMethod === 'vodafone_cash' && 'رقم المحفظة الإلكترونية الرسمية:'}
                    {selectedPaymentMethod === 'bank_transfer' && 'رقم الحساب البنكي / IBAN:'}
                  </div>
                  <div className="font-mono font-bold text-sm sm:text-base text-slate-900 dark:text-white select-all">
                    {selectedMethodConfig.accountIdentifier}
                  </div>
                  <div className="text-[11px] text-cyan-600 dark:text-cyan-400 font-semibold">
                    الاسم المسجل: {selectedMethodConfig.accountName}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopyIdentifier(selectedMethodConfig.accountIdentifier)}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-cyan-50 dark:bg-cyan-950/70 text-cyan-700 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800 hover:bg-cyan-100 transition flex items-center gap-1.5 shrink-0"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copiedText ? 'تم النسخ!' : 'نسخ'}</span>
                </button>
              </div>

              {/* Instructions List */}
              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                <div className="font-bold text-slate-800 dark:text-slate-200 mb-1">
                  خطوات إتمام الدفع:
                </div>
                {selectedMethodConfig.instructions.map((inst, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{inst}</span>
                  </div>
                ))}
              </div>

              {/* Verification Inputs Form */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                    {selectedPaymentMethod === 'instapay' && 'عنوان انستا باي أو رقم هاتفك الذي قمت بالتحويل منه: *'}
                    {selectedPaymentMethod === 'vodafone_cash' && 'رقم فودافون كاش أو المحفظة التي حولت منها (11 رقم): *'}
                    {selectedPaymentMethod === 'bank_transfer' && 'اسم صاحب الحساب أو اسم شركتك المحولة: *'}
                  </label>
                  <input
                    type="text"
                    value={senderIdentifier}
                    onChange={e => setSenderIdentifier(e.target.value)}
                    placeholder={
                      selectedPaymentMethod === 'instapay'
                        ? 'مثال: yourname@instapay أو 010xxxxxxxx'
                        : selectedPaymentMethod === 'vodafone_cash'
                        ? 'مثال: 01012345678'
                        : 'مثال: شركة الأمل للاستيراد / محمد خالد'
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 font-sans"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                      رقم العملية المرجعي (Reference No / رقم الإيصال):
                    </label>
                    <input
                      type="text"
                      value={referenceCode}
                      onChange={e => setReferenceCode(e.target.value)}
                      placeholder="مثال: IPN-9382104 / 382910"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                      رقم واتساب للتواصل السريع:
                    </label>
                    <input
                      type="text"
                      value={clientPhone}
                      onChange={e => setClientPhone(e.target.value)}
                      placeholder="010xxxxxxxx"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>

                {paymentError && (
                  <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-bold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{paymentError}</span>
                  </div>
                )}
              </div>

            </div>

            {/* Escrow Guarantee Statement */}
            <div className="p-3 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-2.5 text-xs text-emerald-800 dark:text-emerald-300">
              <ShieldCheck className="w-5 h-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span>
                <strong>نظام الضمان الآمن (Escrow):</strong> تظل أموالك محفوظة بأمان لدى المنصة حتى استلام الفيديو وموافقتك عليه بالكامل.
              </span>
            </div>

            {/* Submit Payment Confirmation */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-3.5 rounded-2xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                رجوع
              </button>
              <button
                type="button"
                onClick={handleValidateAndPay}
                className="flex-1 py-4 rounded-2xl font-black text-white text-sm sm:text-base bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:opacity-95 active:scale-98 transition flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>تأكيد التحويل وحجز الصانع فوراً ({formatCurrencyEGP(pricing.total)})</span>
              </button>
            </div>

          </div>
        )}

        {/* Modal Body: STEP 3 (Celebration & Confirmed Receipt) */}
        {step === 3 && createdOrder && (
          <div className="p-8 text-center space-y-6">
            
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 text-white flex items-center justify-center mx-auto shadow-2xl shadow-cyan-500/40 animate-bounce-slight">
              <Check className="w-10 h-10 stroke-[3]" />
            </div>

            <div className="space-y-1.5">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800">
                تم استلام طلبك بنجاح وبدء التنفيذ 🎉
              </span>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                تهانينا! تم تأكيد طلب الفيديو الإعلاني
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                تم إشعار صانع الإعلانات <strong className="text-cyan-600 dark:text-cyan-400">{creator.name}</strong> وبدأ العمل على سكريبت وتصوير إعلانك.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-right max-w-lg mx-auto space-y-2.5">
              <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-200 dark:border-slate-700">
                <span className="text-slate-500">رقم الطلب المرجعي:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded">
                  {createdOrder.orderNumber}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">المنتج:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{createdOrder.productName}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">طريقة الدفع:</span>
                <span className="font-bold text-cyan-600 dark:text-cyan-400">
                  {selectedPaymentMethod === 'instapay' && 'انستا باي (InstaPay)'}
                  {selectedPaymentMethod === 'vodafone_cash' && 'فودافون كاش ومحافظ المحمول'}
                  {selectedPaymentMethod === 'bank_transfer' && 'تحويل بنكي رسمي'}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">موعد التسليم المتوقع:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {createdOrder.deliveryDueDate}
                </span>
              </div>
              <div className="flex justify-between text-xs pt-2 border-t border-slate-200 dark:border-slate-700">
                <span className="font-bold text-slate-900 dark:text-white">المبلغ المدفوع بالكامل:</span>
                <span className="font-black text-cyan-600 dark:text-cyan-400 text-base">
                  {formatCurrencyEGP(createdOrder.pricing.total)}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-black text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 shadow-xl shadow-cyan-500/25 hover:opacity-95 transition"
              >
                متابعة الطلب في لوحة التحكم
              </button>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl font-bold text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                تصفح صناع إعلانات آخرين
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
