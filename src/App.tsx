import React, { useState, useEffect } from 'react';
import {
  Printer,
  FileText,
  Sliders,
  Presentation,
  BookOpen,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Download,
  Share2,
  CheckCircle,
  Eye,
  ListFilter,
  Sparkles,
  Loader2,
  ChevronDown,
  AlignLeft
} from 'lucide-react';
import { Page1Cover } from './components/pages/Page1Cover';
import { Page2ExecutiveSummary } from './components/pages/Page2ExecutiveSummary';
import { Page3MacroOpportunity } from './components/pages/Page3MacroOpportunity';
import { Page4ArchitectureDataLake } from './components/pages/Page4ArchitectureDataLake';
import { Page5InformalTraderWholesale } from './components/pages/Page5InformalTraderWholesale';
import { Page6OwnedFleetLastMile } from './components/pages/Page6OwnedFleetLastMile';
import { Page7BasketComparisonJourney } from './components/pages/Page7BasketComparisonJourney';
import { Page8FinancialProjections } from './components/pages/Page8FinancialProjections';
import { Page9CommercialOptions } from './components/pages/Page9CommercialOptions';
import { Page10RoadmapPilot } from './components/pages/Page10RoadmapPilot';
import { FinancialSimulator } from './components/FinancialSimulator';
import { ExecutiveSummaryView } from './components/ExecutiveSummaryView';
import { ExecutiveDeckView } from './components/ExecutiveDeckView';
import { ProposalDocumentView } from './components/ProposalDocumentView';
import { TextOnlyDocumentView } from './components/TextOnlyDocumentView';
import { TMPicknPaySquareLogo } from './components/TMPicknPaySquareLogo';
import { PROPOSAL_METADATA } from './data/proposalData';
import {
  downloadProposalPDFDirect,
  downloadSlideDeckPDFDirect,
  downloadTextDocumentPDFDirect
} from './utils/pdfGenerator';

type ViewTab = 'a4-document' | 'text-doc' | 'text-only-doc' | 'simulator' | 'slides' | 'summary';

