import React from 'react';
import { PageWrapper } from './PageWrapper';
import { DEFAULT_FINANCIAL_BASELINE } from '../../data/proposalData';
import { computeFinancials, formatUSD } from '../../utils/calculations';
import { DollarSign, Layers, CheckCircle2, TrendingUp, BarChart3, PieChart } from 'lucide-react';

interface PageProps {
  idPrefix?: string;
  extraClassName?: string;
}

export const Page8FinancialProjections: React.FC<PageProps> = ({ idPrefix, extraClassName }) => {
  const f = computeFinancials(DEFAULT_FINANCIAL_BASELINE);

  return (
    <PageWrapper pageNumber={8} sectionCategory="FINANCIAL MODEL & CONSOLIDATED PROJECTIONS" idPrefix={idPrefix} extraClassName={extraClassName}>
      <div className="flex flex-col h-full justify-between">
        <div>
          {/* Header */}
          <div className="mb-3">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Consolidated Ecosystem Throughput &amp; Revenue
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Financial model based on 40,000 diaspora shoppers generating US$61.2M GMV with multi-tier monetization layers.
            </p>
          </div>

          {/* Top Combined Revenue Banner */}
          <div className="bg-red-700 text-white rounded-lg p-3.5 mb-3.5 flex items-center justify-between shadow-md">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-red-200 block">
                Combined Annual Ecosystem Gross Output (GMV + Services)
              </span>
              <div className="text-2xl font-black tracking-tight font-mono">
                {formatUSD(f.combinedAnnualEcosystemGross)}
              </div>
              <div className="text-[10px] text-red-100 mt-0.5">
                Phase 1 Gross Throughput ({formatUSD(f.phase1GrossThroughput, true)}) + Phase 2 Recurring Subscriptions ({formatUSD(f.phase2SubscriptionsSubtotal, true)})
              </div>
            </div>
            <div className="bg-red-800/80 border border-red-500/50 px-3 py-2 rounded text-right">
              <span className="text-[9px] uppercase text-red-200 block font-semibold">Active Baseline</span>
              <span className="text-sm font-bold font-mono">40,000 Families</span>
              <span className="text-[8px] text-red-300 block">18 orders/yr · $85 avg</span>
            </div>
          </div>

          {/* Phase 1 vs Phase 2 Detailed Tables */}
          <div className="grid grid-cols-2 gap-3 mb-3.5">
            {/* Phase 1 Table */}
            <div className="border border-slate-200 rounded p-3 bg-white shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-200 pb-1.5 mb-2">
                <h3 className="text-[11px] font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  Phase 1 · Core Gross Ecosystem
                </h3>
                <span className="text-[9px] font-mono font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">
                  {formatUSD(f.phase1GrossThroughput, true)}
                </span>
              </div>

              <div className="space-y-1 text-[10px]">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600">Gross Retail Basket GMV ($61.2M)</span>
                  <span className="font-mono font-bold text-slate-900">{formatUSD(f.grossRetailGMV)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600">Last-Mile Delivery Fees (720k @ $4.50)</span>
                  <span className="font-mono font-bold text-slate-900">{formatUSD(f.lastMileDeliveryFees)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600">Cross-Border Card Surcharge (3%)</span>
                  <span className="font-mono font-bold text-slate-900">{formatUSD(f.crossBorderCardSurcharge)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600">Diaspora Priority (6,000 @ $8.99/mo)</span>
                  <span className="font-mono font-bold text-slate-900">{formatUSD(f.diasporaMembershipsAnnual)}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-600">Retail Media Network (1.2% GMV)</span>
                  <span className="font-mono font-bold text-slate-900">{formatUSD(f.retailMediaNetworkRevenue)}</span>
                </div>
              </div>

              <div className="mt-2 pt-1.5 border-t border-slate-200 flex justify-between text-xs font-extrabold text-blue-900">
                <span>Phase 1 Subtotal:</span>
                <span className="font-mono">{formatUSD(f.phase1GrossThroughput)}</span>
              </div>
            </div>

            {/* Phase 2 Table */}
            <div className="border border-slate-200 rounded p-3 bg-white shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-200 pb-1.5 mb-2">
                <h3 className="text-[11px] font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                  Phase 2 · Recurring SaaS &amp; Subscriptions
                </h3>
                <span className="text-[9px] font-mono font-bold text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded">
                  {formatUSD(f.phase2SubscriptionsSubtotal, true)}
                </span>
              </div>

              <div className="space-y-1 text-[10px]">
                <div className="flex justify-between py-0.5 border-b border-slate-100">
                  <span className="text-slate-600">Tenant Platform (240 @ $249/mo)</span>
                  <span className="font-mono font-bold text-slate-900">{formatUSD(f.tenantPlatformFeesAnnual)}</span>
                </div>
                <div className="flex justify-between py-0.5 border-b border-slate-100">
                  <span className="text-slate-600">Rider Plans (900 @ $45/mo)</span>
                  <span className="font-mono font-bold text-slate-900">{formatUSD(f.riderPlansAnnual)}</span>
                </div>
                <div className="flex justify-between py-0.5 border-b border-slate-100">
                  <span className="text-slate-600">Garage Plans (900 @ $18/mo)</span>
                  <span className="font-mono font-bold text-slate-900">{formatUSD(f.garageMaintenanceAnnual)}</span>
                </div>
                <div className="flex justify-between py-0.5 border-b border-slate-100">
                  <span className="text-slate-600">Data Intel (40 @ $1,500/mo)</span>
                  <span className="font-mono font-bold text-slate-900">{formatUSD(f.dataIntelligenceAnnual)}</span>
                </div>
                <div className="flex justify-between py-0.5 border-b border-slate-100">
                  <span className="text-slate-600">Shopper Plans (45,000 @ $3.99/mo)</span>
                  <span className="font-mono font-bold text-slate-900">{formatUSD(f.shopperPlansAnnual)}</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span className="text-slate-600">Tuck-Shop App (3,500 @ $9.99/mo)</span>
                  <span className="font-mono font-bold text-slate-900">{formatUSD(f.tuckShopTradingAppAnnual)}</span>
                </div>
              </div>

              <div className="mt-1.5 pt-1.5 border-t border-slate-200 flex justify-between text-xs font-extrabold text-purple-900">
                <span>Phase 2 Subtotal:</span>
                <span className="font-mono">{formatUSD(f.phase2SubscriptionsSubtotal)}</span>
              </div>
            </div>
          </div>

          {/* Unit Economics Box */}
          <div className="border border-slate-200 rounded p-3 bg-slate-50">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-2 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              Unit Economics &amp; Margin Multipliers
            </h3>

            <div className="grid grid-cols-3 gap-2.5 text-[10px]">
              <div className="bg-white border border-slate-200 p-2 rounded">
                <div className="text-slate-400 font-semibold uppercase text-[9px]">Per-Family Annual GMV</div>
                <div className="text-base font-extrabold text-slate-900 font-mono">$1,530.00</div>
                <div className="text-[8px] text-slate-500">18 orders @ $85 average basket</div>
              </div>

              <div className="bg-white border border-slate-200 p-2 rounded">
                <div className="text-slate-400 font-semibold uppercase text-[9px]">Platform Take Rate</div>
                <div className="text-base font-extrabold text-emerald-700 font-mono">18.2% Gross</div>
                <div className="text-[8px] text-slate-500">Across delivery, FX, ads &amp; subscriptions</div>
              </div>

              <div className="bg-white border border-slate-200 p-2 rounded">
                <div className="text-slate-400 font-semibold uppercase text-[9px]">Annual Net Margin Yield</div>
                <div className="text-base font-extrabold text-purple-700 font-mono">$11.14M</div>
                <div className="text-[8px] text-slate-500">Recurring high-margin ecosystem revenue</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[9px] text-slate-500">
          <span>Model assumes conservative 8% penetration of addressable 500,000 diaspora remittance pool.</span>
          <span className="font-bold text-slate-800">All Figures in United States Dollars (USD)</span>
        </div>
      </div>
    </PageWrapper>
  );
};
