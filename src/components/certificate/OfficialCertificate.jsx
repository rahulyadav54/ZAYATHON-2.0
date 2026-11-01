import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Award, CheckCircle2, ShieldCheck, Printer, ExternalLink } from 'lucide-react';
import { generateQrDataUrl, getCertificateVerificationUrl } from '../../utils/qrGenerator';
import { downloadCertificateAsPdf } from '../../utils/pdfGenerator';
import { eventConfig } from '../../config/eventConfig';

export default function OfficialCertificate({ certificate, onDownloadDone }) {
  const [qrUrl, setQrUrl] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    if (!certificate?.certificate_number) return;
    const verifyUrl = getCertificateVerificationUrl(certificate.certificate_number);
    generateQrDataUrl(verifyUrl).then(url => setQrUrl(url));
  }, [certificate]);

  if (!certificate) return null;

  const handleDownloadPdf = async () => {
    setIsExporting(true);
    await downloadCertificateAsPdf('zaya-official-certificate-render', `ZAYATHON_CERTIFICATE_${certificate.certificate_number}.pdf`);
    setIsExporting(false);
    if (onDownloadDone) onDownloadDone();
  };

  const getHeading = (type) => {
    switch (type) {
      case 'Winner':
        return 'CERTIFICATE OF EXCELLENCE';
      case 'Runner-up':
        return 'CERTIFICATE OF MERIT';
      case 'Finalist':
        return 'CERTIFICATE OF DISTINCTION';
      case 'Achievement':
        return 'CERTIFICATE OF ACHIEVEMENT';
      default:
        return 'CERTIFICATE OF PARTICIPATION';
    }
  };

  const getBodyWording = (type) => {
    switch (type) {
      case 'Winner':
        return `This certificate is proudly awarded to ${certificate.full_name} from team ${certificate.team_name} in recognition of securing First Place (${certificate.award_category}) at ZAYATHON 2.0, demonstrating exceptional innovation, architectural mastery, and outstanding engineering execution.`;
      case 'Runner-up':
        return `This certificate is proudly awarded to ${certificate.full_name} from team ${certificate.team_name} in recognition of outstanding performance (${certificate.award_category}) at ZAYATHON 2.0, organized by ZAYA CODE HUB.`;
      case 'Finalist':
        return `This certificate recognizes ${certificate.full_name} from team ${certificate.team_name} for qualifying as an official Finalist at ZAYATHON 2.0, presenting groundbreaking solutions before the jury panel.`;
      default:
        return `This certificate is proudly presented to ${certificate.full_name} for successfully participating in ZAYATHON 2.0, organized by ZAYA CODE HUB, recognizing their enthusiasm, creativity, collaboration, and contribution towards innovation.`;
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      
      {/* Download Action Bar */}
      <div className="flex items-center gap-3">
        <button
          disabled={isExporting}
          onClick={handleDownloadPdf}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#743BFF] to-[#35D5FF] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-glow-purple hover:opacity-95 transition-all flex items-center gap-2"
        >
          <Download size={16} />
          <span>{isExporting ? "Rendering High-Res A4..." : "Download Official PDF"}</span>
        </button>

        <button
          onClick={() => window.print()}
          className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-[#A5A0B5] hover:text-white font-mono text-xs transition-colors flex items-center gap-2 border border-white/5"
        >
          <Printer size={15} />
          <span>Print</span>
        </button>
      </div>

      {/* Renderable Landscape Certificate Layout (Designed for A4 Ratio ~ 1.414 : 1) */}
      <div className="w-full max-w-4xl overflow-x-auto p-2">
        <div
          id="zaya-official-certificate-render"
          className="relative w-[860px] sm:w-[940px] aspect-[1.414/1] bg-[#0c0919] border-[12px] border-[#171328] rounded-2xl p-10 sm:p-14 text-white flex flex-col justify-between shadow-2xl overflow-hidden mx-auto select-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, #171328 0%, #080811 100%)'
          }}
        >
          {/* Ornate Cyberpunk Metallic Framing */}
          <div className="absolute inset-2 border-2 border-[#9B70FF]/40 rounded-xl pointer-events-none" />
          <div className="absolute inset-4 border border-[#35D5FF]/30 rounded-lg pointer-events-none" />
          
          {/* Corner brackets */}
          <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-[#35D5FF]" />
          <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-[#9B70FF]" />
          <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-[#9B70FF]" />
          <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-[#35D5FF]" />

          {/* Background Ambient Holographic Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
            <span className="font-heading font-black text-[120px] text-white">ZAYA</span>
          </div>

          {/* Certificate Top Header */}
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#743BFF] to-[#35D5FF] p-[1.5px]">
                <div className="w-full h-full bg-[#080811] rounded-[10px] flex items-center justify-center font-heading font-black text-xl text-white">
                  Z
                </div>
              </div>
              <div>
                <span className="font-heading font-extrabold text-lg text-white block">
                  ZAYATHON 2.0
                </span>
                <span className="font-mono text-xs text-[#35D5FF] uppercase tracking-widest">
                  ZAYA CODE HUB OFFICIAL ACCREDITATION
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="font-mono text-[10px] text-[#A5A0B5] uppercase block">CERTIFICATE ID</span>
              <span className="font-mono text-sm font-bold text-[#35D5FF]">{certificate.certificate_number}</span>
            </div>
          </div>

          {/* Central Wording Body */}
          <div className="my-auto text-center space-y-4 relative z-10 px-8">
            <div className="inline-block px-4 py-1 rounded-full bg-[#9B70FF]/15 border border-[#9B70FF]/30 font-mono text-xs font-bold text-[#35D5FF] uppercase tracking-widest mb-1">
              OFFICIAL RECOGNITION
            </div>

            <h1 className="font-heading font-black text-3xl sm:text-5xl tracking-tight text-white uppercase">
              {getHeading(certificate.certificate_type)}
            </h1>

            <p className="font-mono text-xs text-[#A5A0B5] uppercase tracking-widest">
              THIS CREDENTIAL IS PROUDLY CONFERRED UPON
            </p>

            <div className="py-2">
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#35D5FF] via-white to-[#9B70FF]">
                {certificate.full_name}
              </h2>
              <span className="font-mono text-xs text-[#35D5FF] block mt-1">
                PARTICIPANT ID: {certificate.participant_id}
              </span>
            </div>

            <p className="text-sm text-[#A5A0B5] max-w-2xl mx-auto leading-relaxed">
              {getBodyWording(certificate.certificate_type)}
            </p>

            {certificate.award_category && (
              <div className="inline-block font-mono text-xs font-semibold text-amber-300 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20">
                Honors: {certificate.award_category}
              </div>
            )}
          </div>

          {/* Certificate Footer / Signatures & QR */}
          <div className="pt-6 border-t border-white/10 flex items-end justify-between relative z-10">
            
            {/* Left Signatory */}
            <div className="text-left space-y-1">
              <div className="font-serif italic text-lg text-white/90">
                Zaya Organizing Committee
              </div>
              <div className="w-36 h-0.5 bg-gradient-to-r from-[#35D5FF] to-transparent mb-1" />
              <div className="font-heading font-bold text-xs text-white">
                LEAD ORGANIZER
              </div>
              <div className="font-mono text-[10px] text-[#A5A0B5]">
                ZAYA CODE HUB
              </div>
            </div>

            {/* QR Code Verification Anchor */}
            {qrUrl && (
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-white p-1 rounded-lg shadow-lg mb-1.5">
                  <img src={qrUrl} alt="Certificate Verification QR" className="w-full h-full object-contain" />
                </div>
                <span className="font-mono text-[9px] text-[#35D5FF] tracking-wider uppercase">
                  SCAN TO VERIFY
                </span>
                <span className="font-mono text-[8px] text-[#A5A0B5]">
                  zayathon.zayacodehub.com/verify
                </span>
              </div>
            )}

            {/* Right Signatory */}
            <div className="text-right space-y-1">
              <div className="font-serif italic text-lg text-white/90">
                Technical Jury Panel
              </div>
              <div className="w-36 h-0.5 bg-gradient-to-l from-[#9B70FF] to-transparent ml-auto mb-1" />
              <div className="font-heading font-bold text-xs text-white">
                HEAD OF EVALUATION
              </div>
              <div className="font-mono text-[10px] text-[#A5A0B5]">
                ZAYATHON 2.0 ACADEMIC COUNCIL
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}

