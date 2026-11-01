import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Users, Rocket, Globe2, ShieldCheck, Cpu } from 'lucide-react';
import { eventConfig } from '../config/eventConfig';

const corePillars = [
  {
    icon: Lightbulb,
    title: "Think & Ideate",
    desc: "Unpack critical friction points across contemporary tech ecosystems. Formulate bold hypotheses and unconstrained architectures.",
    color: "from-[#35D5FF] to-[#9B70FF]"
  },
  {
    icon: Cpu,
    title: "Build & Engineer",
    desc: "Turn Figma prototypes and whiteboards into robust, production-ready codebases with clean git commits and modern stacks.",
    color: "from-[#9B70FF] to-[#743BFF]"
  },
  {
    icon: Rocket,
    title: "Innovate & Launch",
    desc: "Test prototypes under realistic workloads. Integrate cutting-edge AI, cloud primitives, and resilient system design.",
    color: "from-[#743BFF] to-[#35D5FF]"
  },
  {
    icon: Globe2,
    title: "Transform & Impact",
    desc: "Pitch working solutions to venture mentors, tech leaders, and peers. Bridge the gap between student projects and real ventures.",
    color: "from-[#35D5FF] to-[#743BFF]"
  }
];

// Editable key indicators (Honoring the rule: Do not invent stats, use clear editable metrics)
const highlightMetrics = [
  { label: "Edition", value: "2.0", subtext: "Next Generation" },
  { label: "Format", value: "36H", subtext: "Continuous Sprint" },
  { label: "Tracks", value: "04", subtext: "Core Tech Arenas" },
  { label: "Community", value: "Global", subtext: "Builders & Mentors" }
];

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#080811]">
      {/* Decorative gradient glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#743BFF]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171328] border border-white/10 text-[#35D5FF] font-mono text-xs uppercase tracking-widest mb-4">
            <span>ABOUT THE MOVEMENT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight font-heading leading-tight mb-6">
            MORE THAN A HACKATHON.<br />
            <span className="bg-gradient-to-r from-[#35D5FF] via-[#9B70FF] to-[#743BFF] bg-clip-text text-transparent">
              A MOVEMENT OF INNOVATORS.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#A5A0B5] leading-relaxed">
            ZAYATHON 2.0 is a platform where students, developers, designers, entrepreneurs, and creative thinkers come together to transform ambitious ideas into meaningful solutions.
          </p>
        </div>

        {/* Highlight Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {highlightMetrics.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-[#171328]/70 border border-white/10 backdrop-blur-md text-center hover:border-[#9B70FF]/40 transition-colors"
            >
              <div className="font-heading font-black text-3xl sm:text-4xl text-white mb-1 bg-gradient-to-r from-white to-[#A5A0B5] bg-clip-text text-transparent">
                {item.value}
              </div>
              <div className="font-mono text-xs font-semibold text-[#35D5FF] tracking-wider uppercase mb-1">
                {item.label}
              </div>
              <div className="text-[11px] text-[#A5A0B5]">
                {item.subtext}
              </div>
            </motion.div>
          ))}
        </div>

        {/* 4 Pillars Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {corePillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.12 }}
                className="group relative p-6 sm:p-7 rounded-2xl bg-[#171328]/80 border border-white/[0.08] hover:border-[#9B70FF]/50 transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-black/40"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${pillar.color} p-[1px] mb-5 group-hover:scale-110 transition-transform`}>
                  <div className="w-full h-full bg-[#100D1D] rounded-[11px] flex items-center justify-center text-white">
                    <Icon size={22} className="text-[#35D5FF]" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2.5 font-heading">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#A5A0B5] leading-relaxed">
                  {pillar.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Organizer Spotlight Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-[#171328] via-[#100D1D] to-[#171328] border border-[#9B70FF]/30 shadow-2xl overflow-hidden"
        >
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-[#743BFF]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-[#9B70FF] uppercase tracking-wider font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#9B70FF]" />
                ABOUT THE HOST COMMUNITY
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                POWERED BY BUILDERS. BUILT FOR BUILDERS.
              </h3>
              <p className="text-sm sm:text-base text-[#A5A0B5] leading-relaxed">
                <strong className="text-white">ZAYA CODE HUB</strong> is a passionate technology community dedicated to fostering developer talent, encouraging hands-on project creation, and creating high-impact platforms where emerging builders can showcase their skills to the world.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <div className="p-4 rounded-xl bg-[#080811]/90 border border-white/10 text-center w-full sm:w-auto">
                <div className="font-heading font-extrabold text-xl text-white mb-1">
                  ZAYA CODE HUB
                </div>
                <div className="font-mono text-xs text-[#35D5FF] uppercase tracking-widest mb-3">
                  Edition 2.0 Host Platform
                </div>
                <a
                  href={eventConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 text-xs font-semibold rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  Visit Community Hub →
                </a>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

