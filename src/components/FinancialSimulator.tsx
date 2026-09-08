import React, { useState } from 'react';
import { FinancialModelScenario } from '../types';
import { DEFAULT_FINANCIAL_BASELINE } from '../data/proposalData';
import { computeFinancials, formatUSD, formatNumber } from '../utils/calculations';
import { RotateCcw, TrendingUp, Layers, DollarSign, Calculator, Download, CheckCircle2 } from 'lucide-react';

export const FinancialSimulator: React.FC = () => {
  const [params, setParams] = useState<FinancialModelScenario>(DEFAULT_FINANCIAL_BASELINE);

  const f = computeFinancials(params);

  const handleReset = () => {
    setParams(DEFAULT_FINANCIAL_BASELINE);
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden my-6">
      {/* Header */}
      <div className="bg-slate-900 text-white p-6 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-red-500 font-bold uppercase tracking-wider mb-1">
            <Calculator className="w-4 h-4" />
            Interactive Board Simulation Engine
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white">
            Ecosystem Financial &amp; Pipeline Simulator
          </h2>
          <p className="text-slate-300 text-xs mt-1">
            Adjust core assumptions to test sensitivity, revenue yields, and gross throughput across varying diaspora and trader adoption rates.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset to Baseline ($61.2M)
        </button>
      </div>

      {/* Main Grid */}
      <div className="p-6 grid grid-cols-12 gap-6">
        {/* Left: Interactive Sliders */}
        <div className="col-span-12 lg:col-span-6 space-y-5 bg-slate-50 p-5 rounded-lg border border-slate-200">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-slate-200">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            Core Pipeline Assumptions
          </h3>

          {/* Active Families */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-semibold text-slate-700">Active Diaspora Families:</span>
              <span className="font-mono font-bold text-red-600">{formatNumber(params.activeDiasporaFamilies)} families</span>
            </div>
            <input
              type="range"
              min={10000}
              max={200000}
              step={5000}
              value={params.activeDiasporaFamilies}
              onChange={(e) => setParams({ ...params, activeDiasporaFamilies: Number(e.target.value) })}
              className="w-full accent-red-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-0.5">
              <span>10k (Pilot)</span>
              <span>40k (Baseline)</span>
              <span>100k (Scale)</span>
              <span>200k (Max TAM)</span>
            </div>
          </div>

          {/* Average Basket */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-semibold text-slate-700">Average Basket Size (USD):</span>
              <span className="font-mono font-bold text-slate-900">${params.averageBasketUSD} / order</span>
            </div>
            <input
              type="range"
              min={40}
              max={180}
              step={5}
              value={params.averageBasketUSD}
              onChange={(e) => setParams({ ...params, averageBasketUSD: Number(e.target.value) })}
              className="w-full accent-slate-800 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-0.5">
              <span>$40 (Staples)</span>
              <span>$85 (Baseline Family)</span>
              <span>$120 (Full Hamper)</span>
              <span>$180 (Premium)</span>
            </div>
          </div>

          {/* Order Frequency */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-semibold text-slate-700">Annual Order Frequency:</span>
              <span className="font-mono font-bold text-slate-900">{params.ordersPerYear} orders / year</span>
            </div>
            <input
              type="range"
              min={6}
              max={36}
              step={1}
              value={params.ordersPerYear}
              onChange={(e) => setParams({ ...params, ordersPerYear: Number(e.target.value) })}
              className="w-full accent-slate-800 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-0.5">
              <span>6 (Bi-Monthly)</span>
              <span>12 (Monthly)</span>
              <span>18 (Baseline 1.5x)</span>
              <span>36 (Bi-Weekly)</span>
            </div>
          </div>

          {/* Delivery Fee */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-semibold text-slate-700">Last-Mile Delivery Fee:</span>
              <span className="font-mono font-bold text-emerald-700">${params.deliveryFeeUSD.toFixed(2)} / drop</span>
            </div>
            <input
              type="range"
              min={2.50}
              max={8.00}
              step={0.50}
              value={params.deliveryFeeUSD}
              onChange={(e) => setParams({ ...params, deliveryFeeUSD: Number(e.target.value) })}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          {/* Tuck-Shop Trader Count */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-semibold text-slate-700">Affiliated Informal Traders (Tuck-Shops):</span>
              <span className="font-mono font-bold text-purple-700">{formatNumber(params.tuckShopSubscribersCount)} shops</span>
            </div>
            <input
              type="range"
              min={500}
              max={15000}
              step={500}
              value={params.tuckShopSubscribersCount}
              onChange={(e) => setParams({ ...params, tuckShopSubscribersCount: Number(e.target.value) })}
              className="w-full accent-purple-600 cursor-pointer"
            />
          </div>

          {/* Dedicated Fleet Riders */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-semibold text-slate-700">Dedicated Fleet Riders (Rent-to-Buy):</span>
              <span className="font-mono font-bold text-amber-700">{formatNumber(params.riderCount)} riders</span>
            </div>
            <input
              type="range"
              min={100}
              max={3000}
              step={100}
              value={params.riderCount}
              onChange={(e) => setParams({ ...params, riderCount: Number(e.target.value), garageMaintenanceCount: Number(e.target.value) })}
              className="w-full accent-amber-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Right: Live Calculated Outputs */}
        <div className="col-span-12 lg:col-span-6 space-y-4">
          {/* Main Gross Ecosystem Box */}
          <div className="bg-red-700 text-white rounded-lg p-5 shadow-lg">
            <span className="text-xs uppercase font-bold text-red-200 tracking-wider block mb-1">
              Consolidated Annual Ecosystem Gross
            </span>
            <div className="text-3xl font-black font-mono tracking-tight">
              {formatUSD(f.combinedAnnualEcosystemGross)}
            </div>
            <div className="text-xs text-red-100 mt-1">
              Includes {formatUSD(f.grossRetailGMV, true)} retail GMV + {formatUSD(f.combinedAnnualEcosystemGross - f.grossRetailGMV, true)} services &amp; subscriptions
            </div>
          </div>

          {/* Breakdown Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-lg">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Gross Retail GMV</span>
              <div className="text-xl font-bold font-mono text-slate-900">{formatUSD(f.grossRetailGMV)}</div>
              <div className="text-[10px] text-slate-500 mt-1">{formatNumber(f.totalOrdersPerYear)} annual deliveries</div>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-lg">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Last-Mile Delivery Pool</span>
              <div className="text-xl font-bold font-mono text-emerald-700">{formatUSD(f.lastMileDeliveryFees)}</div>
              <div className="text-[10px] text-slate-500 mt-1">Gross courier fees @ ${params.deliveryFeeUSD.toFixed(2)}</div>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-lg">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Cross-Border FX (3%)</span>
              <div className="text-xl font-bold font-mono text-blue-700">{formatUSD(f.crossBorderCardSurcharge)}</div>
              <div className="text-[10px] text-slate-500 mt-1">Card processing / gateway share</div>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-lg">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Phase 2 Subscriptions</span>
              <div className="text-xl font-bold font-mono text-purple-700">{formatUSD(f.phase2SubscriptionsSubtotal)}</div>
              <div className="text-[10px] text-slate-500 mt-1">SaaS, Riders, Tuck-shops, FMCG</div>
            </div>
          </div>

          {/* Commercial Partnership Comparison Box */}
          <div className="bg-slate-900 text-white rounded-lg p-4 border border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
              Commercial Model Revenue Comparison
            </h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="border border-slate-700 p-2.5 rounded bg-slate-800/60">
                <div className="text-slate-400 text-[10px] font-semibold">Option 1: Reseller Total Yield</div>
                <div className="text-lg font-extrabold text-white font-mono mt-0.5">{formatUSD(f.resellerTotalYield)}</div>
                <div className="text-[9px] text-slate-300 mt-0.5">5-8% Markup + 3-5% Rebate</div>
              </div>

              <div className="border border-slate-700 p-2.5 rounded bg-slate-800/60">
                <div className="text-slate-400 text-[10px] font-semibold">Option 2: White-Label SaaS</div>
                <div className="text-lg font-extrabold text-emerald-400 font-mono mt-0.5">{formatUSD(f.whiteLabelAnnualRevenue)}</div>
                <div className="text-[9px] text-slate-300 mt-0.5">1.75% GMV Pure Revenue Share</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
