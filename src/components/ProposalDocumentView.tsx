import React, { useState } from 'react';
import {
  FileText,
  Copy,
  Check,
  Printer,
  Download,
  Loader2,
  ChevronRight,
  Award,
  Building2,
  Layers,
  Database,
  Truck,
  DollarSign,
  TrendingUp,
  Calendar,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  ArrowUpRight,
  List,
  Sparkles,
  Scale,
  BarChart3,
} from 'lucide-react';
import {
  PROPOSAL_METADATA,
  THE_FOUR_PILLARS,
  BASKET_COMPARISON_DATA,
  DEFAULT_FINANCIAL_BASELINE,
  COMMERCIAL_OPTIONS,
  FLEET_SPECS,
  ROADMAP_SPRINTS,
} from '../data/proposalData';
import { computeFinancials, formatUSD } from '../utils/calculations';
import { downloadTextDocumentPDFDirect } from '../utils/pdfGenerator';
import { TMPicknPaySquareLogo } from './TMPicknPaySquareLogo';

export const ProposalDocumentView: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('page-1');
  const [isDownloadingPdf, setIsDownloadingPdf] = useState<boolean>(false);
  const [pdfProgress, setPdfProgress] = useState<{ current: number; total: number; message: string }>({
    current: 0,
    total: 8,
    message: '',
  });

  const financials = computeFinancials(DEFAULT_FINANCIAL_BASELINE);

  const pagesNav = [
    { id: 'page-1', pageNum: 1, title: '1. Executive Memorandum & Thesis', icon: Award },
    { id: 'page-2', pageNum: 2, title: '2. Macro Context & Strategy Matrix', icon: Building2 },
    { id: 'page-3', pageNum: 3, title: '3. Opportunity & 4 Value Pillars', icon: Layers },
    { id: 'page-4', pageNum: 4, title: '4. Platform Architecture & Spaza B2B', icon: Database },
    { id: 'page-5', pageNum: 5, title: '5. EV Fleet & Price Benchmark Audit', icon: Truck },
    { id: 'page-6', pageNum: 6, title: '6. Financial Model ($72.3M P&L)', icon: DollarSign },
    { id: 'page-7', pageNum: 7, title: '7. Commercial Terms & 60-Day Pilot', icon: Scale },
    { id: 'page-8', pageNum: 8, title: '8. Risk Governance & Board Sign-Off', icon: ShieldCheck },
  ];

  const handleCopyMarkdown = () => {
    const el = document.getElementById('full-proposal-content');
    if (el) {
      navigator.clipboard.writeText(el.innerText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleDownloadA4PDF = async () => {
    if (isDownloadingPdf) return;
    setIsDownloadingPdf(true);
    setPdfProgress({ current: 1, total: 8, message: 'Initializing A4 Text Document Engine...' });

    try {
      await downloadTextDocumentPDFDirect((current, total, message) => {
        setPdfProgress({ current, total, message });
      });
    } catch (err) {
      console.error('Error downloading text PDF:', err);
    } finally {
      setTimeout(() => {
        setIsDownloadingPdf(false);
      }, 800);
    }
  };

  const handlePrintDoc = () => {
    window.print();
  };

  const scrollToPage = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Reusable Page Header
  const PageHeader = ({ pageNum, title }: { pageNum: number; title: string }) => (
    <div className="flex items-center justify-between pb-2.5 mb-4 border-b border-slate-200 text-[10px] text-slate-500 font-sans select-none">
      <div className="flex items-center gap-2">
        <TMPicknPaySquareLogo size={20} className="border border-slate-200 shadow-2xs" />
        <span className="font-bold text-slate-900 tracking-tight uppercase">Pick n Pay</span>
        <span className="text-slate-300">|</span>
        <span className="text-slate-600 font-medium truncate max-w-[280px]">{title}</span>
      </div>
      <div className="flex items-center gap-2 font-mono">
        <span className="text-slate-400">Ref: {PROPOSAL_METADATA.documentCode}</span>
        <span className="text-slate-300">|</span>
        <span className="font-bold text-slate-900">Page {pageNum} of 8</span>
      </div>
    </div>
  );

  // Reusable Page Footer
  const PageFooter = ({ pageNum }: { pageNum: number }) => (
    <div className="absolute bottom-6 left-10 right-10 flex items-center justify-between pt-2 border-t border-slate-200 text-[9px] text-slate-400 font-mono select-none">
      <div>STRICTLY CONFIDENTIAL · MEIKLES RETAIL LIMITED &amp; PLATFORM INFRASTRUCTURE CONSORTIUM</div>
      <div>PAGE {pageNum} OF 8</div>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto py-4 px-2 sm:px-6">
      {/* Top Document Header Controls */}
      <div className="no-print bg-slate-900 border border-slate-800 rounded-xl p-4 mb-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-red-600/10 text-red-500 rounded-lg border border-red-500/20">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white tracking-tight">
                Strategic Advisory Proposal &amp; Business Case (Official Long-Form Edition)
              </h2>
              <span className="px-2 py-0.5 text-[10px] font-mono font-semibold bg-red-500/10 text-red-400 border border-red-500/20 rounded">
                A4 Document Format
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Ref: {PROPOSAL_METADATA.documentCode} · {PROPOSAL_METADATA.date} · 8 Fully Formatted A4 Pages
            </p>
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-2">
          {/* Main Action: Download as A4 Portrait PDF */}
          <button
            onClick={handleDownloadA4PDF}
            disabled={isDownloadingPdf}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 disabled:opacity-75 text-white text-xs font-bold shadow-lg shadow-red-600/20 border border-red-500 transition cursor-pointer"
            title="Download full business proposal as an A4 Portrait PDF file"
          >
            {isDownloadingPdf ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Exporting A4 PDF (Page {pdfProgress.current} of {pdfProgress.total})...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download A4 Portrait PDF</span>
              </>
            )}
          </button>

          <button
            onClick={handleCopyMarkdown}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
            title="Copy entire document text to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied Text</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Text</span>
              </>
            )}
          </button>

          <button
            onClick={handlePrintDoc}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition"
            title="Print this formatted document"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Print</span>
          </button>
        </div>
      </div>

      {/* Real-time PDF Generation Progress Bar */}
      {isDownloadingPdf && (
        <div className="no-print mb-6 p-4 bg-slate-900 border border-red-500/30 rounded-xl shadow-xl animate-fade-in">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-white flex items-center gap-2">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-red-500" />
              {pdfProgress.message || 'Rendering discrete A4 Portrait pages...'}
            </span>
            <span className="font-mono font-bold text-red-400">
              {Math.round((pdfProgress.current / pdfProgress.total) * 100)}%
            </span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-red-600 to-red-400 h-full transition-all duration-200 rounded-full"
              style={{ width: `${(pdfProgress.current / pdfProgress.total) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sticky Table of Contents Navigation (Desktop) */}
        <div className="no-print hidden lg:block lg:col-span-4 sticky top-16 bg-slate-900/95 backdrop-blur border border-slate-800 rounded-xl p-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <List className="w-3.5 h-3.5 text-red-500" /> Document Chapters
            </span>
            <span className="text-[10px] font-mono text-slate-400 font-semibold">8 A4 Pages</span>
          </div>

          <nav className="space-y-1 text-xs">
            {pagesNav.map((p) => (
              <button
                key={p.id}
                onClick={() => scrollToPage(p.id)}
                className={`w-full text-left px-2.5 py-2 rounded-lg flex items-center justify-between transition-all ${
                  activeSection === p.id
                    ? 'bg-red-600 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <span className="truncate pr-2">{p.title}</span>
                <span className="text-[10px] font-mono opacity-70">P.{p.pageNum}</span>
              </button>
            ))}
          </nav>

          <div className="mt-4 pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-1.5">
            <div className="flex justify-between">
              <span>Primary Opportunity:</span>
              <span className="font-mono font-bold text-white">$61.2M Baseline GMV</span>
            </div>
            <div className="flex justify-between">
              <span>Total Ecosystem Output:</span>
              <span className="font-mono font-bold text-emerald-400">$72,349,380</span>
            </div>
            <div className="flex justify-between">
              <span>Execution Horizon:</span>
              <span className="font-mono text-white">60-Day Pilot / 10-Yr Horizon</span>
            </div>
          </div>
        </div>

        {/* Main Document Content Container - Structured into 8 Pixel-Calibrated A4 Pages */}
        <div id="full-proposal-content" className="lg:col-span-8 flex flex-col items-center">
          
          {/* ==================== PAGE 1 ==================== */}
          <div id="text-doc-page-1" className="a4-text-doc-page p-10 flex flex-col justify-between text-slate-900 text-xs leading-relaxed">
            <div>
              <PageHeader pageNum={1} title="Executive Memorandum & Strategic Rationale" />

              {/* Cover Memorandum Block */}
              <div className="border-b border-slate-900 pb-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2.5">
                    <TMPicknPaySquareLogo size={28} className="border border-slate-200 shadow-xs" />
                    <span className="font-extrabold text-slate-900 text-sm tracking-tight uppercase">Pick n Pay</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-slate-100 text-slate-800 border border-slate-300 rounded">
                    {PROPOSAL_METADATA.classification}
                  </span>
                </div>

                <h1 className="text-xl font-black text-slate-950 font-serif tracking-tight leading-tight mb-1">
                  {PROPOSAL_METADATA.documentTitle}
                </h1>
                <p className="text-xs font-medium text-slate-700 leading-snug mb-3">
                  {PROPOSAL_METADATA.documentSubtitle}
                </p>

                <div className="bg-slate-50 border border-slate-200 rounded p-3 text-[11px] grid grid-cols-2 gap-y-1 gap-x-4 text-slate-700">
                  <div><span className="font-bold text-slate-900">TO:</span> Board &amp; Executive Committee, TM Pick n Pay</div>
                  <div><span className="font-bold text-slate-900">DATE:</span> {PROPOSAL_METADATA.date}</div>
                  <div><span className="font-bold text-slate-900">FROM:</span> Lead Enterprise Architecture Consortium</div>
                  <div><span className="font-bold text-slate-900">DOC ID:</span> <span className="font-mono">{PROPOSAL_METADATA.documentCode}</span></div>
                  <div className="col-span-2 pt-1 border-t border-slate-200 text-slate-600">
                    <span className="font-bold text-slate-900">SUBJECT:</span> Commercial Business Case for Positioning TM Pick n Pay as the Anchor Retail &amp; Wholesale Fulfillment Engine for an Open Multi-Tenant Marketplace &amp; EV Logistics Grid.
                  </div>
                </div>
              </div>

              {/* Chapter 1 Body */}
              <h2 className="text-sm font-bold font-serif text-slate-900 border-b border-slate-300 pb-1 mb-2.5 flex items-center gap-1.5">
                <span className="w-1.5 h-3.5 bg-red-600 inline-block rounded-sm"></span>
                1. Executive Memorandum &amp; Strategic Rationale
              </h2>

              <p className="mb-2.5 text-justify text-slate-800">
                The retail landscape across Southern Africa, and within Zimbabwe specifically, is confronting a profound structural transformation. Over the past decade, macroeconomic volatility and shifting consumer behavior have accelerated the informalization of retail trade. While prime physical supermarket branches continue to deliver footfall in established upper-middle-class urban nodes, reliance on brick-and-mortar physical expansion alone presents diminishing returns due to heavy capital expenditure, unpredictable lease obligations, and escalating utility disruptions.
              </p>

              <p className="mb-2.5 text-justify text-slate-800">
                To defend market share and unlock double-digit revenue expansion, <strong>TM Pick n Pay</strong> must transition from a traditional brick-and-mortar balance sheet posture into a high-margin, technology-enabled commerce ecosystem. This document presents a comprehensive business proposal to position TM Pick n Pay as the foundational anchor tenant and primary wholesale supplier for an open-architecture, multi-tenant digital marketplace—the <em>&ldquo;Takealot of Southern Africa&rdquo;</em>.
              </p>

              <div className="p-3 bg-slate-50 border-l-3 border-red-600 rounded-r mb-3 text-[11px] text-slate-800 leading-normal">
                <strong>Core Investment Thesis:</strong> Rather than allocating millions toward developing an insular, proprietary single-brand app that suffers from high customer acquisition costs and low repeat frequency, TM Pick n Pay can capture dominant market share by anchoring a multi-tenant digital marketplace. This intercepts two high-liquidity capital flows: <strong>(1) Global Diaspora Remittances</strong> (generating a baseline of US$61.2M in annual retail GMV), and <strong>(2) Informal Township Wholesale Consolidation</strong> (converting 10,000+ independent spaza retailers into active wholesale customers).
              </div>

              <p className="text-justify text-slate-800">
                By combining high-velocity online grocery commerce, bank-agnostic multi-currency payment orchestration (USD, GBP, ZAR, AUD, EcoCash), and a dedicated, platform-owned electric vehicle (EV) last-mile logistics grid, TM Pick n Pay establishes an unassailable commercial moat across domestic and cross-border consumer touchpoints.
              </p>
            </div>
            <PageFooter pageNum={1} />
          </div>

          {/* ==================== PAGE 2 ==================== */}
          <div id="text-doc-page-2" className="a4-text-doc-page p-10 flex flex-col justify-between text-slate-900 text-xs leading-relaxed">
            <div>
              <PageHeader pageNum={2} title="Macroeconomic Context & Market Informalization" />

              <h2 className="text-sm font-bold font-serif text-slate-900 border-b border-slate-300 pb-1 mb-2.5 flex items-center gap-1.5">
                <span className="w-1.5 h-3.5 bg-red-600 inline-block rounded-sm"></span>
                2. Macroeconomic Context &amp; Market Informalization
              </h2>

              <p className="mb-2 text-justify text-slate-800">
                An empirical diagnostic of the Zimbabwean consumer goods economy reveals four underlying structural frictions that have eroded the traditional supermarket value chain:
              </p>

              <div className="grid grid-cols-2 gap-2.5 mb-3 text-[11px]">
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                  <h3 className="font-bold text-slate-900 mb-0.5">2.1 Township Informalization</h3>
                  <p className="text-slate-600">Over 70% of FMCG volume in urban centers moves through informal tuck-shops providing local proximity and pack sizes formal stores cannot match.</p>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                  <h3 className="font-bold text-slate-900 mb-0.5">2.2 Gray Market Infiltration</h3>
                  <p className="text-slate-600">Unregulated cross-border &ldquo;runners&rdquo; haul basic goods from SA and Mozambique, undercutting formal shelf prices and evading duties.</p>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                  <h3 className="font-bold text-slate-900 mb-0.5">2.3 Remittance Frictions</h3>
                  <p className="text-slate-600">Over US$2B in diaspora funds suffer from 7–15% cash transfer fees and cash diversion rather than verified grocery delivery.</p>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                  <h3 className="font-bold text-slate-900 mb-0.5">2.4 The 2-Hour Commute Penalty</h3>
                  <p className="text-slate-600">Click &amp; Collect forces recipients to spend $2–$4 on kombis and 2 hours queueing, depressing customer retention.</p>
                </div>
              </div>

              <h3 className="font-bold text-[11px] uppercase tracking-wider text-slate-800 mb-1.5">
                Strategic Comparative Analysis: Legacy Retail vs. Proposed Marketplace Grid
              </h3>

              {/* Exact Fixed Table - Guaranteed No Scrollbars and Clean Fit */}
              <table className="w-full table-fixed text-[10.5px] border border-slate-300 border-collapse mb-2">
                <thead>
                  <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-300">
                    <th className="p-2 text-left w-[24%] border-r border-slate-200">Strategic Vector</th>
                    <th className="p-2 text-left w-[38%] text-red-700 border-r border-slate-200">Conventional Store Model</th>
                    <th className="p-2 text-left w-[38%] text-emerald-700">Multi-Tenant Logistics Grid</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr>
                    <td className="p-1.5 font-bold text-slate-900 border-r border-slate-200">CapEx Investment</td>
                    <td className="p-1.5 text-slate-600 border-r border-slate-200">Heavy store fit-out ($500k–$1.5M/branch), long payback</td>
                    <td className="p-1.5 text-slate-900 font-medium">Asset-light software; decentralized EV staging micro-hubs</td>
                  </tr>
                  <tr>
                    <td className="p-1.5 font-bold text-slate-900 border-r border-slate-200">Addressable Market</td>
                    <td className="p-1.5 text-slate-600 border-r border-slate-200">Restricted to 2–4km walking/driving radius per branch</td>
                    <td className="p-1.5 text-slate-900 font-medium">Full metropolitan coverage (Harare, Bulawayo, Gweru, Mutare)</td>
                  </tr>
                  <tr>
                    <td className="p-1.5 font-bold text-slate-900 border-r border-slate-200">Diaspora FX Capture</td>
                    <td className="p-1.5 text-slate-600 border-r border-slate-200">Indirect, reactive walk-in spend subject to cash shortages</td>
                    <td className="p-1.5 text-slate-900 font-medium">Direct foreign card settlement into Nostro USD prior to dispatch</td>
                  </tr>
                  <tr>
                    <td className="p-1.5 font-bold text-slate-900 border-r border-slate-200">Township Spaza Channel</td>
                    <td className="p-1.5 text-slate-600 border-r border-slate-200">Viewed as competing adversaries; zero wholesale capture</td>
                    <td className="p-1.5 text-slate-900 font-medium">Integrated as contracted B2B wholesale buyers via mobile app</td>
                  </tr>
                  <tr>
                    <td className="p-1.5 font-bold text-slate-900 border-r border-slate-200">Customer Data Control</td>
                    <td className="p-1.5 text-slate-600 border-r border-slate-200">Anonymous till slips; fragmented loyalty card metrics</td>
                    <td className="p-1.5 text-slate-900 font-medium">Household telemetry, replenishment triggers &amp; FMCG ad feeds</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <PageFooter pageNum={2} />
          </div>

          {/* ==================== PAGE 3 ==================== */}
          <div id="text-doc-page-3" className="a4-text-doc-page p-10 flex flex-col justify-between text-slate-900 text-xs leading-relaxed">
            <div>
              <PageHeader pageNum={3} title="Strategic Opportunity & The Four Value Pillars" />

              <h2 className="text-sm font-bold font-serif text-slate-900 border-b border-slate-300 pb-1 mb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-3.5 bg-red-600 inline-block rounded-sm"></span>
                3. Strategic Opportunity &amp; Enterprise Thesis
              </h2>

              <p className="mb-2 text-justify text-slate-800">
                Single-retailer apps face crippling customer acquisition costs and low basket frequency because a courier fleet cannot achieve density when serving only one catalog. Our model establishes an <strong>open-architecture, multi-tenant digital commerce marketplace</strong>. TM Pick n Pay acts as the principal anchor retail partner and wholesale fulfillment backbone, aggregating complementary categories (pharmacy, hardware, bakeries) to achieve maximum logistics route density.
              </p>

              <h2 className="text-sm font-bold font-serif text-slate-900 border-b border-slate-300 pb-1 mb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-3.5 bg-red-600 inline-block rounded-sm"></span>
                4. The Four Strategic Pillars of Value Creation
              </h2>

              <div className="space-y-2 mb-2">
                {THE_FOUR_PILLARS.map((p, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                    <div className="flex items-center justify-between mb-0.5">
                      <h3 className="font-bold text-[11.5px] text-slate-900">
                        Pillar {p.number}: {p.title}
                      </h3>
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 bg-red-100 text-red-700 rounded">
                        {p.subtitle}
                      </span>
                    </div>
                    <p className="text-[10.5px] text-slate-700 mb-1">{p.description}</p>
                    <div className="text-[10px] font-semibold text-slate-800 bg-white p-1.5 rounded border border-slate-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                      <span><strong>Impact:</strong> {p.strategicImpact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <PageFooter pageNum={3} />
          </div>

          {/* ==================== PAGE 4 ==================== */}
          <div id="text-doc-page-4" className="a4-text-doc-page p-10 flex flex-col justify-between text-slate-900 text-xs leading-relaxed">
            <div>
              <PageHeader pageNum={4} title="Platform Architecture & B2B Informal Trader Aggregation" />

              <h2 className="text-sm font-bold font-serif text-slate-900 border-b border-slate-300 pb-1 mb-2.5 flex items-center gap-1.5">
                <span className="w-1.5 h-3.5 bg-red-600 inline-block rounded-sm"></span>
                5. Enterprise Platform Architecture &amp; Data Lake Moat
              </h2>

              <div className="grid grid-cols-2 gap-2.5 mb-3.5 text-[11px]">
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                  <h4 className="font-bold text-slate-900 mb-0.5 flex items-center gap-1">
                    <Database className="w-3 h-3 text-red-600" /> Multi-Tenant Storefront Engine
                  </h4>
                  <p className="text-slate-600">Powers public marketplace &amp; white-label tenant (<code className="font-mono text-[9.5px]">tmpnponline.co.zw</code>), preserving brand equity on shared logistics.</p>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                  <h4 className="font-bold text-slate-900 mb-0.5 flex items-center gap-1">
                    <DollarSign className="w-3 h-3 text-red-600" /> Bank-Agnostic Payment Rails
                  </h4>
                  <p className="text-slate-600">Orchestrates Visa, MasterCard, PayPal, ZAR EFT, and domestic EcoCash/InnBucks with direct Nostro USD settlement.</p>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                  <h4 className="font-bold text-slate-900 mb-0.5 flex items-center gap-1">
                    <Layers className="w-3 h-3 text-red-600" /> Real-Time ERP &amp; POS Webhooks
                  </h4>
                  <p className="text-slate-600">Direct API sync with TM Pick n Pay branch POS systems for stock validation, pricing, and automated substitution logic.</p>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                  <h4 className="font-bold text-slate-900 mb-0.5 flex items-center gap-1">
                    <BarChart3 className="w-3 h-3 text-red-600" /> FMCG Brand Data Lake
                  </h4>
                  <p className="text-slate-600">Centralizes household consumption metrics, monetized back to manufacturers seeking verified retail telemetry.</p>
                </div>
              </div>

              <h2 className="text-sm font-bold font-serif text-slate-900 border-b border-slate-300 pb-1 mb-2.5 flex items-center gap-1.5">
                <span className="w-1.5 h-3.5 bg-red-600 inline-block rounded-sm"></span>
                6. Supply Chain Transformation: B2B Informal Trader Aggregation
              </h2>

              <p className="mb-2 text-justify text-slate-800">
                The informal retail sector should not be treated as an adversary, but rather as TM Pick n Pay&rsquo;s most powerful decentralized distribution network. By providing a structured B2B replenishment platform ($9.99/mo subscription), TM Pick n Pay captures bulk wholesale margins while eliminating credit and counterfeit risks associated with the gray market.
              </p>

              <div className="grid grid-cols-3 gap-2 text-[10.5px]">
                <div className="p-2 bg-slate-50 rounded border border-slate-200">
                  <div className="font-bold text-slate-900 mb-0.5">1. Digital Reordering</div>
                  <p className="text-slate-600">Merchants order staple bulk packs via lightweight zero-data mobile interface without leaving their stores.</p>
                </div>
                <div className="p-2 bg-slate-50 rounded border border-slate-200">
                  <div className="font-bold text-slate-900 mb-0.5">2. Wholesale Price Tiering</div>
                  <p className="text-slate-600">TM PnP volume pricing beats informal cross-border runner syndicates while protecting wholesale margin.</p>
                </div>
                <div className="p-2 bg-slate-50 rounded border border-slate-200">
                  <div className="font-bold text-slate-900 mb-0.5">3. Scheduled Cargo Drop</div>
                  <p className="text-slate-600">Heavy cargo e-trikes deliver restocks directly to store doors within 24–48h, eliminating transport rentals.</p>
                </div>
              </div>
            </div>
            <PageFooter pageNum={4} />
          </div>

          {/* ==================== PAGE 5 ==================== */}
          <div id="text-doc-page-5" className="a4-text-doc-page p-10 flex flex-col justify-between text-slate-900 text-xs leading-relaxed">
            <div>
              <PageHeader pageNum={5} title="Green EV Logistics Grid & Algorithmic Price Audit" />

              <h2 className="text-sm font-bold font-serif text-slate-900 border-b border-slate-300 pb-1 mb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-3.5 bg-red-600 inline-block rounded-sm"></span>
                7. Dedicated Green EV Logistics &amp; Last-Mile Grid
              </h2>

              {/* Exact Fixed Fleet Table */}
              <table className="w-full table-fixed text-[10px] border border-slate-300 border-collapse mb-2">
                <thead>
                  <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-300">
                    <th className="p-1.5 text-left w-[25%] border-r border-slate-200">Fleet Asset</th>
                    <th className="p-1.5 text-left w-[22%] border-r border-slate-200">Specification</th>
                    <th className="p-1.5 text-left w-[53%]">Operational Function</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  {FLEET_SPECS.map((item, idx) => (
                    <tr key={idx}>
                      <td className="p-1 font-bold text-slate-900 border-r border-slate-200">{item.metric}</td>
                      <td className="p-1 font-mono font-semibold text-red-600 border-r border-slate-200">{item.value}</td>
                      <td className="p-1 text-slate-600">{item.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <h2 className="text-sm font-bold font-serif text-slate-900 border-b border-slate-300 pb-1 mb-1.5 flex items-center gap-1.5">
                <span className="w-1.5 h-3.5 bg-red-600 inline-block rounded-sm"></span>
                8. Algorithmic Basket Optimization &amp; Empirical Price Audit
              </h2>

              <p className="mb-2 text-justify text-slate-800 text-[11px]">
                The engine analyzes the multi-item grocery list and routes the full basket to the single retailer with the lowest aggregate landed cost—incorporating product prices, stock availability, and proximity-based dispatch.
              </p>

              {/* Fixed Benchmark Table */}
              <table className="w-full table-fixed text-[10px] border border-slate-300 border-collapse mb-1.5">
                <thead>
                  <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-300">
                    <th className="p-1.5 text-left w-[28%] border-r border-slate-200">Supermarket Chain</th>
                    <th className="p-1.5 text-right w-[20%] border-r border-slate-200">Landed Total</th>
                    <th className="p-1.5 text-right w-[16%] border-r border-slate-200">Variance</th>
                    <th className="p-1.5 text-left w-[18%] border-r border-slate-200">Fulfillment</th>
                    <th className="p-1.5 text-center w-[18%]">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  {BASKET_COMPARISON_DATA.map((row, idx) => (
                    <tr key={idx} className={row.isAnchor ? 'bg-emerald-50/70 font-semibold' : ''}>
                      <td className="p-1 text-slate-900 border-r border-slate-200 truncate">
                        {row.retailer} {row.isAnchor && <span className="text-[8px] font-bold text-emerald-700">(ANCHOR)</span>}
                      </td>
                      <td className="p-1 text-right font-mono text-slate-900 border-r border-slate-200">${row.basketTotalUSD.toFixed(2)}</td>
                      <td className="p-1 text-right font-mono text-slate-600 border-r border-slate-200">{row.varianceVsPnP}</td>
                      <td className="p-1 text-slate-600 border-r border-slate-200">{row.itemsFulfilled}</td>
                      <td className="p-1 text-center text-[9px] text-slate-500">{row.statusBadge}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="text-[10px] text-slate-700 bg-slate-50 p-2 rounded border border-slate-200">
                <strong>Strategic Outcome:</strong> TM Pick n Pay consistently maintains the lowest aggregate landed basket cost ($83.40 baseline), guaranteeing over 80% default primary fulfillment routing.
              </div>
            </div>
            <PageFooter pageNum={5} />
          </div>

          {/* ==================== PAGE 6 ==================== */}
          <div id="text-doc-page-6" className="a4-text-doc-page p-10 flex flex-col justify-between text-slate-900 text-xs leading-relaxed">
            <div>
              <PageHeader pageNum={6} title="Financial Modeling & Revenue Projections ($72.3M)" />

              <h2 className="text-sm font-bold font-serif text-slate-900 border-b border-slate-300 pb-1 mb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-3.5 bg-red-600 inline-block rounded-sm"></span>
                9. Consolidated Financial Economics ($72.3M Combined Output)
              </h2>

              <div className="grid grid-cols-3 gap-2 mb-2.5 text-center">
                <div className="p-2 bg-slate-50 border border-slate-200 rounded">
                  <span className="block text-[9px] uppercase font-bold text-slate-500">Retail Grocery GMV</span>
                  <span className="text-base font-black font-mono text-slate-900">{formatUSD(financials.grossRetailGMV)}</span>
                </div>
                <div className="p-2 bg-slate-50 border border-slate-200 rounded">
                  <span className="block text-[9px] uppercase font-bold text-slate-500">Phase 1 Gross Flow</span>
                  <span className="text-base font-black font-mono text-slate-900">{formatUSD(financials.phase1GrossThroughput)}</span>
                </div>
                <div className="p-2 bg-red-50 border border-red-200 rounded">
                  <span className="block text-[9px] uppercase font-bold text-red-700">Combined Output</span>
                  <span className="text-base font-black font-mono text-red-600">{formatUSD(financials.combinedAnnualEcosystemGross)}</span>
                </div>
              </div>

              {/* Exact Fixed Multi-Stream Revenue Table */}
              <table className="w-full table-fixed text-[10px] border border-slate-300 border-collapse mb-2">
                <thead>
                  <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-300">
                    <th className="p-1.5 text-left w-[44%] border-r border-slate-200">Revenue Stream</th>
                    <th className="p-1.5 text-left w-[34%] border-r border-slate-200">Scaling Driver</th>
                    <th className="p-1.5 text-right w-[22%]">Annual USD</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr className="bg-slate-50 font-bold">
                    <td colSpan={3} className="p-1 text-slate-900 uppercase text-[9px]">Phase 1: Transactional GMV Streams</td>
                  </tr>
                  <tr>
                    <td className="p-1 pl-2 text-slate-800 border-r border-slate-200">Gross Retail GMV (Groceries/FMCG)</td>
                    <td className="p-1 font-mono text-slate-600 border-r border-slate-200">720,000 orders @ $85.00</td>
                    <td className="p-1 text-right font-mono font-semibold text-slate-900">$61,200,000</td>
                  </tr>
                  <tr>
                    <td className="p-1 pl-2 text-slate-800 border-r border-slate-200">Electric Last-Mile Delivery Fees</td>
                    <td className="p-1 font-mono text-slate-600 border-r border-slate-200">720,000 deliveries @ $4.50</td>
                    <td className="p-1 text-right font-mono font-semibold text-slate-900">$3,240,000</td>
                  </tr>
                  <tr>
                    <td className="p-1 pl-2 text-slate-800 border-r border-slate-200">Foreign Exchange Acquiring Surcharge</td>
                    <td className="p-1 font-mono text-slate-600 border-r border-slate-200">3.0% on cross-border cards</td>
                    <td className="p-1 text-right font-mono font-semibold text-slate-900">$1,836,000</td>
                  </tr>
                  <tr>
                    <td className="p-1 pl-2 text-slate-800 border-r border-slate-200">Diaspora VIP Priority Delivery Pass</td>
                    <td className="p-1 font-mono text-slate-600 border-r border-slate-200">5,400 members @ $9.99/mo</td>
                    <td className="p-1 text-right font-mono font-semibold text-slate-900">$647,352</td>
                  </tr>
                  <tr>
                    <td className="p-1 pl-2 text-slate-800 border-r border-slate-200">Retail Media Network (FMCG Ads)</td>
                    <td className="p-1 font-mono text-slate-600 border-r border-slate-200">1.2% ad take rate on GMV</td>
                    <td className="p-1 text-right font-mono font-semibold text-slate-900">$734,400</td>
                  </tr>

                  <tr className="bg-slate-50 font-bold">
                    <td colSpan={3} className="p-1 text-slate-900 uppercase text-[9px]">Phase 2: High-Margin Recurring B2B SaaS Subscriptions</td>
                  </tr>
                  <tr>
                    <td className="p-1 pl-2 text-slate-800 border-r border-slate-200">Retail Tenant Access Fees</td>
                    <td className="p-1 font-mono text-slate-600 border-r border-slate-200">350 retail tenants @ $49/mo</td>
                    <td className="p-1 text-right font-mono font-semibold text-slate-900">$205,800</td>
                  </tr>
                  <tr>
                    <td className="p-1 pl-2 text-slate-800 border-r border-slate-200">Rider App &amp; Fleet Software Access</td>
                    <td className="p-1 font-mono text-slate-600 border-r border-slate-200">1,200 active riders @ $15/mo</td>
                    <td className="p-1 text-right font-mono font-semibold text-slate-900">$216,000</td>
                  </tr>
                  <tr>
                    <td className="p-1 pl-2 text-slate-800 border-r border-slate-200">Solar Garage Maintenance &amp; Battery Swaps</td>
                    <td className="p-1 font-mono text-slate-600 border-r border-slate-200">1,200 EV assets @ $18/mo</td>
                    <td className="p-1 text-right font-mono font-semibold text-slate-900">$259,200</td>
                  </tr>
                  <tr>
                    <td className="p-1 pl-2 text-slate-800 border-r border-slate-200">FMCG Brand Analytics &amp; Data Feeds</td>
                    <td className="p-1 font-mono text-slate-600 border-r border-slate-200">45 major brands @ $1,500/mo</td>
                    <td className="p-1 text-right font-mono font-semibold text-slate-900">$810,000</td>
                  </tr>
                  <tr>
                    <td className="p-1 pl-2 text-slate-800 border-r border-slate-200">Domestic Consumer Fast-Pass</td>
                    <td className="p-1 font-mono text-slate-600 border-r border-slate-200">40,000 shoppers @ $4.99/mo</td>
                    <td className="p-1 text-right font-mono font-semibold text-slate-900">$2,395,200</td>
                  </tr>
                  <tr>
                    <td className="p-1 pl-2 text-slate-800 border-r border-slate-200">B2B Tuck-Shop Platform Memberships</td>
                    <td className="p-1 font-mono text-slate-600 border-r border-slate-200">6,720 merchants @ $9.99/mo</td>
                    <td className="p-1 text-right font-mono font-semibold text-slate-900">$805,500</td>
                  </tr>

                  <tr className="bg-red-50 text-slate-900 font-bold border-t-2 border-slate-900">
                    <td className="p-1.5 border-r border-slate-200">Total Ecosystem Output</td>
                    <td className="p-1.5 font-mono text-slate-700 border-r border-slate-200">12 Combined Streams</td>
                    <td className="p-1.5 text-right font-mono text-red-600 font-black text-[11px]">$72,349,380</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <PageFooter pageNum={6} />
          </div>

          {/* ==================== PAGE 7 ==================== */}
          <div id="text-doc-page-7" className="a4-text-doc-page p-10 flex flex-col justify-between text-slate-900 text-xs leading-relaxed">
            <div>
              <PageHeader pageNum={7} title="Commercial Structuring & 60-Day Pilot Charter" />

              <h2 className="text-sm font-bold font-serif text-slate-900 border-b border-slate-300 pb-1 mb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-3.5 bg-red-600 inline-block rounded-sm"></span>
                10. Commercial Partnership Structuring Options
              </h2>

              <div className="grid grid-cols-2 gap-3 mb-2.5">
                {COMMERCIAL_OPTIONS.map((opt, idx) => (
                  <div key={idx} className="p-2.5 rounded border bg-slate-50 border-slate-200 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold text-[11px] uppercase text-slate-900">{opt.name}</h3>
                        <span className="px-1.5 py-0.2 bg-red-600 text-white text-[8.5px] rounded font-bold uppercase">
                          {opt.badge}
                        </span>
                      </div>
                      <div className="text-sm font-black font-mono text-slate-900 mb-0.5">{opt.commercialTake}</div>
                      <p className="text-[10px] text-slate-600 mb-1.5">{opt.description}</p>
                      <div className="text-[9.5px] text-slate-700 space-y-0.5">
                        <div className="font-bold text-slate-900">TM PnP Scope:</div>
                        {opt.tmPnPResponsibilities.slice(0, 2).map((r, ri) => (
                          <div key={ri} className="flex items-center gap-1 text-slate-600">
                            <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                            <span>{r}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <h2 className="text-sm font-bold font-serif text-slate-900 border-b border-slate-300 pb-1 mb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-3.5 bg-red-600 inline-block rounded-sm"></span>
                11. 60-Day Pilot Charter &amp; Implementation Roadmap
              </h2>

              <p className="mb-2 text-justify text-slate-800 text-[11px]">
                Execution commences with a 60-day commercial pilot at <strong>Borrowdale Village Walk</strong> and <strong>Avondale</strong> with 50 EV units.
              </p>

              <div className="grid grid-cols-2 gap-2 mb-2">
                {ROADMAP_SPRINTS.map((sprint, idx) => (
                  <div key={idx} className="p-2 bg-white border border-slate-200 rounded">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-bold text-slate-900 text-[10.5px]">{sprint.sprint}: {sprint.title}</span>
                      <span className="text-[9px] font-mono text-slate-500 font-semibold">{sprint.duration}</span>
                    </div>
                    <p className="text-[9.5px] text-slate-600">{sprint.focus}</p>
                  </div>
                ))}
              </div>

              <div className="p-2 bg-slate-50 border border-slate-200 rounded text-[10px] flex items-center justify-between">
                <span><strong>Live Pilot Prototype:</strong> pnpexpress.vercel.app</span>
                <span className="text-red-600 font-bold">Harare Staging Ready</span>
              </div>
            </div>
            <PageFooter pageNum={7} />
          </div>

          {/* ==================== PAGE 8 ==================== */}
          <div id="text-doc-page-8" className="a4-text-doc-page p-10 flex flex-col justify-between text-slate-900 text-xs leading-relaxed">
            <div>
              <PageHeader pageNum={8} title="Risk Governance & Board Authorizations" />

              <h2 className="text-sm font-bold font-serif text-slate-900 border-b border-slate-300 pb-1 mb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-3.5 bg-red-600 inline-block rounded-sm"></span>
                12. Risk Management &amp; Regulatory Safeguards
              </h2>

              <div className="space-y-1.5 mb-3 text-[10.5px] text-slate-700">
                <div className="p-2 bg-slate-50 border border-slate-200 rounded">
                  <h4 className="font-bold text-slate-900 mb-0.5">Foreign Exchange &amp; Multi-Currency Settlement</h4>
                  <p className="text-slate-600">Offshore clearing settled directly into TM Pick n Pay&rsquo;s domestic Nostro USD accounts, insulating against currency volatility.</p>
                </div>
                <div className="p-2 bg-slate-50 border border-slate-200 rounded">
                  <h4 className="font-bold text-slate-900 mb-0.5">Stockout Mitigation &amp; Substitution Protocols</h4>
                  <p className="text-slate-600">Real-time inventory webhooks prompt customers with authorized equivalent brands or trigger automated micro-refunds.</p>
                </div>
                <div className="p-2 bg-slate-50 border border-slate-200 rounded">
                  <h4 className="font-bold text-slate-900 mb-0.5">Asset Telematics &amp; Driver Safety</h4>
                  <p className="text-slate-600">Dual-SIM GPS tracking, geo-fenced routes, remote battery shutoff, and comprehensive fleet insurance coverage.</p>
                </div>
              </div>

              <h2 className="text-sm font-bold font-serif text-slate-900 border-b border-slate-300 pb-1 mb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-3.5 bg-red-600 inline-block rounded-sm"></span>
                13. Governance Approvals &amp; Executive Signatures
              </h2>

              <p className="mb-3 text-[10.5px] text-slate-800 text-justify">
                This document represents the formal strategic business case submitted for board review and commercial sanction. By signing below, the authorized executive leaders approve the constitution of the Joint Implementation Steering Committee and authorize the commencement of Sprint 1.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-1 mb-2">
                <div className="p-3 bg-slate-50 rounded border border-slate-300">
                  <span className="text-[9px] uppercase font-bold text-slate-500 block mb-3">
                    For: TM Pick n Pay (Meikles Retail Limited)
                  </span>
                  <div className="h-10 border-b border-dashed border-slate-400 mb-1.5"></div>
                  <div className="font-bold text-[10.5px] text-slate-900">Executive Director / Managing Director</div>
                  <div className="text-[9.5px] text-slate-500">Date: ________________________</div>
                </div>

                <div className="p-3 bg-slate-50 rounded border border-slate-300">
                  <span className="text-[9px] uppercase font-bold text-slate-500 block mb-3">
                    For: Platform Infrastructure Consortium
                  </span>
                  <div className="h-10 border-b border-dashed border-slate-400 mb-1.5"></div>
                  <div className="font-bold text-[10.5px] text-slate-900">Lead Enterprise Architect &amp; Commercial Lead</div>
                  <div className="text-[9.5px] text-slate-500">Date: ________________________</div>
                </div>
              </div>
            </div>
            <PageFooter pageNum={8} />
          </div>

        </div>
      </div>
    </div>
  );
};
