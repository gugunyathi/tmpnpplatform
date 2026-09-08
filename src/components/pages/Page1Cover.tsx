import React from 'react';
import { PageWrapper } from './PageWrapper';
import { PROPOSAL_METADATA } from '../../data/proposalData';
import { TMPicknPaySquareLogo } from '../TMPicknPaySquareLogo';
import { ShieldCheck, ArrowRight, Zap, Globe, Truck, Database, Layers } from 'lucide-react';

interface PageProps {
  idPrefix?: string;
  extraClassName?: string;
}

export const Page1Cover: React.FC<PageProps> = ({ idPrefix, extraClassName }) => {
  return (
    <PageWrapper pageNumber={1} hideHeaderFooter={true} idPrefix={idPrefix} extraClassName={extraClassName}>
      <div className="h-full w-full bg-slate-950 text-white flex flex-col justify-between p-12 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-slate-800/30 rounded-full blur-2xl pointer-events-none"></div>

        {/* Top bar */}
        <div className="relative z-10 flex items-center justify-between border-b border-slate-800 pb-6">
          <div className="flex items-center space-x-3">
            <TMPicknPaySquareLogo size={52} className="shadow-xl ring-1 ring-white/20" />
            <div>
              <span className="text-white font-extrabold text-lg tracking-tight block">
                TM Pick n Pay
              </span>
              <span className="text-slate-400 text-xs font-mono">
                Executive Board Proposal
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-block bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded tracking-widest uppercase mb-1">
              Confidential · Strategic Proposal
            </span>
            <p className="text-slate-400 text-xs font-mono">{PROPOSAL_METADATA.documentCode}</p>
          </div>
        </div>

        {/* Main Hero Section */}
        <div className="relative z-10 my-auto py-6">
          <div className="inline-flex items-center gap-2 text-red-500 font-bold tracking-widest uppercase text-xs mb-3">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            Executive Board Proposal · Agnostic Marketplace Infrastructure
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-white leading-tight mb-4">
            TM Pick n Pay Marketplace &amp; Last-Mile Delivery Infrastructure
          </h1>

          <p className="text-lg text-slate-300 font-normal leading-relaxed mb-6 max-w-2xl">
            Evolving Click &amp; Collect into a Multi-Tenant Click-to-Door Delivery Ecosystem — 
            Unifying Retail Networks, Diaspora Shoppers, and Informal Traders Through Open Digital Architecture.
          </p>

          {/* Strategic Positioning Callout Box */}
          <div className="bg-slate-900/90 border border-slate-700/80 rounded-lg p-5 shadow-2xl backdrop-blur mb-8">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-red-500/10 text-red-400 rounded">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-red-400 mb-1">
                  Core Strategic Positioning
                </h4>
                <p className="text-xs text-slate-200 leading-relaxed">
                  An open-architecture, multi-tenant marketplace framework with <strong className="text-white">TM Pick n Pay</strong> uniquely positioned as the primary anchor retail tenant and wholesale supply backbone driving the entire shared consumer ecosystem.
                </p>
              </div>
            </div>
          </div>

          {/* 4 Feature Highlights */}
          <div className="grid grid-cols-4 gap-3 text-left">
            <div className="bg-slate-900/60 border border-slate-800 p-3 rounded">
              <Globe className="w-4 h-4 text-blue-400 mb-1.5" />
              <div className="text-[11px] font-bold text-white mb-0.5">Diaspora Capture</div>
              <div className="text-[9px] text-slate-400 leading-snug">$61.2M Baseline GMV Corridor via USD/GBP/ZAR</div>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 p-3 rounded">
              <Truck className="w-4 h-4 text-emerald-400 mb-1.5" />
              <div className="text-[11px] font-bold text-white mb-0.5">Owned Last Mile</div>
              <div className="text-[9px] text-slate-400 leading-snug">500–2,000 Electric Scooters on Rent-to-Buy</div>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 p-3 rounded">
              <Database className="w-4 h-4 text-purple-400 mb-1.5" />
              <div className="text-[11px] font-bold text-white mb-0.5">Data Lake Moat</div>
              <div className="text-[9px] text-slate-400 leading-snug">AI-driven basket intelligence &amp; CLV tracking</div>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 p-3 rounded">
              <Zap className="w-4 h-4 text-amber-400 mb-1.5" />
              <div className="text-[11px] font-bold text-white mb-0.5">Informal B2B</div>
              <div className="text-[9px] text-slate-400 leading-snug">Wholesale supply to 10,000+ local tuck-shops</div>
            </div>
          </div>
        </div>

        {/* Footer Metadata */}
        <div className="relative z-10 pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div>
            <span className="text-slate-500 block text-[10px] uppercase tracking-wider font-semibold">Prepared For</span>
            <span className="text-white font-medium">{PROPOSAL_METADATA.preparedFor}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase tracking-wider font-semibold">Prepared By</span>
            <span className="text-white font-medium">{PROPOSAL_METADATA.preparedBy}</span>
          </div>
          <div className="text-right">
            <span className="text-slate-500 block text-[10px] uppercase tracking-wider font-semibold">Date &amp; Version</span>
            <span className="text-white font-medium">{PROPOSAL_METADATA.date} · Version 2.4 Executive</span>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};
