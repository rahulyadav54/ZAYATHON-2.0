import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Gift, Sparkles, Check, Star } from 'lucide-react';
import TrophyScene from './TrophyScene';
import { prizePoolConfig } from '../data/prizes';

export default function Prizes({ onRegisterClick }) {
  const isTBA = prizePoolConfig.announcementStatus === "TBA";

  return (
    <section id="prizes" className="py-24 relative overflow-hidden bg-[#080811]">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#9B70FF]/10 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#171328] border border-white/10 text-[#35D5FF] font-mono text-xs uppercase tracking-widest mb-4">
            <Trophy size={14} className="text-[#9B70FF]" />
            <span>HONORS &amp; RECOGNITION</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight font-heading leading-tight mb-6">
            BUILD SOMETHING.<br />
            <span className="bg-gradient-to-r from-[#35D5FF] via-[#9B70FF] to-[#743BFF] bg-clip-text text-transparent">
              AWARD-WORTHY.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#A5A0B5] leading-relaxed">
            {prizePoolConfig.description}
          </p>

          {/* Fallback Badge honoring the prompt requirement */}
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#171328]/80 border border-[#9B70FF]/30 text-xs font-mono text-[#35D5FF]">
            <Sparkles size={13} className="text-[#9B70FF]" />
            <span>{prizePoolConfig.poolFallbackBadge}</span>
          </div>
        </div>

        {/* 3D Trophy Centerpiece */}
        <div className="mb-12">
          <TrophyScene />
        </div>

        {/* Podium Prize Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch mb-16">
          {prizePoolConfig.prizes.map((prize, idx) => (
            <motion.div
              key={prize.rank}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12 }}
              className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-2xl ${
                prize.highlight
                  ? 'bg-gradient-to-b from-[#1f163b] via-[#171328] to-[#100D1D] border-2 border-[#9B70FF] shadow-glow-purple md:-translate-y-3'
                  : 'bg-[#171328]/80 border border-white/10 hover:border-white/20'
              }`}
            >
              {prize.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#743BFF] to-[#35D5FF] text-white font-mono text-[11px] font-bold uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                  <Star size={12} className="fill-white" />
                  <span>OVERALL CHAMPIONS</span>
                </div>
              )}

              <div>
                {/* Header / Rank */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-heading font-black text-4xl sm:text-5xl bg-gradient-to-r from-white to-[#A5A0B5] bg-clip-text text-transparent">
                    {prize.rank}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#35D5FF]">
                    <Trophy size={22} className={prize.highlight ? 'text-[#FFD700]' : 'text-[#35D5FF]'} />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white font-heading mb-1">
                  {prize.title}
                </h3>
                <p className="text-xs font-mono text-[#35D5FF] uppercase tracking-wider mb-6">
                  {prize.subtitle}
                </p>

                {/* Reward Callout */}
                <div className="p-3.5 rounded-xl bg-[#080811]/70 border border-white/5 mb-6 text-center">
                  <span className="font-heading font-extrabold text-base text-white">
                    {prize.reward}
                  </span>
                </div>

                {/* Perks Checklist */}
                <div className="space-y-3 mb-8">
                  {prize.perks.map((perk, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-[#A5A0B5]">
                      <div className="w-4 h-4 rounded-full bg-[#9B70FF]/20 text-[#35D5FF] flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={11} />
                      </div>
                      <span className="leading-snug">{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={onRegisterClick}
                className={`w-full py-3 rounded-xl font-heading font-bold text-xs uppercase tracking-wider transition-all ${
                  prize.highlight
                    ? 'bg-gradient-to-r from-[#743BFF] to-[#35D5FF] text-white shadow-lg hover:opacity-95'
                    : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                }`}
              >
                Compete For {prize.rank === "01" ? "First Place" : `Rank ${prize.rank}`}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Special Recognitions Grid */}
        <div className="rounded-3xl bg-[#171328]/60 border border-white/[0.08] p-8 sm:p-10 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-6">
            <Award size={20} className="text-[#35D5FF]" />
            <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white uppercase tracking-tight">
              SPECIAL RECOGNITIONS &amp; CERTIFICATES
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {prizePoolConfig.specialRecognitions.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#100D1D] border border-white/5 hover:border-white/15 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-[#9B70FF]/15 text-[#9B70FF] flex items-center justify-center mb-3">
                  <Gift size={16} />
                </div>
                <h4 className="font-bold text-white text-sm font-heading mb-1.5">
                  {item.title}
                </h4>
                <p className="text-xs text-[#A5A0B5] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

