import { useState } from 'react';
import { eventConfig } from '../config/eventConfig';

export function useRegistrationAction() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openRegistration = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    
    const url = eventConfig.registrationUrl?.trim();
    if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      setIsModalOpen(true);
    }
  };

  const closeRegistration = () => setIsModalOpen(false);

  return {
    isModalOpen,
    openRegistration,
    closeRegistration
  };
}

