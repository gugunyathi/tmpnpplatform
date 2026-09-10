import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  Header,
  Footer,
  PageNumber,
} from 'docx';
import { RAW_PROPOSAL_TEXT } from '../components/TextOnlyDocumentView';

/**
 * Generates and downloads a formatted Microsoft Word (.docx) document
 * for the TM Pick n Pay Strategic Business Case Proposal.
 */
export async function downloadProposalDocx(): Promise<boolean> {
  try {
    const rawSections = RAW_PROPOSAL_TEXT.split(/________________\n*/);

    const docParagraphs: (Paragraph | Table)[] = [];

    // Title Block
    docParagraphs.push(
      new Paragraph({
        text: 'CONFIDENTIAL EXECUTIVE ADVISORY MEMORANDUM',
        alignment: AlignmentType.RIGHT,
        children: [
          new TextRun({
            text: 'DOC REF: DOC-TMPNP-EXEC-2026-V2.4 | SEPTEMBER 2026',
            size: 18,
            color: '64748B',
            font: 'Arial',
          }),
        ],
        spacing: { after: 200 },
      })
    );

    docParagraphs.push(
      new Paragraph({
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.LEFT,
        children: [
          new TextRun({
            text: 'Strategic Evaluation and Commercial Business Case',
            bold: true,
            size: 44,
            color: '991B1B', // Red 800
            font: 'Arial',
          }),
        ],
        spacing: { before: 200, after: 150 },
      })
    );

    docParagraphs.push(
      new Paragraph({
        children: [
          new TextRun({
            text: 'Positioning TM Pick n Pay as the Foundational Fulfillment Engine for an Open Multi-Tenant Marketplace and Electric Vehicle Last-Mile Logistics Grid',
            italics: true,
            size: 26,
            color: '334155',
            font: 'Arial',
          }),
        ],
        spacing: { after: 300 },
      })
    );

    // Metadata Table
    const tableBorder = {
      style: BorderStyle.SINGLE,
      size: 1,
      color: 'CBD5E1',
    };

    const metadataTable = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: { size: 50, type: WidthType.PERCENTAGE },
              borders: { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({ text: 'Prepared For: ', bold: true, size: 20, font: 'Arial' }),
                    new TextRun({ text: 'Board of Directors & Executive Committee, TM Pick n Pay (Meikles Retail Limited)', size: 20, font: 'Arial' }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: { size: 50, type: WidthType.PERCENTAGE },
              borders: { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({ text: 'Date: ', bold: true, size: 20, font: 'Arial' }),
                    new TextRun({ text: 'September 2026', size: 20, font: 'Arial' }),
                  ],
                }),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              width: { size: 50, type: WidthType.PERCENTAGE },
              borders: { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({ text: 'Prepared By: ', bold: true, size: 20, font: 'Arial' }),
                    new TextRun({ text: 'Lead Enterprise Architecture Consortium', size: 20, font: 'Arial' }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: { size: 50, type: WidthType.PERCENTAGE },
              borders: { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({ text: 'Classification: ', bold: true, size: 20, font: 'Arial' }),
                    new TextRun({ text: 'Strictly Confidential — Board Review Only', color: 'B91C1C', size: 20, font: 'Arial', bold: true }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    });

    docParagraphs.push(metadataTable);
    docParagraphs.push(new Paragraph({ spacing: { after: 300 } }));

    // Process Content Sections
    rawSections.forEach((sectionText, sIndex) => {
      const trimmed = sectionText.trim();
      if (!trimmed) return;

      const lines = trimmed.split('\n').map((l) => l.trim()).filter(Boolean);
      if (lines.length === 0) return;

      // Skip the metadata block if it's in the first section since we rendered the header
      let startIdx = 0;
      let title = lines[0];

      if (sIndex === 0) {
        // Find first real heading
        const titleIndex = lines.findIndex((l) => l.includes('Executive Memorandum'));
        if (titleIndex !== -1) {
          title = lines[titleIndex];
          startIdx = titleIndex + 1;
        } else {
          startIdx = 1;
        }
      } else {
        startIdx = 1;
      }

      // Add Section Heading
      docParagraphs.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [
            new TextRun({
              text: title,
              bold: true,
              size: 30,
              color: '991B1B', // Deep Red
              font: 'Arial',
            }),
          ],
          spacing: { before: 300, after: 150 },
        })
      );

      // Body Paragraphs
      for (let i = startIdx; i < lines.length; i++) {
        const line = lines[i];

        // Bullet Point
        if (line.startsWith('*')) {
          const bulletText = line.substring(1).trim();
          docParagraphs.push(
            new Paragraph({
              bullet: { level: 0 },
              children: [
                new TextRun({
                  text: bulletText,
                  size: 22,
                  font: 'Arial',
                }),
              ],
              spacing: { after: 100 },
            })
          );
        } else if (line.startsWith('Pillar 0') || line.startsWith('Phase ') || line.startsWith('Option ')) {
          // Subheadings
          docParagraphs.push(
            new Paragraph({
              heading: HeadingLevel.HEADING_2,
              children: [
                new TextRun({
                  text: line,
                  bold: true,
                  size: 24,
                  color: '1E293B',
                  font: 'Arial',
                }),
              ],
              spacing: { before: 200, after: 100 },
            })
          );
        } else {
          // Normal Body Text
          docParagraphs.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: line,
                  size: 22,
                  font: 'Arial',
                }),
              ],
              alignment: AlignmentType.JUSTIFIED,
              spacing: { after: 150, line: 320 },
            })
          );
        }
      }
    });

    // Formal Sign-Off Table
    docParagraphs.push(new Paragraph({ spacing: { before: 400, after: 150 } }));
    docParagraphs.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: '*** END OF STRATEGIC EVALUATION & COMMERCIAL BUSINESS CASE ***',
            bold: true,
            size: 18,
            color: '64748B',
            font: 'Arial',
          }),
        ],
        spacing: { after: 250 },
      })
    );

    const signoffTable = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: { size: 50, type: WidthType.PERCENTAGE },
              borders: { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({ text: 'FOR: TM PICK N PAY (MEIKLES RETAIL LIMITED)', bold: true, size: 18, font: 'Arial' }),
                  ],
                  spacing: { after: 80 },
                }),
                new Paragraph({
                  children: [
                    new TextRun({ text: 'Executive Director / Managing Director\n\n\n________________________________\nSignature & Date', size: 18, font: 'Arial', color: '475569' }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: { size: 50, type: WidthType.PERCENTAGE },
              borders: { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({ text: 'FOR: PLATFORM INFRASTRUCTURE CONSORTIUM', bold: true, size: 18, font: 'Arial' }),
                  ],
                  spacing: { after: 80 },
                }),
                new Paragraph({
                  children: [
                    new TextRun({ text: 'Lead Enterprise Architect & Commercial Lead\n\n\n________________________________\nSignature & Date', size: 18, font: 'Arial', color: '475569' }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    });

    docParagraphs.push(signoffTable);

    // Build the Document with Header, Footer and Margins
    const doc = new Document({
      sections: [
        {
          properties: {
            page: {
              margin: {
                top: 1440, // 1 inch = 1440 twips (72 pt * 20)
                right: 1440,
                bottom: 1440,
                left: 1440,
              },
            },
          },
          headers: {
            default: new Header({
              children: [
                new Paragraph({
                  alignment: AlignmentType.RIGHT,
                  children: [
                    new TextRun({
                      text: 'TM Pick n Pay Marketplace Proposal · Strictly Confidential',
                      size: 16,
                      color: '94A3B8',
                      font: 'Arial',
                    }),
                  ],
                }),
              ],
            }),
          },
          footers: {
            default: new Footer({
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: 'Page ',
                      size: 16,
                      color: '94A3B8',
                      font: 'Arial',
                    }),
                    new TextRun({
                      children: [PageNumber.CURRENT],
                      size: 16,
                      color: '94A3B8',
                      font: 'Arial',
                    }),
                    new TextRun({
                      text: ' of ',
                      size: 16,
                      color: '94A3B8',
                      font: 'Arial',
                    }),
                    new TextRun({
                      children: [PageNumber.TOTAL_PAGES],
                      size: 16,
                      color: '94A3B8',
                      font: 'Arial',
                    }),
                  ],
                }),
              ],
            }),
          },
          children: docParagraphs,
        },
      ],
    });

    // Generate Blob and trigger download
    const blob = await Packer.toBlob(doc);
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'TM_Pick_n_Pay_Strategic_Business_Case_Proposal_2026.docx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);

    return true;
  } catch (error) {
    console.error('Failed to generate DOCX document:', error);
    return false;
  }
}
