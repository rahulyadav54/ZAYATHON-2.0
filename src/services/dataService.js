/**
 * ZAYATHON 2.0 — Live Supabase & Unified Data Service
 * 
 * Synchronizes with the live Supabase PostgreSQL database
 * (https://xzhlfpvgjmnaribsrytq.supabase.co) with local reactive persistence.
 */

import { supabase, isSupabaseConfigured } from './supabaseClient';
import { teams as initialTeams } from '../data/teams';
import { winnersConfig as initialWinners } from '../data/winners';

const STORAGE_KEYS = {
  PARTICIPANTS: 'zaya_participants_db',
  TEAMS: 'zaya_teams_db',
  CERTIFICATES: 'zaya_certificates_db',
  WINNERS: 'zaya_winners_db',
  AUDIT_LOGS: 'zaya_audit_logs_db'
};

// Default fallback seeds
const SEED_PARTICIPANTS = [
  {
    id: "p-001",
    participant_id: "ZAYA26-0001",
    full_name: "Kavya Menon",
    email: "kavya.menon@nit.edu",
    institution: "National Institute of Technology",
    team_name: "NeuralNova",
    team_id: "ZY-001",
    track: "AI & Machine Learning",
    role: "Team Lead & ML Architect",
    registration_status: "approved",
    attendance_status: "completed",
    id_card_status: "valid",
    created_at: "2026-10-20T10:00:00Z"
  },
  {
    id: "p-002",
    participant_id: "ZAYA26-0002",
    full_name: "Devansh Rathore",
    email: "devansh@nit.edu",
    institution: "National Institute of Technology",
    team_name: "NeuralNova",
    team_id: "ZY-001",
    track: "AI & Machine Learning",
    role: "Backend & MLOps",
    registration_status: "approved",
    attendance_status: "completed",
    id_card_status: "valid",
    created_at: "2026-10-20T10:05:00Z"
  },
  {
    id: "p-003",
    participant_id: "ZAYA26-0003",
    full_name: "Aditya Sharma",
    email: "aditya.sharma@iiit.ac.in",
    institution: "Indian Institute of Information Technology",
    team_name: "AetherFlow",
    team_id: "ZY-002",
    track: "Cybersecurity & FinTech",
    role: "Lead Full-Stack Architect",
    registration_status: "approved",
    attendance_status: "completed",
    id_card_status: "valid",
    created_at: "2026-10-21T11:00:00Z"
  },
  {
    id: "p-004",
    participant_id: "ZAYA26-0004",
    full_name: "Rhea Sen",
    email: "rhea.sen@vit.ac.in",
    institution: "Vellore Institute of Technology",
    team_name: "HyperScale Labs",
    team_id: "ZY-003",
    track: "Web & App Development",
    role: "Systems Architect",
    registration_status: "approved",
    attendance_status: "completed",
    id_card_status: "valid",
    created_at: "2026-10-22T09:30:00Z"
  },
  {
    id: "p-005",
    participant_id: "ZAYA26-0005",
    full_name: "Farhan Siddiqui",
    email: "farhan.siddiqui@dtu.ac.in",
    institution: "Delhi Technological University",
    team_name: "TerraPulse",
    team_id: "ZY-004",
    track: "Open Innovation",
    role: "Embedded Systems Lead",
    registration_status: "approved",
    attendance_status: "completed",
    id_card_status: "valid",
    created_at: "2026-10-23T14:15:00Z"
  },
  {
    id: "p-006",
    participant_id: null,
    full_name: "Ananya Roy",
    email: "ananya.roy@iisc.ac.in",
    institution: "Indian Institute of Science",
    team_name: "BioSynth AI",
    team_id: "ZY-006",
    track: "AI & Machine Learning",
    role: "Full-Stack Developer",
    registration_status: "pending",
    attendance_status: "registered",
    id_card_status: "not_generated",
    created_at: "2026-10-25T16:00:00Z"
  }
];

