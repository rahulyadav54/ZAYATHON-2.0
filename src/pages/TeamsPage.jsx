import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, RotateCcw, Users, Trophy, Sparkles, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TeamCard from '../components/teams/TeamCard';
import TeamDetailsModal from '../components/teams/TeamDetailsModal';
import WinnersPodium from '../components/teams/WinnersPodium';
import { getTeams } from '../services/dataService';
import { useRegistrationAction } from '../hooks/useRegistrationAction';

const statusFilters = ['All Teams', 'Selected Teams', 'Finalists', 'Winners'];
const trackFilters = ['All Tracks', 'AI & Machine Learning', 'Web & App Development', 'Open Innovation', 'Cybersecurity & FinTech'];

export default function TeamsPage() {
  const { openRegistration } = useRegistrationAction();
  const [teams, setTeams] = useState(getTeams());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All Teams');
  const [selectedTrack, setSelectedTrack] = useState('All Tracks');
  const [activeTeam, setActiveTeam] = useState(null);

  // Filtered teams computation
  const filteredTeams = useMemo(() => {
    return teams.filter(team => {
      // 1. Status Filter
      if (selectedStatus === 'Selected Teams' && team.status !== 'selected' && team.status !== 'finalist' && team.status !== 'winner') return false;
      if (selectedStatus === 'Finalists' && team.status !== 'finalist') return false;
      if (selectedStatus === 'Winners' && team.status !== 'winner') return false;

      // 2. Track Filter
      if (selectedTrack !== 'All Tracks' && team.track !== selectedTrack) return false;

      // 3. Search Query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = team.name.toLowerCase().includes(q);
        const matchesId = team.id.toLowerCase().includes(q);
        const matchesTitle = team.projectTitle.toLowerCase().includes(q);
        const matchesMember = team.members?.some(m => m.name.toLowerCase().includes(q));
        if (!matchesName && !matchesId && !matchesTitle && !matchesMember) return false;
      }

      return true;
    });
  }, [teams, searchQuery, selectedStatus, selectedTrack]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedStatus('All Teams');
    setSelectedTrack('All Tracks');
  };

  return (
    <div className="min-h-screen bg-[#080811] text-white flex flex-col selection:bg-[#743BFF] selection:text-white">
      <Navbar onRegisterClick={openRegistration} />

      <main className="flex-1 py-12 sm:py-20 relative overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#743BFF]/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-[#35D5FF]/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
          
          {/* Top Return link */}
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-mono text-[#A5A0B5] hover:text-white transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Back to ZAYATHON 2.0 Home</span>
            </Link>

            <span className="font-mono text-xs text-[#35D5FF] px-3 py-1 rounded-full bg-[#171328] border border-white/10">
              OFFICIAL SQUAD DIRECTORY
            </span>
          </div>

          {/* Section Hero */}
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#171328] border border-[#9B70FF]/30 text-[#35D5FF] font-mono text-xs uppercase tracking-widest mb-4">
              <Users size={14} className="text-[#9B70FF]" />
              <span>THE INNOVATORS</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight font-heading leading-tight mb-4">
              THE PEOPLE BEHIND<br />
              <span className="bg-gradient-to-r from-[#35D5FF] via-[#9B70FF] to-[#743BFF] bg-clip-text text-transparent">
                THE INNOVATION.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#A5A0B5] leading-relaxed">
              Meet the brilliant minds selected to participate in ZAYATHON 2.0. Discover the teams, ideas, and projects shaping the next generation of innovation.
            </p>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#171328]/80 border border-white/10 shadow-2xl backdrop-blur-xl space-y-6">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A5A0B5]" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by team name, team ID (e.g. ZY-001), project title, or builder name..."
                className="w-full bg-[#100D1D] border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#9B70FF] focus:ring-1 focus:ring-[#9B70FF] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-[#A5A0B5] hover:text-white"
                >
                  CLEAR
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2 border-t border-white/[0.08]">
              
              {/* Status Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
                {statusFilters.map(status => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedStatus === status
                        ? 'bg-gradient-to-r from-[#743BFF] to-[#35D5FF] text-white shadow-glow-sm'
                        : 'bg-[#100D1D] text-[#A5A0B5] hover:text-white hover:bg-white/5 border border-white/5'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              {/* Track Selector & Reset Button */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <select
                  value={selectedTrack}
                  onChange={(e) => setSelectedTrack(e.target.value)}
                  className="bg-[#100D1D] border border-white/10 text-white font-mono text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-[#9B70FF]"
                >
                  {trackFilters.map(t => (
                    <option key={t} value={t} className="bg-[#100D1D] text-white">
                      {t}
                    </option>
                  ))}
                </select>

                {(searchQuery || selectedStatus !== 'All Teams' || selectedTrack !== 'All Tracks') && (
                  <button
                    onClick={handleResetFilters}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#A5A0B5] hover:text-white transition-colors flex items-center gap-1 text-xs font-mono"
                    title="Reset all filters"
                  >
                    <RotateCcw size={14} />
                    <span className="hidden sm:inline">Reset</span>
                  </button>
                )}
              </div>

            </div>

            {/* Results counter */}
            <div className="flex items-center justify-between text-xs font-mono text-[#A5A0B5]">
              <span>Showing {filteredTeams.length} of {teams.length} registered teams</span>
              {selectedStatus === 'Winners' && (
                <span className="text-amber-400 font-semibold">Viewing Official Winners Podium Below</span>
              )}
            </div>
          </div>

          {/* Teams Grid (Desktop: 3 col, Tablet: 2 col, Mobile: 1 col) */}
          {filteredTeams.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredTeams.map(team => (
                <TeamCard
                  key={team.id}
                  team={team}
                  onSelect={(t) => setActiveTeam(t)}
                />
              ))}
            </div>
          ) : (
            /* Attractive Empty State */
            <div className="p-12 sm:p-16 rounded-3xl bg-[#171328]/60 border border-white/10 text-center max-w-lg mx-auto">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-[#A5A0B5]">
                <Search size={28} />
              </div>
              <h4 className="font-heading font-bold text-xl text-white mb-2">
                No Squads Found
              </h4>
              <p className="text-xs sm:text-sm text-[#A5A0B5] leading-relaxed mb-6">
                No teams matched your current search filters. Try adjusting your query or resetting filters.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded-xl bg-[#743BFF] hover:bg-[#9B70FF] text-white font-mono text-xs font-semibold transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Dedicated Section: Winners Podium */}
          <div className="pt-16 border-t border-white/[0.08]" id="winners-podium">
            <WinnersPodium onSelectTeam={(t) => setActiveTeam(t)} />
          </div>

        </div>
      </main>

      <Footer onRegisterClick={openRegistration} />

      {/* Team Details Modal */}
      <TeamDetailsModal
        team={activeTeam}
        onClose={() => setActiveTeam(null)}
      />
    </div>
  );
}

