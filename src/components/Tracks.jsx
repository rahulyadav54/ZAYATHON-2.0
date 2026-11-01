import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Code2, Lightbulb, ShieldCheck, ArrowUpRight, Sparkles } from 'lucide-react';
import { tracks } from '../data/tracks';

const iconMap = {
  BrainCircuit,
  Code2,
  Lightbulb,
  ShieldCheck
};

export default function Tracks({ onRegisterClick }) {
  return (
    <section id="tracks" className="py-24 relative overflow-hidden bg-[#080811]">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#743BFF]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#171328] border border-white/10 text-[#35D5FF] font-mono text-xs uppercase tracking-widest mb-4">
            <Sparkles size={14} className="text-[#9B70FF]" />
            <span>COMPETITION ARENAS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight font-heading leading-tight mb-6">
            CHOOSE YOUR TRACK.<br />
            <span className="bg-gradient-to-r from-[#35D5FF] via-[#9B70FF] to-[#743BFF] bg-clip-text text-transparent">
              BUILD THE FUTURE.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#A5A0B5] leading-relaxed">
            Four specialized technical tracks designed to test your architectural vision, problem-solving depth, and execution speed.
          </p>
        </div>

        {/* 4 Tracks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-14">
          {tracks.map((track, idx) => {
            const Icon = iconMap[track.icon] || Code2;
            return (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative p-8 sm:p-10 rounded-3xl bg-[#171328]/90 border border-white/10 hover:border-[#9B70FF]/60 transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-glow-purple overflow-hidden flex flex-col justify-between"
              >
                {/* Accent ambient corner glow */}
                <div className={`absolute -right-16 -top-16 w-48 h-48 bg-gradient-to-br ${track.accent} rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none`} />

                <div>
                  {/* Top Bar with Track Tag & Arrow */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${track.accent} p-[1px]`}>
                        <div className="w-full h-full bg-[#100D1D] rounded-[15px] flex items-center justify-center text-white">
                          <Icon size={22} className="text-[#35D5FF]" />
                        </div>
                      </div>
                      <span className="font-mono text-xs font-bold tracking-widest text-[#35D5FF] px-2.5 py-1 rounded bg-[#35D5FF]/10 border border-[#35D5FF]/20">
                        {track.tag}
                      </span>
                    </div>

                    <div className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-[#743BFF] text-[#A5A0B5] group-hover:text-white flex items-center justify-center transition-all group-hover:rotate-45">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading mb-3 group-hover:text-[#35D5FF] transition-colors">
                    {track.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#A5A0B5] leading-relaxed mb-6 font-normal">
                    {track.description}
                  </p>
                </div>

                {/* Tech Pills */}
                <div className="pt-4 border-t border-white/[0.08] flex flex-wrap gap-2">
                  {track.technologies?.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-[#100D1D] border border-white/5 font-mono text-[11px] text-[#A5A0B5]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="text-center">
          <p className="text-sm text-[#A5A0B5] mb-4">
            Have a project idea that spans multiple domains or doesn't fit neatly into one box?
          </p>
          <button
            onClick={onRegisterClick}
            className="inline-flex items-center gap-2 font-heading font-bold text-xs uppercase tracking-wider text-[#35D5FF] hover:text-white px-5 py-2.5 rounded-xl bg-white/5 hover:bg-[#743BFF]/20 border border-white/10 hover:border-[#35D5FF]/40 transition-all"
          >
            <span>Pitch Under Track 03 (Open Innovation)</span>
            <ArrowUpRight size={14} />
          </button>
        </div>

      </div>
    </section>
  );
}

