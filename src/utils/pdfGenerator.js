import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * Capture an HTML DOM element and download as a High-Res PNG
 */
export async function downloadElementAsPng(elementId, fileName = 'download.png') {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element #${elementId} not found`);
    return;
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 3, // High DPI for print-quality sharpness
      useCORS: true,
      backgroundColor: null,
      logging: false
    });

    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = fileName;
    link.click();
  } catch (err) {
    console.error("PNG export error:", err);
  }
}

/**
 * Capture an ID Card element and download as a Printable PDF
 */
export async function downloadIdCardAsPdf(elementId, fileName = 'ZAYATHON_ID_CARD.pdf') {
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    const canvas = await html2canvas(element, {
      scale: 3,
      useCORS: true,
      backgroundColor: '#080811',
      logging: false
    });

    const imgData = canvas.toDataURL('image/png');
    // Standard ID card size: 85.6mm x 53.98mm (CR80) or portrait layout
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [100, 150]
    });

    pdf.addImage(imgData, 'PNG', 10, 10, 80, 130);
    pdf.save(fileName);
  } catch (err) {
    console.error("ID Card PDF export error:", err);
  }
}

/**
 * Capture an official A4 Certificate element and export as high-res Landscape PDF
 */
export async function downloadCertificateAsPdf(elementId, fileName = 'ZAYATHON_CERTIFICATE.pdf') {
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    const canvas = await html2canvas(element, {
      scale: 2.5,
      useCORS: true,
      backgroundColor: '#080811',
      logging: false
    });

    const imgData = canvas.toDataURL('image/png');
    // Standard A4 Landscape: 297mm x 210mm
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    pdf.addImage(imgData, 'PNG', 0, 0, 297, 210);
    pdf.save(fileName);
  } catch (err) {
    console.error("Certificate PDF export error:", err);
  }
}

