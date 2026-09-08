import jsPDF from 'jspdf';
import { toJpeg } from 'html-to-image';

export interface PDFProgressCallback {
  (current: number, total: number, message: string): void;
}

/**
 * Downloads the full 10-page A4 Portrait proposal directly as a PDF document.
 * Uses html-to-image which natively supports modern CSS (OKLCH, modern gradients, CSS variables).
 */
export async function downloadProposalPDFDirect(
  onProgress?: PDFProgressCallback
): Promise<boolean> {
  const totalPages = 10;
  
  try {
    onProgress?.(0, totalPages, 'Initializing A4 Portrait PDF Engine...');

    // Standard A4 portrait dimensions in millimeters (210mm x 297mm)
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
      onProgress?.(pageNum, totalPages, `Rendering Page ${pageNum} of ${totalPages}...`);

      // First check if offscreen render page exists, or fall back to visible page
      let targetEl = document.getElementById(`pdf-render-page-${pageNum}`);
      if (!targetEl) {
        targetEl = document.getElementById(`proposal-page-${pageNum}`);
      }

      if (!targetEl) {
        console.warn(`Page element for page ${pageNum} not found.`);
        continue;
      }

      const isCoverPage = pageNum === 1;

      // Render image with html-to-image at high quality (pixelRatio: 2 for 300dpi crispness)
      const imgData = await toJpeg(targetEl as HTMLElement, {
        quality: 0.95,
        pixelRatio: 2,
        width: 794,
        height: 1123,
        backgroundColor: isCoverPage ? '#020617' : '#ffffff',
        cacheBust: false,
        skipFonts: true,
        fontEmbedCSS: '',
      });

      // If not first page, add a new A4 portrait page
      if (pageNum > 1) {
        pdf.addPage('a4', 'portrait');
      }

      // Exact A4 dimensions: 210mm wide x 297mm high
      pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297, undefined, 'FAST');
    }

    onProgress?.(totalPages, totalPages, 'Finalizing & Saving Document...');
    
    // Save PDF directly to user's device
    pdf.save('TM_Pick_n_Pay_Marketplace_Business_Proposal_2026.pdf');
    
    onProgress?.(totalPages, totalPages, 'Download Complete!');
    return true;
  } catch (error) {
    console.error('Failed to generate PDF directly:', error);
    onProgress?.(0, totalPages, 'Opening print dialog fallback...');
    // Fallback to window.print()
    setTimeout(() => {
      window.print();
    }, 400);
    return false;
  }
}

/**
 * Downloads the full-text Strategic Proposal Document directly as an A4 Portrait PDF.
 * Renders discrete, calibrated A4 pages (text-doc-page-1 to 8) to guarantee zero table cutoffs and no scrollbars.
 */
export async function downloadTextDocumentPDFDirect(
  onProgress?: PDFProgressCallback
): Promise<boolean> {
  const totalPages = 8;
  try {
    onProgress?.(0, totalPages, 'Initializing A4 Text Document Engine...');

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
      onProgress?.(
        pageNum,
        totalPages,
        `Rendering A4 Document Page ${pageNum} of ${totalPages}...`
      );

      const targetEl = document.getElementById(`text-doc-page-${pageNum}`);
      if (!targetEl) {
        console.warn(`Page element text-doc-page-${pageNum} not found.`);
        continue;
      }

      const imgData = await toJpeg(targetEl as HTMLElement, {
        quality: 0.96,
        pixelRatio: 2,
        width: 794,
        height: 1123,
        backgroundColor: '#ffffff',
        cacheBust: false,
        skipFonts: true,
        fontEmbedCSS: '',
      });

      if (pageNum > 1) {
        pdf.addPage('a4', 'portrait');
      }

      // Exactly 210mm wide by 297mm high (A4 Portrait)
      pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297, undefined, 'FAST');
    }

    onProgress?.(totalPages, totalPages, 'Finalizing & Saving A4 PDF File...');
    pdf.save('TM_Pick_n_Pay_Strategic_Proposal_Document_2026.pdf');

    onProgress?.(totalPages, totalPages, 'A4 PDF Download Complete!');
    return true;
  } catch (error) {
    console.error('Failed to generate text document PDF:', error);
    onProgress?.(0, totalPages, 'Opening print dialog fallback...');
    setTimeout(() => {
      window.print();
    }, 400);
    return false;
  }
}

/**
 * Downloads the complete 14-slide Executive Slide Deck directly as an A4 Landscape PDF document.
 * Calibrated for standard 297mm x 210mm landscape pages at 300dpi equivalent pixel ratio.
 */
export async function downloadSlideDeckPDFDirect(
  totalSlides: number = 14,
  onProgress?: PDFProgressCallback
): Promise<boolean> {
  try {
    onProgress?.(0, totalSlides, 'Initializing A4 Landscape Slide Deck PDF Engine...');

    // Standard A4 landscape dimensions: 297mm width x 210mm height
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    for (let slideNum = 1; slideNum <= totalSlides; slideNum++) {
      onProgress?.(
        slideNum,
        totalSlides,
        `Rendering Slide ${slideNum} of ${totalSlides} (A4 Landscape)...`
      );

      // Look up offscreen high-res render slide element, or fallback to visible slide element
      let targetEl = document.getElementById(`slide-deck-render-${slideNum}`);
      if (!targetEl) {
        targetEl = document.getElementById(`slide-deck-page-${slideNum}`);
      }

      if (!targetEl) {
        console.warn(`Slide element for slide ${slideNum} not found.`);
        continue;
      }

      // Check if cover slide or dark theme slide
      const isDarkSlide = slideNum === 1 || slideNum === 10 || slideNum === 14;

      // Render image with html-to-image (pixelRatio: 2 for sharp 300dpi output)
      // Standard A4 Landscape at 96 DPI: 1123px x 794px
      const imgData = await toJpeg(targetEl as HTMLElement, {
        quality: 0.96,
        pixelRatio: 2,
        width: 1123,
        height: 794,
        backgroundColor: isDarkSlide ? '#0a192f' : '#f8fafc',
        cacheBust: false,
        skipFonts: true,
        fontEmbedCSS: '',
      });

      if (slideNum > 1) {
        pdf.addPage('a4', 'landscape');
      }

      // Exact A4 landscape dimensions: 297mm width x 210mm height
      pdf.addImage(imgData, 'JPEG', 0, 0, 297, 210, undefined, 'FAST');
    }

    onProgress?.(totalSlides, totalSlides, 'Finalizing & Compiling Slide Deck...');
    pdf.save('TM_Pick_n_Pay_Express_Executive_Slide_Deck_2026.pdf');

    onProgress?.(totalSlides, totalSlides, 'Slide Deck Download Complete!');
    return true;
  } catch (error) {
    console.error('Failed to generate slide deck PDF:', error);
    onProgress?.(0, totalSlides, 'Opening print dialog fallback...');
    setTimeout(() => {
      window.print();
    }, 400);
    return false;
  }
}

