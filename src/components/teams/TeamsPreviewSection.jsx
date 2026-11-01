import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Trophy, ArrowRight, Sparkles, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import TeamCard from './TeamCard';
import TeamDetailsModal from './TeamDetailsModal';
import { getTeams } from '../../services/dataService';

export default function TeamsPreviewSection() {
  const [teams] = useState(getTeams());
  const [selectedTeam, setSelectedTeam] = useState(null);

  // Show top 3 spotlight teams on homepage
  const spotlightTeams = teams.slice(0, 3);

  return (
    <section className="py-24 relative overflow-hidden bg-[#0a0815]">
      {/* Background divider line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#35D5FF]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#171328] border border-[#9B70FF]/30 text-[#35D5FF] font-mono text-xs uppercase tracking-widest">
              <Users size={14} className="text-[#9B70FF]" />
              <span>SQUAD SPOTLIGHT</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight font-heading leading-tight">
              MEET THE BUILDERS.<br />
              <span className="bg-gradient-to-r from-[#35D5FF] via-[#9B70FF] to-[#743BFF] bg-clip-text text-transparent">
                CELEBRATE THE WINNERS.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-[#A5A0B5] leading-relaxed">
              Explore the exceptional developer squads selected to compete at ZAYATHON 2.0 and follow their path toward the podium.
            </p>
          </div>

          {/* Quick Action Navigation CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/teams"
              className="px-5 py-3 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#743BFF] to-[#35D5FF] shadow-lg shadow-[#743BFF]/20 hover:opacity-95 transition-all flex items-center gap-2"
            >
              <span>VIEW ALL TEAMS</span>
              <ArrowRight size={14} />
            </Link>

            <Link
              to="/teams?tab=finalists"
              className="px-4 py-3 rounded-xl font-heading font-semibold text-xs uppercase tracking-wider text-white/90 bg-[#171328] hover:bg-white/10 border border-white/10 transition-all flex items-center gap-2"
            >
              <span>MEET THE FINALISTS</span>
            </Link>

            <Link
              to="/teams#winners-podium"
              className="px-4 py-3 rounded-xl font-heading font-semibold text-xs uppercase tracking-wider text-amber-300 bg-[#171328] hover:bg-amber-500/10 border border-amber-500/30 transition-all flex items-center gap-2"
            >
              <Trophy size={14} />
              <span>VIEW WINNERS</span>
            </Link>
          </div>
        </div>

        {/* 3 Spotlight Team Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {spotlightTeams.map(team => (
            <TeamCard
              key={team.id}
              team={team}
              onSelect={(t) => setSelectedTeam(t)}
            />
          ))}
        </div>

        {/* Full Directory CTA Bar */}
        <div className="p-6 rounded-2xl bg-[#171328]/60 border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#35D5FF]/10 text-[#35D5FF] flex items-center justify-center">
              <Star size={18} />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-white">Looking for a specific squad or project track?</h4>
              <p className="text-xs text-[#A5A0B5]">Search by team ID, tech stack, or builder name in our directory.</p>
            </div>
          </div>

          <Link
            to="/teams"
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-semibold transition-colors flex items-center gap-1.5 shrink-0"
          >
            <span>Open Squad Directory</span>
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>

      {/* Modal */}
      <TeamDetailsModal
        team={selectedTeam}
        onClose={() => setSelectedTeam(null)}
      />
    </section>
  );
}

