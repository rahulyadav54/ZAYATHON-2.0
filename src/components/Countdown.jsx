import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, CheckCircle2 } from 'lucide-react';
import { eventConfig } from '../config/eventConfig';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isCompleted: false,
    isValid: true,
    isComingSoon: false
  });

  useEffect(() => {
    const rawDate = eventConfig.eventDate;

    // Check if date is missing or empty
    if (!rawDate || rawDate.trim() === '') {
      setTimeLeft(prev => ({ ...prev, isComingSoon: true, isValid: false }));
      return;
    }

    const targetTime = new Date(rawDate).getTime();

    // Check if date string is invalid
    if (isNaN(targetTime)) {
      setTimeLeft(prev => ({ ...prev, isComingSoon: true, isValid: false }));
      return;
    }

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isCompleted: true,
          isValid: true,
          isComingSoon: false
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isCompleted: false,
        isValid: true,
        isComingSoon: false
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num) => String(num).padStart(2, '0');

  // Case 1: Date is not yet announced / invalid
  if (timeLeft.isComingSoon || !timeLeft.isValid) {
    return (
      <div className="w-full max-w-3xl mx-auto my-8 p-6 rounded-2xl bg-[#171328]/80 backdrop-blur-xl border border-white/10 text-center">
        <div className="flex items-center justify-center gap-2 mb-2 text-[#35D5FF] font-mono text-xs uppercase tracking-widest">
          <Calendar size={14} />
          <span>OFFICIAL EVENT TIMING</span>
        </div>
        <h4 className="text-xl sm:text-2xl font-bold text-white mb-2 font-heading">
          DATES ANNOUNCING SHORTLY
        </h4>
        <p className="text-xs sm:text-sm text-[#A5A0B5] max-w-md mx-auto">
          The finalized schedule for ZAYATHON 2.0 is currently being synchronized with our venue &amp; partners. Check back soon!
        </p>
      </div>
    );
  }

  // Case 2: Hackathon is Live or Completed
  if (timeLeft.isCompleted) {
    return (
      <div className="w-full max-w-3xl mx-auto my-8 p-6 rounded-2xl bg-[#171328]/80 backdrop-blur-xl border border-emerald-500/30 text-center">
        <div className="flex items-center justify-center gap-2 mb-2 text-emerald-400 font-mono text-xs uppercase tracking-widest">
          <CheckCircle2 size={16} />
          <span>EVENT STATUS</span>
        </div>
        <h4 className="text-2xl sm:text-3xl font-bold text-white mb-1 font-heading">
          ZAYATHON 2.0 IS CURRENTLY LIVE!
        </h4>
        <p className="text-xs sm:text-sm text-[#A5A0B5]">
          The 36-hour sprint has commenced. Build beyond boundaries!
        </p>
      </div>
    );
  }

  // Case 3: Live Countdown
  const timeUnits = [
    { label: 'DAYS', value: formatNumber(timeLeft.days) },
    { label: 'HOURS', value: formatNumber(timeLeft.hours) },
    { label: 'MINUTES', value: formatNumber(timeLeft.minutes) },
    { label: 'SECONDS', value: formatNumber(timeLeft.seconds) },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative p-6 sm:p-8 rounded-2xl bg-[#171328]/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/60 overflow-hidden">
        {/* Subtle accent glow line */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#9B70FF] to-transparent opacity-60" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-lg bg-[#9B70FF]/15 text-[#9B70FF] border border-[#9B70FF]/25">
              <Clock size={16} />
            </span>
            <div>
              <span className="font-mono text-[11px] uppercase tracking-widest text-[#35D5FF] font-semibold block">
                TIME REMAINING UNTIL KICKOFF
              </span>
              <span className="text-xs text-[#A5A0B5]">
                Synced with Official 2026 Schedule
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-[#A5A0B5] bg-[#100D1D] px-3 py-1.5 rounded-full border border-white/5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>LIVE SYNC ACTIVE</span>
          </div>
        </div>

        {/* Counter Blocks */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative group p-4 sm:p-5 rounded-xl bg-[#100D1D]/90 border border-white/[0.08] hover:border-[#9B70FF]/40 transition-all duration-300 text-center"
            >
              <div className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight tabular-nums bg-gradient-to-b from-white to-[#A5A0B5] bg-clip-text text-transparent">
                {unit.value}
              </div>
              <div className="mt-2 font-mono text-[10px] sm:text-xs font-semibold tracking-widest text-[#35D5FF]">
                {unit.label}
              </div>

              {/* Corner decor */}
              <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#9B70FF]/40 rounded-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

