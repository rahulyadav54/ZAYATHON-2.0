import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles, Film, Image as ImageIcon, History, Info } from 'lucide-react';
import { featuredMedia } from '../data/memories';
import PhotoGallery from './PhotoGallery';
import VideoGallery from './VideoGallery';
import VideoModal from './VideoModal';

export default function Memories() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <section id="memories" className="py-24 relative overflow-hidden bg-[#0a0815]">
      {/* Background glow and subtle cyberpunk divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#9B70FF]/40 to-transparent" />
      <div className="absolute bottom-1/3 -right-24 w-96 h-96 bg-[#35D5FF]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#171328] border border-[#9B70FF]/30 text-[#9B70FF] font-mono text-xs uppercase tracking-widest mb-4">
            <History size={14} className="text-[#35D5FF]" />
            <span>FLASHBACK / EDITION 01</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight font-heading leading-tight mb-6">
            ONE HACKATHON.<br />
            <span className="bg-gradient-to-r from-[#35D5FF] via-[#9B70FF] to-[#743BFF] bg-clip-text text-transparent">
              COUNTLESS MEMORIES.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#A5A0B5] leading-relaxed">
            Before we build the future, let's revisit the moments that brought us here. Explore the energy, creativity, teamwork, and unforgettable experiences of ZAYATHON 1.0.
          </p>
        </div>

        {/* Part A: Featured Event Video / Showcase Area */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#171328] via-[#100D1D] to-[#080811] border border-[#9B70FF]/30 shadow-2xl p-6 sm:p-10 lg:p-12">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Text Info */}
              <div className="lg:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#35D5FF] font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#35D5FF] animate-ping" />
                  <span>{featuredMedia.subtitle}</span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-heading leading-tight">
                  {featuredMedia.title}
                </h3>

                <p className="text-sm sm:text-base text-[#A5A0B5] leading-relaxed">
                  {featuredMedia.description}
                </p>

                {/* Quick stats pills */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  {featuredMedia.stats?.map((st) => (
                    <div key={st.label} className="p-3 rounded-xl bg-[#080811]/60 border border-white/5 text-center">
                      <div className="font-heading font-black text-lg text-white">
                        {st.value}
                      </div>
                      <div className="font-mono text-[10px] text-[#A5A0B5] uppercase">
                        {st.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setIsVideoModalOpen(true)}
                    className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#743BFF] via-[#9B70FF] to-[#35D5FF] shadow-lg shadow-[#743BFF]/30 hover:opacity-95 transition-all active:scale-95"
                  >
                    <Play size={16} className="fill-white" />
                    <span>Watch Highlight Reel</span>
                  </button>
                </div>
              </div>

              {/* Large Cinematic Video Thumbnail */}
              <div
                onClick={() => setIsVideoModalOpen(true)}
                className="lg:col-span-7 relative group cursor-pointer aspect-video rounded-2xl overflow-hidden bg-black/60 border border-white/10 shadow-2xl"
              >
                <img
                  src={featuredMedia.thumbnail}
                  alt={featuredMedia.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
                />
                
                <div className="absolute inset-0 bg-[#080811]/30 group-hover:bg-[#080811]/10 transition-colors" />

                {/* Big Center Glowing Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-[#35D5FF] via-[#9B70FF] to-[#743BFF] rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity" />
                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-r from-[#743BFF] to-[#35D5FF] text-white flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                      <Play size={32} className="translate-x-1 fill-white" />
                    </div>
                  </div>
                </div>

                {/* Floating Bottom Badge */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white/90 bg-[#080811]/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                  <span className="flex items-center gap-2">
                    <Film size={14} className="text-[#35D5FF]" />
                    <span>ZAYATHON 1.0 CINEMATIC VAULT</span>
                  </span>
                  <span className="text-[#9B70FF]">Click to Play</span>
                </div>
              </div>

            </div>

          </div>
        </motion.div>

        {/* Part B: Editorial Photo Gallery */}
        <div className="mb-20">
          <div className="flex items-center gap-2 mb-6">
            <ImageIcon size={20} className="text-[#9B70FF]" />
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white uppercase tracking-tight">
              AUTHENTIC PHOTO ARCHIVE
            </h3>
          </div>
          <PhotoGallery />
        </div>

        {/* Part C: Video Gallery */}
        <div className="mb-12">
          <VideoGallery />
        </div>

        {/* Notice on Organizer Media Drop & Customization */}
        <div className="p-4 rounded-xl bg-[#171328]/50 border border-white/[0.08] flex items-center gap-3 text-xs text-[#A5A0B5]">
          <Info size={18} className="text-[#35D5FF] shrink-0" />
          <p>
            <strong className="text-white">Organizer Archive Vault:</strong> Photos and videos from ZAYATHON 1.0 are loaded from <code className="font-mono text-[#35D5FF]">public/images/zayathon-1/</code> and mapped directly in <code className="font-mono text-[#35D5FF]">src/data/memories.js</code>. Real event media files can be dropped right into their category folders.
          </p>
        </div>

      </div>

      {/* Featured Video Modal */}
      <VideoModal
        video={isVideoModalOpen ? {
          title: featuredMedia.title,
          description: featuredMedia.description,
          url: featuredMedia.videoUrl,
          category: "Featured Reel",
          duration: "Full Aftermovie"
        } : null}
        onClose={() => setIsVideoModalOpen(false)}
      />
    </section>
  );
}

