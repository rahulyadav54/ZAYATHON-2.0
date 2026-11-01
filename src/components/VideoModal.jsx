import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Video as VideoIcon, AlertCircle } from 'lucide-react';

export default function VideoModal({ video, onClose }) {
  useEffect(() => {
    if (!video) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [video, onClose]);

  if (!video) return null;

  const isYouTube = video.url && (video.url.includes('youtube.com') || video.url.includes('youtu.be'));
  const isDirectVideo = video.url && (video.url.endsWith('.mp4') || video.url.endsWith('.webm'));

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return '';
    try {
      if (url.includes('youtu.be/')) {
        const id = url.split('youtu.be/')[1]?.split('?')[0];
        return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
      }
      const match = url.match(/[?&]v=([^&]+)/);
      if (match) {
        return `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0`;
      }
    } catch {
      // fallback
    }
    return url;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#080811]/90 backdrop-blur-xl"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative max-w-4xl w-full bg-[#171328] border border-[#9B70FF]/30 rounded-2xl overflow-hidden shadow-2xl z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#100D1D]">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[#35D5FF]/10 text-[#35D5FF]">
                <VideoIcon size={16} />
              </span>
              <h4 className="text-base font-bold text-white font-heading truncate max-w-md">
                {video.title}
              </h4>
            </div>

            <button
              onClick={onClose}
              aria-label="Close Video"
              className="p-1.5 rounded-lg text-[#A5A0B5] hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Video Player or Fallback Area */}
          <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
            {isYouTube ? (
              <iframe
                src={getYouTubeEmbedUrl(video.url)}
                title={video.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : isDirectVideo ? (
              <video
                src={video.url}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            ) : (
              // Authentic Event Video Notice when awaiting video upload
              <div className="p-8 text-center max-w-md">
                <div className="w-16 h-16 rounded-full bg-[#9B70FF]/20 text-[#35D5FF] flex items-center justify-center mx-auto mb-4 border border-[#35D5FF]/30">
                  <Play size={28} className="translate-x-0.5" />
                </div>
                <h5 className="text-xl font-bold text-white mb-2 font-heading">
                  Authentic Footage Archive
                </h5>
                <p className="text-sm text-[#A5A0B5] leading-relaxed mb-4">
                  {video.description || "Official footage from ZAYATHON 1.0. To link your YouTube or MP4 video, configure the URL in src/data/memories.js."}
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#35D5FF]">
                  <AlertCircle size={14} />
                  <span>Awaiting official organizer video embed</span>
                </div>
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="p-5 bg-[#100D1D] border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="font-mono text-xs text-[#35D5FF] uppercase tracking-wider block">
                ZAYATHON 1.0 ARCHIVE • {video.category || "HIGHLIGHTS"}
              </span>
              <p className="text-xs text-[#A5A0B5] mt-0.5">
                {video.description}
              </p>
            </div>
            {video.duration && (
              <span className="font-mono text-xs text-[#A5A0B5] bg-white/5 px-2.5 py-1 rounded border border-white/10 shrink-0">
                Duration: {video.duration}
              </span>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

