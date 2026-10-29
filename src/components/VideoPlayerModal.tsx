import React, { useRef, useState, useEffect } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Heart, 
  Share2, 
  Eye, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { CreatorProfile, SampleVideo } from '../types';
import { isEmbeddedVideoUrl, ReliableVideo } from './ReliableVideo';

interface VideoPlayerModalProps {
  video: SampleVideo | null;
  creator: CreatorProfile | null;
  onClose: () => void;
  onOrderFromCreator: (creator: CreatorProfile) => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  video,
  creator,
  onClose,
  onOrderFromCreator
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      const player = videoRef.current;
      player.currentTime = 0;
      setIsPlaying(false);
      player.play().then(() => setIsPlaying(true)).catch(() => {
        // Autoplay policy fallback with muted
        player.muted = true;
        setIsMuted(true);
        player.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      });
    }
  }, [video]);

  if (!video || !creator) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || video.duration);
    }
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const isEmbeddedVideo = isEmbeddedVideoUrl(video.videoUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Container */}
      <div className="relative w-full max-w-4xl h-[92vh] max-h-[760px] bg-slate-900 rounded-3xl border border-cyan-500/30 shadow-2xl flex flex-col md:flex-row overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="إغلاق المعاينة"
          className="absolute top-4 left-4 z-30 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition hover:scale-105"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video Player Column (9:16 Aspect ratio container) */}
        <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden">
          
          <ReliableVideo
            videoRef={videoRef}
            src={video.videoUrl}
            poster={video.thumbnail}
            fallbackSrc="/assets/videos/aromatic_perfume_ad.mp4"
            containerClassName="absolute inset-0"
            controls={false}
            loop
            onTimeUpdate={handleTimeUpdate}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onClick={isEmbeddedVideo ? undefined : togglePlay}
            className="w-full h-full object-contain cursor-pointer"
          />

          {/* Click to Play Overlay when paused */}
          {!isEmbeddedVideo && !isPlaying && (
            <div 
              onClick={togglePlay}
              className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full bg-cyan-500/90 text-slate-950 flex items-center justify-center shadow-2xl transform scale-110">
                <Play className="w-8 h-8 fill-slate-950 translate-x-0.5" />
              </div>
            </div>
          )}

          {/* Player Controls Bar on Bottom */}
          {!isEmbeddedVideo && <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col gap-2">
            
            {/* Progress line */}
            <div className="w-full h-1.5 bg-white/30 rounded-full overflow-hidden cursor-pointer"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const newPercent = clickX / rect.width;
                if (videoRef.current) {
                  videoRef.current.currentTime = newPercent * (videoRef.current.duration || video.duration);
                }
              }}
            >
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-100"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between text-white text-xs">
              <div className="flex items-center gap-3">
                <button onClick={togglePlay} className="hover:text-cyan-400 transition">
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button onClick={toggleMute} className="hover:text-cyan-400 transition">
                  {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <span className="font-mono text-[11px] text-slate-300">
                  {Math.floor(currentTime)}s / {Math.floor(duration || video.duration)}s
                </span>
              </div>

              {/* Sound wave visualizer animation */}
              {isPlaying && !isMuted && (
                <div className="flex items-end gap-0.5 h-3">
                  <span className="w-1 bg-cyan-400 rounded-full animate-pulse h-3"></span>
                  <span className="w-1 bg-blue-500 rounded-full animate-bounce h-2"></span>
                  <span className="w-1 bg-cyan-300 rounded-full animate-pulse h-3.5"></span>
                  <span className="w-1 bg-indigo-400 rounded-full animate-bounce h-2.5"></span>
                </div>
              )}
            </div>

          </div>}

        </div>

        {/* Info & Creator Column */}
        <div className="w-full md:w-80 lg:w-96 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between text-right border-t md:border-t-0 md:border-r border-slate-200 dark:border-slate-800">
          
          <div className="space-y-4">
            
            {/* Reel Title & Tags */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-cyan-50 dark:bg-cyan-950/70 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800">
                  {video.category.toUpperCase()}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  {video.views} مشاهدة
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white leading-snug">
                {video.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                {video.description}
              </p>
            </div>

            {/* Tags list */}
            <div className="flex flex-wrap gap-1.5">
              {video.tags.map((tag, i) => (
                <span 
                  key={i}
                  className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Creator Profile Box */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-3">
              <div className="flex items-center gap-3">
                <img 
                  src={creator.avatar} 
                  alt={creator.name} 
                  className="w-12 h-12 rounded-2xl object-cover ring-2 ring-cyan-500" 
                />
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {creator.name}
                    </span>
                    {creator.verified && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500" />}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {creator.roleTitle}
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-600 dark:text-slate-300">
                ⭐ <strong className="text-slate-900 dark:text-white">{creator.rating}</strong> ({creator.completedProjects} إعلان مكتمل بنجاح)
              </div>

              <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <span>⚡ تسليم خلال {creator.turnaroundHours} ساعة</span>
              </div>
            </div>

            {/* Social like simulator */}
            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={() => setLiked(!liked)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                  liked 
                    ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-500 border-rose-300 dark:border-rose-800'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                <Heart className={`w-4 h-4 ${liked ? 'fill-rose-500' : ''}`} />
                <span>{liked ? 'أعجبني الإعلان' : `${video.likes}`}</span>
              </button>
              <div className="text-xs text-slate-400">
                نموذج إعلان حقيقي من أعمال الصانع
              </div>
            </div>

          </div>

          {/* Primary Call to Action */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={() => {
                onClose();
                onOrderFromCreator(creator);
              }}
              className="w-full py-3.5 rounded-2xl font-black text-white text-sm bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:opacity-95 active:scale-98 transition flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>اطلب فيديو إعلاني من {creator.name}</span>
            </button>
            <p className="text-[11px] text-center text-slate-400 mt-2">
              دفع آمن مع إمكانية التعديل وضمان استرداد كامل للمبلغ
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
