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

/**
 * Generates and downloads a clean, multi-page text document PDF
 * formatted specifically for executive reading with full pagination,
 * table of contents, headers, footers, and signature blocks.
 */
export async function downloadTextOnlyPDF(
  proposalText: string,
  onProgress?: PDFProgressCallback
): Promise<boolean> {
  try {
    onProgress?.(1, 100, 'Formatting Executive Text Document...');

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;
    let y = margin;

    const addHeaderFooter = (pageNum: number) => {
      // Header
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(8);
      pdf.setTextColor(100, 116, 139);
      pdf.text('TM PICK N PAY · STRATEGIC EVALUATION & COMMERCIAL BUSINESS CASE', margin, 12);
      pdf.setFont('helvetica', 'normal');
      pdf.text('DOC-TMPNP-EXEC-2026-V2.4', pageWidth - margin, 12, { align: 'right' });
      
      pdf.setDrawColor(226, 232, 240);
      pdf.setLineWidth(0.3);
      pdf.line(margin, 14, pageWidth - margin, 14);

      // Footer
      pdf.setDrawColor(226, 232, 240);
      pdf.setLineWidth(0.3);
      pdf.line(margin, pageHeight - 14, pageWidth - margin, pageHeight - 14);

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8);
      pdf.setTextColor(148, 163, 184);
      pdf.text('Strictly Confidential — For Internal Board Review Only', margin, pageHeight - 10);
      pdf.text(`Page ${pageNum}`, pageWidth - margin, pageHeight - 10, { align: 'right' });
    };

    let currentPage = 1;
    addHeaderFooter(currentPage);
    y = 22;

    const checkPageBreak = (neededHeight: number) => {
      if (y + neededHeight > pageHeight - margin - 5) {
        pdf.addPage('a4', 'portrait');
        currentPage++;
        addHeaderFooter(currentPage);
        y = 22;
      }
    };

    // Document Title Block
    pdf.setFillColor(239, 68, 68); // Red
    pdf.rect(margin, y, 4, 18, 'F');

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(16);
    pdf.setTextColor(153, 27, 27);
    const titleLines = pdf.splitTextToSize('Strategic Evaluation and Commercial Business Case', contentWidth - 8);
    pdf.text(titleLines, margin + 8, y + 6);
    y += 14;

    pdf.setFont('helvetica', 'italic');
    pdf.setFontSize(9.5);
    pdf.setTextColor(51, 65, 85);
    const subtitleLines = pdf.splitTextToSize(
      'Positioning TM Pick n Pay as the Foundational Fulfillment Engine for an Open Multi-Tenant Marketplace and Electric Vehicle Last-Mile Logistics Grid',
      contentWidth
    );
    pdf.text(subtitleLines, margin, y);
    y += subtitleLines.length * 4.5 + 4;

    // Metadata Box
    pdf.setFillColor(248, 250, 252);
    pdf.setDrawColor(203, 213, 225);
    pdf.setLineWidth(0.4);
    pdf.roundedRect(margin, y, contentWidth, 22, 2, 2, 'FD');

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8.5);
    pdf.setTextColor(15, 23, 42);
    pdf.text('Prepared For:', margin + 4, y + 6);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Board of Directors & Executive Committee, TM Pick n Pay', margin + 28, y + 6);

    pdf.setFont('helvetica', 'bold');
    pdf.text('Date:', margin + contentWidth - 45, y + 6);
    pdf.setFont('helvetica', 'normal');
    pdf.text('September 2026', margin + contentWidth - 33, y + 6);

    pdf.setFont('helvetica', 'bold');
    pdf.text('Prepared By:', margin + 4, y + 12);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Lead Enterprise Architecture Consortium', margin + 28, y + 12);

    pdf.setFont('helvetica', 'bold');
    pdf.text('Classification:', margin + 4, y + 18);
    pdf.setTextColor(185, 28, 28);
    pdf.text('Strictly Confidential — For Internal Board Review Only', margin + 28, y + 18);

    y += 28;

    // Process Content Sections
    const sections = proposalText.split(/________________\n*/);

    sections.forEach((sec, sIdx) => {
      const trimmed = sec.trim();
      if (!trimmed) return;

      const lines = trimmed.split('\n').map((l) => l.trim()).filter(Boolean);
      if (lines.length === 0) return;

      let startIdx = 1;
      let title = lines[0];

      if (sIdx === 0) {
        const titleIndex = lines.findIndex((l) => l.includes('Executive Memorandum'));
        if (titleIndex !== -1) {
          title = lines[titleIndex];
          startIdx = titleIndex + 1;
        }
      }

      // Check space for Section Header
      checkPageBreak(18);
      
      pdf.setDrawColor(220, 38, 38);
      pdf.setLineWidth(0.8);
      pdf.line(margin, y, margin + 12, y);
      y += 4;

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(12);
      pdf.setTextColor(153, 27, 27);
      pdf.text(title, margin, y);
      y += 6;

      for (let i = startIdx; i < lines.length; i++) {
        const line = lines[i];

        if (line.startsWith('*')) {
          // Bullet point
          const bulletText = line.substring(1).trim();
          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(9.5);
          pdf.setTextColor(30, 41, 59);
          
          const wrapped = pdf.splitTextToSize(bulletText, contentWidth - 8);
          checkPageBreak(wrapped.length * 4.5 + 2);
          
          pdf.setFillColor(220, 38, 38);
          pdf.circle(margin + 2.5, y - 1, 0.8, 'F');
          pdf.text(wrapped, margin + 6, y);
          y += wrapped.length * 4.5 + 2;
        } else if (line.startsWith('Pillar 0') || line.startsWith('Phase ') || line.startsWith('Option ')) {
          // Sub-header
          checkPageBreak(12);
          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(10.5);
          pdf.setTextColor(15, 23, 42);
          pdf.text(line, margin, y + 2);
          y += 7;
        } else {
          // Standard Paragraph
          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(9.5);
          pdf.setTextColor(30, 41, 59);
          
          const wrapped = pdf.splitTextToSize(line, contentWidth);
          checkPageBreak(wrapped.length * 4.5 + 4);
          
          pdf.text(wrapped, margin, y, { align: 'justify', maxWidth: contentWidth });
          y += wrapped.length * 4.5 + 3.5;
        }
      }

      y += 4; // Spacing between sections
    });

    // Formal Sign-off Box
    checkPageBreak(40);
    y += 4;

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8.5);
    pdf.setTextColor(100, 116, 139);
    pdf.text('*** END OF STRATEGIC EVALUATION & COMMERCIAL BUSINESS CASE MEMORANDUM ***', pageWidth / 2, y, { align: 'center' });
    y += 8;

    const boxWidth = (contentWidth - 6) / 2;
    pdf.setDrawColor(203, 213, 225);
    pdf.setLineWidth(0.4);
    pdf.setFillColor(248, 250, 252);

    // Left sign-off
    pdf.roundedRect(margin, y, boxWidth, 28, 1, 1, 'FD');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8);
    pdf.setTextColor(15, 23, 42);
    pdf.text('FOR: TM PICK N PAY (MEIKLES RETAIL LIMITED)', margin + 4, y + 5);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(100, 116, 139);
    pdf.text('Executive Director / Managing Director', margin + 4, y + 10);
    pdf.setDrawColor(148, 163, 184);
    pdf.line(margin + 4, y + 21, margin + boxWidth - 4, y + 21);
    pdf.setFontSize(7);
    pdf.text('Signature & Date', margin + 4, y + 25);

    // Right sign-off
    pdf.setDrawColor(203, 213, 225);
    pdf.roundedRect(margin + boxWidth + 6, y, boxWidth, 28, 1, 1, 'FD');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8);
    pdf.setTextColor(15, 23, 42);
    pdf.text('FOR: PLATFORM INFRASTRUCTURE CONSORTIUM', margin + boxWidth + 10, y + 5);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(100, 116, 139);
    pdf.text('Lead Enterprise Architect & Commercial Lead', margin + boxWidth + 10, y + 10);
    pdf.setDrawColor(148, 163, 184);
    pdf.line(margin + boxWidth + 10, y + 21, margin + contentWidth - 4, y + 21);
    pdf.setFontSize(7);
    pdf.text('Signature & Date', margin + boxWidth + 10, y + 25);

    onProgress?.(100, 100, 'Saving Document PDF...');
    pdf.save('TM_Pick_n_Pay_Strategic_Business_Case_Text_Document.pdf');

    return true;
  } catch (error) {
    console.error('Failed to generate Text Only PDF:', error);
    return false;
  }
}


