import React from 'react';
import { motion } from 'framer-motion';
import { Users, ExternalLink } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './SocialIcons';
import { teamMembers } from '../data/team';
import { eventConfig } from '../config/eventConfig';

export default function Team() {
  return (
    <section id="team" className="py-24 relative overflow-hidden bg-[#0a0815]">
      {/* Background divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#171328] border border-white/10 text-[#35D5FF] font-mono text-xs uppercase tracking-widest mb-4">
            <Users size={14} className="text-[#9B70FF]" />
            <span>THE CREW</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight font-heading leading-tight mb-6">
            ORGANIZING COMMITTEE &amp;<br />
            <span className="bg-gradient-to-r from-[#35D5FF] via-[#9B70FF] to-[#743BFF] bg-clip-text text-transparent">
              LEADERSHIP.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#A5A0B5] leading-relaxed">
            The passionate minds at {eventConfig.organizer} orchestrating the stages, infrastructure, and judging for Edition 2.0.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group p-6 rounded-3xl bg-[#171328]/80 border border-white/10 hover:border-[#9B70FF]/50 transition-all duration-300 hover:-translate-y-1.5 shadow-xl text-center flex flex-col justify-between"
            >
              <div>
                {/* Avatar Placeholder with Cyberpunk Gradient */}
                <div className="relative w-24 h-24 mx-auto mb-5 rounded-2xl bg-gradient-to-tr from-[#743BFF] via-[#9B70FF] to-[#35D5FF] p-[2px] group-hover:scale-105 transition-transform">
                  <div className="w-full h-full bg-[#100D1D] rounded-[14px] flex items-center justify-center font-heading font-black text-2xl text-white">
                    {member.initials}
                  </div>
                </div>

                <h3 className="font-heading font-bold text-lg text-white mb-1">
                  {member.name}
                </h3>

                <p className="font-mono text-xs text-[#35D5FF] uppercase tracking-wider mb-3">
                  {member.role}
                </p>

                <p className="text-xs text-[#A5A0B5] leading-relaxed mb-6 font-normal">
                  {member.bio}
                </p>
              </div>

              {/* Social Links */}
              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-center gap-3">
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} LinkedIn`}
                    className="p-2 rounded-lg bg-white/5 hover:bg-[#743BFF]/20 text-[#A5A0B5] hover:text-[#35D5FF] transition-colors"
                  >
                    <LinkedinIcon size={16} />
                  </a>
                )}
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} GitHub`}
                    className="p-2 rounded-lg bg-white/5 hover:bg-[#743BFF]/20 text-[#A5A0B5] hover:text-white transition-colors"
                  >
                    <GithubIcon size={16} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
