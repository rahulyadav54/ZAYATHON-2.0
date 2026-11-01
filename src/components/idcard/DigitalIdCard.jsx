import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Printer, RotateCw, ShieldCheck, QrCode, Sparkles, Building2, User, AlertCircle } from 'lucide-react';
import { generateQrDataUrl, getParticipantVerificationUrl } from '../../utils/qrGenerator';
import { downloadIdCardAsPdf, downloadElementAsPng } from '../../utils/pdfGenerator';
import { eventConfig } from '../../config/eventConfig';

export default function DigitalIdCard({ participant }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    if (!participant?.participant_id) return;
    const verifyUrl = getParticipantVerificationUrl(participant.participant_id);
    generateQrDataUrl(verifyUrl).then(url => setQrCodeUrl(url));
  }, [participant]);

  if (!participant || !participant.participant_id) {
    return (
      <div className="p-8 rounded-3xl bg-[#171328]/70 border border-white/10 text-center max-w-md mx-auto">
        <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto mb-3">
          <AlertCircle size={24} />
        </div>
        <h4 className="font-heading font-bold text-lg text-white mb-1">
          ID Card Not Yet Available
        </h4>
        <p className="text-xs text-[#A5A0B5] leading-relaxed">
          Official Digital ID Cards are generated automatically once your registration has been approved by the ZAYA CODE HUB committee.
        </p>
      </div>
    );
  }

  const handleDownloadPdf = async () => {
    setIsExporting(true);
    await downloadIdCardAsPdf('zaya-id-card-render', `ZAYATHON_ID_${participant.participant_id}.pdf`);
    setIsExporting(false);
  };

  const handleDownloadPng = async () => {
    setIsExporting(true);
    await downloadElementAsPng('zaya-id-card-render', `ZAYATHON_ID_${participant.participant_id}.png`);
    setIsExporting(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      
      {/* Action Controls Bar */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-mono text-xs transition-colors flex items-center gap-2 border border-white/10"
        >
          <RotateCw size={14} className={isFlipped ? "rotate-180 transition-transform" : "transition-transform"} />
          <span>Flip Card ({isFlipped ? "Viewing Back" : "Viewing Front"})</span>
        </button>

        <button
          disabled={isExporting}
          onClick={handleDownloadPdf}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#743BFF] to-[#35D5FF] text-white font-mono text-xs font-semibold hover:opacity-95 transition-all shadow-glow-sm flex items-center gap-2 disabled:opacity-50"
        >
          <Download size={14} />
          <span>{isExporting ? "Generating..." : "Download PDF"}</span>
        </button>

        <button
          disabled={isExporting}
          onClick={handleDownloadPng}
          className="px-4 py-2 rounded-xl bg-[#171328] hover:bg-[#1f1a38] text-[#35D5FF] border border-[#35D5FF]/30 font-mono text-xs font-semibold transition-colors flex items-center gap-2"
        >
          <Download size={14} />
          <span>Download PNG</span>
        </button>

        <button
          onClick={handlePrint}
          className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#A5A0B5] hover:text-white font-mono text-xs transition-colors flex items-center gap-2 border border-white/5"
        >
          <Printer size={14} />
          <span>Print</span>
        </button>
      </div>

      {/* Main 3D Card Display Frame */}
      <div className="perspective-[1000px] w-full max-w-[340px] sm:max-w-[380px]">
        <div
          id="zaya-id-card-render"
          className="relative w-full aspect-[1/1.55] rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 border border-[#9B70FF]/40 bg-[#0c0919]"
          style={{
            transformStyle: 'preserve-3d',
            boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 25px rgba(116, 59, 255, 0.25)'
          }}
        >
          {/* Card Top Holographic Stripe */}
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#35D5FF] via-[#9B70FF] to-[#743BFF]" />

          {/* FRONT SIDE */}
          {!isFlipped ? (
            <div className="w-full h-full p-6 sm:p-7 flex flex-col justify-between relative bg-gradient-to-b from-[#171328] via-[#100D1D] to-[#080811] text-white">
              
              {/* Header Branding */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#743BFF] to-[#35D5FF] p-[1px]">
                    <div className="w-full h-full bg-[#080811] rounded-[11px] flex items-center justify-center font-heading font-black text-sm text-white">
                      Z
                    </div>
                  </div>
                  <div>
                    <span className="font-heading font-black text-sm tracking-wider text-white block">
                      ZAYATHON 2.0
                    </span>
                    <span className="font-mono text-[9px] text-[#35D5FF] tracking-widest uppercase">
                      BY ZAYA CODE HUB
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-mono text-[9px] text-[#A5A0B5] uppercase block">YEAR</span>
                  <span className="font-mono text-xs font-bold text-white">2026</span>
                </div>
              </div>

              {/* Participant Profile Section */}
              <div className="my-auto py-4 flex flex-col items-center text-center">
                {/* Photo Frame */}
                <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-tr from-[#743BFF] via-[#9B70FF] to-[#35D5FF] p-[2px] mb-4 shadow-lg">
                  <div className="w-full h-full bg-[#080811] rounded-[14px] flex items-center justify-center overflow-hidden">
                    {participant.photograph_url ? (
                      <img src={participant.photograph_url} alt={participant.full_name} className="w-full h-full object-cover" />
                    ) : (
                      <User size={38} className="text-[#35D5FF]/70" />
                    )}
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-black p-1 rounded-full border-2 border-[#080811]">
                    <ShieldCheck size={13} />
                  </div>
                </div>

                {/* Name & ID */}
                <h3 className="font-heading font-black text-xl sm:text-2xl text-white mb-0.5 leading-tight">
                  {participant.full_name}
                </h3>

                <div className="inline-block px-3 py-1 rounded-full bg-[#35D5FF]/10 border border-[#35D5FF]/30 font-mono text-xs font-bold text-[#35D5FF] mb-3">
                  ID: {participant.participant_id}
                </div>

                {/* Designation / Track */}
                <p className="font-mono text-xs text-[#9B70FF] font-semibold uppercase mb-1">
                  {participant.role || "Official Hacker"}
                </p>

                <p className="text-xs text-[#A5A0B5] truncate max-w-[260px]">
                  Team: <strong className="text-white">{participant.team_name || "Independent"}</strong>
                </p>

                {participant.institution && (
                  <p className="text-[11px] text-[#A5A0B5]/80 truncate max-w-[260px] mt-0.5">
                    {participant.institution}
                  </p>
                )}
              </div>

              {/* Bottom Card Strip with QR Code */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#A5A0B5] block">
                    TRACK
                  </span>
                  <span className="font-mono text-xs font-bold text-white">
                    {participant.track}
                  </span>
                </div>

                {/* Dynamic QR Code */}
                {qrCodeUrl && (
                  <div className="w-14 h-14 bg-white p-1 rounded-xl shadow-md flex items-center justify-center">
                    <img src={qrCodeUrl} alt="Verify QR" className="w-full h-full object-contain" />
                  </div>
                )}
              </div>

            </div>
          ) : (
            /* BACK SIDE */
            <div className="w-full h-full p-6 sm:p-7 flex flex-col justify-between relative bg-[#0e0a1f] text-white">
              
              <div>
                <div className="font-heading font-black text-base text-white mb-1">
                  ZAYATHON 2.0 PASS
                </div>
                <div className="font-mono text-[10px] text-[#35D5FF] uppercase tracking-wider mb-4">
                  Official Verification Guidelines
                </div>

                <div className="space-y-3 text-[11px] text-[#A5A0B5] leading-relaxed">
                  <p>
                    • This digital credential verifies official admission to <strong className="text-white">ZAYATHON 2.0</strong>, organized by <strong className="text-white">ZAYA CODE HUB</strong>.
                  </p>
                  <p>
                    • Scan the front QR code at check-in stations to validate authorized status, access event lounges, and verify project submissions.
                  </p>
                  <p>
                    • Non-transferable. Tampering or falsifying credentials voids event eligibility and certificate issuance.
                  </p>
                </div>
              </div>

              {/* Emergency / Organizer Contact */}
              <div className="p-4 rounded-2xl bg-[#080811]/70 border border-white/10 space-y-1.5 font-mono text-[11px]">
                <div className="text-[#35D5FF] font-bold uppercase text-[10px]">
                  ORGANIZER HOTLINE
                </div>
                <div className="text-white font-medium">{eventConfig.contactEmail}</div>
                <div className="text-[#A5A0B5] text-[10px]">{eventConfig.venue}</div>
              </div>

              {/* Footer */}
              <div className="pt-2 text-center font-mono text-[9px] text-[#A5A0B5]">
                VERIFICATION CODE: {participant.participant_id} • 2026 EDITION
              </div>

            </div>
          )}
        </div>
      </div>

      <div className="text-xs font-mono text-[#A5A0B5] flex items-center gap-1.5">
        <Sparkles size={12} className="text-[#35D5FF]" />
        <span>Click 'Flip Card' to view the back verification instructions</span>
      </div>

    </div>
  );
}

