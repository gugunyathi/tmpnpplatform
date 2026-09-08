import React from 'react';
import {
  Mic,
  MessageSquare,
  Search,
  ChevronDown,
  ShoppingBag,
  Sparkles,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Package,
  Home,
  Compass,
  Store,
  User,
  ShoppingCart
} from 'lucide-react';
import { TMPicknPaySquareLogo } from './TMPicknPaySquareLogo';

interface MobileAppHandsetProps {
  scale?: number;
  className?: string;
  isPrintExport?: boolean;
}

export const MobileAppHandset: React.FC<MobileAppHandsetProps> = ({
  className = '',
  isPrintExport = false
}) => {
  return (
    <div
      className={`relative select-none ${className}`}
      style={{
        width: isPrintExport ? '280px' : '250px',
        height: isPrintExport ? '510px' : '460px',
      }}
    >
      {/* Handset Outer Chassis */}
      <div className="w-full h-full bg-[#1e293b] rounded-[38px] p-[6px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.15)] ring-1 ring-slate-700/80 flex flex-col relative overflow-hidden">
        {/* Outer Metal Edge Highlights */}
        <div className="absolute inset-0 rounded-[38px] border-[2px] border-slate-600/40 pointer-events-none z-30" />

        {/* Dynamic Island / Earpiece speaker & sensor */}
        <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-20 h-[14px] bg-black rounded-full z-40 flex items-center justify-end px-2 gap-1 shadow-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-[#1e293b] ring-1 ring-slate-800" />
          <div className="w-1 h-1 rounded-full bg-blue-950" />
        </div>

        {/* Screen Container */}
        <div className="w-full h-full bg-[#f8fafc] rounded-[32px] overflow-hidden flex flex-col justify-between relative shadow-inner text-[10px] font-sans">
          {/* Top Status Bar & Red App Header */}
          <div className="bg-[#c0143c] text-white pt-2 pb-2 px-2.5 space-y-1.5 shadow-md flex-shrink-0">
            {/* Status Bar */}
            <div className="flex items-center justify-between text-[8px] font-semibold tracking-tight px-1 pt-0.5 text-white/90">
              <span>10:09</span>
              <div className="flex items-center space-x-1 text-[8px]">
                <span>5G</span>
                <span className="font-mono">100%</span>
              </div>
            </div>

            {/* Region & Store Selector Row */}
            <div className="flex items-center justify-between text-[7.5px] font-medium text-white/90 px-0.5">
              <div className="flex items-center gap-0.5">
                <span>Region: <strong className="font-bold text-white">Harare Region</strong></span>
                <ChevronDown className="w-2.5 h-2.5 opacity-80" />
              </div>
              <div className="flex items-center gap-0.5">
                <span>Store: <strong className="font-bold text-white">PICK n PAY MSASA</strong></span>
                <ChevronDown className="w-2.5 h-2.5 opacity-80" />
              </div>
            </div>

            {/* Logo, Currency & Cart Header */}
            <div className="flex items-center justify-between gap-1.5 pt-0.5">
              {/* TM Pick n Pay Logo Badge */}
              <div className="bg-white rounded-md px-1.5 py-0.5 flex items-center gap-1.5 shadow-sm flex-1">
                <TMPicknPaySquareLogo size={16} className="p-0 shadow-none" />
                <span className="font-extrabold text-[#003b7a] text-[7.5px] tracking-tight">Pick n Pay</span>
                <ShoppingBag className="w-2.5 h-2.5 text-[#003b7a] ml-auto" />
              </div>

              {/* Currency Selector */}
              <div className="bg-[#8b0a27] text-white text-[7.5px] font-bold px-1.5 py-1 rounded-full flex items-center gap-0.5 border border-white/20">
                <span>GB £</span>
                <ChevronDown className="w-2 h-2" />
              </div>

              {/* Cart Icon */}
              <div className="bg-[#003b7a] text-white p-1 rounded-full shadow-sm flex items-center justify-center">
                <ShoppingCart className="w-2.5 h-2.5" />
              </div>
            </div>
          </div>

          {/* Main App Screen Scrollable Area */}
          <div className="flex-1 p-2 space-y-2 overflow-hidden flex flex-col justify-start bg-slate-50">
            {/* The Perfect Platters Hero Specials Card */}
            <div className="bg-gradient-to-br from-[#0c2340] via-[#102a4e] to-[#0a1c33] text-white rounded-xl p-2 shadow-sm border border-slate-700/60 relative overflow-hidden">
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <span className="bg-[#e11d48] text-white text-[6.5px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                    TM PICK N PAY SPECIALS
                  </span>
                </div>

                <div className="text-[6.5px] text-amber-300 font-medium flex items-center gap-0.5">
                  <span>🍴 Harare · Bulawayo · Mutare · Nationwide</span>
                </div>

                <div className="text-[11px] font-black tracking-wide text-amber-400 leading-none pt-0.5 uppercase drop-shadow-sm font-serif">
                  THE PERFECT PLATTERS
                </div>

                <div className="bg-[#e11d48] text-white text-[6.5px] font-black px-1.5 py-0.5 rounded inline-block">
                  ORDER DELICIOUS PLATTERS FROM TM PICK N PAY!
                </div>

                <p className="text-[6px] text-slate-300 leading-tight line-clamp-2">
                  Order custom function platters online for fast click &amp; collect or direct delivery to family events in Harare &amp; Bulawayo.
                </p>

                {/* AI & WhatsApp CTA Buttons */}
                <div className="grid grid-cols-2 gap-1 pt-1">
                  <button className="bg-[#f59e0b] hover:bg-[#d97706] text-slate-950 font-black text-[7px] py-1 px-1.5 rounded flex items-center justify-center gap-1 shadow-sm">
                    <Mic className="w-2 h-2 text-slate-950" />
                    <span>Voice AI Order</span>
                  </button>

                  <button className="bg-[#10b981] hover:bg-[#059669] text-white font-black text-[7px] py-1 px-1.5 rounded flex items-center justify-center gap-1 shadow-sm">
                    <MessageSquare className="w-2 h-2 text-white" />
                    <span>WhatsApp Order</span>
                  </button>
                </div>

                {/* Pagination Dots */}
                <div className="flex items-center justify-center gap-1 pt-1">
                  <div className="w-3 h-1 bg-amber-400 rounded-full" />
                  <div className="w-1 h-1 bg-slate-500 rounded-full" />
                  <div className="w-1 h-1 bg-slate-500 rounded-full" />
                  <div className="w-1 h-1 bg-slate-500 rounded-full" />
                  <div className="w-1 h-1 bg-slate-500 rounded-full" />
                </div>
              </div>

              {/* Prev / Next Chevrons on Hero Card */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0.5 p-0.5 bg-black/40 rounded-full text-white/70">
                <ChevronLeft className="w-2.5 h-2.5" />
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 right-0.5 p-0.5 bg-black/40 rounded-full text-white/70">
                <ChevronRight className="w-2.5 h-2.5" />
              </div>
            </div>

            {/* Quick Navigation Pills */}
            <div className="flex items-center gap-1 overflow-x-hidden text-[7px] font-bold">
              <div className="bg-[#003b7a] text-white px-2 py-1 rounded-full flex items-center gap-1 whitespace-nowrap shadow-xs">
                <Home className="w-2 h-2" />
                <span>Home Catalog</span>
              </div>
              <div className="bg-slate-200 text-slate-700 px-2 py-1 rounded-full flex items-center gap-1 whitespace-nowrap">
                <Compass className="w-2 h-2 text-slate-500" />
                <span>Discover</span>
              </div>
              <div className="bg-slate-200 text-slate-700 px-2 py-1 rounded-full flex items-center gap-1 whitespace-nowrap">
                <Store className="w-2 h-2 text-slate-500" />
                <span>My Shop</span>
              </div>
            </div>

            {/* Store Catalog & Bought Previously Tabs */}
            <div className="grid grid-cols-2 gap-1 text-[7px] font-bold">
              <div className="bg-[#003b7a] text-white px-1.5 py-1 rounded-md flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-1">
                  <Package className="w-2 h-2 text-amber-400" />
                  <span>All Store Catalog</span>
                </div>
                <span className="bg-blue-900 text-white text-[6px] px-1 rounded-full">12</span>
              </div>
              <div className="bg-white border border-amber-400/80 text-slate-800 px-1.5 py-1 rounded-md flex items-center gap-1 shadow-xs">
                <RotateCcw className="w-2 h-2 text-amber-500" />
                <span>Bought Previously</span>
              </div>
            </div>

            {/* Search Input */}
            <div className="bg-white border border-slate-300 rounded-md px-2 py-1 flex items-center gap-1 text-[7px] text-slate-500 shadow-2xs">
              <Search className="w-2.5 h-2.5 text-slate-400" />
              <span className="truncate">Search maize meal (hupfu), oil (mafuta)...</span>
            </div>

            {/* Recipient Dropdown */}
            <div className="bg-blue-50/80 border border-blue-200 rounded-md px-2 py-1 flex items-center justify-between text-[7px]">
              <span className="text-slate-600 font-medium">Adding for:</span>
              <div className="bg-white border border-slate-300 px-1.5 py-0.5 rounded font-bold text-slate-800 flex items-center gap-1">
                <span className="truncate max-w-[100px]">Gogo Moyo (Harare, ZIM)</span>
                <ChevronDown className="w-2 h-2 text-slate-500" />
              </div>
            </div>

            {/* Outlets Header */}
            <div className="flex items-center justify-between text-[6.5px] px-0.5 pt-0.5 text-slate-600">
              <div className="flex items-center gap-0.5 font-bold text-slate-800">
                <Store className="w-2 h-2 text-blue-600" />
                <span>Cross-Border Supply Outlets:</span>
              </div>
              <span className="text-slate-500 font-medium">12 Groceries Avail...</span>
            </div>
          </div>

          {/* Floating Action Buttons */}
          <div className="absolute right-2 bottom-12 flex flex-col gap-1.5 z-20">
            <div className="w-6 h-6 rounded-full bg-teal-500 text-white shadow-md flex items-center justify-center ring-1 ring-white/40">
              <ShoppingBag className="w-3 h-3" />
            </div>
            <div className="w-6 h-6 rounded-full bg-emerald-500 text-white shadow-md flex items-center justify-center ring-1 ring-white/40 relative">
              <Smartphone className="w-3 h-3" />
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white" />
            </div>
            <div className="w-6 h-6 rounded-full bg-indigo-600 text-white shadow-md flex items-center justify-center ring-1 ring-white/40">
              <Sparkles className="w-3 h-3 text-amber-300" />
            </div>
          </div>

          {/* Bottom Navigation Bar */}
          <div className="bg-[#9b0e2b] text-white px-2 py-1.5 flex items-center justify-between text-[7px] font-medium border-t border-red-900 shadow-md flex-shrink-0">
            <div className="flex flex-col items-center text-amber-300 font-bold">
              <Home className="w-3 h-3" />
              <span>Home</span>
              <span className="w-1 h-1 bg-amber-400 rounded-full mt-0.5" />
            </div>

            <div className="flex flex-col items-center text-white/80">
              <Compass className="w-3 h-3" />
              <span>Discover</span>
            </div>

            <div className="flex flex-col items-center text-white/80">
              <Store className="w-3 h-3" />
              <span>My Shop</span>
            </div>

            <div className="flex flex-col items-center text-white/80">
              <User className="w-3 h-3" />
              <span>Profile</span>
            </div>

            <div className="flex flex-col items-center text-white/80 relative">
              <ShoppingCart className="w-3 h-3" />
              <span>Cart</span>
              <span className="absolute -top-1 -right-1 bg-white text-[#9b0e2b] text-[5px] font-black w-2.5 h-2.5 rounded-full flex items-center justify-center shadow-xs">
                0
              </span>
            </div>

            <div className="flex flex-col items-center text-white/60">
              <ChevronDown className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
