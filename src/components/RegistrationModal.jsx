import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Send, CheckCircle2, BellRing, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import { eventConfig } from '../config/eventConfig';

export default function RegistrationModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#35D5FF', '#9B70FF', '#743BFF']
      });
    } catch {
      // safe fallback
    }

    setSubmitted(true);
    setTimeout(() => {
      // auto close or reset
    }, 4000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#080811]/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-[#171328] border border-[#9B70FF]/30 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-[#743BFF]/20 overflow-hidden"
        >
          {/* Ambient top light */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-2 bg-gradient-to-r from-[#35D5FF] via-[#9B70FF] to-[#743BFF] blur-sm" />

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-5 right-5 text-[#A5A0B5] hover:text-white p-1 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-[#35D5FF] bg-[#35D5FF]/10 border border-[#35D5FF]/20">
              <BellRing size={13} className="animate-pulse" />
              OFFICIAL REGISTRATION STATUS
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            ZAYATHON 2.0 Registration
          </h3>

          <p className="text-sm text-[#A5A0B5] mb-6 leading-relaxed">
            The official Google Form registration portal for ZAYATHON 2.0 is currently being prepared by the <strong className="text-white">ZAYA CODE HUB</strong> team. Enter your email below to receive instant early-access notification and squad prep material as soon as the link opens.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#100D1D] border border-emerald-500/30 rounded-xl p-5 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 size={26} />
              </div>
              <h4 className="text-lg font-bold text-white mb-1">You're On The VIP List!</h4>
              <p className="text-xs text-[#A5A0B5]">
                We'll email <span className="text-[#35D5FF] font-mono">{email}</span> the moment the official Google Form opens.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-4 py-1.5 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                Close Window
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-[#A5A0B5] mb-1.5">
                  ENTER YOUR BUILDER EMAIL
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@domain.com"
                    className="w-full bg-[#100D1D] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#9B70FF] focus:ring-1 focus:ring-[#9B70FF] transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-[#743BFF] via-[#9B70FF] to-[#35D5FF] hover:opacity-95 shadow-lg shadow-[#743BFF]/25 flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
              >
                <Send size={16} />
                Notify Me When Form Opens
              </button>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-[#A5A0B5]">
                <span>Want direct updates?</span>
                <a
                  href={eventConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#35D5FF] hover:underline flex items-center gap-1"
                >
                  Follow ZAYA CODE HUB <ExternalLink size={12} />
                </a>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

