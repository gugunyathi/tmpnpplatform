import React from 'react';
import { PageWrapper } from './PageWrapper';
import { ArrowRight, XCircle, CheckCircle2, ShieldAlert, Users2, Landmark, RefreshCw } from 'lucide-react';

interface PageProps {
  idPrefix?: string;
  extraClassName?: string;
}

export const Page3MacroOpportunity: React.FC<PageProps> = ({ idPrefix, extraClassName }) => {
  return (
    <PageWrapper pageNumber={3} sectionCategory="MACRO ENVIRONMENT & OPPORTUNITY GAP" idPrefix={idPrefix} extraClassName={extraClassName}>
      <div className="flex flex-col h-full justify-between">
        <div>
          {/* Section Header */}
          <div className="mb-3.5">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Capitalizing on Structural Market Inefficiencies
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Bypassing physical logistics barriers and capturing cross-border foreign currency liquidity.
            </p>
          </div>

          {/* The Optimization Gap Section */}
          <div className="border border-slate-200 rounded p-3 bg-white mb-3 shadow-xs">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1.5 h-3.5 bg-red-600 rounded-xs"></div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                The Optimization Gap
              </h3>
            </div>
            <p className="text-[10.5px] font-medium text-slate-700 leading-relaxed mb-2">
              A multi‑million dollar distribution gap exists that can only be closed by an open platform integrating three vectors:
            </p>
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 bg-slate-50 border border-slate-200 rounded">
                <h4 className="text-[10px] font-bold text-slate-900 mb-0.5">Diaspora Market</h4>
                <p className="text-[9.5px] text-slate-600 leading-relaxed">
                  Buyers continue to buy via cross-boarder delivery, exposing a resilient remittance shopper market ripe for capture.
                </p>
              </div>
              <div className="p-2 bg-slate-50 border border-slate-200 rounded">
                <h4 className="text-[10px] font-bold text-slate-900 mb-0.5">Informal Retail Traders</h4>
                <p className="text-[9.5px] text-slate-600 leading-relaxed">
                  A wholesale supply gap exists, creating an opportunity to aggregate informal traders to distribution partners.
                </p>
              </div>
              <div className="p-2 bg-slate-50 border border-slate-200 rounded">
                <h4 className="text-[10px] font-bold text-slate-900 mb-0.5">Customer Convenience</h4>
                <p className="text-[9.5px] text-slate-600 leading-relaxed">
                  Online ordering and payment of goods plus doorstep delivery saves costs on transport, fuel, and time.
                </p>
              </div>
            </div>
          </div>

          {/* Legacy vs Evolution Architectural Comparison */}
          <div className="border border-slate-200 rounded p-3.5 bg-slate-50 mb-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-3">
              Operational Shift: Legacy Click &amp; Collect vs. Multi-Tenant Click-to-Door Engine
            </h3>

            {/* Legacy Flow */}
            <div className="mb-3 bg-white border border-red-200 rounded p-2.5">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-red-700 uppercase mb-1.5">
                <XCircle className="w-3.5 h-3.5 text-red-500" />
                Legacy Model — Store-Bound Click &amp; Collect (High Friction)
              </div>
              <div className="grid grid-cols-5 gap-1.5 text-center text-[9px] font-semibold text-slate-600">
                <div className="bg-slate-100 p-1.5 rounded border border-slate-200">Local Shopper Only</div>
                <div className="bg-slate-100 p-1.5 rounded border border-slate-200">Web / App Order</div>
                <div className="bg-amber-100/70 text-amber-900 p-1.5 rounded border border-amber-300">Recipient Travel Req.</div>
                <div className="bg-slate-100 p-1.5 rounded border border-slate-200">Urban Flagship Only</div>
                <div className="bg-red-100/70 text-red-900 p-1.5 rounded border border-red-300">High Churn &amp; Friction</div>
              </div>
            </div>

            {/* Strategic Evolution Flow */}
            <div className="bg-white border border-emerald-300 rounded p-2.5 shadow-xs">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-800 uppercase mb-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Strategic Evolution — Multi-Tenant Click-to-Door &amp; B2B Wholesale Engine
              </div>
              <div className="grid grid-cols-5 gap-1.5 text-center text-[9px] font-bold text-slate-700">
                <div className="bg-emerald-50 text-emerald-900 p-1.5 rounded border border-emerald-200">Diaspora &amp; Local</div>
                <div className="bg-emerald-50 text-emerald-900 p-1.5 rounded border border-emerald-200">Multi-Currency Rails</div>
                <div className="bg-slate-900 text-white p-1.5 rounded border border-slate-900">TM PnP Store Hubs</div>
                <div className="bg-emerald-50 text-emerald-900 p-1.5 rounded border border-emerald-200">Electric Fleet Courier</div>
                <div className="bg-emerald-600 text-white p-1.5 rounded">Doorstep &amp; Tuckshop</div>
              </div>
            </div>
          </div>

          {/* Demographic Scaling Analysis */}
          <div className="border border-slate-200 rounded p-3 bg-white">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-2 flex items-center gap-1.5">
              <Users2 className="w-3.5 h-3.5 text-blue-600" />
              Addressable Diaspora Corridors &amp; Macro Scaling Demographics
            </h3>
            <p className="text-[10px] text-slate-600 leading-relaxed mb-2.5">
              Over 3 to 4 million Zimbabweans reside abroad, with primary economic corridors concentrated in South Africa (1.5M+), United Kingdom (400k+), United States &amp; Canada (150k+), and Australia/New Zealand (80k+).
            </p>

            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-slate-50 border border-slate-200 p-2 rounded">
                <span className="text-[9px] text-slate-400 font-semibold uppercase">Total Diaspora</span>
                <div className="text-sm font-extrabold text-slate-900">3.0M – 4.0M</div>
                <div className="text-[8px] text-slate-500">Global Population</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-2 rounded">
                <span className="text-[9px] text-slate-400 font-semibold uppercase">Active Remitters</span>
                <div className="text-sm font-extrabold text-slate-900">100k – 500k+</div>
                <div className="text-[8px] text-slate-500">Target Sender Pool</div>
              </div>
              <div className="bg-red-50 border border-red-200 p-2 rounded">
                <span className="text-[9px] text-red-600 font-semibold uppercase">Baseline Cohort</span>
                <div className="text-sm font-extrabold text-red-700">40,000 Families</div>
                <div className="text-[8px] text-red-700">Phase 1 Target Target</div>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 p-2 rounded">
                <span className="text-[9px] text-emerald-700 font-semibold uppercase">Pipeline Value</span>
                <div className="text-sm font-extrabold text-emerald-800">$61.2 Million</div>
                <div className="text-[8px] text-emerald-700">Gross Baseline GMV</div>
              </div>
            </div>
          </div>
        </div>

        {/* Page Footer Note */}
        <div className="bg-slate-100 px-3 py-1.5 rounded text-[9px] text-slate-600 flex items-center justify-between">
          <span>Key Thesis: Direct Click-to-Door removes physical friction entirely while guaranteeing foreign capital stays in formal retail.</span>
          <span className="font-bold text-slate-800">Source: World Bank Remittance Database &amp; RBZ Data</span>
        </div>
      </div>
    </PageWrapper>
  );
};
