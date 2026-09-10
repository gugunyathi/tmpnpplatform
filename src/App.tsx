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
import { DemoAppView } from './components/DemoAppView';
import { LibraryTab } from './components/LibraryTab';
import { TMPicknPaySquareLogo } from './components/TMPicknPaySquareLogo';
import { PROPOSAL_METADATA } from './data/proposalData';
import {
  downloadProposalPDFDirect,
  downloadSlideDeckPDFDirect,
  downloadTextDocumentPDFDirect
} from './utils/pdfGenerator';
import { Smartphone, FolderOpen } from 'lucide-react';

type ViewTab = 'slides' | 'library' | 'a4-document' | 'text-doc' | 'text-only-doc' | 'simulator' | 'summary' | 'demo-app';

interface NavigationTabItem {
  id: ViewTab;
  label: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  shortcut: string;
}

const NAVIGATION_TABS: NavigationTabItem[] = [
  {
    id: 'slides',
    label: 'Slide Deck',
    badge: '14 Slides',
    icon: Presentation,
    iconColor: 'text-amber-400',
    shortcut: '1'
  },
  {
    id: 'library',
    label: 'Library & AI',
    badge: 'Audio & Docs',
    icon: FolderOpen,
    iconColor: 'text-yellow-400',
    shortcut: '2'
  },
  {
    id: 'a4-document',
    label: 'A4 Pages',
    badge: '10 Pages',
    icon: BookOpen,
    iconColor: 'text-blue-400',
    shortcut: '3'
  },
  {
    id: 'text-doc',
    label: 'Proposal Document',
    badge: 'A4 Formal',
    icon: FileText,
    iconColor: 'text-emerald-400',
    shortcut: '4'
  },
  {
    id: 'text-only-doc',
    label: 'Text Only Document',
    badge: 'Reader',
    icon: AlignLeft,
    iconColor: 'text-indigo-400',
    shortcut: '5'
  },
  {
    id: 'simulator',
    label: 'Financial Simulator',
    badge: '$61.2M Model',
    icon: Sliders,
    iconColor: 'text-cyan-400',
    shortcut: '6'
  },
  {
    id: 'summary',
    label: 'Executive Brief',
    badge: 'Strategic',
    icon: Sparkles,
    iconColor: 'text-purple-400',
    shortcut: '7'
  },
  {
    id: 'demo-app',
    label: 'Demo App',
    badge: 'Live Handset',
    icon: Smartphone,
    iconColor: 'text-emerald-400',
    shortcut: '8'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<ViewTab>('slides');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [activePage, setActivePage] = useState<number>(1);
  const [singlePageView, setSinglePageView] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  
  // PDF Generation State
  const [isGeneratingPDF, setIsGeneratingPDF] = useState<boolean>(false);
  const [pdfProgress, setPdfProgress] = useState<{ current: number; total: number; message: string } | null>(null);
  const [showExportMenu, setShowExportMenu] = useState<boolean>(false);

  const totalPages = 10;

  // Keyboard shortcut listener for instantaneous 1-click view switching
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      const tabKeyMap: Record<string, ViewTab> = {
        '1': 'slides',
        '2': 'library',
        '3': 'a4-document',
        '4': 'text-doc',
        '5': 'text-only-doc',
        '6': 'simulator',
        '7': 'summary',
        '8': 'demo-app',
      };
      if (tabKeyMap[e.key]) {
        setActiveTab(tabKeyMap[e.key]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
      <header className="no-print sticky top-0 z-50 bg-slate-900/98 backdrop-blur-md border-b border-slate-800 shadow-xl">
        {/* Top Tier: Branding, Document Code & Action Controls */}
        <div className="px-4 lg:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/60">
          {/* Left: Branding & Document Title */}
          <div className="flex items-center space-x-3">
            <TMPicknPaySquareLogo size={36} className="ring-1 ring-white/20 shadow-md flex-shrink-0" />
            <div className="hidden sm:block h-7 w-px bg-slate-700/80"></div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xs sm:text-sm font-bold text-white tracking-tight leading-none">
                  Pick n Pay × TM Marketplace
                </h1>
                <span className="hidden md:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-red-950 text-red-400 border border-red-800/50">
                  {PROPOSAL_METADATA.documentCode}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                Marketplace &amp; Last-Mile Infrastructure Executive Proposal · 2026
              </p>
            </div>
          </div>

          {/* Right: Quick Actions & Export Menu */}
          <div className="flex items-center space-x-2 relative">
            {/* Active View Quick Pill */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-[11px] text-slate-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span className="hidden sm:inline">Active:</span>
              <strong className="text-white">
                {NAVIGATION_TABS.find((t) => t.id === activeTab)?.label || 'View'}
              </strong>
            </div>

            {/* Export Options Dropdown Menu */}
            <div className="relative">
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition border border-slate-700 flex items-center gap-1.5 px-2.5"
                title="Export & Print Options"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="text-xs hidden sm:inline">Export / Print</span>
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
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition border border-slate-700"
              title="Copy Proposal URL"
            >
              {copiedLink ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Second Tier: Prominent Responsive Clickable Navigation Buttons Bar (No Horizontal Scrollbar) */}
        <nav
          aria-label="Main Executive Views"
          className="px-2 sm:px-4 lg:px-6 py-2 bg-slate-950"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1.5 sm:gap-2">
            {NAVIGATION_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`nav-tab-btn-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center justify-start gap-2 px-2.5 py-2 rounded-lg transition-all duration-150 text-left border ${
                    isActive
                      ? 'bg-red-600 border-red-500 text-white shadow-md ring-1 ring-red-400/40 font-bold'
                      : 'bg-slate-900/90 border-slate-800/90 text-slate-300 hover:text-white hover:bg-slate-800 hover:border-slate-700 font-medium'
                  }`}
                  title={`${tab.label} (Press ${tab.shortcut})`}
                >
                  <Icon
                    className={`w-4 h-4 flex-shrink-0 ${
                      isActive ? 'text-white' : tab.iconColor
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-semibold leading-tight truncate">
                        {tab.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span
                        className={`text-[9px] font-mono px-1 py-0.2 rounded leading-tight ${
                          isActive
                            ? 'bg-black/30 text-red-100'
                            : 'bg-slate-950 text-slate-400'
                        }`}
                      >
                        {tab.badge}
                      </span>
                    </div>
                  </div>

                  {tab.id === 'demo-app' && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>
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
        <div className="no-print bg-slate-900 border-b border-slate-800/80 px-4 py-2.5 flex flex-wrap items-center justify-between text-xs text-slate-300 gap-3 shadow-sm">
          {/* Left: Page Selector & View Mode */}
          <div className="flex flex-wrap items-center gap-3">
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
            <div className="flex items-center space-x-1.5 bg-slate-950 px-2 py-1 rounded border border-slate-800">
              <button
                onClick={() => setSinglePageView(false)}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${
                  !singlePageView ? 'bg-slate-800 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                Continuous (All 10 Pages)
              </button>
              <button
                onClick={() => setSinglePageView(true)}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${
                  singlePageView ? 'bg-slate-800 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                Single Page Focus
              </button>
            </div>
          </div>

          {/* Right: Dedicated Download Proposal (PDF) & Zoom Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Dedicated Download Proposal (PDF) Button for A4 Pages */}
            <button
              onClick={handleDirectDownload}
              disabled={isGeneratingPDF}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-xs font-bold px-3.5 py-1.5 rounded-lg shadow-md transition ring-1 ring-red-400/40"
              title="Download Full 10-Page A4 Executive Board Proposal PDF"
            >
              {isGeneratingPDF ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Download className="w-3.5 h-3.5" />
              )}
              <span>
                {isGeneratingPDF ? 'Generating Proposal PDF...' : 'Download Proposal (PDF)'}
              </span>
            </button>

            {/* Zoom Controls */}
            <div className="flex items-center space-x-1.5 bg-slate-950 px-2 py-1 rounded border border-slate-800">
              <button
                onClick={() => setZoomLevel((z) => Math.max(70, z - 10))}
                className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-xs font-semibold w-10 text-center text-slate-200">{zoomLevel}%</span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(150, z + 10))}
                className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
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

        {/* Library & AI Hub View */}
        {activeTab === 'library' && <LibraryTab />}

        {/* Live Demo App View */}
        {activeTab === 'demo-app' && <DemoAppView />}

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
