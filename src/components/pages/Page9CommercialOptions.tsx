import React from 'react';
import { PageWrapper } from './PageWrapper';
import { COMMERCIAL_OPTIONS } from '../../data/proposalData';
import { Briefcase, CheckCircle2, ShieldCheck, Scale, ArrowUpRight } from 'lucide-react';

interface PageProps {
  idPrefix?: string;
  extraClassName?: string;
}

export const Page9CommercialOptions: React.FC<PageProps> = ({ idPrefix, extraClassName }) => {
  return (
    <PageWrapper pageNumber={9} sectionCategory="COMMERCIAL STRUCTURING & PARTNERSHIP MODELS" idPrefix={idPrefix} extraClassName={extraClassName}>
      <div className="flex flex-col h-full justify-between">
        <div>
          {/* Header */}
          <div className="mb-3.5">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Aligning Risk, Capital, and Commercial Structure
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Two evaluated commercial operating models designed to match TM Pick n Pay's risk appetite and balance sheet strategy.
            </p>
          </div>

          {/* Side-by-Side Commercial Model Cards */}
          <div className="grid grid-cols-2 gap-3.5 mb-4">
            {COMMERCIAL_OPTIONS.map((opt) => (
              <div key={opt.id} className="border border-slate-200 rounded-lg p-3.5 bg-white shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9px] font-mono font-bold bg-slate-900 text-white px-2 py-0.5 rounded">
                      {opt.badge}
                    </span>
                  </div>
                  <h3 className="text-sm font-extrabold text-slate-900 mb-1">{opt.name}</h3>
                  <p className="text-[10px] text-slate-600 leading-relaxed mb-3">
                    {opt.description}
                  </p>

                  <div className="bg-slate-50 border border-slate-200 rounded p-2.5 mb-3 grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[8px] text-slate-400 font-bold uppercase block">Setup Fee</span>
                      <span className="text-xs font-bold text-slate-900 font-mono">{opt.setupFee}</span>
                    </div>
                    <div>
                      <span className="text-[8px] text-red-600 font-bold uppercase block">Commercial Take</span>
                      <span className="text-xs font-bold text-red-700 font-mono">{opt.commercialTake}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 mb-3">
                    <div className="text-[9px] font-bold text-slate-900 uppercase tracking-wide">Key Division of Roles:</div>
                    {opt.tmPnPResponsibilities.map((resp, i) => (
                      <div key={i} className="text-[9px] text-slate-600 flex items-start gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>TM PnP:</strong> {resp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900 text-white p-2 rounded text-[9px] font-medium leading-snug">
                  <strong className="text-amber-400">Financial Implication:</strong> {opt.financialImplication}
                </div>
              </div>
            ))}
          </div>

          {/* Strategic SaaS Preference Box */}
          <div className="border border-slate-200 rounded p-3 bg-slate-50 mb-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-blue-600" />
              Strategic Preference: Long-Term SaaS Stability vs Transaction Volatility
            </h3>
            <p className="text-[10px] text-slate-600 leading-relaxed mb-2">
              Our recommendation is to establish long-term contract structures modeled on <strong>5 to 10-year commercial horizons (120 months)</strong>. This aligns multi-tier subscription streams (Logistics access, Trader app, FMCG Data Lake intelligence) to secure predictable, compounding valuation for TM Pick n Pay and its partners.
            </p>

            <div className="grid grid-cols-4 gap-2 text-center text-[9px]">
              <div className="bg-white border border-slate-200 p-1.5 rounded">
                <span className="text-slate-400 block font-medium">Horizon</span>
                <strong className="text-slate-900 font-mono">5 – 10 Years</strong>
              </div>
              <div className="bg-white border border-slate-200 p-1.5 rounded">
                <span className="text-slate-400 block font-medium">Software SLA</span>
                <strong className="text-slate-900 font-mono">99.95% Cloud</strong>
              </div>
              <div className="bg-white border border-slate-200 p-1.5 rounded">
                <span className="text-slate-400 block font-medium">CapEx Exposure</span>
                <strong className="text-emerald-700 font-mono">Zero Net CapEx</strong>
              </div>
              <div className="bg-white border border-slate-200 p-1.5 rounded">
                <span className="text-slate-400 block font-medium">Time-to-Pilot</span>
                <strong className="text-slate-900 font-mono">60 Days</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[9px] text-slate-500">
          <span>Both options protect TM Pick n Pay's core brand equity and proprietary pricing power.</span>
          <span className="font-bold text-slate-800">Commercial Term Sheet Available Upon Request</span>
        </div>
      </div>
    </PageWrapper>
  );
};
