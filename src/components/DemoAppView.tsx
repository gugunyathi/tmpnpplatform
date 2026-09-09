import React, { useState } from 'react';
import {
  Smartphone,
  Tablet,
  RotateCw,
  RefreshCw,
  ExternalLink,
  Sparkles,
  Maximize2,
  Minimize2,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Globe,
  Monitor
} from 'lucide-react';
import { TMPicknPaySquareLogo } from './TMPicknPaySquareLogo';

type DeviceType = 'mobile' | 'tablet' | 'desktop';
type Orientation = 'portrait' | 'landscape';

export const DemoAppView: React.FC = () => {
  const [deviceType, setDeviceType] = useState<DeviceType>('mobile');
  const [orientation, setOrientation] = useState<Orientation>('portrait');
  const [iframeKey, setIframeKey] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [scale, setScale] = useState<number>(100);

  const demoAppUrl = 'https://pnpexpress.vercel.app/';

  const handleRefresh = () => {
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  const toggleOrientation = () => {
    setOrientation((prev) => (prev === 'portrait' ? 'landscape' : 'portrait'));
  };

  // Dimensions based on device and orientation
  const getDeviceDimensions = () => {
    if (deviceType === 'mobile') {
      return orientation === 'portrait'
        ? { width: '390px', height: '844px', label: 'Mobile Portrait (390 × 844)' }
        : { width: '844px', height: '390px', label: 'Mobile Landscape (844 × 390)' };
    }
    if (deviceType === 'tablet') {
      return orientation === 'portrait'
        ? { width: '768px', height: '1024px', label: 'Tablet Portrait (768 × 1024)' }
        : { width: '1024px', height: '768px', label: 'Tablet Landscape (1024 × 768)' };
    }
    return { width: '100%', height: '820px', label: 'Responsive Full View' };
  };

  const dimensions = getDeviceDimensions();

  return (
    <div className="w-full min-h-[calc(100vh-140px)] bg-slate-950 text-slate-100 flex flex-col p-4 md:p-6">
      {/* Top Toolbar / Device Controls */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 mb-6 shadow-xl backdrop-blur flex flex-wrap items-center justify-between gap-4">
        {/* Left: Title & Logo */}
        <div className="flex items-center space-x-3.5">
          <TMPicknPaySquareLogo size={40} className="shadow-md ring-1 ring-white/10" />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white tracking-tight">
                Live Marketplace Demo App
              </h2>
              <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Live Connected
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Embedded Live Architecture · {demoAppUrl}
            </p>
          </div>
        </div>

        {/* Center: Device Type & Orientation Switchers */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Device Type Segmented Control */}
          <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center gap-1">
            <button
              onClick={() => setDeviceType('mobile')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                deviceType === 'mobile'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile</span>
            </button>

            <button
              onClick={() => setDeviceType('tablet')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                deviceType === 'tablet'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Tablet className="w-3.5 h-3.5" />
              <span>Tablet</span>
            </button>

            <button
              onClick={() => setDeviceType('desktop')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                deviceType === 'desktop'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Full View</span>
            </button>
          </div>

          {/* Orientation Toggle (only for mobile & tablet) */}
          {deviceType !== 'desktop' && (
            <button
              onClick={toggleOrientation}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 transition"
              title={`Switch to ${orientation === 'portrait' ? 'Landscape' : 'Portrait'}`}
            >
              <RotateCw className="w-3.5 h-3.5 text-red-400" />
              <span className="capitalize">{orientation}</span>
            </button>
          )}

          {/* Scale Control */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-950 px-2 py-1.5 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400 text-[11px] font-mono px-1">Scale:</span>
            {[80, 90, 100].map((s) => (
              <button
                key={s}
                onClick={() => setScale(s)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono font-semibold transition ${
                  scale === s
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {s}%
              </button>
            ))}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 transition"
            title="Reload Demo App"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-300" />
            <span className="hidden sm:inline">Reload</span>
          </button>

          <a
            href={demoAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-md transition"
          >
            <span>Open in New Tab</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Main Interactive Device Stage */}
      <div className="flex-1 flex flex-col items-center justify-center p-2 sm:p-6 bg-slate-900/40 rounded-3xl border border-slate-800/80 shadow-inner overflow-auto min-h-[600px] relative">
        {/* Device Wrapper */}
        <div
          style={{
            transform: scale !== 100 ? `scale(${scale / 100})` : undefined,
            transformOrigin: 'top center',
            transition: 'all 0.3s ease',
          }}
          className="flex flex-col items-center max-w-full"
        >
          {deviceType === 'desktop' ? (
            /* Full Width Responsive Frame */
            <div className="w-full max-w-6xl bg-slate-900 rounded-2xl border border-slate-700/80 shadow-2xl overflow-hidden flex flex-col">
              {/* Browser Mockup Chrome */}
              <div className="bg-slate-800/90 px-4 py-2.5 border-b border-slate-700 flex items-center justify-between select-none">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                </div>
                <div className="bg-slate-950/80 border border-slate-700 rounded-lg px-3 py-1 text-slate-400 text-xs font-mono max-w-md w-full text-center flex items-center justify-center gap-2 truncate">
                  <span className="text-emerald-400 text-[10px]">🔒</span>
                  <span className="truncate">{demoAppUrl}</span>
                </div>
                <div className="text-[10px] font-mono text-slate-400">
                  Full View
                </div>
              </div>

              {/* Responsive Iframe */}
              <div className="w-full h-[780px] bg-white relative">
                {isLoading && (
                  <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center text-slate-300 z-10">
                    <RefreshCw className="w-8 h-8 text-red-500 animate-spin mb-3" />
                    <p className="text-sm font-semibold">Loading TM Pick n Pay Live App...</p>
                    <p className="text-xs text-slate-500 mt-1 font-mono">Connecting to https://pnpexpress.vercel.app</p>
                  </div>
                )}
                <iframe
                  key={iframeKey}
                  src={demoAppUrl}
                  title="TM Pick n Pay Live Demo App"
                  className="w-full h-full border-0"
                  onLoad={() => setIsLoading(false)}
                  allow="geolocation; camera; microphone; payment; clipboard-write; clipboard-read"
                />
              </div>
            </div>
          ) : (
            /* Mobile or Tablet Physical Handset Frame */
            <div className="relative select-none flex flex-col items-center">
              {/* Device Bezel Exterior */}
              <div
                className={`bg-slate-900 border-4 sm:border-[8px] border-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] relative flex flex-col overflow-hidden transition-all duration-300 ${
                  deviceType === 'mobile'
                    ? orientation === 'portrait'
                      ? 'rounded-[48px] ring-2 ring-slate-700'
                      : 'rounded-[48px] ring-2 ring-slate-700'
                    : orientation === 'portrait'
                    ? 'rounded-[36px] ring-2 ring-slate-700'
                    : 'rounded-[36px] ring-2 ring-slate-700'
                }`}
                style={{
                  width: dimensions.width,
                  height: dimensions.height,
                  maxWidth: '100%',
                }}
              >
                {/* Physical Top Speaker & Notch (for mobile portrait) */}
                {deviceType === 'mobile' && orientation === 'portrait' && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-6 bg-slate-950 rounded-b-2xl z-30 flex items-center justify-center">
                    <div className="w-12 h-1 bg-slate-800 rounded-full"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800 ml-2"></div>
                  </div>
                )}

                {/* Physical Tablet Camera Notch (for tablet portrait) */}
                {deviceType === 'tablet' && orientation === 'portrait' && (
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-slate-950 border border-slate-800 z-30 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-blue-900"></div>
                  </div>
                )}

                {/* Screen Content Container */}
                <div className="w-full h-full bg-white relative overflow-hidden flex-1">
                  {isLoading && (
                    <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center text-slate-300 z-20 p-6 text-center">
                      <RefreshCw className="w-8 h-8 text-red-500 animate-spin mb-3" />
                      <p className="text-sm font-semibold">Loading Live App...</p>
                      <p className="text-xs text-slate-500 mt-1 font-mono">https://pnpexpress.vercel.app</p>
                    </div>
                  )}

                  <iframe
                    key={iframeKey}
                    src={demoAppUrl}
                    title="TM Pick n Pay Live Demo App"
                    className="w-full h-full border-0"
                    onLoad={() => setIsLoading(false)}
                    allow="geolocation; camera; microphone; payment; clipboard-write; clipboard-read"
                  />
                </div>

                {/* Home Indicator Bar (Mobile Portrait) */}
                {deviceType === 'mobile' && orientation === 'portrait' && (
                  <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-600/60 rounded-full z-30 pointer-events-none"></div>
                )}
              </div>

              {/* Dimension Label Tag */}
              <div className="mt-4 flex items-center gap-2 text-xs text-slate-400 font-mono">
                <span>{dimensions.label}</span>
                <span>·</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Interactive Live App
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Feature Guide & Integration Notes */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-wider mb-2">
            <Zap className="w-4 h-4 text-red-500" />
            Real-Time Interaction
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Test the live customer journey directly within the simulator: browse multi-category storefronts, add items to cart, test multi-vendor checkouts, and simulate last-mile delivery dispatches.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-wider mb-2">
            <Tablet className="w-4 h-4 text-blue-500" />
            Responsive Device Testing
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Switch between mobile handset and tablet views, with both portrait and landscape orientation support, verifying layout elasticity across customer and merchant POS devices.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2">
            <Globe className="w-4 h-4 text-emerald-500" />
            Agnostic Marketplace Rails
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            The live application demonstrates the architecture proposed in the strategic deck: unifying TM Pick n Pay stock, informal trader inventory, and diaspora remittances.
          </p>
        </div>
      </div>
    </div>
  );
};
