import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, ShieldAlert, CheckCircle2, XCircle, ArrowLeft, Building2, Users, Calendar } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getParticipantById } from '../services/dataService';
import { useRegistrationAction } from '../hooks/useRegistrationAction';

export default function VerifyParticipant() {
  const { participantId } = useParams();
  const { openRegistration } = useRegistrationAction();
  const participant = getParticipantById(participantId);

  const isValid = participant && participant.registration_status === 'approved' && participant.id_card_status !== 'revoked';
  const isRevoked = participant && participant.id_card_status === 'revoked';

  return (
    <div className="min-h-screen bg-[#080811] text-white flex flex-col selection:bg-[#743BFF] selection:text-white">
      <Navbar onRegisterClick={openRegistration} />

      <main className="flex-1 py-16 sm:py-24 relative overflow-hidden flex items-center justify-center">
        {/* Ambient glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#743BFF]/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-lg w-full mx-auto px-4 relative z-10 space-y-6">
          
          <div className="text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-mono text-[#A5A0B5] hover:text-white transition-colors mb-6"
            >
              <ArrowLeft size={14} />
              <span>Back to ZAYATHON 2.0</span>
            </Link>
          </div>

          {/* Verification Result Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className={`p-8 sm:p-10 rounded-3xl border shadow-2xl relative overflow-hidden ${
              isValid
                ? 'bg-[#171328]/90 border-emerald-500/40 shadow-emerald-500/10'
                : 'bg-[#171328]/90 border-red-500/40 shadow-red-500/10'
            }`}
          >
            {/* Top Accent Strip */}
            <div className={`absolute top-0 inset-x-0 h-2 ${isValid ? 'bg-emerald-400' : 'bg-red-500'}`} />

            {/* Status Icon */}
            <div className="text-center mb-6">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg ${
                isValid
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'bg-red-500/20 text-red-400 border border-red-500/40'
              }`}>
                {isValid ? <CheckCircle2 size={34} /> : <XCircle size={34} />}
              </div>

              <div className="font-mono text-xs uppercase tracking-widest text-[#A5A0B5] mb-1">
                ZAYATHON 2.0 CREDENTIAL AUDIT
              </div>

              <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">
                {isValid ? "ID CARD VERIFIED" : isRevoked ? "ID CARD REVOKED" : "CREDENTIAL NOT FOUND"}
              </h2>

              <p className="text-xs text-[#A5A0B5] mt-1">
                {isValid
                  ? "This participant credential is authentic and approved for ZAYATHON 2.0."
                  : isRevoked
                  ? "This credential was officially revoked by the organizing committee."
                  : "No official registration matching this credential ID was located in our registry."}
              </p>
            </div>

            {/* Approved Public Information (Zero exposure of private email/phone) */}
            {isValid && (
              <div className="space-y-4 pt-4 border-t border-white/10 text-xs">
                <div className="p-3.5 rounded-xl bg-[#100D1D] border border-white/5 flex items-center justify-between">
                  <span className="font-mono text-[#A5A0B5] uppercase">PARTICIPANT NAME</span>
                  <span className="font-bold text-sm text-white">{participant.full_name}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#100D1D] border border-white/5 flex items-center justify-between">
                  <span className="font-mono text-[#A5A0B5] uppercase">PARTICIPANT ID</span>
                  <span className="font-mono font-bold text-sm text-[#35D5FF]">{participant.participant_id}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#100D1D] border border-white/5 flex items-center justify-between">
                  <span className="font-mono text-[#A5A0B5] uppercase">TEAM AFFILIATION</span>
                  <span className="text-white font-medium">{participant.team_name || "Independent"}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#100D1D] border border-white/5 flex items-center justify-between">
                  <span className="font-mono text-[#A5A0B5] uppercase">TRACK</span>
                  <span className="text-[#9B70FF] font-semibold">{participant.track}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#100D1D] border border-white/5 flex items-center justify-between">
                  <span className="font-mono text-[#A5A0B5] uppercase">EVENT</span>
                  <span className="text-white font-medium">ZAYATHON 2.0 (2026 Edition)</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#100D1D] border border-white/5 flex items-center justify-between">
                  <span className="font-mono text-[#A5A0B5] uppercase">STATUS</span>
                  <span className="font-mono text-emerald-400 font-bold">APPROVED &amp; ACTIVE</span>
                </div>
              </div>
            )}

            <div className="mt-8 pt-4 border-t border-white/10 text-center text-[11px] font-mono text-[#A5A0B5]">
              Cryptographic Token Validation • ZAYA CODE HUB
            </div>
          </motion.div>

        </div>
      </main>

      <Footer onRegisterClick={openRegistration} />
    </div>
  );
}

