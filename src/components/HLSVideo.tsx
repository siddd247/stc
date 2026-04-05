import { useEffect, useRef } from "react";

interface HLSVideoProps {
  src: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  poster?: string;
  style?: React.CSSProperties;
}

export const HLSVideo = ({
  src,
  className,
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  poster,
  style,
}: HLSVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<any>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isMounted = true;

    const initHls = async () => {
      try {
        const HlsModule = await import("hls.js");
        const Hls = HlsModule.default;

        if (!isMounted || !video) return;

        if (Hls.isSupported() && src.endsWith('.m3u8')) {
          const hls = new Hls({
            startLevel: -1,
          });
          hlsRef.current = hls;
          hls.loadSource(src);
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            if (autoPlay && video) {
              video.play().catch(() => {});
            }
          });
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
          // Safari fallback
          video.src = src;
          video.addEventListener("loadedmetadata", () => {
            if (autoPlay && video) {
              video.play().catch(() => {});
            }
          });
        } else {
          video.src = src;
          if (autoPlay && video) {
            video.play().catch(() => {});
          }
        }
      } catch (err) {
        console.error("Failed to load Hls.js library", err);
      }
    };

    initHls();

    return () => {
      isMounted = false;
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [src, autoPlay]);

  return (
    <video
      ref={videoRef}
      className={className}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      poster={poster}
      style={style}
    />
  );
};
