import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, ExternalLink, Code2, Shield, Sparkles, Building2 } from 'lucide-react';
import { GithubIcon } from '../SocialIcons';

export default function TeamDetailsModal({ team, onClose }) {
  useEffect(() => {
    if (!team) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [team, onClose]);

  if (!team) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#080811]/90 backdrop-blur-xl"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative max-w-3xl w-full bg-[#171328] border border-[#9B70FF]/30 rounded-3xl overflow-hidden shadow-2xl z-10 my-8"
        >
          {/* Header Banner */}
          <div className="relative h-44 sm:h-52 w-full bg-[#100D1D] overflow-hidden">
            <img
              src={team.image || "/images/teams/synapse-preview.svg"}
              alt={team.projectTitle}
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#171328] via-[#171328]/40 to-transparent" />

            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close Modal"
              className="absolute top-4 right-4 p-2 rounded-xl bg-[#080811]/70 hover:bg-[#743BFF] text-[#A5A0B5] hover:text-white transition-colors border border-white/10"
            >
              <X size={18} />
            </button>

            {/* Track badge */}
            <div className="absolute top-4 left-4">
              <span className="font-mono text-xs px-3 py-1 rounded-full bg-[#080811]/80 text-[#35D5FF] border border-[#35D5FF]/30 backdrop-blur-md uppercase tracking-wider font-semibold">
                {team.track}
              </span>
            </div>

            {/* Team Logo Badge */}
            <div className="absolute -bottom-6 left-6 w-20 h-20 rounded-2xl bg-[#171328] border-2 border-[#9B70FF] p-2 shadow-xl flex items-center justify-center">
              <img
                src={team.logo}
                alt={team.name}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 pt-10 space-y-6">
            
            {/* Title & Metadata */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="font-mono text-xs text-[#35D5FF] font-bold tracking-widest uppercase">
                  TEAM ID: {team.id}
                </span>
                <span className="font-mono text-xs text-[#9B70FF] px-2.5 py-0.5 rounded-full bg-[#9B70FF]/10 border border-[#9B70FF]/20 uppercase">
                  STATUS: {team.status}
                </span>
              </div>

              <h3 className="font-heading font-black text-2xl sm:text-3xl text-white mb-1">
                {team.name}
              </h3>

              {team.institution && (
                <div className="flex items-center gap-1.5 text-xs text-[#A5A0B5] mb-2 font-mono">
                  <Building2 size={13} className="text-[#35D5FF]" />
                  <span>{team.institution}</span>
                </div>
              )}

              <h4 className="font-heading font-bold text-lg text-[#35D5FF] mt-3">
                {team.projectTitle}
              </h4>
            </div>

            {/* Project Description */}
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-wider text-[#A5A0B5] font-semibold block">
                Project Overview
              </span>
              <p className="text-sm text-[#A5A0B5] leading-relaxed">
                {team.description}
              </p>
            </div>

            {/* Technologies */}
            {team.technologies && team.technologies.length > 0 && (
              <div className="space-y-2">
                <span className="font-mono text-xs uppercase tracking-wider text-[#A5A0B5] font-semibold block">
                  Tech Stack &amp; Frameworks
                </span>
                <div className="flex flex-wrap gap-2">
                  {team.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-lg bg-[#100D1D] border border-white/10 font-mono text-xs text-white"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Team Members Roster */}
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-wider text-[#A5A0B5] font-semibold block">
                Squad Roster ({team.members?.length || 0})
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {team.members?.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#100D1D] border border-white/5 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-heading font-bold text-sm text-white">
                        {m.name}
                      </div>
                      <div className="font-mono text-[11px] text-[#A5A0B5]">
                        {m.role}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* External Links */}
            <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {team.githubUrl && (
                  <a
                    href={team.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-mono text-xs transition-colors border border-white/10"
                  >
                    <GithubIcon size={14} />
                    <span>View Repository</span>
                  </a>
                )}
                {team.demoUrl && (
                  <a
                    href={team.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#743BFF] to-[#35D5FF] text-white font-mono text-xs font-semibold hover:opacity-95 transition-all shadow-glow-sm"
                  >
                    <ExternalLink size={14} />
                    <span>Launch Live Demo</span>
                  </a>
                )}
              </div>

              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#A5A0B5] hover:text-white transition-colors"
              >
                Close Window
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
