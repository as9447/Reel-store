import React from 'react';
import { 
  Star, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Play, 
  Video, 
  Sparkles,
  Zap
} from 'lucide-react';
import { CreatorProfile, SampleVideo } from '../types';
import { formatCurrencyEGP } from '../utils/pricing';

interface CreatorCardProps {
  creator: CreatorProfile;
  onSelectCreator: (creator: CreatorProfile) => void;
  onPlayVideo: (video: SampleVideo, creator: CreatorProfile) => void;
}

export const CreatorCard: React.FC<CreatorCardProps> = ({
  creator,
  onSelectCreator,
  onPlayVideo
}) => {
  const primaryVideo = creator.sampleVideos[0];

  return (
    <div className="group relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-400 dark:hover:border-cyan-500 shadow-sm hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* Top Media / Reel Preview Header */}
      <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden cursor-pointer"
        onClick={() => primaryVideo && onPlayVideo(primaryVideo, creator)}
      >
        <img 
          src={primaryVideo?.thumbnail || creator.avatar} 
          alt={creator.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

        {/* Hover / Active Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-cyan-500/90 group-hover:bg-cyan-400 text-slate-950 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition duration-200">
            <Play className="w-6 h-6 fill-slate-950 translate-x-0.5" />
          </div>
        </div>

        {/* Badges on preview */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-900/80 backdrop-blur-md text-cyan-300 border border-cyan-500/40">
            {creator.categoryLabel}
          </span>
        </div>

        <div className="absolute top-3 left-3">
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500 text-slate-950 shadow-md">
            <Star className="w-3.5 h-3.5 fill-slate-950" />
            <span>{creator.rating}</span>
            <span className="text-[10px] opacity-80">({creator.reviewCount})</span>
          </span>
        </div>

        {/* Bottom preview info */}
        <div className="absolute bottom-2.5 right-3 left-3 flex items-center justify-between text-white text-xs">
          <span className="font-semibold truncate max-w-[200px] text-slate-200">
            {primaryVideo?.title || 'معاينة إعلان احترافي'}
          </span>
          <span className="px-2 py-0.5 rounded bg-black/60 text-[10px] text-cyan-400 font-mono">
            {primaryVideo?.duration ? `${primaryVideo.duration} ثانية` : 'ريلز 9:16'}
          </span>
        </div>
      </div>

      {/* Main Creator Details */}
      <div className="p-5 flex-1 flex flex-col justify-between text-right space-y-4">
        
        {/* Author row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src={creator.avatar} 
                alt={creator.name} 
                className="w-12 h-12 rounded-2xl object-cover ring-2 ring-cyan-400/50"
              />
              {creator.verified && (
                <div className="absolute -bottom-1 -left-1 p-0.5 rounded-full bg-cyan-500 text-white shadow-sm" title="صانع معتمد وموثق">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="font-bold text-base text-slate-900 dark:text-white">
                  {creator.name}
                </h4>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {creator.roleTitle}
              </p>
            </div>
          </div>

          <div className="text-left shrink-0">
            <div className="text-[10px] text-slate-400 font-medium">يبدأ من</div>
            <div className="text-base font-black text-transparent bg-clip-text bg-gradient-to-l from-cyan-500 to-blue-600">
              {formatCurrencyEGP(creator.startingPrice)}
            </div>
          </div>
        </div>

        {/* Bio quote */}
        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
          {creator.bio}
        </p>

        {/* Gear & Highlights */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {creator.gear.slice(0, 3).map((item, idx) => (
            <span 
              key={idx}
              className="text-[11px] px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium"
            >
              {item}
            </span>
          ))}
          {creator.turnaroundHours <= 24 && (
            <span className="text-[11px] px-2 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold flex items-center gap-1 border border-emerald-200 dark:border-emerald-800">
              <Zap className="w-3 h-3 text-emerald-500" />
              تسليم خلال 24 ساعة
            </span>
          )}
        </div>

        {/* Action Buttons footer */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
          <button
            onClick={() => onSelectCreator(creator)}
            className="flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:opacity-95 shadow-md shadow-cyan-500/20 active:scale-98 transition flex items-center justify-center gap-1.5"
          >
            <Video className="w-4 h-4" />
            <span>طلب فيديو إعلاني</span>
          </button>

          <button
            onClick={() => primaryVideo && onPlayVideo(primaryVideo, creator)}
            title="مشاهدة نموذج الإعلان"
            className="px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-cyan-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition flex items-center gap-1"
          >
            <Play className="w-3.5 h-3.5 text-cyan-500" />
            <span>المعاينة</span>
          </button>
        </div>

      </div>

    </div>
  );
};
