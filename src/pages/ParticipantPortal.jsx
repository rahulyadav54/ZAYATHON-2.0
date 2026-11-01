import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, ShieldCheck, QrCode, Award, CheckCircle2, AlertCircle, ArrowLeft, Search, Building2, Users, FileText, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DigitalIdCard from '../components/idcard/DigitalIdCard';
import OfficialCertificate from '../components/certificate/OfficialCertificate';
import { getParticipants, getParticipantByEmail, getParticipantById, getCertificatesForParticipant } from '../services/dataService';
import { useRegistrationAction } from '../hooks/useRegistrationAction';

export default function ParticipantPortal() {
  const { openRegistration } = useRegistrationAction();
  const participants = getParticipants();
  
  // Default to first approved participant so the portal is instantly interactive
  const defaultParticipant = participants.find(p => p.registration_status === 'approved') || participants[0];
  const [currentParticipant, setCurrentParticipant] = useState(defaultParticipant);
  const [lookupQuery, setLookupQuery] = useState('');
  const [lookupError, setLookupError] = useState('');
  const [activeTab, setActiveTab] = useState('id-card'); // 'id-card' | 'certificates' | 'profile'
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const certificates = currentParticipant?.participant_id 
    ? getCertificatesForParticipant(currentParticipant.participant_id)
    : [];

  const handleLookup = (e) => {
    e.preventDefault();
    setLookupError('');
    if (!lookupQuery.trim()) return;

    const found = getParticipantById(lookupQuery) || getParticipantByEmail(lookupQuery);
    if (found) {
      setCurrentParticipant(found);
      setSelectedCertificate(null);
    } else {
      setLookupError("No participant record found with that ID or email. Please check your spelling.");
    }
  };

  return (
    <div className="min-h-screen bg-[#080811] text-white flex flex-col selection:bg-[#743BFF] selection:text-white">
      <Navbar onRegisterClick={openRegistration} />

      <main className="flex-1 py-10 sm:py-16 relative overflow-hidden">
        {/* Ambient lighting */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#743BFF]/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-[#35D5FF]/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
          
          {/* Top Bar with Return Link */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-mono text-[#A5A0B5] hover:text-white transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Back to ZAYATHON 2.0 Home</span>
            </Link>

            {/* Quick Switcher / Lookup for Participants */}
            <form onSubmit={handleLookup} className="flex items-center gap-2">
              <div className="relative">
                <input
                  type="text"
                  value={lookupQuery}
                  onChange={(e) => setLookupQuery(e.target.value)}
                  placeholder="Enter ID (e.g. ZAYA26-0001) or Email..."
                  className="bg-[#171328] border border-white/10 rounded-xl px-3.5 py-1.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#9B70FF] font-mono w-64"
                />
              </div>
              <button
                type="submit"
                className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-colors flex items-center gap-1"
              >
                <Search size={13} />
                <span>Lookup</span>
              </button>
            </form>
          </div>

          {lookupError && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 font-mono flex items-center gap-2">
              <AlertCircle size={14} />
              <span>{lookupError}</span>
            </div>
          )}

          {/* Welcome Banner */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#171328] via-[#100D1D] to-[#171328] border border-[#9B70FF]/30 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              <div className="md:col-span-8 space-y-3">
                <div className="inline-flex items-center gap-2 font-mono text-xs text-[#35D5FF] tracking-wider uppercase font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  AUTHENTICATED PARTICIPANT PORTAL
                </div>

                <h1 className="text-3xl sm:text-4xl font-black text-white font-heading">
                  Welcome to ZAYATHON 2.0, <span className="bg-gradient-to-r from-[#35D5FF] via-white to-[#9B70FF] bg-clip-text text-transparent">{currentParticipant?.full_name}</span>
                </h1>

                <p className="text-sm text-[#A5A0B5] max-w-xl leading-relaxed">
                  Access your official credentials, download your digital badge for check-in, and retrieve verified certificates of achievement conferred by ZAYA CODE HUB.
                </p>
              </div>

              {/* Status Pill Card */}
              <div className="md:col-span-4 flex justify-start md:justify-end">
                <div className="p-4 rounded-2xl bg-[#080811]/90 border border-white/10 text-center w-full sm:w-auto min-w-[200px]">
                  <span className="font-mono text-[10px] text-[#A5A0B5] uppercase block mb-1">
                    REGISTRATION STATUS
                  </span>
                  <span className={`font-mono text-xs font-bold uppercase px-3 py-1 rounded-full border inline-block ${
                    currentParticipant?.registration_status === 'approved'
                      ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                      : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                  }`}>
                    {currentParticipant?.registration_status === 'approved' ? 'VERIFIED & APPROVED' : 'PENDING APPROVAL'}
                  </span>
                  <div className="mt-2 font-mono text-xs text-[#35D5FF]">
                    {currentParticipant?.participant_id || "ID Pending Approval"}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <button
              onClick={() => setActiveTab('id-card')}
              className={`px-5 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeTab === 'id-card'
                  ? 'bg-gradient-to-r from-[#743BFF] to-[#35D5FF] text-white shadow-glow-sm'
                  : 'bg-[#171328] text-[#A5A0B5] hover:text-white border border-white/5'
              }`}
            >
              <QrCode size={15} />
              <span>Digital ID Card</span>
            </button>

            <button
              onClick={() => setActiveTab('certificates')}
              className={`px-5 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeTab === 'certificates'
                  ? 'bg-gradient-to-r from-[#743BFF] to-[#35D5FF] text-white shadow-glow-sm'
                  : 'bg-[#171328] text-[#A5A0B5] hover:text-white border border-white/5'
              }`}
            >
              <Award size={15} />
              <span>Certificates ({certificates.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`px-5 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeTab === 'profile'
                  ? 'bg-gradient-to-r from-[#743BFF] to-[#35D5FF] text-white shadow-glow-sm'
                  : 'bg-[#171328] text-[#A5A0B5] hover:text-white border border-white/5'
              }`}
            >
              <User size={15} />
              <span>Participant Profile</span>
            </button>
          </div>

          {/* Tab 1: Digital ID Card */}
          {activeTab === 'id-card' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="text-center max-w-xl mx-auto mb-4">
                <h3 className="font-heading font-bold text-2xl text-white mb-1">
                  Your Official Digital ID Pass
                </h3>
                <p className="text-xs sm:text-sm text-[#A5A0B5]">
                  Presented at security checkpoints and submission desks. Contains cryptographically verifiable QR authentication.
                </p>
              </div>

              <DigitalIdCard participant={currentParticipant} />
            </motion.div>
          )}

          {/* Tab 2: Certificates */}
          {activeTab === 'certificates' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="text-center max-w-xl mx-auto mb-4">
                <h3 className="font-heading font-bold text-2xl text-white mb-1">
                  Accredited Credentials &amp; Awards
                </h3>
                <p className="text-xs sm:text-sm text-[#A5A0B5]">
                  High-resolution certificates verified by the ZAYATHON 2.0 Academic Council and ZAYA CODE HUB.
                </p>
              </div>

              {certificates.length > 0 ? (
                <div className="space-y-8">
                  {/* Selector if multiple certificates exist */}
                  {certificates.length > 1 && (
                    <div className="flex items-center justify-center gap-2 flex-wrap">
                      {certificates.map((cert) => (
                        <button
                          key={cert.id}
                          onClick={() => setSelectedCertificate(cert)}
                          className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                            (selectedCertificate?.id === cert.id || (!selectedCertificate && certificates[0].id === cert.id))
                              ? 'bg-[#35D5FF] text-black font-bold shadow-md'
                              : 'bg-[#171328] text-[#A5A0B5] hover:text-white border border-white/10'
                          }`}
                        >
                          {cert.certificate_type}: {cert.certificate_number}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Certificate Document Display */}
                  <OfficialCertificate certificate={selectedCertificate || certificates[0]} />
                </div>
              ) : (
                /* Empty state when certificates are pending event conclusion */
                <div className="p-12 sm:p-14 rounded-3xl bg-[#171328]/70 border border-white/10 text-center max-w-md mx-auto">
                  <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 text-[#35D5FF] flex items-center justify-center mx-auto mb-4">
                    <Award size={28} />
                  </div>
                  <h4 className="font-heading font-bold text-xl text-white mb-2">
                    Certificates Pending Event Evaluation
                  </h4>
                  <p className="text-xs sm:text-sm text-[#A5A0B5] leading-relaxed mb-6">
                    Official Certificates of Participation and Winner Excellence are generated upon completion of project submissions and jury scoring.
                  </p>
                  <span className="font-mono text-xs text-[#9B70FF] px-3 py-1 rounded-full bg-[#9B70FF]/10 border border-[#9B70FF]/20">
                    Status: Awaiting Event Completion
                  </span>
                </div>
              )}
            </motion.div>
          )}

          {/* Tab 3: Detailed Participant Profile */}
          {activeTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto p-8 rounded-3xl bg-[#171328]/90 border border-white/10 space-y-6 shadow-xl"
            >
              <h3 className="font-heading font-extrabold text-2xl text-white border-b border-white/10 pb-4">
                Verified Registration Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-[#100D1D] border border-white/5 space-y-1">
                  <span className="font-mono text-[#A5A0B5] uppercase block">FULL NAME</span>
                  <span className="font-bold text-sm text-white">{currentParticipant?.full_name}</span>
                </div>

                <div className="p-4 rounded-xl bg-[#100D1D] border border-white/5 space-y-1">
                  <span className="font-mono text-[#A5A0B5] uppercase block">PARTICIPANT ID</span>
                  <span className="font-mono font-bold text-sm text-[#35D5FF]">{currentParticipant?.participant_id || "Pending"}</span>
                </div>

                <div className="p-4 rounded-xl bg-[#100D1D] border border-white/5 space-y-1">
                  <span className="font-mono text-[#A5A0B5] uppercase block">REGISTERED EMAIL</span>
                  <span className="font-mono text-white truncate block">{currentParticipant?.email}</span>
                </div>

                <div className="p-4 rounded-xl bg-[#100D1D] border border-white/5 space-y-1">
                  <span className="font-mono text-[#A5A0B5] uppercase block">INSTITUTION</span>
                  <span className="text-white font-medium">{currentParticipant?.institution || "Independent"}</span>
                </div>

                <div className="p-4 rounded-xl bg-[#100D1D] border border-white/5 space-y-1">
                  <span className="font-mono text-[#A5A0B5] uppercase block">TEAM NAME</span>
                  <span className="text-white font-medium">{currentParticipant?.team_name || "Independent"}</span>
                </div>

                <div className="p-4 rounded-xl bg-[#100D1D] border border-white/5 space-y-1">
                  <span className="font-mono text-[#A5A0B5] uppercase block">HACKATHON TRACK</span>
                  <span className="text-[#9B70FF] font-semibold">{currentParticipant?.track}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 text-[11px] text-[#A5A0B5] leading-relaxed">
                <strong className="text-white">Privacy Guarantee:</strong> In accordance with ZAYA CODE HUB security policies, contact numbers and raw credentials are encrypted and never exposed on public verification endpoints.
              </div>
            </motion.div>
          )}

        </div>
      </main>

      <Footer onRegisterClick={openRegistration} />
    </div>
  );
}

