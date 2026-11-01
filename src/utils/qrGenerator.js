import QRCode from 'qrcode';

/**
 * Generate a high-contrast QR code as a base64 Data URL
 * @param {string} text - URL or text to encode
 * @returns {Promise<string>} Data URL
 */
export async function generateQrDataUrl(text) {
  try {
    return await QRCode.toDataURL(text, {
      width: 256,
      margin: 1,
      color: {
        dark: '#080811',
        light: '#FFFFFF'
      },
      errorCorrectionLevel: 'H'
    });
  } catch (err) {
    console.error("QR Code Generation Error:", err);
    return "";
  }
}

/**
 * Build absolute verification link
 */
export function getParticipantVerificationUrl(participantId) {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://zayathon.zayacodehub.com';
  return `${origin}/verify/participant/${encodeURIComponent(participantId)}`;
}

export function getCertificateVerificationUrl(certificateNumber) {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://zayathon.zayacodehub.com';
  return `${origin}/verify/certificate/${encodeURIComponent(certificateNumber)}`;
}

