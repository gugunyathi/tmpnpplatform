import React from 'react';
import { PageWrapper } from './PageWrapper';
import { THE_FOUR_PILLARS } from '../../data/proposalData';
import { AlertCircle, CheckCircle2, TrendingUp, Cpu, Users, Store, Globe2 } from 'lucide-react';

interface PageProps {
  idPrefix?: string;
  extraClassName?: string;
}

export const Page2ExecutiveSummary: React.FC<PageProps> = ({ idPrefix, extraClassName }) => {
  return (
    <PageWrapper pageNumber={2} sectionCategory="EXECUTIVE SUMMARY & STRATEGIC CONTEXT" idPrefix={idPrefix} extraClassName={extraClassName}>
      <div className="flex flex-col h-full justify-between">
        <div>
          {/* Page Heading */}
          <div className="mb-4">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Executive Summary &amp; Strategic Context
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Capitalizing on macroeconomic structural shifts through intelligent commerce and multi-channel aggregation.
            </p>
          </div>

          {/* Strategic Context / Abnormal P&L Callout */}
          <div className="grid grid-cols-12 gap-3 mb-4">
            <div className="col-span-8 bg-slate-50 border border-slate-200 rounded p-3.5">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5 mb-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-red-600" />
                The "Abnormal P&amp;L" Reality: Investing in Operational Adaptability
              </h3>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Evaluating retail operations in Zimbabwe based on historical financial "normalcy" is no longer viable. In an economy undergoing rapid informalization, protecting a static brick-and-mortar balance sheet leads to margin attrition. Sustainable enterprise leadership requires investing in operational adaptability—turning defensive operating expenses into an aggressive, technology-driven growth engine that captures non-traditional cash flows.
              </p>
            </div>

            <div className="col-span-4 bg-red-50/70 border border-red-200 rounded p-3.5 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-700 block mb-1">
                  Baseline Pipeline Target
                </span>
                <div className="text-xl font-extrabold text-red-700 tracking-tight">$61,200,000</div>
                <div className="text-[10px] text-red-900 mt-1 leading-snug">
                  40,000 diaspora families spending $85/month across 18 annual orders.
                </div>
              </div>
              <div className="text-[9px] font-semibold text-red-800 bg-red-100/60 px-2 py-1 rounded mt-2 text-center">
                74+ TM PnP Stores as Digital Hubs
              </div>
            </div>
          </div>

          {/* The Four Pillars of Strategic Intervention */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-blue-600" />
                The Four Strategic Pillars of the Unified Marketplace
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">Core Investment Vectors</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {THE_FOUR_PILLARS.map((pillar) => (
                <div key={pillar.number} className="border border-slate-200 rounded p-3 bg-white hover:border-slate-300 transition-colors shadow-xs">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center font-mono">
                      {pillar.number}
                    </span>
                    <h4 className="text-[11px] font-bold text-slate-900 leading-tight">
                      {pillar.title}
                    </h4>
                  </div>
                  <p className="text-[10px] text-slate-600 leading-relaxed mb-2">
                    {pillar.description}
                  </p>
                  <div className="bg-slate-50 border-l-2 border-red-500 pl-2 py-1 text-[9px] text-slate-700 font-medium">
                    <strong className="text-slate-900">Impact: </strong>{pillar.strategicImpact}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strategic Boundaries & Disclaimer */}
          <div className="bg-slate-900 text-slate-200 rounded p-3 border border-slate-800">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[10px] font-bold text-white uppercase tracking-wider mb-1">
                  Strategic Boundaries &amp; Independent Analysis Disclaimer
                </h4>
                <p className="text-[9px] text-slate-300 leading-relaxed">
                  This framework represents an independent macro-market strategic outlook formulated without internal access to TM Pick n Pay's proprietary marketing datasets. Strategic models assume TM Pick n Pay serves as the premier anchor retail institution and wholesale fulfillment grid. Financial models ($61.2M baseline GMV) establish a conservative path toward market share capture within an abnormal operating environment.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Key Stat Strip */}
        <div className="pt-2 border-t border-slate-100 grid grid-cols-4 gap-2 text-center text-slate-600">
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Anchor Stores</div>
            <div className="text-xs font-bold text-slate-900">74+ National Branches</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Target Diaspora Pool</div>
            <div className="text-xs font-bold text-slate-900">100k – 500k+ Senders</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Fulfillment SLA</div>
            <div className="text-xs font-bold text-slate-900">&lt; 45 Min to Door</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Delivery Fleet</div>
            <div className="text-xs font-bold text-slate-900">Electric Scooters / E-Trikes</div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};
