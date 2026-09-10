import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Maximize2,
  Minimize2,
  Grid,
  Layers,
  Sparkles,
  Loader2,
  Check,
  TrendingUp,
  ShieldCheck,
  Zap,
  Globe,
  Truck,
  DollarSign,
  ArrowRight,
  CheckCircle2,
  Smartphone,
  ExternalLink,
  ShoppingBag,
  Store,
  RefreshCw,
  Award,
  Play,
  X,
  Tv
} from 'lucide-react';
import { downloadSlideDeckPDFDirect, PDFProgressCallback } from '../utils/pdfGenerator';
import { MobileAppHandset } from './MobileAppHandset';
import { TMPicknPaySquareLogo } from './TMPicknPaySquareLogo';

export const ExecutiveDeckView: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isGridView, setIsGridView] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [showHUD, setShowHUD] = useState(true);
  const [downloadProgress, setDownloadProgress] = useState<{ current: number; total: number; message: string }>({
    current: 0,
    total: 14,
    message: '',
  });

  // Touch gesture tracking
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const hudTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => setCurrentSlide((prev) => (prev < 13 ? prev + 1 : 0));
  const prevSlide = () => setCurrentSlide((prev) => (prev > 0 ? prev - 1 : 13));

  // Toggle Presentation Mode
  const handleToggleFullscreen = () => {
    if (!isFullscreen) {
      setIsFullscreen(true);
      setIsGridView(false);
      try {
        if (document.documentElement.requestFullscreen && !document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        }
      } catch (e) {}
    } else {
      setIsFullscreen(false);
      try {
        if (document.exitFullscreen && document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
        }
      } catch (e) {}
    }
  };

  // Touch handlers for swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchStartX.current - touchEndX;
    const deltaY = touchStartY.current - touchEndY;

    // Verify it's primarily a horizontal swipe (>40px)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX > 0) {
        // Swipe Left -> Next Slide
        nextSlide();
      } else {
        // Swipe Right -> Prev Slide
        prevSlide();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space' || e.key === 'PageDown' || e.key === 'Enter') {
        setCurrentSlide((prev) => (prev < 13 ? prev + 1 : 0));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp' || e.key === 'Backspace') {
        setCurrentSlide((prev) => (prev > 0 ? prev - 1 : 13));
      } else if (e.key === 'Escape') {
        setIsFullscreen(false);
        setIsGridView(false);
        try {
          if (document.exitFullscreen && document.fullscreenElement) {
            document.exitFullscreen().catch(() => {});
          }
        } catch (err) {}
      } else if (e.key.toLowerCase() === 'f') {
        handleToggleFullscreen();
      } else if (e.key === 'Home') {
        setCurrentSlide(0);
      } else if (e.key === 'End') {
        setCurrentSlide(13);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  // Auto-hide HUD during fullscreen presentation
  const handleMouseMoveHUD = () => {
    setShowHUD(true);
    if (hudTimeoutRef.current) clearTimeout(hudTimeoutRef.current);
    hudTimeoutRef.current = setTimeout(() => {
      if (isFullscreen) {
        setShowHUD(false);
      }
    }, 3500);
  };

  const handleDownloadPDF = async () => {
    if (isGeneratingPDF) return;
    setIsGeneratingPDF(true);
    setDownloadProgress({ current: 0, total: 14, message: 'Starting A4 Landscape PDF export...' });

    const progressCb: PDFProgressCallback = (current, total, message) => {
      setDownloadProgress({ current, total, message });
    };

    try {
      await downloadSlideDeckPDFDirect(14, progressCb);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // Slide Metadata for quick references
  const slideTitles = [
    "01 · Executive Board Proposal Cover",
    "02 · Disclaimer: Strategic Context & System Boundaries",
    "03 · Capitalizing on Structural Market Inefficiencies",
    "04 · Bypassing Physical Logistics & Operational Friction",
    "05 · What the Platform Uniquely Delivers (Value Proposition)",
    "06 · Data-Smart Pipeline Projections ($61.2M Baseline)",
    "07 · Consolidated Ecosystem Throughput & Revenue Calculations",
    "08 · Strategic Benefits to TM Pick n Pay and the Market",
    "09 · Aligning Risk, Capital and Structure (Business Models)",
    "10 · Downstream Innovation: Trading Platform End State",
    "11 · Full Basket Comparison Engine & Price Audit",
    "12 · Owned Delivery Network & Green Fleet Model",
    "13 · Bank-Agnostic Payment Rails & Settlement Architecture",
    "14 · Next Steps, Commercial Charter & Demo App"
  ];

  return (
    <div className="max-w-6xl mx-auto my-4 px-2 sm:px-4">
      {/* Top Controls Toolbar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-red-600/10 text-red-500 rounded-lg border border-red-500/20">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white tracking-tight">
                Executive Presentation Deck
              </h2>
              <span className="px-2 py-0.5 text-[10px] font-mono font-semibold bg-red-500/10 text-red-400 border border-red-500/20 rounded">
                14 Slides · A4 Landscape
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Slide {currentSlide + 1} of 14: <span className="text-slate-200 font-medium">{slideTitles[currentSlide]}</span>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* Present Fullscreen Button */}
          <button
            onClick={handleToggleFullscreen}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-950/40 border border-emerald-500/40 transition active:scale-95"
            title="Start full screen presentation with touch swipe and keyboard controls"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Present Deck</span>
          </button>

          <button
            onClick={() => setIsGridView(!isGridView)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
              isGridView
                ? 'bg-red-600 text-white border-red-500 shadow-sm'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>{isGridView ? 'Close Grid' : 'Slide Grid'}</span>
          </button>

          <button
            onClick={handleDownloadPDF}
            disabled={isGeneratingPDF}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-lg shadow-red-900/30 transition disabled:opacity-50"
            title="Export complete 14-slide deck as calibrated A4 Landscape PDF"
          >
            {isGeneratingPDF ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Exporting Slide {downloadProgress.current}/{downloadProgress.total}...</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Download Deck (PDF)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Download Progress Banner if Active */}
      {isGeneratingPDF && (
        <div className="bg-slate-900 border border-red-500/40 rounded-xl p-3.5 mb-6 shadow-xl flex items-center justify-between text-xs text-slate-200">
          <div className="flex items-center space-x-3">
            <Loader2 className="w-4 h-4 text-red-400 animate-spin flex-shrink-0" />
            <div>
              <span className="font-semibold text-white">Generating 300 DPI A4 Landscape PDF Deck:</span>{' '}
              <span className="text-slate-400">{downloadProgress.message}</span>
            </div>
          </div>
          <div className="w-36 bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-red-600 h-full transition-all duration-300"
              style={{ width: `${(downloadProgress.current / downloadProgress.total) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Grid Thumbnail View */}
      {isGridView ? (
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 mb-8 shadow-2xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Slide Index &amp; Quick Switch</h3>
            <span className="text-xs text-slate-400">Click any slide to jump</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {slideTitles.map((title, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentSlide(idx);
                  setIsGridView(false);
                }}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between aspect-[16/10] ${
                  currentSlide === idx
                    ? 'bg-red-950/40 border-red-500 ring-2 ring-red-500/20 text-white'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">
                    SLIDE {String(idx + 1).padStart(2, '0')}
                  </span>
                  {currentSlide === idx && <Check className="w-3.5 h-3.5 text-red-400" />}
                </div>
                <div className="text-xs font-semibold line-clamp-2 text-slate-200 mt-2">
                  {title.replace(/^\d+\s*·\s*/, '')}
                </div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">A4 Landscape</div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Active Single Slide Presentation Container (16:10 / 1.414 A4 Landscape Ratio) */
        <div className="relative bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 transition-all group">
          {/* Main Slide Viewer with Touch Swipe & Click Areas */}
          <div
            className="w-full flex items-center justify-center p-2 sm:p-4 bg-slate-950 relative"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Click Navigation Overlay Buttons on Left & Right */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-red-600 text-white border border-slate-700 shadow-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 focus:opacity-100"
              title="Previous Slide (or Left Arrow / Swipe Right)"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-red-600 text-white border border-slate-700 shadow-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 focus:opacity-100"
              title="Next Slide (or Right Arrow / Swipe Left)"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Slide Canvas */}
            <div className="w-full max-w-[1000px] aspect-[1.414/1] bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-700/50 flex flex-col justify-between select-none">
              {renderSlideContent(currentSlide + 1)}
            </div>
          </div>

          {/* Slide Navigation Controls Bar */}
          <div className="bg-slate-950 px-6 py-3.5 border-t border-slate-800 flex items-center justify-between text-white select-none">
            {/* Left: Presentation Shortcut Tip */}
            <div className="hidden lg:flex items-center space-x-2 text-[11px] text-slate-400">
              <span className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] font-mono font-bold text-slate-300">
                ← / →
              </span>
              <span>or Swipe to navigate</span>
              <span className="text-slate-600">·</span>
              <span className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] font-mono font-bold text-slate-300">
                F
              </span>
              <span>Present Fullscreen</span>
            </div>

            {/* Slide Dots Indicator */}
            <div className="flex items-center space-x-1.5 overflow-x-auto max-w-xs sm:max-w-md py-1">
              {Array.from({ length: 14 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all ${
                    currentSlide === idx ? 'w-6 bg-red-600' : 'w-2 bg-slate-700 hover:bg-slate-600'
                  }`}
                  title={`Jump to Slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev / Counter / Next / Present Controls */}
            <div className="flex items-center space-x-2.5">
              <button
                onClick={prevSlide}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Prev</span>
              </button>

              <span className="font-mono text-xs text-slate-400 font-bold px-1.5">
                {String(currentSlide + 1).padStart(2, '0')} / 14
              </span>

              <button
                onClick={nextSlide}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow transition active:scale-95"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleToggleFullscreen}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white transition"
                title="Present Fullscreen (Press F)"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DEDICATED FULL-SCREEN PRESENTATION OVERLAY */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-[100] bg-slate-950/98 backdrop-blur-md flex flex-col justify-between select-none overflow-hidden"
          onMouseMove={handleMouseMoveHUD}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top HUD Bar */}
          <div
            className={`w-full px-6 py-3.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between z-30 transition-opacity duration-300 ${
              showHUD ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div className="flex items-center space-x-3">
              <TMPicknPaySquareLogo size={28} className="shadow-sm ring-1 ring-white/10" />
              <div>
                <span className="text-xs font-bold text-white tracking-tight">
                  TM Pick n Pay Express · Board Presentation
                </span>
                <span className="hidden sm:inline text-xs text-slate-400 ml-2 font-mono">
                  — {slideTitles[currentSlide]}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <span className="px-2 py-0.5 bg-slate-800 border border-slate-700 text-slate-300 rounded font-mono text-xs font-bold">
                Slide {currentSlide + 1} of 14
              </span>
              <span className="hidden md:inline text-[11px] text-slate-400 font-mono">
                Press [ESC] to Exit · [← / →] to Navigate
              </span>
              <button
                onClick={handleToggleFullscreen}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold shadow transition"
              >
                <Minimize2 className="w-3.5 h-3.5" />
                <span>Exit Fullscreen</span>
              </button>
            </div>
          </div>

          {/* Center Stage Presentation Canvas */}
          <div className="flex-1 flex items-center justify-center p-2 sm:p-6 md:p-8 relative overflow-hidden">
            {/* Left Edge Click Button */}
            <button
              onClick={prevSlide}
              className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 rounded-full bg-slate-900/80 hover:bg-red-600 text-white border border-slate-700/80 shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
              title="Previous Slide (Swipe Right / Left Arrow)"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            {/* Right Edge Click Button */}
            <button
              onClick={nextSlide}
              className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 rounded-full bg-slate-900/80 hover:bg-red-600 text-white border border-slate-700/80 shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
              title="Next Slide (Swipe Left / Right Arrow / Click Slide)"
            >
              <ChevronRight className="w-7 h-7" />
            </button>

            {/* Fullscreen Scaled Slide Container (Strict 1.414 Landscape Ratio) */}
            <div
              className="w-full max-w-[1240px] max-h-[85vh] aspect-[1.414/1] bg-white rounded-2xl shadow-[0_0_80px_rgba(0,0,0,0.8)] border border-slate-700/60 overflow-hidden flex flex-col justify-between cursor-pointer"
              onClick={nextSlide}
              title="Click anywhere on slide to advance to next"
            >
              {renderSlideContent(currentSlide + 1)}
            </div>
          </div>

          {/* Bottom HUD Bar & Scrubber */}
          <div
            className={`w-full px-6 py-3 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between z-30 transition-opacity duration-300 ${
              showHUD ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            {/* Scrubber Dots */}
            <div className="flex items-center space-x-1.5 overflow-x-auto max-w-lg py-1">
              {Array.from({ length: 14 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentSlide(idx);
                  }}
                  className={`h-2.5 rounded-full transition-all ${
                    currentSlide === idx
                      ? 'w-8 bg-red-600 shadow-md shadow-red-600/50'
                      : 'w-2.5 bg-slate-700 hover:bg-slate-500'
                  }`}
                  title={`Go to Slide ${idx + 1}: ${slideTitles[idx]}`}
                />
              ))}
            </div>

            {/* Bottom Controls */}
            <div className="flex items-center space-x-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevSlide();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev</span>
              </button>

              <span className="font-mono text-xs text-slate-300 font-bold px-2">
                {String(currentSlide + 1).padStart(2, '0')} / 14
              </span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextSlide();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow transition"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* OFFSCREEN HIGH-PRECISION 14-SLIDE A4 LANDSCAPE RENDER CONTAINERS FOR PDF GENERATION */}
      {/* 1123px width x 794px height matches exactly 297mm x 210mm A4 Landscape ratio at 96 DPI */}
      <div className="hidden" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, idx) => {
          const slideNumber = idx + 1;
          return (
            <div
              key={slideNumber}
              id={`slide-deck-render-${slideNumber}`}
              style={{
                width: '1123px',
                height: '794px',
                boxSizing: 'border-box',
              }}
              className="relative overflow-hidden bg-white flex flex-col justify-between"
            >
              {renderSlideContent(slideNumber, true)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

/**
 * High-fidelity renderer for all 14 discrete presentation slides
 * @param slideNum Slide number (1 - 14)
 * @param isPrintExport Whether this is rendering for the offscreen 1123x794 PDF canvas
 */
function renderSlideContent(slideNum: number, isPrintExport: boolean = false) {
  // Scaling factors: when rendering on offscreen 1123x794 canvas, text and padding scale proportionally
  const isCover = slideNum === 1;
  const isDark = slideNum === 1 || slideNum === 10 || slideNum === 14;

  const header = (
    <div className={`flex items-center justify-between border-b pb-2.5 px-6 pt-4 ${isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'}`}>
      <div className="flex items-center space-x-2.5">
        <TMPicknPaySquareLogo size={22} className="shadow-xs" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
          {getSlideCategory(slideNum)}
        </span>
      </div>
      <span className="font-mono text-[11px] font-bold opacity-75">
        {String(slideNum).padStart(2, '0')}
      </span>
    </div>
  );

  const footer = (
    <div className={`flex items-center justify-between border-t pt-2 px-6 pb-3 text-[10px] ${isDark ? 'border-slate-800/80 text-slate-500' : 'border-slate-200/80 text-slate-400'}`}>
      <span>TM Pick n Pay Express — Click-to-Door</span>
      <span className="italic">Confidential · Executive Board Proposal</span>
    </div>
  );

  return (
    <div className={`w-full h-full flex flex-col justify-between ${isDark ? 'bg-[#0a192f] text-white' : 'bg-[#f8fafc] text-slate-900'}`}>
      {/* Slide Header (Except Cover) */}
      {!isCover && header}

      {/* Slide Body Content */}
      <div className="flex-1 px-6 py-4 flex flex-col justify-center overflow-hidden">
        {getSlideBody(slideNum, isPrintExport)}
      </div>

      {/* Slide Footer (Except Cover) */}
      {!isCover && footer}
    </div>
  );
}

function getSlideCategory(slideNum: number): string {
  switch (slideNum) {
    case 1: return 'EXECUTIVE BOARD PROPOSAL';
    case 2: return 'DISCLAIMER · STRATEGIC BOUNDARIES';
    case 3: return 'THE OPPORTUNITY GAP & MACRO CATALYST';
    case 4: return 'STATUS QUO VS. STRATEGIC EVOLUTION';
    case 5: return 'SLIDE 05 · VALUE PROPOSITION';
    case 6: return 'SLIDE 06 · MARKET PROJECTIONS & SYSTEM ASSUMPTIONS';
    case 7: return 'SLIDE 07 · CONSOLIDATED ECOSYSTEM REVENUE';
    case 8: return 'SLIDE 08 · BENEFITS TO TM PICK N PAY';
    case 9: return 'SLIDE 09 · BUSINESS MODEL OPTIONS';
    case 10: return 'SLIDE 10 · DOWNSTREAM INNOVATION';
    case 11: return 'SLIDE 11 · BASKET COMPARISON ENGINE';
    case 12: return 'SLIDE 12 · OWNED DELIVERY NETWORK';
    case 13: return 'SLIDE 13 · PAYMENT RAILS';
    case 14: return 'SLIDE 14 · NEXT STEPS & ACTION PLAN';
    default: return 'EXECUTIVE PROPOSAL';
  }
}

function getSlideBody(slideNum: number, isPrintExport: boolean) {
  switch (slideNum) {
    // SLIDE 1: Cover Page
    case 1:
      return (
        <div className="grid grid-cols-12 gap-6 h-full items-center px-4">
          <div className="col-span-7 flex flex-col justify-center space-y-4">
            <div className="flex items-center space-x-3">
              <TMPicknPaySquareLogo size={42} className="shadow-lg ring-1 ring-white/20" />
              <div>
                <span className="text-amber-400 font-bold uppercase tracking-widest text-[10px] block">
                  EXECUTIVE BOARD PROPOSAL
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  CONFIDENTIAL · 2026-V2.4
                </span>
              </div>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                TM Pick n Pay Express
              </h1>
              <h2 className="text-sm font-semibold text-slate-300 mt-1">
                Evolving Click &amp; Collect into a Multi-Tenant Click-to-Door Delivery Platform
              </h2>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              Unifying Retail Networks, Local &amp; Diaspora Shoppers, Informal Traders Through Open Digital Architecture &amp; Last-Mile Delivery
            </p>

            <div className="bg-slate-900/90 border-l-4 border-red-600 p-3 rounded-r-lg border border-slate-800">
              <span className="text-red-400 font-bold text-[11px] uppercase tracking-wider block mb-0.5">
                Strategic Positioning:
              </span>
              <p className="text-xs text-slate-300 leading-normal">
                TM Pick n Pay as the primary anchor retail tenant and wholesale backbone driving the entire shared consumer ecosystem.
              </p>
            </div>

            <div className="text-[10px] text-slate-500 pt-2">
              Confidential · Venture Partnership Proposal
            </div>
          </div>

          <div className="col-span-5 h-full flex items-center justify-center">
            <div className="w-full h-64 sm:h-72 rounded-xl overflow-hidden border border-slate-700 shadow-2xl relative bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
                alt="Delivery to family doorstep"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3 p-2 bg-slate-900/90 backdrop-blur rounded border border-slate-700 text-white text-[10px]">
                <strong className="text-emerald-400">Direct Click-to-Door Grid:</strong> Rapid home delivery across Harare, Bulawayo &amp; national corridors.
              </div>
            </div>
          </div>
        </div>
      );

    // SLIDE 2: Disclaimer · Strategic Context & System Boundaries
    case 2:
      return (
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Disclaimer: Strategic Context &amp; System Boundaries
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Column 1: Framework Scope */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-6 h-1 bg-red-600 rounded"></div>
              <h3 className="font-bold text-sm text-slate-900">Framework Scope &amp; Limitations</h3>
              
              <div className="space-y-2 text-xs text-slate-600">
                <p>
                  <strong className="text-slate-900">• Independent External Analysis:</strong><br />
                  This framework represents an independent macro-market outlook formulated without full internal visibility into proprietary sales or marketing initiatives.
                </p>
                <p>
                  <strong className="text-slate-900">• Macro-Economic Assumptions:</strong><br />
                  Strategic models are tailored to Zimbabwe's urban landscape, relying heavily on informal trader aggregation and diaspora remittance capital.
                </p>
                <p>
                  <strong className="text-slate-900">• Anchor Infrastructure:</strong><br />
                  Implementation models depend on partnering with anchor retail institutions (TM Pick n Pay) as physical distribution and wholesale supply hubs.
                </p>
              </div>
            </div>

            {/* Column 2: Data & Financial */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-6 h-1 bg-red-600 rounded"></div>
              <h3 className="font-bold text-sm text-slate-900">Data &amp; Financial Boundaries</h3>
              
              <div className="space-y-2 text-xs text-slate-600">
                <p>
                  <strong className="text-slate-900">• Intelligent Commerce Foundation:</strong><br />
                  Financial viability is underpinned by a shared data lake and AI intelligence platform as the catalyst for commercial adaptability and margin growth.
                </p>
                <p>
                  <strong className="text-slate-900">• P&amp;L and Pipeline Projections:</strong><br />
                  Illustrative financial models ($61.2M GMV pipeline) establish a path toward baseline profitability within an abnormal operating environment.
                </p>
                <p>
                  <strong className="text-slate-900">• Technical &amp; Payment Ecosystems:</strong><br />
                  Assumes integration of multi-currency cross-border payment gateways, owned electric scooter fleets, and bank-agnostic remittance rails.
                </p>
              </div>
            </div>
          </div>
        </div>
      );

    // SLIDE 3: Capitalizing on Structural Market Inefficiencies
    case 3:
      return (
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Capitalizing on Structural Market Inefficiencies
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {/* Card 1 */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-6 h-1 bg-red-600 rounded"></div>
                <h3 className="font-bold text-xs uppercase tracking-wide text-slate-900">The "Abnormal P&amp;L" Reality</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Evaluating operations based on historical financial "normalcy" is no longer viable. Success requires investing in operational adaptability out of the ordinary, turning defensive infrastructure costs into offensive P&amp;L drivers.
                </p>
              </div>
              <div className="text-[10px] font-semibold text-red-600 bg-red-50 p-2 rounded border border-red-100">
                Adaptability Over Store CapEx
              </div>
            </div>

            {/* Card 2: The Optimization Gap */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-6 h-1 bg-red-600 rounded"></div>
                <h3 className="font-bold text-xs uppercase tracking-wide text-slate-900">The Optimization Gap</h3>
                <p className="text-xs font-medium text-slate-700 leading-relaxed">
                  A multi‑million dollar distribution gap exists that can only be closed by an open platform integrating three vectors:
                </p>
                <div className="space-y-2 text-xs text-slate-600 pt-1">
                  <p>
                    <strong className="text-slate-900">Diaspora Market</strong> – Buyers continue to buy via cross-boarder delivery, exposing a resilient remittance shopper market ripe for capture.
                  </p>
                  <p>
                    <strong className="text-slate-900">Informal Retail Traders</strong> – A wholesale supply gap exists, creating an opportunity to aggregate informal traders to distribution partners.
                  </p>
                  <p>
                    <strong className="text-slate-900">Customer Convenience</strong> – Online ordering and payment of goods plus doorstep delivery saves costs on transport, fuel, and time.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-6 h-1 bg-red-600 rounded"></div>
                <h3 className="font-bold text-xs uppercase tracking-wide text-slate-900">Data-Driven Intelligence as Moat</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  In a highly informalized economy, data blindness is a structural risk. Underpinning the entire ecosystem with a robust, shared corporate data lake and AI-driven intelligence becomes the ultimate catalyst for profitability, sustainability, and market adaptability.
                </p>
              </div>
              <div className="text-[10px] font-semibold text-blue-600 bg-blue-50 p-2 rounded border border-blue-100">
                End Data Blindness via AI
              </div>
            </div>
          </div>
        </div>
      );

    // SLIDE 4: Bypassing Physical Logistics & Operational Friction
    case 4:
      return (
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Bypassing Physical Logistics &amp; Operational Friction
            </h2>
          </div>

          <div className="space-y-3">
            {/* Legacy Flow */}
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Legacy System — Store-Bound Click &amp; Collect
                </span>
              </div>
              <div className="grid grid-cols-5 gap-2 text-center text-xs">
                <div className="bg-slate-50 border border-slate-200 p-2 rounded font-medium text-slate-700">Local Shopper</div>
                <div className="bg-slate-50 border border-slate-200 p-2 rounded font-medium text-slate-700">Web / App Order</div>
                <div className="bg-red-50 border border-red-200 p-2 rounded font-semibold text-red-700">Recipient Travel Required</div>
                <div className="bg-slate-50 border border-slate-200 p-2 rounded font-medium text-slate-700">Urban Flagship Branch Only</div>
                <div className="bg-red-50 border border-red-200 p-2 rounded font-semibold text-red-700">Informal Transporter Risk</div>
              </div>
            </div>

            {/* Strategic Evolution Flow */}
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Strategic Evolution — Multi-Tenant Click-to-Door &amp; B2B Engine
                </span>
              </div>
              <div className="grid grid-cols-5 gap-2 text-center text-xs">
                <div className="bg-blue-50 border border-blue-200 p-2 rounded font-medium text-blue-900">Local &amp; Diaspora Shopper</div>
                <div className="bg-emerald-50 border border-emerald-200 p-2 rounded font-medium text-emerald-900">Multi-Currency Gateway</div>
                <div className="bg-red-600 text-white p-2 rounded font-bold shadow-sm">TM Pick n Pay Anchor Retail Node</div>
                <div className="bg-slate-100 border border-slate-200 p-2 rounded font-medium text-slate-800">Courier &amp; Informal Fleet</div>
                <div className="bg-emerald-50 border border-emerald-200 p-2 rounded font-semibold text-emerald-800">Direct Door &amp; Tuckshop</div>
              </div>
            </div>

            {/* Two Bottom Outcome Boxes */}
            <div className="grid grid-cols-2 gap-4 pt-1">
              <div className="bg-[#0a192f] text-white p-3.5 rounded-xl space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
                  OVERCOMING PHYSICAL BARRIERS
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Rural, diaspora-funded, and elderly recipients cannot easily reach flagship urban branches. Direct Click-to-Door fulfillment removes physical travel friction entirely.
                </p>
              </div>

              <div className="bg-red-700 text-white p-3.5 rounded-xl space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-red-200">
                  UNLOCKING B2B &amp; DIASPORA GROWTH
                </div>
                <p className="text-xs text-red-100 leading-relaxed">
                  Guarantees global sponsors direct household delivery verification while transforming informal traders into localized wholesale partners, expanding TM PnP market reach.
                </p>
              </div>
            </div>
          </div>
        </div>
      );

    // SLIDE 5: What the platform uniquely delivers (8 Value Propositions)
    case 5:
      return (
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              What the platform uniquely delivers
            </h2>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {[
              {
                title: "First-mover advantage",
                desc: "Defensive moat against OK Zimbabwe & Choppies by establishing the definitive direct-to-door pipeline first."
              },
              {
                title: "Multi-tenant retail engine",
                desc: "Turns TM Pick n Pay's 74+ store estate into high-velocity fulfillment & wholesale distribution hubs."
              },
              {
                title: "Diaspora capital capture",
                desc: "Direct multi-currency checkout (USD, GBP, ZAR) routing remittance funds straight into retail goods."
              },
              {
                title: "Informal trader aggregation",
                desc: "Transforms informal spaza traders from competitive friction into localized B2B distribution partners."
              },
              {
                title: "Data-driven intelligence moat",
                desc: "Shared corporate data lake tracking customer lifetime value, basket behavior, and real-time inventory velocity."
              },
              {
                title: "Bank & payment agnostic",
                desc: "Multi-currency gateway supporting cards, local bank rails, mobile money, and digital settlement."
              },
              {
                title: "Operational adaptability",
                desc: "Turns defensive infrastructure costs into offensive, high-margin P&L drivers (margins, delivery, tech fees)."
              },
              {
                title: "Direct household reach",
                desc: "Bypasses physical logistics barriers for rural and elderly families through localized courier fleets."
              }
            ].map((prop, idx) => (
              <div key={idx} className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-1.5 flex flex-col justify-start">
                <div className="w-5 h-1 bg-red-600 rounded"></div>
                <h3 className="font-bold text-xs text-slate-900 leading-snug">{prop.title}</h3>
                <p className="text-[11px] text-slate-600 leading-normal">{prop.desc}</p>
              </div>
            ))}
          </div>
        </div>
      );

    // SLIDE 6: Data-Smart Pipeline Projections
    case 6:
      return (
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Data-Smart Pipeline Projections: Minimum Viable Business Case
            </h2>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400">SAMPLE SIZE</span>
              <div className="text-3xl font-black text-slate-900">40,000</div>
              <p className="text-[11px] text-slate-600">Active cross-border and domestic families modeled in baseline sample.</p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400">AVERAGE BASKET</span>
              <div className="text-3xl font-black text-emerald-600">$85</div>
              <p className="text-[11px] text-slate-600">Calculated family basket expenditure footprint averaging $85/month.</p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400">PIPELINE VALUATION</span>
              <div className="text-3xl font-black text-red-600">$61.2M</div>
              <p className="text-[11px] text-slate-600">Pipeline valuation consolidating core remittance &amp; local buying.</p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400">MACRO SCALING</span>
              <div className="text-3xl font-black text-blue-600">500k+</div>
              <p className="text-[11px] text-slate-600">Target diaspora population pool between 100,000 and 500,000+ senders.</p>
            </div>
          </div>

          <div className="bg-red-600 text-white p-6 rounded-xl shadow-lg space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-red-200">
              MINIMUM VIABLE BUSINESS CASE SUMMARY
            </span>
            <div className="text-3xl font-black font-mono">
              $61,200,000 Annual Pipeline
            </div>
            <p className="text-xs text-red-100 max-w-3xl leading-relaxed">
              40,000 families × $85/month × 18 orders/yr = $61.2M gross transaction throughput migrated into a digital, tracked, corporate retail ecosystem with multi-tier monetization layers.
            </p>
          </div>
        </div>
      );

    // SLIDE 7: Consolidated Ecosystem Revenue Calculations ($72.3M)
    case 7:
      return (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Consolidated Ecosystem Throughput &amp; Revenue Calculations
            </h2>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded">
              40,000 Diaspora Shoppers (US$61.2M GMV Baseline)
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Phase 1 */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
              <div className="text-xs font-bold text-red-600 uppercase border-b pb-1">
                PHASE 1 · CORE GROSS ECOSYSTEM THROUGHPUT
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <div>
                    <strong className="text-slate-800">Gross Retail Basket GMV</strong>
                    <div className="text-[10px] text-slate-500">$61.2M Diaspora Throughput</div>
                  </div>
                  <span className="font-mono font-bold text-slate-900">US$61,200,000</span>
                </div>

                <div className="flex justify-between">
                  <div>
                    <strong className="text-slate-800">Last-Mile Delivery Fees</strong>
                    <div className="text-[10px] text-slate-500">720k drops @ $4.50 gross fee</div>
                  </div>
                  <span className="font-mono font-bold text-slate-900">US$3,240,000</span>
                </div>

                <div className="flex justify-between">
                  <div>
                    <strong className="text-slate-800">Cross-Border Card Surcharge</strong>
                    <div className="text-[10px] text-slate-500">3% gateway/FX fee on $61.2M</div>
                  </div>
                  <span className="font-mono font-bold text-slate-900">US$1,836,000</span>
                </div>

                <div className="flex justify-between">
                  <div>
                    <strong className="text-slate-800">Diaspora Priority Memberships</strong>
                    <div className="text-[10px] text-slate-500">6,000 subscribers @ $8.99/mo</div>
                  </div>
                  <span className="font-mono font-bold text-slate-900">US$647,280</span>
                </div>

                <div className="flex justify-between">
                  <div>
                    <strong className="text-slate-800">Retail Media Network (1.2%)</strong>
                    <div className="text-[10px] text-slate-500">1.2% ad/promo share on GMV</div>
                  </div>
                  <span className="font-mono font-bold text-slate-900">US$734,400</span>
                </div>
              </div>

              <div className="pt-2 border-t flex justify-between items-center text-xs font-bold text-red-600">
                <span>Phase 1 Gross Throughput</span>
                <span className="font-mono text-sm">US$67,657,680</span>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
              <div className="text-xs font-bold text-blue-600 uppercase border-b pb-1">
                PHASE 2 · RECURRING SUBSCRIPTION LAYER
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-700">Tenant platform fees (240 @ $249)</span>
                  <span className="font-mono font-semibold">US$717,120</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-700">Rider plans (900 @ $45)</span>
                  <span className="font-mono font-semibold">US$486,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-700">Garage &amp; maintenance plans (900 @ $18)</span>
                  <span className="font-mono font-semibold">US$194,400</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-700">Data &amp; price intelligence (40 @ $1,500)</span>
                  <span className="font-mono font-semibold">US$720,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-700">Shopper plans (45k @ $3.99)</span>
                  <span className="font-mono font-semibold">US$2,154,600</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-700">Tuck-shop trading app (3.5k @ $9.99)</span>
                  <span className="font-mono font-semibold">US$419,580</span>
                </div>
              </div>

              <div className="pt-2 border-t flex justify-between items-center text-xs font-bold text-blue-600">
                <span>Phase 2 Subscriptions Subtotal</span>
                <span className="font-mono text-sm">US$4,691,700</span>
              </div>
            </div>
          </div>

          <div className="bg-red-700 text-white p-3 rounded-xl flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase font-bold text-red-200">
                Combined Annual Ecosystem Output (Gross GMV + Services)
              </div>
              <div className="text-xs text-red-100">
                Phase 1 Gross Throughput ($67.66M) + Phase 2 Subscriptions ($4.69M)
              </div>
            </div>
            <div className="text-xl font-black font-mono">
              US$72,349,380 Gross
            </div>
          </div>
        </div>
      );

    // SLIDE 8: Benefits to TM Pick n Pay and the market
    case 8:
      return (
        <div className="space-y-3">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Benefits to TM Pick n Pay and the market
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            {[
              { title: "Faster market entry", desc: "Existing developer integrations accelerate rollout." },
              { title: "Customer convenience", desc: "Digital shift lets diaspora and local customers buy from anywhere." },
              { title: "Expanded customer base", desc: "Diaspora markets plus multiple banks' captured audiences." },
              { title: "Replacement of informal trading", desc: "A legitimate, tax-compliant alternative to unreliable channels." },
              { title: "Cross-border resilience", desc: "Bypasses constraints on physical goods movement between countries." },
              { title: "Economies of scale", desc: "Better prices and smaller packages matched to consumer cash flow." },
              { title: "Increased loyalty & retention", desc: "Secure, reliable delivery builds trust vs informal traders." },
              { title: "Revenue diversification", desc: "Subscriptions, fees or discounts plus wholesale partnerships." },
              { title: "Scalability", desc: "Regional expansion with packaging adapted to local needs." },
              { title: "Convenience-driven adoption", desc: "Small daily-use packages fit township and village habits." },
              { title: "Government alignment", desc: "Formalized trade supports taxation and regulation." },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <h3 className="font-bold text-xs text-slate-900">{item.title}</h3>
                </div>
                <p className="text-[11px] text-slate-600 leading-tight">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      );

    // SLIDE 9: Business Model Options
    case 9:
      return (
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Aligning risk, capital and structure
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Option 1 */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                    OPTION 1
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">Independent Concierge (Reseller)</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We operate as a standalone entity mirroring your catalog via API. Senders pay us in US$; we buy stock from TM PnP at a negotiated wholesale discount and fulfill with our own driver network.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-200 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">SETUP FEE</span>
                  <span className="font-bold text-red-600">TBA</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">COMMERCIAL SPLIT / TAKE</span>
                  <span className="font-bold text-slate-900">5–8% markup + 3–5% rebate</span>
                </div>
              </div>
            </div>

            {/* Option 2 */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                    OPTION 2
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">White-Label Software Licensing</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We build the cross-border storefront extension and license it to TM PnP. It integrates into tmpnponline.co.zw, natively branded, fulfilled by third-party Zimbabwean couriers.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-200 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">SETUP FEE</span>
                  <span className="font-bold text-red-600">TBA</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">COMMERCIAL SPLIT / TAKE</span>
                  <span className="font-bold text-slate-900">1.5–2% GMV revenue share</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    // SLIDE 10: Downstream Innovation
    case 10:
      return (
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-black text-white tracking-tight">
              The end state is a trading platform, not a single-retailer app
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="bg-amber-500/20 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                Phase 1 · Entry
              </span>
              <h3 className="font-bold text-xs text-white">TM Pick n Pay value-add</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Single-tenant. TM branded, TM catalogue, TM fulfilment. The platform earns its place inside one retailer before anything else is discussed.
              </p>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="bg-amber-500/20 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                Phase 2 · Depth
              </span>
              <h3 className="font-bold text-xs text-white">Wholesale and informal channel</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                TM supplies tuck shops and repackagers through the same rails. Volume grows without adding a competing banner to the storefront.
              </p>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="bg-amber-500/20 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                Phase 3 · End state
              </span>
              <h3 className="font-bold text-xs text-white">Retail-agnostic trading platform</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Shopper asks for cooking oil; the request goes to every participating supplier and the best price wins. Retailers become suppliers on a marketplace.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-1">
            <div className="bg-red-950/40 border border-red-500/30 p-3 rounded-xl text-xs text-slate-200">
              Multi-tenant has already been prototyped — three banners running in one app — then deliberately pulled back to a single tenant for the entry conversation.
            </div>
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl text-xs text-slate-200">
              Sequencing is the safeguard: introduce the platform as a TM advantage, without signalling that competitors sit on the same rails on day one.
            </div>
          </div>
        </div>
      );

    // SLIDE 11: Basket Comparison Engine
    case 11:
      return (
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Full basket comparison drives diaspora conversion
            </h2>
          </div>

          <div className="grid grid-cols-12 gap-6 items-center">
            {/* Left: Price Audit Card */}
            <div className="col-span-6 bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                SHOPPER REQUEST · STANDARD FAMILY BASKET (~$85)
              </div>

              <div className="space-y-2">
                <div className="bg-[#0a192f] text-white p-3 rounded-lg flex items-center justify-between">
                  <div>
                    <div className="font-bold text-sm">TM Pick n Pay</div>
                    <div className="text-[10px] text-emerald-400 font-semibold">Lowest Basket Total · Best Value (12/12)</div>
                  </div>
                  <span className="font-mono font-black text-lg text-emerald-400">US$83.40</span>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-lg flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-800">OK Zimbabwe</span>
                    <span className="text-[10px] text-slate-500 ml-2">+US$3.70 vs TM PnP (12/12)</span>
                  </div>
                  <span className="font-mono font-bold text-slate-700">US$87.10</span>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-lg flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-800">Spar Zimbabwe</span>
                    <span className="text-[10px] text-slate-500 ml-2">+US$6.10 vs TM PnP (12/12)</span>
                  </div>
                  <span className="font-mono font-bold text-slate-700">US$89.50</span>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-lg flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-800">Food Lovers Market</span>
                    <span className="text-[10px] text-slate-500 ml-2">+US$9.40 vs TM PnP (11/12)</span>
                  </div>
                  <span className="font-mono font-bold text-slate-700">US$92.80</span>
                </div>
              </div>
            </div>

            {/* Right: Analysis */}
            <div className="col-span-6 space-y-3">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1.5">
                <div className="w-5 h-1 bg-red-600 rounded"></div>
                <h3 className="font-bold text-xs text-slate-900">Basket-Level Comparison Engine</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  When a diaspora shopper builds a ~$85 family grocery basket, the engine calculates live total basket pricing across TM Pick n Pay, OK Zimbabwe, Spar, and Food Lovers. Total basket savings drive conversion far more effectively.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1.5">
                <div className="w-5 h-1 bg-red-600 rounded"></div>
                <h3 className="font-bold text-xs text-slate-900">Merchant Routing &amp; Basket Optimization</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  The engine evaluates item availability, branch proximity, and total basket price. TM Pick n Pay's competitive pricing on essential household staples ensures it consistently wins default basket allocation.
                </p>
              </div>
            </div>
          </div>
        </div>
      );

    // SLIDE 12: Owned Delivery Network
    case 12:
      return (
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              The last mile is owned, not outsourced
            </h2>
          </div>

          <div className="grid grid-cols-4 gap-3">
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-1">
              <div className="text-2xl font-black text-slate-900">500–2,000</div>
              <p className="text-[11px] text-slate-600">Platform-owned electric scooters</p>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-1">
              <div className="text-2xl font-black text-blue-600">12 months</div>
              <p className="text-[11px] text-slate-600">Rent-to-buy, then the rider owns it</p>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-1">
              <div className="text-2xl font-black text-emerald-600">~5 months</div>
              <p className="text-[11px] text-slate-600">Asset pays itself back</p>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-1">
              <div className="text-2xl font-black text-red-600">~10%</div>
              <p className="text-[11px] text-slate-600">Platform fee per dollar earned after ownership</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
              <h3 className="font-bold text-xs text-slate-900">Rent-to-buy</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                The rider operates for twelve months and then owns the scooter. The asset repays itself in roughly five months; months six to twelve are margin.
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
              <h3 className="font-bold text-xs text-slate-900">Advertising rights</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Livery is sold on subscription: 80% reserved for anchor retailer, 20% open inventory. A moving media network across delivery routes.
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
              <h3 className="font-bold text-xs text-slate-900">Own the garage</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Repairs, parts and accessories stay inside the platform on a maintenance plan. Electric tricycles extend fleet into rural routes with women riders as the first cohort.
              </p>
            </div>
          </div>
        </div>
      );

    // SLIDE 13: Payment Rails
    case 13:
      return (
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Bank-agnostic by design, multi-bank in practice
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <h3 className="font-bold text-sm text-red-600">What we say to banks</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Plug your remittance APIs into the platform and we bring transaction share-of-wallet: recurring diaspora flows landing as retail settlement rather than cash-out.
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                No exclusivity is requested and none is given. Every rail is one integration among several, so pricing stays competitive and no single institution gates the platform.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <h3 className="font-bold text-sm text-blue-600">What we say to the retailer</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Banks bring critical mass. Their diaspora bases are already captured audiences; the platform converts those balances into baskets inside your estate.
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Institutions under discussion are prospects at this stage. Nothing is presented in-app as a confirmed partnership until an agreement is signed.
              </p>
            </div>
          </div>

          <div className="bg-red-600 text-white p-3.5 rounded-xl text-xs font-medium leading-relaxed">
            <strong>Design rule:</strong> no bank-specific logic in the core. Rails are adapters, so adding or dropping an institution is a configuration change, never a rebuild.
          </div>
        </div>
      );

    // SLIDE 14: Next Steps & Action Plan
    case 14:
      return (
        <div className="grid grid-cols-12 gap-6 h-full items-center">
          <div className="col-span-7 flex flex-col justify-center space-y-4">
            <div className="w-8 h-1 bg-red-600 rounded"></div>
            <h2 className="text-2xl font-black text-white leading-tight">
              Turn 74+ branches into a local and diaspora Click-to-Door delivery fulfilment network
            </h2>

            <p className="text-xs text-slate-300 leading-relaxed">
              Recommended next step: select a commercial structure and mandate a 60-day pilot on two flagship Harare branches.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://pnpexpress.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="bg-red-600 hover:bg-red-700 text-white font-black text-xs px-5 py-2.5 rounded-lg shadow-lg shadow-red-900/40 flex items-center gap-2 transition"
              >
                <span>Check the DEMO APP !—</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="text-xs text-slate-400">
              Live prototype: <strong className="text-amber-400 font-mono">pnpexpress.vercel.app</strong>
            </div>

            <div className="text-[11px] text-slate-500 pt-2">
              TM Pick n Pay Express — Click-to-Door · Thank you
            </div>
          </div>

          <div className="col-span-5 h-full flex items-center justify-center">
            {/* High-Fidelity Mobile Handset Frame */}
            <MobileAppHandset isPrintExport={isPrintExport} />
          </div>
        </div>
      );

    default:
      return null;
  }
}