export default function App() {
  const [activeTab, setActiveTab] = useState<ViewTab>('a4-document');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [activePage, setActivePage] = useState<number>(1);
  const [singlePageView, setSinglePageView] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  
  // PDF Generation State
  const [isGeneratingPDF, setIsGeneratingPDF] = useState<boolean>(false);
  const [pdfProgress, setPdfProgress] = useState<{ current: number; total: number; message: string } | null>(null);
  const [showExportMenu, setShowExportMenu] = useState<boolean>(false);

  const totalPages = 10;

  const handleDirectDownload = async () => {
    setShowExportMenu(false);
    setIsGeneratingPDF(true);

    if (activeTab === 'slides') {
      setPdfProgress({ current: 0, total: 14, message: 'Initializing A4 Landscape Slide Deck Engine...' });
      try {
        await downloadSlideDeckPDFDirect(14, (current, total, message) => {
          setPdfProgress({ current, total, message });
        });
      } catch (err) {
        console.error('Download error:', err);
      } finally {
        setTimeout(() => {
          setIsGeneratingPDF(false);
          setPdfProgress(null);
        }, 800);
      }
      return;
    }

    if (activeTab === 'text-doc' || activeTab === 'text-only-doc') {
      setPdfProgress({ current: 0, total: 8, message: 'Initializing A4 Document Engine...' });
      try {
        await downloadTextDocumentPDFDirect((current, total, message) => {
          setPdfProgress({ current, total, message });
        });
      } catch (err) {
        console.error('Download error:', err);
      } finally {
        setTimeout(() => {
          setIsGeneratingPDF(false);
          setPdfProgress(null);
        }, 800);
      }
      return;
    }

    setPdfProgress({ current: 0, total: 10, message: 'Initializing A4 Portrait Document Engine...' });
    try {
      await downloadProposalPDFDirect((current, total, message) => {
        setPdfProgress({ current, total, message });
      });
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setTimeout(() => {
        setIsGeneratingPDF(false);
        setPdfProgress(null);
      }, 800);
    }
  };

  const handleDownloadSlideDeck = async () => {
    setShowExportMenu(false);
    setIsGeneratingPDF(true);
    setPdfProgress({ current: 0, total: 14, message: 'Initializing A4 Landscape Slide Deck Engine...' });
    try {
      await downloadSlideDeckPDFDirect(14, (current, total, message) => {
        setPdfProgress({ current, total, message });
      });
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setTimeout(() => {
        setIsGeneratingPDF(false);
        setPdfProgress(null);
      }, 800);
    }
  };

  const handleDownloadTextDoc = async () => {
    setShowExportMenu(false);
    setIsGeneratingPDF(true);
    setPdfProgress({ current: 0, total: 8, message: 'Initializing A4 Document Engine...' });
    try {
      await downloadTextDocumentPDFDirect((current, total, message) => {
        setPdfProgress({ current, total, message });
      });
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setTimeout(() => {
        setIsGeneratingPDF(false);
        setPdfProgress(null);
      }, 800);
    }
  };

  const handlePrint = () => {
    setShowExportMenu(false);
    // If user is on another tab, switch to document mode before printing
    if (activeTab !== 'a4-document') {
      setActiveTab('a4-document');
      setTimeout(() => {
        window.print();
      }, 300);
    } else {
      window.print();
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const pageNames = [
    "Cover Page & Title",
    "Executive Summary & 4 Pillars",
    "Macro Opportunity & Gap",
    "Platform Architecture & Data Lake",
    "Informal Trader Wholesale",
    "Owned Last-Mile Fleet",
    "Basket Comparison & Journey",
    "Financial Model ($61.2M)",
    "Commercial Options (Reseller vs SaaS)",
    "Operational Roadmap & 60-Day Pilot"
  ];

  const scrollToPage = (pageNum: number) => {
    setActivePage(pageNum);
    if (!singlePageView) {
      const el = document.getElementById(`proposal-page-${pageNum}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased">
      {/* Top Header / App Bar (Hidden during Print) */}
      <header className="no-print sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-800 px-4 lg:px-6 py-2.5 shadow-md flex items-center justify-between">
        {/* Left: Branding */}
        <div className="flex items-center space-x-3">
          <TMPicknPaySquareLogo size={38} className="ring-1 ring-white/20 shadow-md" />
          <div className="hidden sm:block h-7 w-px bg-slate-700/80"></div>
          <div className="hidden sm:block">
            <h1 className="text-xs font-bold text-white tracking-tight leading-none">
              Marketplace &amp; Last-Mile Infrastructure Proposal
            </h1>
            <span className="text-[10px] text-slate-400 font-mono">
              A4 Portrait Executive Format · {PROPOSAL_METADATA.documentCode}
            </span>
          </div>
        </div>

        {/* Center: View Switcher Tabs */}
        <nav className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-semibold overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveTab('a4-document')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition whitespace-nowrap ${
              activeTab === 'a4-document'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden md:inline">A4 Pages</span>
            <span className="md:hidden">A4</span>
          </button>

          <button
            onClick={() => setActiveTab('text-doc')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition whitespace-nowrap ${
              activeTab === 'text-doc'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Proposal Document (A4)</span>
            <span className="md:hidden">A4 Doc</span>
          </button>

          <button
            onClick={() => setActiveTab('text-only-doc')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition whitespace-nowrap ${
              activeTab === 'text-only-doc'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <AlignLeft className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Text Only Document</span>
            <span className="md:hidden">Text Only</span>
          </button>

          <button
            onClick={() => setActiveTab('simulator')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition whitespace-nowrap ${
              activeTab === 'simulator'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Financial Simulator</span>
            <span className="md:hidden">Simulator</span>
          </button>

          <button
            onClick={() => setActiveTab('slides')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition whitespace-nowrap ${
              activeTab === 'slides'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Presentation className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Slide Deck</span>
            <span className="md:hidden">Slides</span>
          </button>

          <button
            onClick={() => setActiveTab('summary')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition whitespace-nowrap ${
              activeTab === 'summary'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Executive Brief</span>
            <span className="md:hidden">Brief</span>
          </button>
        </nav>

        {/* Right: Print / Export / Actions */}
        <div className="flex items-center space-x-2 relative">
          {/* Main Direct PDF Download Button */}
          <button
            onClick={handleDirectDownload}
            disabled={isGeneratingPDF}
            className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow transition"
            title="Download Full 10-Page A4 PDF directly"
          >
            {isGeneratingPDF ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Download className="w-3.5 h-3.5" />
            )}
            <span className="hidden sm:inline">
              {isGeneratingPDF
                ? 'Generating PDF...'
                : activeTab === 'slides'
                ? 'Download Slide Deck (A4 PDF)'
                : activeTab === 'text-doc' || activeTab === 'text-only-doc'
                ? 'Download Document (A4 PDF)'
                : 'Download Full Proposal (PDF)'}
            </span>
            <span className="sm:hidden">PDF</span>
          </button>

          {/* Export Options Dropdown Menu */}
          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              title="More export and print options"
            >
              <Printer className="w-3.5 h-3.5" />
            </button>

            {showExportMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl py-1 z-50 text-xs">
                <button
                  onClick={handleDirectDownload}
                  className="w-full text-left px-3 py-2 hover:bg-slate-800 text-white flex items-center gap-2"
                >
                  <Download className="w-3.5 h-3.5 text-red-400" />
                  <div>
                    <div className="font-semibold">Full 10-Page Proposal PDF</div>
                    <div className="text-[10px] text-slate-400">A4 Portrait Business Case</div>
                  </div>
                </button>

                <button
                  onClick={handleDownloadSlideDeck}
                  className="w-full text-left px-3 py-2 hover:bg-slate-800 text-white flex items-center gap-2 border-t border-slate-800"
                >
                  <Presentation className="w-3.5 h-3.5 text-amber-400" />
                  <div>
                    <div className="font-semibold">14-Slide Executive Deck PDF</div>
                    <div className="text-[10px] text-slate-400">Calibrated A4 Landscape</div>
                  </div>
                </button>

                <button
                  onClick={handleDownloadTextDoc}
                  className="w-full text-left px-3 py-2 hover:bg-slate-800 text-white flex items-center gap-2 border-t border-slate-800"
                >
                  <FileText className="w-3.5 h-3.5 text-emerald-400" />
                  <div>
                    <div className="font-semibold">8-Page Strategic Text Doc PDF</div>
                    <div className="text-[10px] text-slate-400">Zero-Cutoff A4 Document</div>
                  </div>
                </button>

                <button
                  onClick={handlePrint}
                  className="w-full text-left px-3 py-2 hover:bg-slate-800 text-white flex items-center gap-2 border-t border-slate-800"
                >
                  <Printer className="w-3.5 h-3.5 text-blue-400" />
                  <div>
                    <div className="font-semibold">Print / Browser Print Dialog</div>
                    <div className="text-[10px] text-slate-400">Open native print dialog</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          <button
            onClick={handleShare}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            title="Copy Proposal URL"
          >
            {copiedLink ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* PDF Generation Progress Modal / Banner */}
      {isGeneratingPDF && pdfProgress && (
        <div className="no-print fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 max-w-md w-full shadow-2xl text-center">
            <div className="w-12 h-12 rounded-full bg-red-600/20 text-red-500 flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Download className="w-6 h-6" />
            </div>

            <h3 className="text-base font-bold text-white mb-1">
              Generating High-Resolution A4 Proposal
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Rendering all 10 pages in exact A4 portrait format (210mm × 297mm)...
            </p>

            {/* Progress Bar */}
            <div className="w-full bg-slate-800 rounded-full h-2.5 mb-2 overflow-hidden">
              <div
                className="bg-red-600 h-full rounded-full transition-all duration-300"
                style={{
                  width: `${Math.max(5, (pdfProgress.current / pdfProgress.total) * 100)}%`,
                }}
              ></div>
            </div>

            <div className="flex justify-between items-center text-[11px] font-mono text-slate-400">
              <span>{pdfProgress.message}</span>
              <span className="font-bold text-white">
                {Math.round((pdfProgress.current / pdfProgress.total) * 100)}%
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Secondary Controls Bar for Document Mode (Hidden during Print) */}
      {activeTab === 'a4-document' && (
        <div className="no-print bg-slate-900 border-b border-slate-800/80 px-4 py-2 flex flex-wrap items-center justify-between text-xs text-slate-300 gap-3">
          {/* Page Jump Selector */}
          <div className="flex items-center space-x-2">
            <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Page:</span>
            <select
              value={activePage}
              onChange={(e) => scrollToPage(Number(e.target.value))}
              className="bg-slate-800 border border-slate-700 rounded px-2.5 py-1 text-xs text-white focus:outline-none focus:border-red-500 font-medium"
            >
              {pageNames.map((name, i) => (
                <option key={i + 1} value={i + 1}>
                  Page {i + 1}: {name}
                </option>
              ))}
            </select>
          </div>

          {/* View Toggle: Continuous vs Single Page */}
          <div className="flex items-center space-x-2 bg-slate-950 px-2 py-1 rounded border border-slate-800">
            <button
              onClick={() => setSinglePageView(false)}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                !singlePageView ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Continuous (All 10 Pages)
            </button>
            <button
              onClick={() => setSinglePageView(true)}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                singlePageView ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Single Page Focus
            </button>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setZoomLevel((z) => Math.max(70, z - 10))}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-xs font-semibold w-10 text-center">{zoomLevel}%</span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(150, z + 10))}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel(100)}
              className="text-[10px] text-slate-400 hover:text-white ml-1 underline"
            >
              Reset
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 bg-slate-950 overflow-auto py-6 px-2 sm:px-4">
        {/* A4 Document View */}
        {activeTab === 'a4-document' && (
          <div
            className="flex flex-col items-center justify-start transition-transform origin-top duration-200"
            style={{
              transform: zoomLevel !== 100 ? `scale(${zoomLevel / 100})` : 'none',
              marginBottom: zoomLevel > 100 ? `${(zoomLevel - 100) * 12}px` : '0',
            }}
          >
            {singlePageView ? (
              /* Single Page Focus Mode */
              <div className="w-full flex flex-col items-center">
                <div className="mb-4 flex items-center gap-4 text-xs">
                  <button
                    disabled={activePage <= 1}
                    onClick={() => setActivePage((p) => Math.max(1, p - 1))}
                    className="flex items-center gap-1 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white font-semibold"
                  >
                    <ChevronLeft className="w-4 h-4" /> Previous
                  </button>
                  <span className="font-mono text-slate-400">
                    Page {activePage} of {totalPages}
                  </span>
                  <button
                    disabled={activePage >= totalPages}
                    onClick={() => setActivePage((p) => Math.min(totalPages, p + 1))}
                    className="flex items-center gap-1 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white font-semibold"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {activePage === 1 && <Page1Cover />}
                {activePage === 2 && <Page2ExecutiveSummary />}
                {activePage === 3 && <Page3MacroOpportunity />}
                {activePage === 4 && <Page4ArchitectureDataLake />}
                {activePage === 5 && <Page5InformalTraderWholesale />}
                {activePage === 6 && <Page6OwnedFleetLastMile />}
                {activePage === 7 && <Page7BasketComparisonJourney />}
                {activePage === 8 && <Page8FinancialProjections />}
                {activePage === 9 && <Page9CommercialOptions />}
                {activePage === 10 && <Page10RoadmapPilot />}
              </div>
            ) : (
              /* Continuous Multi-Page A4 Flow (All 10 Pages) */
              <div className="w-full flex flex-col items-center space-y-6 print:space-y-0">
                <Page1Cover />
                <Page2ExecutiveSummary />
                <Page3MacroOpportunity />
                <Page4ArchitectureDataLake />
                <Page5InformalTraderWholesale />
                <Page6OwnedFleetLastMile />
                <Page7BasketComparisonJourney />
                <Page8FinancialProjections />
                <Page9CommercialOptions />
                <Page10RoadmapPilot />
              </div>
            )}
          </div>
        )}

        {/* Full Text Proposal Document View */}
        {activeTab === 'text-doc' && <ProposalDocumentView />}

        {/* Text-Only Long-Form Document View */}
        {activeTab === 'text-only-doc' && <TextOnlyDocumentView />}

        {/* Financial Simulator View */}
        {activeTab === 'simulator' && <FinancialSimulator />}

        {/* Slide Deck View */}
        {activeTab === 'slides' && <ExecutiveDeckView />}

        {/* Executive Summary Brief View */}
        {activeTab === 'summary' && <ExecutiveSummaryView />}
      </main>

      {/* Offscreen A4 Render Container for Reliable Direct PDF Downloads */}
      <div
        id="pdf-hidden-render-container"
        className="fixed left-[-9999px] top-0 pointer-events-none w-[794px] overflow-visible"
        aria-hidden="true"
      >
        <Page1Cover idPrefix="pdf-render-page" extraClassName="a4-pdf-export-page" />
        <Page2ExecutiveSummary idPrefix="pdf-render-page" extraClassName="a4-pdf-export-page" />
        <Page3MacroOpportunity idPrefix="pdf-render-page" extraClassName="a4-pdf-export-page" />
        <Page4ArchitectureDataLake idPrefix="pdf-render-page" extraClassName="a4-pdf-export-page" />
        <Page5InformalTraderWholesale idPrefix="pdf-render-page" extraClassName="a4-pdf-export-page" />
        <Page6OwnedFleetLastMile idPrefix="pdf-render-page" extraClassName="a4-pdf-export-page" />
        <Page7BasketComparisonJourney idPrefix="pdf-render-page" extraClassName="a4-pdf-export-page" />
        <Page8FinancialProjections idPrefix="pdf-render-page" extraClassName="a4-pdf-export-page" />
        <Page9CommercialOptions idPrefix="pdf-render-page" extraClassName="a4-pdf-export-page" />
        <Page10RoadmapPilot idPrefix="pdf-render-page" extraClassName="a4-pdf-export-page" />
      </div>
    </div>
  );
}