const SEED_CERTIFICATES = [
  {
    id: "cert-001",
    certificate_number: "ZAYA26-CERT-0101",
    participant_id: "ZAYA26-0001",
    full_name: "Kavya Menon",
    team_name: "NeuralNova",
    project_title: "SynapseGuard: Autonomous Medical Diagnostic Agent",
    certificate_type: "Winner",
    award_category: "Grand Champion • 1st Place",
    track: "AI & Machine Learning",
    issue_date: "2026-11-29",
    status: "valid"
  },
  {
    id: "cert-002",
    certificate_number: "ZAYA26-CERT-0102",
    participant_id: "ZAYA26-0001",
    full_name: "Kavya Menon",
    team_name: "NeuralNova",
    project_title: "SynapseGuard: Autonomous Medical Diagnostic Agent",
    certificate_type: "Participation",
    award_category: "Participant Certificate of Completion",
    track: "AI & Machine Learning",
    issue_date: "2026-11-29",
    status: "valid"
  },
  {
    id: "cert-003",
    certificate_number: "ZAYA26-CERT-0103",
    participant_id: "ZAYA26-0003",
    full_name: "Aditya Sharma",
    team_name: "AetherFlow",
    project_title: "OmniLedger: Real-Time Zero-Knowledge Settlement",
    certificate_type: "Runner-up",
    award_category: "1st Runner Up • 2nd Place",
    track: "Cybersecurity & FinTech",
    issue_date: "2026-11-29",
    status: "valid"
  }
];

function getStored(key, defaultValue) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setStored(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error("Storage write error:", err);
  }
}

let hasSyncedWithSupabase = false;

// Background sync from live Supabase
async function syncFromSupabase() {
  if (hasSyncedWithSupabase || !isSupabaseConfigured) return;
  hasSyncedWithSupabase = true;

  try {
    // 1. Fetch Teams from Supabase
    const { data: dbTeams, error: tErr } = await supabase.from('teams').select('*');
    if (!tErr && dbTeams && dbTeams.length > 0) {
      const mappedTeams = dbTeams.map(t => ({
        id: t.team_id,
        name: t.team_name,
        logo: `/images/teams/${t.team_name.toLowerCase().replace(/\s+/g, '')}.svg`,
        leader: "Squad Lead",
        projectTitle: t.project_title,
        description: t.description,
        track: t.track,
        technologies: t.technologies || [],
        status: t.publication_status || "selected",
        githubUrl: t.github_url,
        demoUrl: t.demo_url,
        image: `/images/teams/synapse-preview.svg`
      }));
      setStored(STORAGE_KEYS.TEAMS, mappedTeams);
    }

    // 2. Fetch Participants from Supabase
    const { data: dbParts, error: pErr } = await supabase.from('participants').select('*');
    if (!pErr && dbParts && dbParts.length > 0) {
      const mappedParts = dbParts.map(p => ({
        id: p.id,
        participant_id: p.participant_id,
        full_name: p.full_name,
        email: p.email,
        institution: p.institution,
        team_name: p.team_id ? `Team ${p.team_id}` : "Independent",
        team_id: p.team_id,
        track: p.track,
        role: p.role,
        registration_status: p.registration_status,
        attendance_status: p.attendance_status,
        id_card_status: p.participant_id ? "valid" : "not_generated",
        created_at: p.created_at
      }));
      setStored(STORAGE_KEYS.PARTICIPANTS, mappedParts);
    }

    // 3. Fetch Certificates from Supabase
    const { data: dbCerts, error: cErr } = await supabase.from('certificates').select('*');
    if (!cErr && dbCerts && dbCerts.length > 0) {
      const parts = getStored(STORAGE_KEYS.PARTICIPANTS, SEED_PARTICIPANTS);
      const mappedCerts = dbCerts.map(c => {
        const recipient = parts.find(p => p.participant_id === c.participant_id);
        return {
          id: c.id,
          certificate_number: c.certificate_number,
          participant_id: c.participant_id,
          full_name: recipient ? recipient.full_name : "ZAYATHON Participant",
          team_name: recipient ? recipient.team_name : "Team",
          certificate_type: c.certificate_type,
          award_category: c.award_category,
          track: recipient ? recipient.track : "General",
          issue_date: c.issue_date?.split('T')[0] || "2026-11-29",
          status: c.status
        };
      });
      setStored(STORAGE_KEYS.CERTIFICATES, mappedCerts);
    }
  } catch (err) {
    console.warn("Supabase background sync notice:", err.message);
  }
}

export function initDatabase() {
  if (!localStorage.getItem(STORAGE_KEYS.PARTICIPANTS)) {
    setStored(STORAGE_KEYS.PARTICIPANTS, SEED_PARTICIPANTS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.TEAMS)) {
    setStored(STORAGE_KEYS.TEAMS, initialTeams);
  }
  if (!localStorage.getItem(STORAGE_KEYS.CERTIFICATES)) {
    setStored(STORAGE_KEYS.CERTIFICATES, SEED_CERTIFICATES);
  }
  if (!localStorage.getItem(STORAGE_KEYS.WINNERS)) {
    setStored(STORAGE_KEYS.WINNERS, initialWinners);
  }

  // Trigger sync in background
  syncFromSupabase();
}

