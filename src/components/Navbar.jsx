import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, ChevronRight, UserCheck, Shield } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { eventConfig } from '../config/eventConfig';

const navItems = [
  { name: 'Home', href: '/#home', isRoute: false },
  { name: 'About', href: '/#about', isRoute: false },
  { name: 'Memories', href: '/#memories', badge: '1.0', isRoute: false },
  { name: 'Tracks', href: '/#tracks', isRoute: false },
  { name: 'Teams & Winners', href: '/teams', isRoute: true, highlight: true },
  { name: 'Timeline', href: '/#timeline', isRoute: false },
  { name: 'Prizes', href: '/#prizes', isRoute: false },
  { name: 'Sponsors', href: '/#sponsors', isRoute: false },
  { name: 'Team', href: '/#team', isRoute: false },
  { name: 'FAQ', href: '/#faq', isRoute: false },
  { name: 'Contact', href: '/#contact', isRoute: false },
];

export default function Navbar({ onRegisterClick }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      if (location.pathname === '/') {
        const sections = ['home', 'about', 'memories', 'tracks', 'timeline', 'prizes', 'sponsors', 'team', 'faq', 'contact'];
        const scrollPosition = window.scrollY + 200;

        for (const sectionId of sections) {
          const el = document.getElementById(sectionId);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              setActiveSection(sectionId);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleNavClick = (e, item) => {
    setMobileMenuOpen(false);

    if (item.isRoute) {
      // Route navigation handled by Router
      return;
    }

    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/' + item.href.substring(1));
    } else {
      const target = document.querySelector(item.href.replace('/', ''));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080811]/90 backdrop-blur-xl border-b border-white/[0.08] shadow-lg shadow-black/50 py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link
            to="/"
            className="group flex items-center gap-3 select-none"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-[#743BFF] via-[#9B70FF] to-[#35D5FF] p-[1.5px] transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-[#080811] rounded-[10px] flex items-center justify-center overflow-hidden">
                <span className="font-heading font-black text-lg bg-gradient-to-r from-[#35D5FF] to-[#9B70FF] bg-clip-text text-transparent">
                  Z
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-base tracking-wider text-white flex items-center gap-1.5">
                {eventConfig.shortName}
                <span className="text-[#35D5FF] font-mono text-xs px-1.5 py-0.5 rounded bg-[#35D5FF]/10 border border-[#35D5FF]/30">
                  2.0
                </span>
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#A5A0B5] -mt-0.5">
                BY {eventConfig.organizer}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => {
              const isRouteActive = item.isRoute && location.pathname === item.href;
              const isSectionActive = !item.isRoute && location.pathname === '/' && activeSection === item.href.replace('/#', '');
              const isActive = isRouteActive || isSectionActive;

              if (item.isRoute) {
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`relative px-3 py-1.5 text-xs font-medium tracking-wide transition-colors rounded-lg flex items-center gap-1.5 ${
                      isActive
                        ? 'text-[#35D5FF] font-semibold'
                        : item.highlight
                        ? 'text-white hover:text-[#35D5FF] bg-white/[0.04]'
                        : 'text-[#A5A0B5] hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <motion.div
                        layoutId="navIndicator"
                        className="absolute inset-0 bg-[#35D5FF]/10 rounded-lg -z-10 border border-[#35D5FF]/30"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              }

              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`relative px-3 py-1.5 text-xs font-medium tracking-wide transition-colors rounded-lg flex items-center gap-1.5 ${
                    isActive
                      ? 'text-white'
                      : 'text-[#A5A0B5] hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {item.name}
                  {item.badge && (
                    <span className="px-1 py-0.2 font-mono text-[9px] rounded bg-[#9B70FF]/20 text-[#9B70FF] border border-[#9B70FF]/30">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute inset-0 bg-white/[0.08] rounded-lg -z-10 border border-white/10"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action CTAs: Portal + Register */}
          <div className="flex items-center gap-2.5">
            {/* Participant Portal Link */}
            <Link
              to="/participant"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-semibold text-[#35D5FF] bg-[#171328] hover:bg-[#1f1a38] border border-[#35D5FF]/30 transition-all hover:border-[#35D5FF]/60"
            >
              <UserCheck size={14} />
              <span>PORTAL</span>
            </Link>

            {/* Admin Key Link (Discreet) */}
            <Link
              to="/admin"
              className="hidden lg:inline-flex items-center p-2 rounded-xl text-[#A5A0B5] hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 transition-colors"
              title="Organizer Admin Control"
            >
              <Shield size={14} />
            </Link>

            {/* Register Button */}
            <button
              onClick={onRegisterClick}
              className="relative inline-flex items-center justify-center p-[1px] overflow-hidden rounded-xl group font-semibold text-xs tracking-wider transition-all duration-300 active:scale-95 shadow-glow-sm"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#35D5FF] via-[#9B70FF] to-[#743BFF] group-hover:from-[#743BFF] group-hover:to-[#35D5FF] transition-all" />
              <span className="relative px-3.5 sm:px-4 py-2 transition-all ease-out bg-[#080811] rounded-[11px] group-hover:bg-opacity-0 text-white flex items-center gap-1.5">
                <Sparkles size={13} className="text-[#35D5FF]" />
                <span className="font-heading uppercase font-bold tracking-wider text-[11px] sm:text-xs">REGISTER</span>
              </span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-[#A5A0B5] hover:text-white bg-white/[0.05] border border-white/10 transition-colors"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Animated Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="xl:hidden border-b border-white/10 bg-[#080811]/95 backdrop-blur-2xl overflow-hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-1">
              {navItems.map((item) => {
                if (item.isRoute) {
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-[#35D5FF] bg-[#171328] border border-[#35D5FF]/20"
                    >
                      <span>{item.name}</span>
                      <ChevronRight size={16} />
                    </Link>
                  );
                }

                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item)}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-[#A5A0B5] hover:text-white hover:bg-white/[0.03] transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      {item.name}
                      {item.badge && (
                        <span className="px-1.5 py-0.5 font-mono text-[10px] rounded bg-[#9B70FF]/20 text-[#9B70FF] border border-[#9B70FF]/30">
                          {item.badge}
                        </span>
                      )}
                    </span>
                    <ChevronRight size={16} className="text-[#A5A0B5]/50" />
                  </a>
                );
              })}

              <div className="pt-3 grid grid-cols-2 gap-2">
                <Link
                  to="/participant"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-3 rounded-xl text-center font-mono text-xs font-semibold text-[#35D5FF] bg-[#171328] border border-[#35D5FF]/30 flex items-center justify-center gap-1.5"
                >
                  <UserCheck size={14} />
                  <span>Participant Portal</span>
                </Link>

                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-3 rounded-xl text-center font-mono text-xs font-semibold text-[#A5A0B5] bg-white/5 border border-white/10 flex items-center justify-center gap-1.5"
                >
                  <Shield size={14} />
                  <span>Admin Hub</span>
                </Link>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onRegisterClick();
                  }}
                  className="w-full py-3 px-4 rounded-xl text-center font-heading font-bold uppercase text-xs tracking-wider text-white bg-gradient-to-r from-[#743BFF] via-[#9B70FF] to-[#35D5FF] shadow-lg shadow-[#743BFF]/30 flex items-center justify-center gap-2"
                >
                  <Sparkles size={14} />
                  <span>REGISTER NOW FOR 2.0</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
