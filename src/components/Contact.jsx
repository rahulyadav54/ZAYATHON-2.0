import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Globe, Send, CheckCircle2, MessageCircle } from 'lucide-react';
import { InstagramIcon, LinkedinIcon, GithubIcon } from './SocialIcons';
import confetti from 'canvas-confetti';
import { eventConfig } from '../config/eventConfig';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {
      // fallback
    }

    setSubmitted(true);
  };

  const socialChannels = [
    {
      name: "Instagram",
      icon: InstagramIcon,
      url: eventConfig.instagramUrl,
      handle: "@zayacodehub",
      color: "hover:text-[#E4405F]"
    },
    {
      name: "LinkedIn",
      icon: LinkedinIcon,
      url: eventConfig.linkedinUrl,
      handle: "zayacodehub",
      color: "hover:text-[#0A66C2]"
    },
    {
      name: "GitHub",
      icon: GithubIcon,
      url: eventConfig.githubUrl,
      handle: "zayacodehub",
      color: "hover:text-white"
    },
    {
      name: "Official Website",
      icon: Globe,
      url: eventConfig.websiteUrl,
      handle: "zayacodehub.com",
      color: "hover:text-[#35D5FF]"
    }
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#0a0815]">
      {/* Background divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-1/2 -left-20 w-80 h-80 bg-[#743BFF]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#171328] border border-white/10 text-[#35D5FF] font-mono text-xs uppercase tracking-widest mb-4">
            <Mail size={14} className="text-[#9B70FF]" />
            <span>COMMUNICATION PORTAL</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight font-heading leading-tight mb-6">
            CONNECT WITH<br />
            <span className="bg-gradient-to-r from-[#35D5FF] via-[#9B70FF] to-[#743BFF] bg-clip-text text-transparent">
              THE ORGANIZERS.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#A5A0B5] leading-relaxed">
            Reach out for squad registrations, sponsorship proposals, university partnerships, or general questions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Info & Social Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-3xl bg-[#171328]/80 border border-white/10 shadow-xl space-y-6">
              <div>
                <span className="font-mono text-xs text-[#35D5FF] uppercase tracking-wider block mb-1">
                  OFFICIAL ORGANIZER
                </span>
                <h3 className="font-heading font-extrabold text-2xl text-white">
                  {eventConfig.organizer}
                </h3>
                <p className="text-xs text-[#A5A0B5] mt-1">
                  {eventConfig.organizerSubtitle}
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.08] space-y-4">
                <div>
                  <span className="font-mono text-[11px] text-[#A5A0B5] uppercase block mb-1">
                    PRIMARY INQUIRIES
                  </span>
                  <a
                    href={`mailto:${eventConfig.contactEmail}`}
                    className="font-mono text-sm text-[#35D5FF] hover:underline"
                  >
                    {eventConfig.contactEmail}
                  </a>
                </div>

                <div>
                  <span className="font-mono text-[11px] text-[#A5A0B5] uppercase block mb-1">
                    VENUE &amp; HEADQUARTERS
                  </span>
                  <p className="text-sm text-white">
                    {eventConfig.venue}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Grid */}
            <div className="grid grid-cols-2 gap-4">
              {socialChannels.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-4 rounded-2xl bg-[#171328]/60 border border-white/5 hover:border-[#9B70FF]/40 transition-all group flex flex-col justify-between`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <Icon size={20} className={`text-[#A5A0B5] group-hover:text-white transition-colors ${item.color}`} />
                    </div>
                    <div>
                      <div className="font-heading font-bold text-xs text-white">
                        {item.name}
                      </div>
                      <div className="font-mono text-[10px] text-[#A5A0B5] truncate">
                        {item.handle}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#171328]/90 border border-[#9B70FF]/30 shadow-2xl relative">
              <h3 className="font-heading font-extrabold text-2xl text-white mb-2">
                Send Us a Message
              </h3>
              <p className="text-xs sm:text-sm text-[#A5A0B5] mb-6">
                Have a proposal or query? We will respond to your registered email promptly.
              </p>

              {submitted ? (
                <div className="py-12 text-center bg-[#100D1D] rounded-2xl border border-emerald-500/30 p-8">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={30} />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2 font-heading">
                    Message Dispatched!
                  </h4>
                  <p className="text-xs sm:text-sm text-[#A5A0B5] max-w-md mx-auto">
                    Thank you for reaching out. The ZAYA CODE HUB organizing lead will review your note and get back to you.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="mt-6 px-5 py-2 text-xs font-semibold rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-[#A5A0B5] mb-1.5 uppercase">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Vance"
                        className="w-full bg-[#100D1D] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#9B70FF] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-[#A5A0B5] mb-1.5 uppercase">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@domain.com"
                        className="w-full bg-[#100D1D] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#9B70FF] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#A5A0B5] mb-1.5 uppercase">
                      Inquiry Subject
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Partnership / Squad Registration"
                      className="w-full bg-[#100D1D] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#9B70FF] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#A5A0B5] mb-1.5 uppercase">
                      Message Content
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your inquiry or question..."
                      className="w-full bg-[#100D1D] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#9B70FF] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#743BFF] via-[#9B70FF] to-[#35D5FF] shadow-lg shadow-[#743BFF]/25 hover:opacity-95 transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Send size={15} />
                    <span>Send Message to Organizers</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