// -------------------------------------------------------------
// PARTICIPANTS API
// -------------------------------------------------------------
export function getParticipants() {
  initDatabase();
  return getStored(STORAGE_KEYS.PARTICIPANTS, SEED_PARTICIPANTS);
}

export function getParticipantById(participantId) {
  if (!participantId) return null;
  const list = getParticipants();
  const clean = participantId.trim().toUpperCase();
  return list.find(p => p.participant_id === clean || p.id === participantId) || null;
}

export function getParticipantByEmail(email) {
  if (!email) return null;
  const list = getParticipants();
  const clean = email.trim().toLowerCase();
  return list.find(p => p.email?.toLowerCase() === clean) || null;
}

export function approveParticipant(id) {
  const list = getParticipants();
  let generatedId = null;

  const updated = list.map(p => {
    if (p.id === id) {
      if (!p.participant_id) {
        const approvedCount = list.filter(item => item.participant_id).length + 1;
        generatedId = `ZAYA26-${String(approvedCount).padStart(4, '0')}`;
      } else {
        generatedId = p.participant_id;
      }

      // Sync with Supabase asynchronously
      if (isSupabaseConfigured) {
        supabase.from('participants').update({
          participant_id: generatedId,
          registration_status: 'approved'
        }).eq('id', id).then(({ error }) => {
          if (error) console.warn("Supabase participant update:", error.message);
        });

        supabase.from('id_cards').upsert({
          participant_id: generatedId,
          card_number: `IDC-${generatedId}`,
          verification_token: `tok-${generatedId.toLowerCase()}`,
          status: 'valid'
        }, { onConflict: 'participant_id' }).then(({ error }) => {
          if (error) console.warn("Supabase id_card upsert:", error.message);
        });
      }

      return {
        ...p,
        registration_status: "approved",
        participant_id: generatedId,
        id_card_status: "valid"
      };
    }
    return p;
  });

  setStored(STORAGE_KEYS.PARTICIPANTS, updated);
  logAuditAction("admin@zayacodehub.com", "APPROVE_PARTICIPANT", "participant", id, { participant_id: generatedId });
  return updated;
}

export function rejectParticipant(id) {
  const list = getParticipants();
  const updated = list.map(p => {
    if (p.id === id) {
      if (isSupabaseConfigured) {
        supabase.from('participants').update({
          registration_status: 'rejected'
        }).eq('id', id).then();
      }

      return {
        ...p,
        registration_status: "rejected",
        id_card_status: "revoked"
      };
    }
    return p;
  });
  setStored(STORAGE_KEYS.PARTICIPANTS, updated);
  logAuditAction("admin@zayacodehub.com", "REJECT_PARTICIPANT", "participant", id);
  return updated;
}

export function toggleIdCardStatus(participantId) {
  const list = getParticipants();
  const updated = list.map(p => {
    if (p.participant_id === participantId) {
      const nextStatus = p.id_card_status === "valid" ? "revoked" : "valid";
      
      if (isSupabaseConfigured) {
        supabase.from('id_cards').update({ status: nextStatus }).eq('participant_id', participantId).then();
      }

      return { ...p, id_card_status: nextStatus };
    }
    return p;
  });
  setStored(STORAGE_KEYS.PARTICIPANTS, updated);
  logAuditAction("admin@zayacodehub.com", "TOGGLE_ID_CARD_STATUS", "id_card", participantId);
  return updated;
}

// -------------------------------------------------------------
// CERTIFICATES API
// -------------------------------------------------------------
export function getCertificates() {
  initDatabase();
  return getStored(STORAGE_KEYS.CERTIFICATES, SEED_CERTIFICATES);
}

export function getCertificatesForParticipant(participantId) {
  if (!participantId) return [];
  const certs = getCertificates();
  return certs.filter(c => c.participant_id === participantId.trim().toUpperCase());
}

export function getCertificateById(certificateNumber) {
  if (!certificateNumber) return null;
  const certs = getCertificates();
  const clean = certificateNumber.trim().toUpperCase();
  return certs.find(c => c.certificate_number === clean) || null;
}

