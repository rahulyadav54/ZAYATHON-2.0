import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Shield, Users, QrCode, Award, Trophy, CheckCircle2, XCircle, Search,
  Filter, Download, RefreshCw, Lock, AlertCircle, Plus, Eye, Trash2, ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import OfficialCertificate from '../components/certificate/OfficialCertificate';
import {
  getParticipants, approveParticipant, rejectParticipant, toggleIdCardStatus,
  getCertificates, issueCertificate, revokeCertificate,
  getTeams, getWinners, updateWinnersStatus, getStats
} from '../services/dataService';
import { useRegistrationAction } from '../hooks/useRegistrationAction';

export default function AdminDashboard() {
  const { openRegistration } = useRegistrationAction();
  
  // Admin Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passkey, setPasskey] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState('participants'); // 'participants' | 'id-cards' | 'certificates' | 'results' | 'stats'

  // Data State
  const [participants, setParticipants] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [teams, setTeams] = useState([]);
  const [winners, setWinners] = useState({});
  const [stats, setStats] = useState({});

  // Filters & Search
  const [participantSearch, setParticipantSearch] = useState('');
  const [trackFilter, setTrackFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Certificate Issuance Form State
  const [selectedParticipantForCert, setSelectedParticipantForCert] = useState('');
  const [certType, setCertType] = useState('Participation');
  const [awardCategory, setAwardCategory] = useState('');
  const [certSuccessMessage, setCertSuccessMessage] = useState('');
  const [previewCert, setPreviewCert] = useState(null);

  const reloadData = () => {
    setParticipants(getParticipants());
    setCertificates(getCertificates());
    setTeams(getTeams());
    setWinners(getWinners());
    setStats(getStats());
  };

  useEffect(() => {
    reloadData();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // Authorized Master Key for Organizer
    if (passkey.trim() === 'zaya2026' || passkey.trim() === 'admin') {
      setIsAuthenticated(true);
      setAuthError('');
      reloadData();
    } else {
      setAuthError('Invalid Admin Passkey. Hint: Use "zaya2026" or "admin".');
    }
  };

  const handleApprove = (id) => {
    approveParticipant(id);
    reloadData();
  };

  const handleReject = (id) => {
    rejectParticipant(id);
    reloadData();
  };

  const handleToggleIdCard = (participantId) => {
    toggleIdCardStatus(participantId);
    reloadData();
  };

  const handleIssueCert = (e) => {
    e.preventDefault();
    if (!selectedParticipantForCert) return;

    try {
      const newCert = issueCertificate({
        participant_id: selectedParticipantForCert,
        certificate_type: certType,
        award_category: awardCategory || undefined
      });
      setCertSuccessMessage(`Certificate ${newCert.certificate_number} generated successfully!`);
      reloadData();
      setTimeout(() => setCertSuccessMessage(''), 4000);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleRevokeCert = (certNumber) => {
    revokeCertificate(certNumber);
    reloadData();
  };

  const handleBulkIssueParticipation = () => {
    const approved = participants.filter(p => p.registration_status === 'approved' && p.participant_id);
    let count = 0;
    approved.forEach(p => {
      try {
        issueCertificate({
          participant_id: p.participant_id,
          certificate_type: 'Participation'
        });
        count++;
      } catch {}
    });
    reloadData();
    alert(`Bulk Generation complete: ${count} Participation certificates synchronized!`);
  };

  const handleToggleWinnersPublish = () => {
    const nextStatus = winners.status === 'PUBLISHED' ? 'UPCOMING' : 'PUBLISHED';
    updateWinnersStatus(nextStatus);
    reloadData();
  };

  // Filtered Participants
  const filteredParticipants = participants.filter(p => {
    if (trackFilter !== 'All' && p.track !== trackFilter) return false;
    if (statusFilter !== 'All' && p.registration_status !== statusFilter) return false;
    if (participantSearch.trim() !== '') {
      const q = participantSearch.toLowerCase();
      const matchName = p.full_name?.toLowerCase().includes(q);
      const matchEmail = p.email?.toLowerCase().includes(q);
      const matchId = p.participant_id?.toLowerCase().includes(q);
      const matchTeam = p.team_name?.toLowerCase().includes(q);
      if (!matchName && !matchEmail && !matchId && !matchTeam) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#080811] text-white flex flex-col selection:bg-[#743BFF] selection:text-white">
      <Navbar onRegisterClick={openRegistration} />

      <main className="flex-1 py-10 sm:py-16 relative overflow-hidden">
        {/* Ambient lighting */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#743BFF]/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-mono text-[#A5A0B5] hover:text-white transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Back to Public Website</span>
            </Link>

            <div className="flex items-center gap-2">
              <span className="font-mono text-xs px-3 py-1 rounded-full bg-[#171328] text-[#35D5FF] border border-[#35D5FF]/30 font-semibold">
                ORGANIZER CONTROL CENTER • ZAYA CODE HUB
              </span>
            </div>
          </div>

          {/* If Not Authenticated, show Admin Passkey Login */}
          {!isAuthenticated ? (
            <div className="max-w-md mx-auto my-12 p-8 rounded-3xl bg-[#171328]/90 border border-[#9B70FF]/30 shadow-2xl text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#743BFF] to-[#35D5FF] p-[1.5px] mx-auto">
                <div className="w-full h-full bg-[#080811] rounded-[14px] flex items-center justify-center text-[#35D5FF]">
                  <Lock size={28} />
                </div>
              </div>

              <div>
                <h2 className="font-heading font-black text-2xl text-white mb-1">
                  Organizer Access Required
                </h2>
                <p className="text-xs text-[#A5A0B5]">
                  Enter your administrative master passkey to manage registrations, issue ID credentials, and confer official certificates.
                </p>
              </div>

              {authError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 font-mono">
                  {authError}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="password"
                  value={passkey}
                  onChange={(e) => setPasskey(e.target.value)}
                  placeholder="Enter Passkey (e.g. zaya2026)"
                  className="w-full bg-[#100D1D] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#9B70FF] font-mono text-center tracking-widest"
                />

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#743BFF] to-[#35D5FF] shadow-glow-purple hover:opacity-95 transition-all"
                >
                  Unlock Admin Dashboard
                </button>
              </form>

              <p className="text-[11px] font-mono text-[#A5A0B5]">
                Organizer Key: <code className="text-[#35D5FF]">zaya2026</code>
              </p>
            </div>
          ) : (
            /* AUTHENTICATED DASHBOARD */
            <div className="space-y-8">
              
              {/* Real Database KPI Statistics Strip */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                <div className="p-4 rounded-2xl bg-[#171328]/80 border border-white/10 text-center">
                  <span className="font-mono text-[10px] text-[#A5A0B5] uppercase block">REGISTRATIONS</span>
                  <span className="font-heading font-black text-2xl text-white">{stats.totalRegistrations}</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#171328]/80 border border-white/10 text-center">
                  <span className="font-mono text-[10px] text-[#A5A0B5] uppercase block">APPROVED</span>
                  <span className="font-heading font-black text-2xl text-emerald-400">{stats.approvedParticipants}</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#171328]/80 border border-white/10 text-center">
                  <span className="font-mono text-[10px] text-[#A5A0B5] uppercase block">SELECTED SQUADS</span>
                  <span className="font-heading font-black text-2xl text-[#35D5FF]">{stats.selectedTeams}</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#171328]/80 border border-white/10 text-center">
                  <span className="font-mono text-[10px] text-[#A5A0B5] uppercase block">FINALISTS</span>
                  <span className="font-heading font-black text-2xl text-[#9B70FF]">{stats.finalistTeams}</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#171328]/80 border border-white/10 text-center">
                  <span className="font-mono text-[10px] text-[#A5A0B5] uppercase block">ID CARDS ISSUED</span>
                  <span className="font-heading font-black text-2xl text-amber-300">{stats.generatedIdCards}</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#171328]/80 border border-white/10 text-center">
                  <span className="font-mono text-[10px] text-[#A5A0B5] uppercase block">CERTIFICATES</span>
                  <span className="font-heading font-black text-2xl text-indigo-400">{stats.generatedCertificates}</span>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
                <button
                  onClick={() => setActiveTab('participants')}
                  className={`px-4 py-2 rounded-xl font-mono text-xs font-semibold transition-all ${
                    activeTab === 'participants'
                      ? 'bg-gradient-to-r from-[#743BFF] to-[#35D5FF] text-white shadow-glow-sm'
                      : 'bg-[#171328] text-[#A5A0B5] hover:text-white border border-white/5'
                  }`}
                >
                  Participants &amp; IDs ({participants.length})
                </button>

                <button
                  onClick={() => setActiveTab('certificates')}
                  className={`px-4 py-2 rounded-xl font-mono text-xs font-semibold transition-all ${
                    activeTab === 'certificates'
                      ? 'bg-gradient-to-r from-[#743BFF] to-[#35D5FF] text-white shadow-glow-sm'
                      : 'bg-[#171328] text-[#A5A0B5] hover:text-white border border-white/5'
                  }`}
                >
                  Certificate Generation ({certificates.length})
                </button>

                <button
                  onClick={() => setActiveTab('results')}
                  className={`px-4 py-2 rounded-xl font-mono text-xs font-semibold transition-all ${
                    activeTab === 'results'
                      ? 'bg-gradient-to-r from-[#743BFF] to-[#35D5FF] text-white shadow-glow-sm'
                      : 'bg-[#171328] text-[#A5A0B5] hover:text-white border border-white/5'
                  }`}
                >
                  Results &amp; Winner Podium ({winners.status})
                </button>

                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="ml-auto px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-red-500/20 text-[#A5A0B5] hover:text-red-400 font-mono text-xs transition-colors border border-white/5"
                >
                  Lock Dashboard
                </button>
              </div>

              {/* TAB 1: PARTICIPANTS MANAGEMENT */}
              {activeTab === 'participants' && (
                <div className="space-y-6">
                  {/* Filter & Search Bar */}
                  <div className="p-4 rounded-2xl bg-[#171328]/70 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="relative w-full sm:w-80">
                      <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A5A0B5]" />
                      <input
                        type="text"
                        value={participantSearch}
                        onChange={(e) => setParticipantSearch(e.target.value)}
                        placeholder="Search participant, ID, email..."
                        className="w-full bg-[#100D1D] border border-white/10 rounded-xl pl-10 pr-3 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#9B70FF]"
                      />
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-[#100D1D] border border-white/10 text-white font-mono text-xs rounded-xl px-3 py-2 focus:outline-none"
                      >
                        <option value="All">All Statuses</option>
                        <option value="approved">Approved</option>
                        <option value="pending">Pending</option>
                        <option value="rejected">Rejected</option>
                      </select>

                      <select
                        value={trackFilter}
                        onChange={(e) => setTrackFilter(e.target.value)}
                        className="bg-[#100D1D] border border-white/10 text-white font-mono text-xs rounded-xl px-3 py-2 focus:outline-none"
                      >
                        <option value="All">All Tracks</option>
                        <option value="AI & Machine Learning">AI & ML</option>
                        <option value="Web & App Development">Web & App</option>
                        <option value="Open Innovation">Open Innovation</option>
                        <option value="Cybersecurity & FinTech">Cyber & FinTech</option>
                      </select>
                    </div>
                  </div>

                  {/* Participants Table */}
                  <div className="rounded-2xl border border-white/10 overflow-hidden bg-[#171328]/60 overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#100D1D] text-[#A5A0B5] font-mono uppercase text-[11px] border-b border-white/10">
                        <tr>
                          <th className="py-3 px-4">Participant</th>
                          <th className="py-3 px-4">Assigned ID</th>
                          <th className="py-3 px-4">Team &amp; Track</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4">ID Card</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {filteredParticipants.map(p => (
                          <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                            <td className="py-3.5 px-4">
                              <div className="font-heading font-bold text-white text-sm">{p.full_name}</div>
                              <div className="text-[#A5A0B5] font-mono text-[11px]">{p.email}</div>
                            </td>
                            <td className="py-3.5 px-4 font-mono font-bold text-[#35D5FF]">
                              {p.participant_id || <span className="text-[#A5A0B5] font-normal italic">Unassigned</span>}
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="text-white font-medium">{p.team_name || "Independent"}</div>
                              <div className="text-[#9B70FF] font-mono text-[10px]">{p.track}</div>
                            </td>
                            <td className="py-3.5 px-4 font-mono">
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold border ${
                                p.registration_status === 'approved'
                                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                  : p.registration_status === 'rejected'
                                  ? 'bg-red-500/10 text-red-400 border-red-500/30'
                                  : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                              }`}>
                                {p.registration_status}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 font-mono">
                              {p.participant_id ? (
                                <button
                                  onClick={() => handleToggleIdCard(p.participant_id)}
                                  className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${
                                    p.id_card_status === 'valid'
                                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                                      : 'bg-red-500/10 text-red-400 border-red-500/30 hover:bg-red-500/20'
                                  }`}
                                  title="Click to toggle ID validity"
                                >
                                  {p.id_card_status}
                                </button>
                              ) : (
                                <span className="text-[#A5A0B5] text-[10px]">—</span>
                              )}
                            </td>
                            <td className="py-3.5 px-4 text-right space-x-2 font-mono">
                              {p.registration_status !== 'approved' ? (
                                <button
                                  onClick={() => handleApprove(p.id)}
                                  className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 transition-colors border border-emerald-500/30 font-semibold"
                                >
                                  Approve &amp; Assign ID
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleReject(p.id)}
                                  className="px-3 py-1 rounded-lg bg-red-500/15 text-red-300 hover:bg-red-500/25 transition-colors border border-red-500/30"
                                >
                                  Reject
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 2: CERTIFICATE GENERATION & MANAGEMENT */}
              {activeTab === 'certificates' && (
                <div className="space-y-8">
                  
                  {/* Issuance Form & Bulk Action */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Individual Issue Form */}
                    <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#171328]/90 border border-[#9B70FF]/30 space-y-4">
                      <h4 className="font-heading font-extrabold text-xl text-white">
                        Issue Official Certificate
                      </h4>
                      <p className="text-xs text-[#A5A0B5]">
                        Generate a cryptographically indexed credential for an approved participant with unique verification token.
                      </p>

                      {certSuccessMessage && (
                        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 font-mono flex items-center gap-2">
                          <CheckCircle2 size={14} />
                          <span>{certSuccessMessage}</span>
                        </div>
                      )}

                      <form onSubmit={handleIssueCert} className="space-y-4">
                        <div>
                          <label className="block text-xs font-mono text-[#A5A0B5] uppercase mb-1">
                            Select Approved Participant
                          </label>
                          <select
                            required
                            value={selectedParticipantForCert}
                            onChange={(e) => setSelectedParticipantForCert(e.target.value)}
                            className="w-full bg-[#100D1D] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#9B70FF]"
                          >
                            <option value="">-- Choose Participant --</option>
                            {participants.filter(p => p.registration_status === 'approved' && p.participant_id).map(p => (
                              <option key={p.participant_id} value={p.participant_id}>
                                {p.participant_id} — {p.full_name} ({p.team_name || "Solo"})
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-mono text-[#A5A0B5] uppercase mb-1">
                              Certificate Type
                            </label>
                            <select
                              value={certType}
                              onChange={(e) => setCertType(e.target.value)}
                              className="w-full bg-[#100D1D] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#9B70FF]"
                            >
                              <option value="Participation">Certificate of Participation</option>
                              <option value="Winner">Winner Certificate</option>
                              <option value="Runner-up">Runner-up Certificate</option>
                              <option value="Finalist">Finalist Certificate</option>
                              <option value="Achievement">Certificate of Achievement</option>
                              <option value="Special Award">Special Award Certificate</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-mono text-[#A5A0B5] uppercase mb-1">
                              Award Honors / Category
                            </label>
                            <input
                              type="text"
                              value={awardCategory}
                              onChange={(e) => setAwardCategory(e.target.value)}
                              placeholder="e.g. 1st Place / Best AI Innovation"
                              className="w-full bg-[#100D1D] border border-white/10 rounded-xl px-4 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#9B70FF]"
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#743BFF] to-[#35D5FF] shadow-glow-purple hover:opacity-95 transition-all flex items-center justify-center gap-2"
                        >
                          <Award size={15} />
                          <span>Generate &amp; Confer Certificate</span>
                        </button>
                      </form>
                    </div>

                    {/* Bulk Action & Export */}
                    <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-[#171328]/90 border border-white/10 space-y-4">
                      <h4 className="font-heading font-extrabold text-xl text-white">
                        Bulk Document Pipeline
                      </h4>
                      <p className="text-xs text-[#A5A0B5] leading-relaxed">
                        Automate mass issuance for all verified participants who attended the 36-hour sprint.
                      </p>

                      <div className="pt-2 space-y-3">
                        <button
                          onClick={handleBulkIssueParticipation}
                          className="w-full py-3 px-4 rounded-xl font-mono text-xs font-semibold text-white bg-white/10 hover:bg-[#743BFF]/30 border border-white/10 transition-colors flex items-center justify-center gap-2"
                        >
                          <RefreshCw size={14} />
                          <span>Bulk Issue All Participation Certs</span>
                        </button>

                        <div className="p-4 rounded-2xl bg-[#100D1D] border border-white/5 space-y-2 text-xs text-[#A5A0B5]">
                          <div className="text-white font-mono font-bold">Audit &amp; Duplicate Protection</div>
                          <p>
                            The system prevents multiple duplicate certificates of the same type from being generated for the same participant.
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Issued Certificates Registry */}
                  <div className="rounded-2xl border border-white/10 overflow-hidden bg-[#171328]/60 overflow-x-auto">
                    <div className="p-4 bg-[#100D1D] border-b border-white/10 flex items-center justify-between">
                      <span className="font-heading font-bold text-sm text-white">
                        Issued Certificates Registry ({certificates.length})
                      </span>
                    </div>

                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#100D1D] text-[#A5A0B5] font-mono uppercase text-[11px] border-b border-white/10">
                        <tr>
                          <th className="py-3 px-4">Certificate ID</th>
                          <th className="py-3 px-4">Recipient</th>
                          <th className="py-3 px-4">Type &amp; Honors</th>
                          <th className="py-3 px-4">Issue Date</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {certificates.map(cert => (
                          <tr key={cert.id} className="hover:bg-white/[0.02]">
                            <td className="py-3.5 px-4 font-mono font-bold text-[#35D5FF]">
                              {cert.certificate_number}
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="font-bold text-white">{cert.full_name}</div>
                              <div className="text-[#A5A0B5] font-mono text-[10px]">{cert.participant_id}</div>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="text-[#9B70FF] font-semibold">{cert.certificate_type}</div>
                              {cert.award_category && (
                                <div className="text-amber-300 text-[11px]">{cert.award_category}</div>
                              )}
                            </td>
                            <td className="py-3.5 px-4 font-mono text-[#A5A0B5]">
                              {cert.issue_date}
                            </td>
                            <td className="py-3.5 px-4 font-mono">
                              <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${
                                cert.status === 'valid'
                                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                  : 'bg-red-500/10 text-red-400 border-red-500/30'
                              }`}>
                                {cert.status}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right space-x-2 font-mono">
                              <button
                                onClick={() => setPreviewCert(cert)}
                                className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-[#35D5FF] transition-colors"
                              >
                                Preview
                              </button>
                              <button
                                onClick={() => handleRevokeCert(cert.certificate_number)}
                                className="px-2.5 py-1 rounded bg-red-500/15 hover:bg-red-500/25 text-red-300 transition-colors"
                              >
                                {cert.status === 'valid' ? 'Revoke' : 'Reinstate'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Certificate Preview Modal */}
                  {previewCert && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
                      <div className="relative max-w-5xl w-full bg-[#171328] rounded-3xl p-6 border border-white/10">
                        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                          <h4 className="font-heading font-bold text-lg text-white">
                            Certificate Preview: {previewCert.certificate_number}
                          </h4>
                          <button
                            onClick={() => setPreviewCert(null)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#A5A0B5] hover:text-white"
                          >
                            <XCircle size={20} />
                          </button>
                        </div>
                        <OfficialCertificate certificate={previewCert} />
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* TAB 3: RESULTS & PODIUM MANAGEMENT */}
              {activeTab === 'results' && (
                <div className="space-y-8">
                  <div className="p-8 rounded-3xl bg-[#171328]/90 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                      <div className="font-mono text-xs text-[#35D5FF] uppercase tracking-wider mb-1">
                        EVENT LIFECYCLE CONTROLLER
                      </div>
                      <h4 className="font-heading font-black text-2xl text-white mb-2">
                        Official Results Publication Status: <span className={winners.status === 'PUBLISHED' ? 'text-emerald-400' : 'text-amber-400'}>{winners.status}</span>
                      </h4>
                      <p className="text-xs text-[#A5A0B5] max-w-xl leading-relaxed">
                        When status is <strong className="text-white">UPCOMING</strong>, the public page displays the locked countdown state. When set to <strong className="text-white">PUBLISHED</strong>, the official 3-position podium and winner cards are visible to all visitors.
                      </p>
                    </div>

                    <button
                      onClick={handleToggleWinnersPublish}
                      className={`px-6 py-3.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-white transition-all shadow-lg shrink-0 ${
                        winners.status === 'PUBLISHED'
                          ? 'bg-amber-600 hover:bg-amber-700'
                          : 'bg-emerald-600 hover:bg-emerald-700'
                      }`}
                    >
                      {winners.status === 'PUBLISHED' ? 'Unpublish Results (Set UPCOMING)' : 'Publish Official Winners to Public'}
                    </button>
                  </div>

                  {/* Summary of Configured Podium */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 rounded-2xl bg-[#100D1D] border border-amber-400/40">
                      <span className="font-mono text-xs text-amber-300 font-bold uppercase block mb-1">1ST PLACE GOLD</span>
                      <h5 className="font-heading font-bold text-xl text-white mb-1">{winners.firstPlace?.teamName}</h5>
                      <p className="text-xs text-[#35D5FF] font-mono">{winners.firstPlace?.track}</p>
                      <p className="text-xs text-[#A5A0B5] mt-2">{winners.firstPlace?.projectTitle}</p>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#100D1D] border border-slate-400/40">
                      <span className="font-mono text-xs text-slate-300 font-bold uppercase block mb-1">2ND PLACE SILVER</span>
                      <h5 className="font-heading font-bold text-xl text-white mb-1">{winners.secondPlace?.teamName}</h5>
                      <p className="text-xs text-[#35D5FF] font-mono">{winners.secondPlace?.track}</p>
                      <p className="text-xs text-[#A5A0B5] mt-2">{winners.secondPlace?.projectTitle}</p>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#100D1D] border border-amber-600/40">
                      <span className="font-mono text-xs text-amber-500 font-bold uppercase block mb-1">3RD PLACE BRONZE</span>
                      <h5 className="font-heading font-bold text-xl text-white mb-1">{winners.thirdPlace?.teamName}</h5>
                      <p className="text-xs text-[#35D5FF] font-mono">{winners.thirdPlace?.track}</p>
                      <p className="text-xs text-[#A5A0B5] mt-2">{winners.thirdPlace?.projectTitle}</p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>
      </main>

      <Footer onRegisterClick={openRegistration} />
    </div>
  );
}

