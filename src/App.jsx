import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TeamsPage from './pages/TeamsPage';
import ParticipantPortal from './pages/ParticipantPortal';
import VerifyParticipant from './pages/VerifyParticipant';
import VerifyCertificate from './pages/VerifyCertificate';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Website */}
        <Route path="/" element={<HomePage />} />
        
        {/* Teams, Finalists & Winners Showcase */}
        <Route path="/teams" element={<TeamsPage />} />
        
        {/* Automated Participant Portal */}
        <Route path="/participant" element={<ParticipantPortal />} />
        
        {/* Public QR Verification Endpoints */}
        <Route path="/verify/participant/:participantId" element={<VerifyParticipant />} />
        <Route path="/verify/certificate/:certificateId" element={<VerifyCertificate />} />
        
        {/* Organizer Administration & Document Pipeline */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