export function issueCertificate({ participant_id, certificate_type, award_category }) {
  const participants = getParticipants();
  const p = participants.find(item => item.participant_id === participant_id);
  if (!p) throw new Error("Participant not found or not approved yet.");

  const certs = getCertificates();

  // Check if identical certificate already exists
  const existing = certs.find(c => c.participant_id === participant_id && c.certificate_type === certificate_type);
  if (existing) {
    return existing;
  }

  const nextNumber = `ZAYA26-CERT-${String(certs.length + 101).padStart(4, '0')}`;
  const newCert = {
    id: `cert-${Date.now()}`,
    certificate_number: nextNumber,
    participant_id: p.participant_id,
    full_name: p.full_name,
    team_name: p.team_name || "Independent Builder",
    project_title: p.track,
    certificate_type: certificate_type || "Participation",
    award_category: award_category || `${certificate_type} Honors`,
    track: p.track,
    issue_date: new Date().toISOString().split('T')[0],
    status: "valid"
  };

  // Sync to Supabase
  if (isSupabaseConfigured) {
    supabase.from('certificates').insert({
      certificate_number: nextNumber,
      participant_id: p.participant_id,
      certificate_type: newCert.certificate_type,
      award_category: newCert.award_category,
      verification_token: `vtok-${nextNumber.toLowerCase()}`,
      status: 'valid'
    }).then(({ error }) => {
      if (error) console.warn("Supabase certificate insert error:", error.message);
    });
  }

  const updated = [newCert, ...certs];
  setStored(STORAGE_KEYS.CERTIFICATES, updated);
  logAuditAction("admin@zayacodehub.com", "ISSUE_CERTIFICATE", "certificate", nextNumber, newCert);
  return newCert;
}

export function revokeCertificate(certificateNumber) {
  const certs = getCertificates();
  const updated = certs.map(c => {
    if (c.certificate_number === certificateNumber) {
      const nextStatus = c.status === "valid" ? "revoked" : "valid";

      if (isSupabaseConfigured) {
        supabase.from('certificates').update({ status: nextStatus }).eq('certificate_number', certificateNumber).then();
      }

      return { ...c, status: nextStatus };
    }
    return c;
  });
  setStored(STORAGE_KEYS.CERTIFICATES, updated);
  logAuditAction("admin@zayacodehub.com", "REVOKE_CERTIFICATE", "certificate", certificateNumber);
  return updated;
}

// -------------------------------------------------------------
// TEAMS & WINNERS API
// -------------------------------------------------------------
export function getTeams() {
  initDatabase();
  return getStored(STORAGE_KEYS.TEAMS, initialTeams);
}

export function getWinners() {
  initDatabase();
  return getStored(STORAGE_KEYS.WINNERS, initialWinners);
}

export function updateWinnersStatus(newStatus) {
  const current = getWinners();
  const updated = { ...current, status: newStatus };
  setStored(STORAGE_KEYS.WINNERS, updated);
  logAuditAction("admin@zayacodehub.com", "UPDATE_WINNERS_STATUS", "winners", newStatus);
  return updated;
}

// -------------------------------------------------------------
// AUDIT LOGGING & STATS
// -------------------------------------------------------------
function logAuditAction(actor, action, target_type, target_id, details = {}) {
  const logs = getStored(STORAGE_KEYS.AUDIT_LOGS, []);
  const entry = {
    id: `log-${Date.now()}`,
    timestamp: new Date().toISOString(),
    actor,
    action,
    target_type,
    target_id,
    details
  };
  setStored(STORAGE_KEYS.AUDIT_LOGS, [entry, ...logs].slice(0, 50));

  if (isSupabaseConfigured) {
    supabase.from('audit_logs').insert({
      actor_email: actor,
      action,
      target_type,
      target_id,
      details
    }).then();
  }
}

export function getStats() {
  const participants = getParticipants();
  const teams = getTeams();
  const certificates = getCertificates();

  const totalRegistrations = participants.length;
  const approvedParticipants = participants.filter(p => p.registration_status === "approved").length;
  const selectedTeams = teams.filter(t => t.status === "selected" || t.status === "finalist" || t.status === "winner").length;
  const finalistTeams = teams.filter(t => t.status === "finalist").length;
  const generatedIdCards = participants.filter(p => p.participant_id && p.id_card_status === "valid").length;
  const generatedCertificates = certificates.filter(c => c.status === "valid").length;

  return {
    totalRegistrations,
    approvedParticipants,
    selectedTeams,
    finalistTeams,
    generatedIdCards,
    generatedCertificates
  };
}
