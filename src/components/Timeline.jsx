import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle2, Milestone, ArrowRight } from 'lucide-react';
import { timeline } from '../data/timeline';

export default function Timeline() {
  return (
    <section id="timeline" className="py-24 relative overflow-hidden bg-[#0a0815]">
      {/* Background divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#171328] border border-white/10 text-[#35D5FF] font-mono text-xs uppercase tracking-widest mb-4">
            <Milestone size={14} className="text-[#9B70FF]" />
            <span>ROADMAP &amp; SCHEDULE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight font-heading leading-tight mb-6">
            THE JOURNEY TO<br />
            <span className="bg-gradient-to-r from-[#35D5FF] via-[#9B70FF] to-[#743BFF] bg-clip-text text-transparent">
              THE PODIUM.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#A5A0B5] leading-relaxed">
            Follow the six structured milestones from team onboarding to final demo day and winner ceremonies.
          </p>
        </div>

        {/* Milestone Grid (Responsive Desktop 3x2 / Mobile Vertical) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {timeline.map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative group p-6 sm:p-7 rounded-2xl bg-[#171328]/85 border border-white/10 hover:border-[#9B70FF]/50 transition-all duration-300 hover:-translate-y-1 shadow-lg"
            >
              {/* Top Meta info */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-heading font-black text-3xl sm:text-4xl text-white/20 group-hover:text-[#35D5FF]/40 transition-colors">
                  {item.step}
                </span>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#100D1D] text-[#35D5FF] border border-[#35D5FF]/20 font-semibold uppercase">
                    {item.time}
                  </span>
                </div>
              </div>

              {/* Title & Phase Details */}
              <h3 className="text-xl font-bold text-white font-heading mb-2 group-hover:text-white transition-colors">
                {item.title}
              </h3>

              <div className="flex items-center gap-1.5 font-mono text-xs text-[#9B70FF] mb-3">
                <Calendar size={13} />
                <span>{item.date}</span>
              </div>

              <p className="text-xs sm:text-sm text-[#A5A0B5] leading-relaxed mb-4">
                {item.description}
              </p>

              {/* Action pill */}
              <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-[#A5A0B5]">
                <span>Status: {item.status}</span>
                <span className="text-[#35D5FF] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  {item.action} <ArrowRight size={12} />
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Schedule sync note */}
        <div className="mt-12 text-center text-xs font-mono text-[#A5A0B5] bg-[#171328]/40 border border-white/5 py-3 px-6 rounded-full max-w-xl mx-auto">
          <span>* Phase dates are coordinated with the official ZAYA CODE HUB calendar.</span>
        </div>

      </div>
    </section>
  );
}

