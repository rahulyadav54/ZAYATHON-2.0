import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Lock, Sparkles, Star, Medal, Clock, CheckCircle2 } from 'lucide-react';
import { winnersConfig } from '../../data/winners';

export default function WinnersPodium({ onSelectTeam }) {
  const isUpcoming = winnersConfig.status === "UPCOMING";

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#171328] border border-amber-500/30 text-amber-400 font-mono text-xs uppercase tracking-widest mb-4">
          <Trophy size={14} />
          <span>{winnersConfig.subtitle}</span>
        </div>

        <h3 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight font-heading leading-tight mb-4">
          {winnersConfig.heading}
        </h3>

        <p className="text-sm sm:text-base text-[#A5A0B5] leading-relaxed">
          {winnersConfig.tagline}
        </p>
      </div>

      {/* Case 1: Results are UPCOMING (Official Announcement Underway) */}
      {isUpcoming ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative max-w-4xl mx-auto p-8 sm:p-14 rounded-3xl bg-gradient-to-b from-[#1c1633] via-[#171328] to-[#100D1D] border border-amber-500/30 shadow-2xl text-center overflow-hidden"
        >
          {/* Ambient top light */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-2 bg-gradient-to-r from-amber-400 via-[#9B70FF] to-[#35D5FF] blur-sm" />

          {/* Central Holographic Lock Icon */}
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500/20 to-[#9B70FF]/20 text-amber-400 border border-amber-500/40 flex items-center justify-center mx-auto mb-6 shadow-glow-purple">
            <Lock size={34} className="animate-pulse" />
          </div>

          <h4 className="font-heading font-black text-2xl sm:text-4xl text-white uppercase tracking-tight mb-3">
            THE WINNERS WILL BE ANNOUNCED SOON.
          </h4>

          <p className="text-sm sm:text-base text-[#A5A0B5] max-w-lg mx-auto leading-relaxed mb-8">
            The 36-hour sprint and live jury evaluations will conclude at the Grand Finale Demo Day. Official winner verification and podium scores are currently locked.
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#080811]/70 border border-white/10 font-mono text-xs text-[#35D5FF]">
            <Clock size={14} />
            <span>Target Reveal: {winnersConfig.announcementDate}</span>
          </div>

          {/* Locked Podium Previews */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 opacity-60">
            <div className="p-4 rounded-2xl bg-[#080811]/50 border border-white/5">
              <span className="font-heading font-black text-xl text-amber-300">1ST PLACE</span>
              <p className="text-xs text-[#A5A0B5] mt-1 font-mono">[ Encrypted Podium ]</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#080811]/50 border border-white/5">
              <span className="font-heading font-black text-xl text-slate-300">2ND PLACE</span>
              <p className="text-xs text-[#A5A0B5] mt-1 font-mono">[ Encrypted Podium ]</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#080811]/50 border border-white/5">
              <span className="font-heading font-black text-xl text-amber-600">3RD PLACE</span>
              <p className="text-xs text-[#A5A0B5] mt-1 font-mono">[ Encrypted Podium ]</p>
            </div>
          </div>
        </motion.div>
      ) : (
        /* Case 2: Official Results PUBLISHED */
        <div className="space-y-12">
          {/* Three-Position Podium */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-end">
            
            {/* 2nd Place (Silver) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-3xl bg-[#171328] border border-slate-400/40 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-slate-300 px-3 py-1 rounded-full bg-slate-500/10 border border-slate-400/30">
                    2ND PLACE • SILVER
                  </span>
                  <Medal size={28} className="text-slate-300" />
                </div>

                <h4 className="font-heading font-black text-2xl text-white mb-1">
                  {winnersConfig.secondPlace.teamName}
                </h4>
                <p className="text-xs font-mono text-[#35D5FF] mb-3">
                  {winnersConfig.secondPlace.track}
                </p>

                <p className="text-sm font-semibold text-white/90 mb-2">
                  {winnersConfig.secondPlace.projectTitle}
                </p>
                <p className="text-xs text-[#A5A0B5] leading-relaxed mb-4">
                  {winnersConfig.secondPlace.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 font-mono text-xs text-slate-300">
                Prize: {winnersConfig.secondPlace.prize}
              </div>
            </motion.div>

            {/* 1st Place (Gold Champion) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#241a45] via-[#1b1535] to-[#171328] border-2 border-amber-400 shadow-2xl shadow-amber-500/10 lg:-translate-y-6 flex flex-col justify-between relative"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 to-[#35D5FF] text-black font-mono text-[11px] font-black uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                <Star size={13} className="fill-black" />
                <span>OVERALL CHAMPIONS</span>
              </div>

              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs font-bold text-amber-300 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40">
                    1ST PLACE • GOLD
                  </span>
                  <Trophy size={36} className="text-amber-400" />
                </div>

                <h4 className="font-heading font-black text-3xl sm:text-4xl text-white mb-1">
                  {winnersConfig.firstPlace.teamName}
                </h4>
                <p className="text-xs font-mono text-[#35D5FF] mb-4">
                  {winnersConfig.firstPlace.track}
                </p>

                <p className="text-base font-bold text-white mb-2 leading-snug">
                  {winnersConfig.firstPlace.projectTitle}
                </p>
                <p className="text-xs sm:text-sm text-[#A5A0B5] leading-relaxed mb-6">
                  {winnersConfig.firstPlace.description}
                </p>

                <div className="p-3 rounded-xl bg-[#080811]/60 border border-white/10 mb-6">
                  <span className="text-xs text-[#A5A0B5] font-mono block mb-1">MEMBERS</span>
                  <div className="text-xs text-white font-medium">
                    {winnersConfig.firstPlace.members.join(", ")}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 font-mono text-xs text-amber-300 font-bold">
                Reward: {winnersConfig.firstPlace.prize}
              </div>
            </motion.div>

            {/* 3rd Place (Bronze) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-3xl bg-[#171328] border border-amber-700/40 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-amber-500 px-3 py-1 rounded-full bg-amber-700/10 border border-amber-600/30">
                    3RD PLACE • BRONZE
                  </span>
                  <Medal size={28} className="text-amber-600" />
                </div>

                <h4 className="font-heading font-black text-2xl text-white mb-1">
                  {winnersConfig.thirdPlace.teamName}
                </h4>
                <p className="text-xs font-mono text-[#35D5FF] mb-3">
                  {winnersConfig.thirdPlace.track}
                </p>

                <p className="text-sm font-semibold text-white/90 mb-2">
                  {winnersConfig.thirdPlace.projectTitle}
                </p>
                <p className="text-xs text-[#A5A0B5] leading-relaxed mb-4">
                  {winnersConfig.thirdPlace.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 font-mono text-xs text-amber-500">
                Prize: {winnersConfig.thirdPlace.prize}
              </div>
            </motion.div>

          </div>

          {/* Special Category Awards */}
          {winnersConfig.specialAwards && (
            <div className="p-8 rounded-3xl bg-[#171328]/70 border border-white/10">
              <h4 className="font-heading font-extrabold text-xl text-white mb-6 flex items-center gap-2">
                <Award size={20} className="text-[#35D5FF]" />
                <span>OFFICIAL SPECIAL AWARDS</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {winnersConfig.specialAwards.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#100D1D] border border-white/5">
                    <span className="font-mono text-[10px] text-[#35D5FF] uppercase block mb-1">
                      {item.category}
                    </span>
                    <h5 className="font-heading font-bold text-base text-white mb-0.5">
                      {item.teamName}
                    </h5>
                    <p className="text-xs text-[#A5A0B5] truncate">
                      {item.project}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

