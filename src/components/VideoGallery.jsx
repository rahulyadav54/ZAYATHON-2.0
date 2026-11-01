import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Film, Clock } from 'lucide-react';
import { videos } from '../data/memories';
import VideoModal from './VideoModal';

export default function VideoGallery() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <Film size={18} className="text-[#35D5FF]" />
          <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white uppercase tracking-tight">
            WATCH THE MOMENTS AGAIN
          </h3>
        </div>
        <span className="font-mono text-xs text-[#A5A0B5]">
          {videos.length} Archive Recordings
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {videos.map((vid, idx) => (
          <motion.div
            key={vid.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => setSelectedVideo(vid)}
            className="group cursor-pointer rounded-2xl bg-[#171328] border border-white/10 hover:border-[#9B70FF]/50 overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-lg"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video w-full bg-[#100D1D] overflow-hidden">
              <img
                src={vid.thumbnail}
                alt={vid.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#080811]/40 group-hover:bg-[#080811]/20 transition-colors" />

              {/* Play Badge */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#743BFF] to-[#35D5FF] text-white flex items-center justify-center shadow-glow-sm transform group-hover:scale-110 transition-transform">
                  <Play size={20} className="translate-x-0.5 fill-white" />
                </div>
              </div>

              {/* Duration badge */}
              {vid.duration && (
                <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[11px] font-mono text-white flex items-center gap-1">
                  <Clock size={11} />
                  <span>{vid.duration}</span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-4 sm:p-5">
              <div className="font-mono text-[10px] uppercase tracking-wider text-[#35D5FF] mb-1 font-semibold">
                {vid.category || "EDITION 1.0"}
              </div>
              <h4 className="text-base font-bold text-white font-heading group-hover:text-[#9B70FF] transition-colors line-clamp-1 mb-1.5">
                {vid.title}
              </h4>
              <p className="text-xs text-[#A5A0B5] line-clamp-2 leading-relaxed">
                {vid.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Video Modal Player */}
      <VideoModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </div>
  );
}

