import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users2, Cpu, Sparkles, Presentation, Rocket, CheckCircle2 } from 'lucide-react';
import { whyParticipateReasons } from '../data/whyParticipate';

const iconMap = {
  Target,
  Users2,
  Cpu,
  Sparkles,
  Presentation,
  Rocket
};

export default function WhyParticipate({ onRegisterClick }) {
  return (
    <section className="py-24 relative overflow-hidden bg-[#080811]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#171328] border border-white/10 text-[#35D5FF] font-mono text-xs uppercase tracking-widest mb-4">
            <Sparkles size={14} className="text-[#9B70FF]" />
            <span>THE PARTICIPANT EXPERIENCE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight font-heading leading-tight mb-6">
            WHY COMPETE AT<br />
            <span className="bg-gradient-to-r from-[#35D5FF] via-[#9B70FF] to-[#743BFF] bg-clip-text text-transparent">
              ZAYATHON 2.0?
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#A5A0B5] leading-relaxed">
            More than a trophy: a high-octane launchpad designed to accelerate your engineering career, network, and creative ambitions.
          </p>
        </div>

        {/* 6 Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {whyParticipateReasons.map((reason, idx) => {
            const Icon = iconMap[reason.icon] || Sparkles;
            return (
              <motion.div
                key={reason.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group p-8 rounded-3xl bg-[#171328]/85 border border-white/10 hover:border-[#9B70FF]/50 transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${reason.gradient} p-[1px]`}>
                      <div className="w-full h-full bg-[#100D1D] rounded-[15px] flex items-center justify-center text-white">
                        <Icon size={22} className="text-[#35D5FF]" />
                      </div>
                    </div>
                    <span className="font-heading font-black text-3xl text-white/15 group-hover:text-[#9B70FF]/30 transition-colors">
                      {reason.id}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white font-heading mb-2.5 group-hover:text-white transition-colors">
                    {reason.title}
                  </h3>

                  <p className="text-sm text-[#A5A0B5] leading-relaxed font-normal">
                    {reason.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-white/[0.08] flex items-center gap-2 text-xs font-mono text-[#35D5FF]">
                  <CheckCircle2 size={13} />
                  <span>Guaranteed Experience</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Callout action */}
        <div className="text-center">
          <button
            onClick={onRegisterClick}
            className="px-8 py-4 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#743BFF] via-[#9B70FF] to-[#35D5FF] shadow-glow-purple hover:opacity-95 transition-all active:scale-95"
          >
            JOIN THE HACKATHON — SECURE YOUR SPOT
          </button>
        </div>

      </div>
    </section>
  );
}

