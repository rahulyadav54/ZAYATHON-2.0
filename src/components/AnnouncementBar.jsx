import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { eventConfig } from '../config/eventConfig';

export default function AnnouncementBar({ onRegisterClick }) {
  return (
    <aside aria-label="Announcement" className="relative z-40 bg-gradient-to-r from-[#100D1D] via-[#171328] to-[#100D1D] border-b border-white/[0.08] text-xs py-2 px-4 select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between sm:justify-center gap-3 text-center">
        {/* Animated Status Pulse */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#35D5FF] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#35D5FF]" />
          </span>
          <span className="font-mono text-[#35D5FF] tracking-wider uppercase text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-[#35D5FF]/10 border border-[#35D5FF]/20">
            {eventConfig.announcementBadge || "EDITION 02"}
          </span>
        </div>

        {/* Message */}
        <p className="font-medium text-[#A5A0B5] text-xs truncate sm:text-center">
          <span className="text-white font-semibold">{eventConfig.announcementText}</span>
        </p>

        {/* Quick link button */}
        <button
          onClick={onRegisterClick}
          className="hidden md:inline-flex items-center gap-1 text-[#9B70FF] hover:text-[#35D5FF] font-mono text-xs transition-colors ml-2 font-medium"
        >
          <span>Claim Priority Access</span>
          <ArrowRight size={12} />
        </button>
      </div>
    </aside>
  );
}

