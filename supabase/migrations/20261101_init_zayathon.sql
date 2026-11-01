-- ==============================================================================
-- ZAYATHON 2.0 — SUPABASE POSTGRESQL DATABASE SCHEMA & RLS POLICIES
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TEAMS TABLE
CREATE TABLE IF NOT EXISTS public.teams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    team_id VARCHAR(50) UNIQUE NOT NULL,
    team_name VARCHAR(255) NOT NULL,
    project_title VARCHAR(255),
    description TEXT,
    track VARCHAR(100) NOT NULL,
    technologies TEXT[],
    github_url TEXT,
    demo_url TEXT,
    publication_status VARCHAR(50) DEFAULT 'draft' CHECK (publication_status IN ('draft', 'selected', 'finalist', 'winner')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PARTICIPANTS TABLE
CREATE TABLE IF NOT EXISTS public.participants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    participant_id VARCHAR(50) UNIQUE, -- e.g. ZAYA26-0001
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    institution VARCHAR(255),
    photograph_url TEXT,
    team_id VARCHAR(50) REFERENCES public.teams(team_id) ON DELETE SET NULL,
    track VARCHAR(100) NOT NULL,
    role VARCHAR(100) DEFAULT 'Hacker',
    registration_status VARCHAR(50) DEFAULT 'pending' CHECK (registration_status IN ('pending', 'approved', 'rejected')),
    attendance_status VARCHAR(50) DEFAULT 'registered' CHECK (attendance_status IN ('registered', 'checked_in', 'completed')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TEAM MEMBERS JUNCTION TABLE
CREATE TABLE IF NOT EXISTS public.team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    team_id VARCHAR(50) NOT NULL REFERENCES public.teams(team_id) ON DELETE CASCADE,
    participant_id VARCHAR(50) NOT NULL REFERENCES public.participants(participant_id) ON DELETE CASCADE,
    role VARCHAR(100) DEFAULT 'Member',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(team_id, participant_id)
);

-- 5. DIGITAL ID CARDS TABLE
CREATE TABLE IF NOT EXISTS public.id_cards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    participant_id VARCHAR(50) UNIQUE NOT NULL REFERENCES public.participants(participant_id) ON DELETE CASCADE,
    card_number VARCHAR(100) UNIQUE NOT NULL,
    verification_token VARCHAR(255) UNIQUE NOT NULL,
    issue_date TIMESTAMPTZ DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'valid' CHECK (status IN ('valid', 'revoked')),
    storage_path TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. CERTIFICATES TABLE
CREATE TABLE IF NOT EXISTS public.certificates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    participant_id VARCHAR(50) NOT NULL REFERENCES public.participants(participant_id) ON DELETE CASCADE,
    certificate_number VARCHAR(100) UNIQUE NOT NULL,
    certificate_type VARCHAR(100) NOT NULL CHECK (certificate_type IN (
        'Participation', 'Achievement', 'Winner', 'Runner-up', 
        'Finalist', 'Special Award', 'Mentor', 'Volunteer', 'Organizer'
    )),
    award_category VARCHAR(150),
    issue_date TIMESTAMPTZ DEFAULT NOW(),
    verification_token VARCHAR(255) UNIQUE NOT NULL,
    storage_path TEXT,
    status VARCHAR(50) DEFAULT 'valid' CHECK (status IN ('valid', 'revoked')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(participant_id, certificate_type)
);

-- 7. ADMIN USERS TABLE
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) DEFAULT 'organizer' CHECK (role IN ('organizer', 'super_admin')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. AUDIT LOGS FOR ADMINISTRATIVE ACTIONS
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_email VARCHAR(255) NOT NULL,
    action VARCHAR(100) NOT NULL,
    target_type VARCHAR(100) NOT NULL,
    target_id VARCHAR(100),
    details JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. INDEXES FOR HIGH-PERFORMANCE SEARCH & VERIFICATION
CREATE INDEX IF NOT EXISTS idx_participants_participant_id ON public.participants(participant_id);
CREATE INDEX IF NOT EXISTS idx_participants_email ON public.participants(email);
CREATE INDEX IF NOT EXISTS idx_participants_team_id ON public.participants(team_id);
CREATE INDEX IF NOT EXISTS idx_id_cards_verification_token ON public.id_cards(verification_token);
CREATE INDEX IF NOT EXISTS idx_certificates_cert_number ON public.certificates(certificate_number);
CREATE INDEX IF NOT EXISTS idx_certificates_verification_token ON public.certificates(verification_token);

-- 10. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.id_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Public can view published teams
CREATE POLICY "Public can view published teams"
ON public.teams FOR SELECT
USING (publication_status IN ('selected', 'finalist', 'winner'));

-- Public verification for ID Cards
CREATE POLICY "Public can verify ID cards by token"
ON public.id_cards FOR SELECT
USING (true);

-- Public verification for Certificates
CREATE POLICY "Public can verify certificates by certificate_number"
ON public.certificates FOR SELECT
USING (true);

-- Public can read verified participant name & ID for public verification
CREATE POLICY "Public can view verified participants"
ON public.participants FOR SELECT
USING (registration_status = 'approved');

