import React from 'react';
import { motion } from 'framer-motion';
import { Users, ArrowUpRight, Trophy, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';

export default function TeamCard({ team, onSelect }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'winner':
        return { text: 'OFFICIAL WINNER', color: 'bg-amber-500/10 text-amber-300 border-amber-500/30' };
      case 'finalist':
        return { text: 'FINALIST SQUAD', color: 'bg-[#9B70FF]/20 text-[#35D5FF] border-[#9B70FF]/40' };
      default:
        return { text: 'SELECTED TEAM', color: 'bg-[#100D1D] text-[#35D5FF] border-[#35D5FF]/30' };
    }
  };

  const statusBadge = getStatusBadge(team.status);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      onClick={() => onSelect(team)}
      className="group relative cursor-pointer p-6 sm:p-7 rounded-3xl bg-[#171328]/85 border border-white/10 hover:border-[#9B70FF]/50 transition-all duration-300 shadow-xl hover:shadow-glow-purple flex flex-col justify-between overflow-hidden"
    >
      {/* Ambient corner glow */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-[#743BFF]/10 rounded-full blur-2xl group-hover:bg-[#35D5FF]/15 transition-colors pointer-events-none" />

      <div>
        {/* Top Header: Logo, ID & Status Badge */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#100D1D] border border-white/10 overflow-hidden flex items-center justify-center p-1 group-hover:border-[#35D5FF]/50 transition-colors">
              <img
                src={team.logo}
                alt={team.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="font-mono text-[11px] font-bold text-[#35D5FF] tracking-wider block">
                {team.id}
              </span>
              <h3 className="font-heading font-bold text-lg text-white group-hover:text-[#35D5FF] transition-colors line-clamp-1">
                {team.name}
              </h3>
            </div>
          </div>

          <span className={`font-mono text-[10px] font-semibold tracking-wider px-2.5 py-1 rounded-full border uppercase shrink-0 ${statusBadge.color}`}>
            {statusBadge.text}
          </span>
        </div>

        {/* Project Title */}
        <h4 className="font-heading font-extrabold text-base text-white/95 mb-2 leading-snug">
          {team.projectTitle}
        </h4>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-[#A5A0B5] line-clamp-2 leading-relaxed mb-5">
          {team.description}
        </p>

        {/* Track Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#100D1D] border border-white/5 font-mono text-[11px] text-[#9B70FF] mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#9B70FF]" />
          <span>{team.track}</span>
        </div>
      </div>

      {/* Footer Info: Team Leader, Member Count & Action */}
      <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-[#A5A0B5]">
          <Users size={14} className="text-[#35D5FF]" />
          <span>Leader: <strong className="text-white font-medium">{team.leader}</strong></span>
          <span className="text-white/30">•</span>
          <span>{team.members?.length || 0} builders</span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(team);
          }}
          className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#743BFF] text-[#A5A0B5] group-hover:text-white flex items-center justify-center transition-all group-hover:rotate-45"
          aria-label="View Team Details"
        >
          <ArrowUpRight size={15} />
        </button>
      </div>
    </motion.div>
  );
}

