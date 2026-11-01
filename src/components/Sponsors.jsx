import React from 'react';
import { motion } from 'framer-motion';
import { Handshake, Mail, ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react';
import { sponsorConfig } from '../data/sponsors';
import { eventConfig } from '../config/eventConfig';

export default function Sponsors() {
  const handlePartnerInquiry = () => {
    window.location.href = `mailto:${eventConfig.inquiryEmail}?subject=ZAYATHON%202.0%20Partnership%20Inquiry`;
  };

  return (
    <section id="sponsors" className="py-24 relative overflow-hidden bg-[#0a0815]">
      {/* Background divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#171328] border border-white/10 text-[#35D5FF] font-mono text-xs uppercase tracking-widest mb-4">
            <Handshake size={14} className="text-[#9B70FF]" />
            <span>PARTNERS &amp; SPONSORS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight font-heading leading-tight mb-6">
            POWERING THE NEXT<br />
            <span className="bg-gradient-to-r from-[#35D5FF] via-[#9B70FF] to-[#743BFF] bg-clip-text text-transparent">
              GENERATION OF INNOVATION.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#A5A0B5] leading-relaxed">
            {sponsorConfig.description}
          </p>
        </div>

        {/* Categories / Tiers */}
        <div className="space-y-12 mb-16">
          {sponsorConfig.categories.map((category, catIdx) => (
            <div key={category.tier} className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <span className="font-heading font-bold text-lg text-white">
                  {category.tier}
                </span>
                <span className="font-mono text-[11px] text-[#35D5FF] px-2.5 py-0.5 rounded bg-[#35D5FF]/10 border border-[#35D5FF]/20 uppercase">
                  {category.badge}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {category.partners.map((partner, pIdx) => (
                  <motion.div
                    key={partner.name}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: pIdx * 0.1 }}
                    className="p-6 rounded-2xl bg-[#171328]/80 border border-white/10 hover:border-[#9B70FF]/50 transition-all duration-300 flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#743BFF] to-[#35D5FF] p-[1px] shrink-0">
                      <div className="w-full h-full bg-[#100D1D] rounded-[11px] flex items-center justify-center font-heading font-black text-lg text-white">
                        {partner.name[0]}
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-heading font-bold text-base text-white">
                          {partner.name}
                        </h4>
                        <span className="font-mono text-[10px] text-[#A5A0B5] bg-white/5 px-2 py-0.5 rounded border border-white/5">
                          {partner.role}
                        </span>
                      </div>
                      <p className="text-xs text-[#A5A0B5] leading-relaxed">
                        {partner.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Sponsor Inquiry CTA Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#171328] via-[#1f163b] to-[#171328] border border-[#9B70FF]/40 text-center shadow-xl">
          <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-2">
            Interested in Partnering With ZAYATHON 2.0?
          </h3>
          <p className="text-xs sm:text-sm text-[#A5A0B5] max-w-xl mx-auto mb-6 leading-relaxed">
            Showcase your platform, connect with top-tier developer talent, and associate your brand with high-caliber innovation.
          </p>
          <button
            onClick={handlePartnerInquiry}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#743BFF] to-[#35D5FF] shadow-lg shadow-[#743BFF]/25 hover:opacity-95 transition-all active:scale-95"
          >
            <Mail size={16} />
            <span>BECOME A PARTNER</span>
          </button>
        </div>

      </div>
    </section>
  );
}

