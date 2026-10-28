import React, { useRef, useState } from 'react';
import { 
  Play, 
  Pause,
  Volume2,
  VolumeX,
  Sparkles, 
  CheckCircle2, 
  ArrowLeft, 
  ShieldCheck, 
  TrendingUp, 
  Zap, 
  Smartphone, 
  Building2, 
  Star,
  Film
} from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onOpenCreatorAuth: () => void;
  onSelectCategory: (cat: string) => void;
  selectedCategory: string;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onOpenCreatorAuth,
  onSelectCategory,
  selectedCategory
}) => {
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!heroVideoRef.current) return;
    if (isPlaying) {
      heroVideoRef.current.pause();
      setIsPlaying(false);
    } else {
      heroVideoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!heroVideoRef.current) return;
    heroVideoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-cyan-400/20 dark:bg-cyan-500/15 rounded-full blur-3xl animate-glow-pulse pointer-events-none"></div>
      <div className="absolute top-1/3 left-10 -z-10 w-[500px] h-[500px] bg-gradient-to-tr from-blue-600/15 via-indigo-600/20 to-violet-600/15 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#06b6d40a_1px,transparent_1px),linear-gradient(to_bottom,#06b6d40a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left / Primary Text Column */}
          <div className="lg:col-span-7 text-right space-y-6">
            
            {/* Live Status Badge with Brand Icon */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800/80 shadow-sm text-cyan-800 dark:text-cyan-300 text-xs sm:text-sm font-bold animate-bounce-slight">
              <img src="/logo.png" alt="أيقونة موقع reel store" className="w-5 h-5 object-contain rounded-lg ring-1 ring-cyan-400 shadow-xs" />
              <span>المنصة الأولى لتأجير وصناعة الفيديوهات الإعلانية بمقابل مادي</span>
              <Sparkles className="w-4 h-4 text-cyan-500 ml-1" />
            </div>

            {/* Main Punchy Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.25] text-slate-900 dark:text-white">
              استأجر أفضل صناع{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600">
                  الفيديوهات والإعلانات
                </span>
                <span className="absolute bottom-2 left-0 right-0 h-3 bg-cyan-200/50 dark:bg-cyan-900/40 -z-0 rounded-full transform -rotate-1"></span>
              </span>
              <br />
              وحوّل مبيعاتك لأرقام قياسية!
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              منصة <strong className="text-cyan-600 dark:text-cyan-400 font-bold">reel store</strong> تمنحك إمكانية توظيف محترفي إعلانات UGC، موشن جرافيك، وإعلانات 3D السينمائية لتسجيل إعلانات منتجك بأعلى جودة مع ضمان حقوقك ودفع آمن عبر{' '}
              <span className="inline-flex items-center gap-1 font-bold text-slate-900 dark:text-white underline decoration-cyan-400 decoration-2">
                انستا باي
              </span>
              ،{' '}
              <span className="inline-flex items-center gap-1 font-bold text-slate-900 dark:text-white underline decoration-rose-500 decoration-2">
                فودافون كاش
              </span>
              ، و{' '}
              <span className="inline-flex items-center gap-1 font-bold text-slate-900 dark:text-white underline decoration-blue-600 decoration-2">
                التحويل البنكي
              </span>
              .
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="group relative px-7 py-4 rounded-2xl font-black text-white shadow-xl shadow-cyan-500/25 overflow-hidden transition-all duration-300 hover:shadow-cyan-500/40 hover:-translate-y-1 active:translate-y-0"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 group-hover:scale-105 transition-transform duration-300"></div>
                <div className="relative flex items-center gap-2.5 text-base">
                  <span>تصفح صناع الفيديوهات الآن</span>
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
                </div>
              </button>

              <button
                onClick={onOpenCreatorAuth}
                className="px-6 py-4 rounded-2xl font-bold text-slate-800 dark:text-slate-100 bg-white/90 dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700/80 hover:border-cyan-400 dark:hover:border-cyan-400 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-md transition-all duration-200 flex items-center gap-2"
              >
                <span>اكسب المال كصانع إعلانات</span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                  أرباح سريعة
                </span>
              </button>
            </div>

            {/* Payment Trust Badges */}
            <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-700 dark:text-slate-300">طرق الدفع المعتمدة:</span>
              <div className="flex items-center gap-1.5 font-bold text-purple-600 dark:text-purple-400">
                <Zap className="w-4 h-4" />
                <span>InstaPay (انستا باي)</span>
              </div>
              <div className="flex items-center gap-1.5 font-bold text-rose-600 dark:text-rose-400">
                <Smartphone className="w-4 h-4" />
                <span>فودافون كاش ومحافظ المحمول</span>
              </div>
              <div className="flex items-center gap-1.5 font-bold text-blue-600 dark:text-blue-400">
                <Building2 className="w-4 h-4" />
                <span>حساب بنكي CIB والأهلي</span>
              </div>
            </div>

            {/* Key Guarantees */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-cyan-50/60 dark:bg-cyan-950/30 border border-cyan-100 dark:border-cyan-900/40">
                <ShieldCheck className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                  ضمان استرداد الأموال
                </span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40">
                <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                  تسليم سريع 24-48 ساعة
                </span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-violet-50/60 dark:bg-violet-950/30 border border-violet-100 dark:border-violet-900/40">
                <Star className="w-5 h-5 text-violet-600 dark:text-violet-400 shrink-0" />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                  صناع معتمدون 100%
                </span>
              </div>
            </div>

          </div>

          {/* Right / Visual Interactive Showcase Column featuring the attached Luxury 3D Perfume Ad Video */}
          <div className="lg:col-span-5 relative">
            
            {/* Glowing Backdrop Frame */}
            <div className="relative mx-auto max-w-[340px] sm:max-w-[380px]">
              
              {/* Animated ambient glow ring */}
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 rounded-[2.5rem] opacity-35 dark:opacity-50 blur-xl animate-pulse"></div>
              
              {/* Main Phone-style Reel Card with Embedded Live Video */}
              <div 
                onClick={togglePlay}
                className="relative rounded-[2.2rem] bg-slate-950 border-4 border-slate-800/90 shadow-2xl overflow-hidden aspect-[9/16] cursor-pointer group"
              >
                
                <video
                  ref={heroVideoRef}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  onError={(e) => {
                    const el = e.currentTarget;
                    if (el.src !== '/assets/videos/aromatic_perfume_ad.mp4') {
                      el.src = '/assets/videos/aromatic_perfume_ad.mp4';
                      el.load();
                      el.play().catch(() => {});
                    }
                  }}
                  className="w-full h-full object-cover"
                >
                  <source src="/assets/videos/aromatic_perfume_ad.mp4" type="video/mp4" />
                  <source src="/assets/aistudio/_____________________________________________________2a7706a7.mp4" type="video/mp4" />
                </video>
                
                {/* Subtle Gradient Overlays for readable text */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/50 pointer-events-none"></div>

                {/* Top Reel Header Bar with Brand Icon & Audio toggle */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white z-20">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs">
                    <img src="/logo.png" alt="reel store icon" className="w-4 h-4 object-contain rounded" />
                    <span className="font-bold">إعلان ريلز نشط 3D</span>
                  </div>
                  
                  {/* Sound Toggle Button */}
                  <button
                    onClick={toggleMute}
                    aria-label={isMuted ? 'تشغيل الصوت' : 'كتم الصوت'}
                    className="p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 hover:bg-black/80 text-white transition transform hover:scale-110"
                    title={isMuted ? 'تشغيل الصوت' : 'كتم الصوت'}
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4 text-cyan-300" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
                    )}
                  </button>
                </div>

                {/* Pause/Play indicator overlay when paused */}
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-10">
                    <div className="w-16 h-16 rounded-full bg-cyan-500/90 text-slate-950 flex items-center justify-center shadow-2xl transform scale-110">
                      <Play className="w-8 h-8 fill-slate-950 translate-x-0.5" />
                    </div>
                  </div>
                )}

                {/* Floating Creator Profile Badge */}
                <div className="absolute top-1/4 right-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-cyan-300 dark:border-cyan-500/30 text-right transform translate-y-3 animate-float max-w-[210px] z-20 pointer-events-none">
                  <div className="flex items-center gap-1.5 text-amber-500 text-xs font-bold mb-1">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    <span>4.97 (110 إعلان ناجح)</span>
                  </div>
                  <div className="text-xs font-bold text-slate-800 dark:text-white">
                    يوسف العطار (3D & Visuals)
                  </div>
                  <div className="text-[10px] text-cyan-600 dark:text-cyan-400 font-semibold">
                    تصميم CGI وعطور سينمائية فاخرة
                  </div>
                </div>

                {/* Floating Payment Notification Bubble */}
                <div className="absolute bottom-32 left-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl p-2.5 shadow-xl border border-emerald-300 dark:border-emerald-500/40 text-right max-w-[210px] z-20 pointer-events-none">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold">
                      ✓
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-slate-800 dark:text-white">
                        تم تحويل المقابل المالي
                      </div>
                      <div className="text-[9px] text-emerald-600 dark:text-emerald-400 font-semibold">
                        عبر انستا باي (InstaPay) بأمان
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Reel Caption & Call to Action */}
                <div className="absolute bottom-4 left-4 right-4 text-right z-20 text-white pointer-events-auto">
                  <div className="font-black text-sm text-white mb-1 drop-shadow flex items-center gap-1.5">
                    <Film className="w-4 h-4 text-cyan-400" />
                    <span>إعلان عطور أروماتك الفاخرة (Moon & Opal)</span>
                  </div>
                  <p className="text-[11px] text-slate-300 line-clamp-2 mb-2 leading-relaxed">
                    "نموذج إعلان سينمائي 3D بمحاكاة السوائل والماء حقق انتشاراً وتفاعلاً كبيراً على السوشيال ميديا!"
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-white/20">
                    <span className="text-xs font-bold text-cyan-300">
                      تبدأ أسعار الـ 3D من 1,800 ج.م
                    </span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onExploreClick();
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs transition shadow-md"
                    >
                      طلب مثل هذا الإعلان
                    </button>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Quick Filter Categories Bar */}
        <div className="mt-14 pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h3 className="text-sm font-black text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-500" />
              اختر نوع الفيديو أو الإعلان المطلوب:
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              جميع الفيديوهات تُنتج بمقابل مادي معتمد وحقوق استخدام تجاري كاملة
            </span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {[
              { id: 'all', label: 'جميع أنواع الإعلانات ✨' },
              { id: 'animation_3d', label: 'إعلانات 3D وسينمائية فاخرة 🚀' },
              { id: 'ugc', label: 'إعلانات UGC وريلز تيك توك 📱' },
              { id: 'ecommerce', label: 'إعلانات منتجات ومتاجر إلكترونية 🛍️' },
              { id: 'motion', label: 'موشن جرافيك وأنيميشن 2D 🎨' },
              { id: 'spokesperson', label: 'مقدم إعلانات وممثل أمام الكاميرا 🎙️' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 border ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-transparent shadow-md shadow-cyan-500/20 scale-105'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-cyan-300 dark:hover:border-cyan-700 hover:bg-cyan-50/50 dark:hover:bg-cyan-950/30'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
