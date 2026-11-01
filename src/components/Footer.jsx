import React from 'react';
import { ArrowUp, Sparkles } from 'lucide-react';
import { InstagramIcon, LinkedinIcon, GithubIcon } from './SocialIcons';
import { eventConfig } from '../config/eventConfig';

export default function Footer({ onRegisterClick }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Memories', href: '#memories' },
    { name: 'Tracks', href: '#tracks' },
    { name: 'Timeline', href: '#timeline' },
    { name: 'Prizes', href: '#prizes' },
    { name: 'Sponsors', href: '#sponsors' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative bg-[#06060c] border-t border-white/10 pt-16 pb-12 overflow-hidden select-none">
      {/* Background radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-t from-[#743BFF]/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/[0.08]">
          
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#743BFF] to-[#35D5FF] p-[1px]">
                <div className="w-full h-full bg-[#080811] rounded-[11px] flex items-center justify-center font-heading font-black text-white">
                  Z
                </div>
              </div>
              <span className="font-heading font-black text-xl tracking-wider text-white">
                {eventConfig.eventName}
              </span>
            </div>

            <p className="font-heading font-bold text-sm tracking-wider text-[#35D5FF] uppercase">
              {eventConfig.mainTagline}
            </p>

            <p className="text-xs text-[#A5A0B5] max-w-sm leading-relaxed">
              Organized with pride by <span className="text-white font-semibold">{eventConfig.organizer}</span>. Empowering creators and builders to experiment, innovate, and architect the future.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={eventConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2 rounded-lg bg-white/5 hover:bg-[#743BFF]/20 text-[#A5A0B5] hover:text-[#35D5FF] transition-colors"
              >
                <InstagramIcon size={17} />
              </a>
              <a
                href={eventConfig.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 rounded-lg bg-white/5 hover:bg-[#743BFF]/20 text-[#A5A0B5] hover:text-[#35D5FF] transition-colors"
              >
                <LinkedinIcon size={17} />
              </a>
              <a
                href={eventConfig.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2 rounded-lg bg-white/5 hover:bg-[#743BFF]/20 text-[#A5A0B5] hover:text-white transition-colors"
              >
                <GithubIcon size={17} />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="font-mono text-xs uppercase text-white font-bold tracking-wider">
              EVENT NAVIGATION
            </div>
            <ul className="space-y-2 text-xs">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-[#A5A0B5] hover:text-[#35D5FF] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Action CTA Box */}
          <div className="md:col-span-3 space-y-3">
            <div className="font-mono text-xs uppercase text-white font-bold tracking-wider">
              EDITION 02 PORTAL
            </div>
            <p className="text-xs text-[#A5A0B5] leading-relaxed">
              Ready to take on the 36-hour sprint and compete for the official title?
            </p>
            <button
              onClick={onRegisterClick}
              className="w-full py-2.5 px-4 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#743BFF] via-[#9B70FF] to-[#35D5FF] shadow-lg shadow-[#743BFF]/20 hover:opacity-95 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles size={14} />
              <span>REGISTER NOW</span>
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#A5A0B5]">
          <div>
            © 2026 {eventConfig.eventName}. All Rights Reserved.
          </div>

          <div className="flex items-center gap-4">
            <span>Powered by {eventConfig.organizer}</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors flex items-center gap-1"
              aria-label="Scroll to top"
            >
              <ArrowUp size={14} />
              <span className="text-[10px]">TOP</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
