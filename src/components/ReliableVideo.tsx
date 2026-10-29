import React, { useEffect, useState } from 'react';
import type { Ref, VideoHTMLAttributes } from 'react';

const DEFAULT_FALLBACK = '/assets/videos/default_reel.mp4';

type ResolvedSource =
  | { kind: 'video'; url: string; mimeType?: string }
  | { kind: 'embed'; url: string }
  | { kind: 'invalid'; url: '' };

function resolveSource(value: string): ResolvedSource {
  const input = value.trim();
  if (!input) return { kind: 'invalid', url: '' };

  const normalized = input.startsWith('//') ? `https:${input}` : input;
  let url: URL;
  try {
    url = new URL(normalized, window.location.origin);
  } catch {
    return { kind: 'invalid', url: '' };
  }

  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    return { kind: 'invalid', url: '' };
  }
  if (url.protocol === 'http:' && url.origin !== window.location.origin) {
    url.protocol = 'https:';
  }

  const host = url.hostname.toLowerCase().replace(/^www\./, '');
  const youtubeId = host === 'youtu.be'
    ? url.pathname.slice(1).split('/')[0]
    : host.endsWith('youtube.com') || host === 'youtube-nocookie.com'
      ? url.pathname.match(/^\/(?:embed|shorts|live)\/([^/?]+)/)?.[1] || url.searchParams.get('v')
      : null;
  if (youtubeId) {
    return {
      kind: 'embed',
      url: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(youtubeId)}?playsinline=1`
    };
  }

  if (host === 'vimeo.com' || host === 'player.vimeo.com') {
    const videoId = url.pathname.match(/(?:video\/)?(\d+)/)?.[1];
    if (videoId) {
      const privateHash = url.searchParams.get('h') || url.pathname.match(/^\/\d+\/([^/]+)/)?.[1];
      return {
        kind: 'embed',
        url: `https://player.vimeo.com/video/${videoId}${privateHash ? `?h=${encodeURIComponent(privateHash)}` : ''}`
      };
    }
  }

  if (host === 'drive.google.com') {
    const fileId = url.pathname.match(/\/file\/d\/([^/]+)/)?.[1] || url.searchParams.get('id');
    if (fileId) {
      return { kind: 'embed', url: `https://drive.google.com/file/d/${encodeURIComponent(fileId)}/preview` };
    }
  }

  if (host === 'dropbox.com') {
    url.hostname = 'dl.dropboxusercontent.com';
    url.searchParams.delete('dl');
    url.searchParams.set('raw', '1');
  }

  const extension = url.pathname.match(/\.([a-z0-9]+)$/i)?.[1]?.toLowerCase();
  const mimeType = extension === 'mp4' ? 'video/mp4'
    : extension === 'webm' ? 'video/webm'
      : extension === 'ogv' || extension === 'ogg' ? 'video/ogg'
        : undefined;
  return { kind: 'video', url: url.href, mimeType };
}

interface ReliableVideoProps extends Omit<VideoHTMLAttributes<HTMLVideoElement>, 'src' | 'poster' | 'onError'> {
  src: string;
  poster?: string;
  fallbackSrc?: string;
  videoRef?: Ref<HTMLVideoElement>;
  containerClassName?: string;
}

export const isEmbeddedVideoUrl = (src: string) => resolveSource(src).kind === 'embed';

export const ReliableVideo: React.FC<ReliableVideoProps> = ({
  src,
  poster,
  fallbackSrc = DEFAULT_FALLBACK,
  videoRef,
  containerClassName = 'relative w-full h-full',
  className,
  controls = true,
  playsInline = true,
  preload = 'metadata',
  ...videoProps
}) => {
  const [attempt, setAttempt] = useState(0);
  const [failed, setFailed] = useState(false);
  const primary = resolveSource(src);
  const fallback = resolveSource(fallbackSrc);

  useEffect(() => {
    setAttempt(0);
    setFailed(false);
  }, [src, fallbackSrc]);

  const useFallback = attempt > 0 || primary.kind === 'invalid';
  const active = useFallback ? fallback : primary;
  const showFailure = failed || active.kind === 'invalid';

  const handleError = () => {
    if (!useFallback && fallback.kind !== 'invalid' && fallback.url !== primary.url) {
      setAttempt(1);
    } else {
      setFailed(true);
    }
  };

  return (
    <div className={containerClassName}>
      {active.kind === 'embed' ? (
        <iframe
          key={active.url}
          src={active.url}
          title="مشغل الفيديو"
          className={className}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          onError={handleError}
        />
      ) : active.kind === 'video' && !showFailure ? (
        <video
          key={active.url}
          ref={videoRef}
          poster={poster}
          controls={controls}
          playsInline={playsInline}
          preload={preload}
          className={className}
          onError={handleError}
          {...videoProps}
        >
          <source src={active.url} type={active.mimeType} />
        </video>
      ) : null}
      {showFailure && (
        <div role="status" className="absolute inset-0 flex flex-col items-center justify-center gap-2 overflow-hidden bg-slate-950/90 p-4 text-center text-sm font-semibold text-white">
          {poster && <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" onError={e => { e.currentTarget.hidden = true; }} />}
          <div className="relative flex flex-col items-center gap-2">
            <span>تعذر تشغيل الفيديو. تحقق من الرابط وحاول مرة أخرى.</span>
            <button
              type="button"
              className="underline underline-offset-4"
              onClick={() => {
                setAttempt(0);
                setFailed(false);
              }}
            >
              إعادة المحاولة
            </button>
          </div>
        </div>
      )}
    </div>
  );
};