import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Terminal, Flame, Compass } from 'lucide-react';
import ThreeDScene from './ThreeDScene';
import Countdown from './Countdown';
import { eventConfig } from '../config/eventConfig';

export default function Hero({ onRegisterClick }) {
  const handleExploreClick = () => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-[90vh] pt-6 pb-20 overflow-hidden">
      {/* Background Ambient Lighting and Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1f1a38_1px,transparent_1px)] [background-size:32px_32px] opacity-25 pointer-events-none" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#743BFF]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-[#35D5FF]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center pt-4 lg:pt-8">
          
          {/* Left Column: Premium Futuristic Typography & CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
            {/* Super Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#171328]/90 border border-[#9B70FF]/30 backdrop-blur-md shadow-sm"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#35D5FF] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#35D5FF]" />
              </span>
              <span className="font-mono text-[11px] font-semibold text-[#35D5FF] tracking-wider uppercase">
                INNOVATION • COLLABORATION • IMPACT
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-2"
            >
              <h1 className="font-heading font-black tracking-tight text-white text-5xl sm:text-7xl lg:text-8xl leading-[0.92]">
                ZAYATHON{' '}
                <span className="bg-gradient-to-r from-[#35D5FF] via-[#9B70FF] to-[#743BFF] bg-clip-text text-transparent">
                  2.0
                </span>
              </h1>
              <div className="font-heading font-bold text-2xl sm:text-4xl lg:text-5xl tracking-tight text-white/95 uppercase pt-2">
                {eventConfig.mainTagline}
              </div>
            </motion.div>

            {/* Supporting Tagline & Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#A5A0B5] text-base sm:text-lg max-w-xl leading-relaxed font-normal"
            >
              {eventConfig.heroDescription}
            </motion.p>

            {/* Micro Details Badge Strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex flex-wrap items-center gap-3 pt-1 text-xs font-mono text-[#A5A0B5]"
            >
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#100D1D] border border-white/10">
                <Flame size={14} className="text-[#9B70FF]" />
                <span>{eventConfig.edition}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#100D1D] border border-white/10">
                <Terminal size={14} className="text-[#35D5FF]" />
                <span>Organized by {eventConfig.organizer}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#100D1D] border border-white/10">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>{eventConfig.locationBadge}</span>
              </div>
            </motion.div>

            {/* Primary & Secondary Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <button
                onClick={onRegisterClick}
                className="group relative inline-flex items-center justify-center p-0.5 overflow-hidden rounded-xl font-heading font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-glow-purple active:scale-95"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#743BFF] via-[#9B70FF] to-[#35D5FF] transition-all" />
                <span className="relative w-full px-8 py-3.5 transition-all ease-out bg-[#080811] rounded-[10px] group-hover:bg-opacity-0 text-white flex items-center justify-center gap-2.5">
                  <Sparkles size={16} className="text-[#35D5FF] group-hover:rotate-12 transition-transform" />
                  <span>REGISTER NOW</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              <button
                onClick={handleExploreClick}
                className="px-7 py-3.5 rounded-xl font-heading font-semibold text-sm tracking-wider uppercase text-white/90 bg-[#171328]/80 hover:bg-[#171328] hover:text-white border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2 backdrop-blur-md active:scale-95"
              >
                <Compass size={16} className="text-[#9B70FF]" />
                <span>EXPLORE THE EVENT</span>
              </button>
            </motion.div>
          </div>

          {/* Right Column: 3D Interactive Centerpiece */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            <ThreeDScene />
          </motion.div>
        </div>

        {/* Live Countdown Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-14 sm:mt-20"
        >
          <Countdown />
        </motion.div>
      </div>
    </section>
  );
}

