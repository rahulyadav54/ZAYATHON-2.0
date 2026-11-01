import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, Tag, Calendar } from 'lucide-react';

export default function MediaLightbox({ item, onClose, onPrev, onNext, hasPrev, hasNext }) {
  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext) onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose, onPrev, onNext, hasPrev, hasNext]);

  if (!item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#080811]/95 backdrop-blur-2xl"
        />

        {/* Content Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative max-w-5xl w-full bg-[#171328] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col z-10"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#100D1D]/90">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs px-2.5 py-1 rounded bg-[#9B70FF]/20 text-[#35D5FF] border border-[#9B70FF]/30 font-semibold uppercase">
                {item.category}
              </span>
              <span className="font-mono text-xs text-[#A5A0B5] hidden sm:inline-flex items-center gap-1">
                <Calendar size={13} />
                EDITION 1.0 ARCHIVE
              </span>
            </div>

            <button
              onClick={onClose}
              aria-label="Close Lightbox"
              className="p-1.5 rounded-lg text-[#A5A0B5] hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Main Image Viewer */}
          <div className="relative flex-1 bg-[#080811] flex items-center justify-center p-4 sm:p-8 min-h-[300px] sm:min-h-[460px]">
            <img
              src={item.image}
              alt={item.alt || item.title}
              className="max-h-[65vh] w-auto max-w-full object-contain rounded-lg shadow-lg"
            />

            {/* Navigation Arrows */}
            {hasPrev && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPrev();
                }}
                aria-label="Previous Image"
                className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#171328]/80 hover:bg-[#743BFF] text-white border border-white/10 transition-all shadow-lg active:scale-95"
              >
                <ChevronLeft size={22} />
              </button>
            )}

            {hasNext && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
                aria-label="Next Image"
                className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#171328]/80 hover:bg-[#743BFF] text-white border border-white/10 transition-all shadow-lg active:scale-95"
              >
                <ChevronRight size={22} />
              </button>
            )}
          </div>

          {/* Bottom Caption Bar */}
          <div className="px-6 py-4 bg-[#100D1D] border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white font-heading">
                {item.title}
              </h4>
              {item.caption && (
                <p className="text-xs sm:text-sm text-[#A5A0B5] mt-0.5">
                  {item.caption}
                </p>
              )}
            </div>
            <div className="font-mono text-[11px] text-[#A5A0B5] self-start sm:self-auto flex items-center gap-1.5">
              <span>Use keyboard ◀ ▶ to navigate</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

