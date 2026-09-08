import React from 'react';
import { PageWrapper } from './PageWrapper';
import { BASKET_COMPARISON_DATA } from '../../data/proposalData';
import { CheckCircle2, TrendingDown, ArrowRight, ShieldCheck, MapPin, Smartphone, Truck, Home } from 'lucide-react';

interface PageProps {
  idPrefix?: string;
  extraClassName?: string;
}

export const Page7BasketComparisonJourney: React.FC<PageProps> = ({ idPrefix, extraClassName }) => {
  return (
    <PageWrapper pageNumber={7} sectionCategory="CUSTOMER EXPERIENCE & BASKET OPTIMIZATION" idPrefix={idPrefix} extraClassName={extraClassName}>
      <div className="flex flex-col h-full justify-between">
        <div>
          {/* Header */}
          <div className="mb-3.5">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Full Basket Comparison Engine &amp; Customer Journey
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Driving diaspora conversion through transparent total family basket savings and single-cluster logistics.
            </p>
          </div>

          {/* Basket Comparison Table vs Single Item Rationale */}
          <div className="grid grid-cols-12 gap-3 mb-4">
            <div className="col-span-7 border border-slate-200 rounded p-3 bg-white">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Live Basket-Level Benchmark (~$85 Family Grocery Order)
                </h3>
                <span className="text-[9px] font-mono text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded font-bold">
                  TM PnP Wins Default Allocation
                </span>
              </div>

              <div className="space-y-1.5">
                {BASKET_COMPARISON_DATA.map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-2 rounded text-xs border ${
                      item.isAnchor
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                        : 'bg-slate-50 text-slate-800 border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="font-bold flex items-center gap-1.5">
                        {item.retailer}
                        {item.isAnchor && (
                          <span className="bg-red-600 text-white text-[8px] font-extrabold px-1.5 py-0.2 rounded uppercase">
                            Lowest Total
                          </span>
                        )}
                      </div>
                      <div className={`text-[9px] ${item.isAnchor ? 'text-slate-300' : 'text-slate-500'}`}>
                        {item.itemsFulfilled} · {item.varianceVsPnP}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-extrabold font-mono">US${item.basketTotalUSD.toFixed(2)}</div>
                      <div className={`text-[8px] font-medium ${item.isAnchor ? 'text-emerald-400' : 'text-slate-500'}`}>
                        {item.statusBadge}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-5 border border-slate-200 rounded p-3 bg-slate-50 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-1.5">
                  The Cluster Logistics Rule
                </h3>
                <p className="text-[10px] text-slate-600 leading-relaxed mb-2">
                  <strong>Why Basket Comparison beats Item Splitting:</strong> Allowing shoppers to split a single basket across 3 different physical supermarkets creates a multi-stop courier logistical nightmare.
                </p>
                <p className="text-[10px] text-slate-600 leading-relaxed">
                  Instead, the comparison engine calculates the <em>entire basket total</em> at once. TM Pick n Pay's price competitiveness on staple goods ensures it captures the complete order into a single fulfillment hub.
                </p>
              </div>
              <div className="bg-white border border-emerald-300 p-2 rounded text-[9px] text-emerald-900 font-semibold">
                ✓ 100% Single-Store Fulfillment per Delivery Run
              </div>
            </div>
          </div>

          {/* End-to-End User Journey Diagram */}
          <div className="border border-slate-200 rounded p-3.5 bg-slate-50 mb-3.5">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-3 text-center">
              End-to-End Transaction &amp; Fulfillment Lifecycle
            </h3>

            <div className="grid grid-cols-5 gap-2 text-center">
              <div className="bg-white border border-slate-200 rounded p-2 relative shadow-xs">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-[10px] font-bold mx-auto mb-1 flex items-center justify-center">
                  <Smartphone className="w-3.5 h-3.5" />
                </div>
                <div className="text-[10px] font-bold text-slate-900 mb-0.5">1. Diaspora Order</div>
                <div className="text-[8px] text-slate-500 leading-tight">Shopper in London/Joburg selects basket for family in Harare.</div>
              </div>

              <div className="bg-white border border-slate-200 rounded p-2 relative shadow-xs">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white text-[10px] font-bold mx-auto mb-1 flex items-center justify-center">
                  $
                </div>
                <div className="text-[10px] font-bold text-slate-900 mb-0.5">2. Foreign Payment</div>
                <div className="text-[8px] text-slate-500 leading-tight">Paid in GBP/USD via card. Instant FX &amp; retail settlement.</div>
              </div>

              <div className="bg-white border border-slate-200 rounded p-2 relative shadow-xs">
                <div className="w-6 h-6 rounded-full bg-slate-900 text-white text-[10px] font-bold mx-auto mb-1 flex items-center justify-center">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div className="text-[10px] font-bold text-slate-900 mb-0.5">3. TM Store Picking</div>
                <div className="text-[8px] text-slate-500 leading-tight">Nearest branch receives order; staged in pickup bay in &lt;15 min.</div>
              </div>

              <div className="bg-white border border-slate-200 rounded p-2 relative shadow-xs">
                <div className="w-6 h-6 rounded-full bg-amber-600 text-white text-[10px] font-bold mx-auto mb-1 flex items-center justify-center">
                  <Truck className="w-3.5 h-3.5" />
                </div>
                <div className="text-[10px] font-bold text-slate-900 mb-0.5">4. Scooter Dispatch</div>
                <div className="text-[8px] text-slate-500 leading-tight">Dedicated e-scooter rider dispatched with GPS route tracking.</div>
              </div>

              <div className="bg-white border border-emerald-300 rounded p-2 relative shadow-xs">
                <div className="w-6 h-6 rounded-full bg-emerald-700 text-white text-[10px] font-bold mx-auto mb-1 flex items-center justify-center">
                  <Home className="w-3.5 h-3.5" />
                </div>
                <div className="text-[10px] font-bold text-slate-900 mb-0.5">5. Doorstep Delivery</div>
                <div className="text-[8px] text-slate-500 leading-tight">Delivered to household with photo proof &amp; SMS sent to sponsor.</div>
              </div>
            </div>
          </div>

          {/* Customer Trust Callout */}
          <div className="bg-slate-900 text-slate-200 rounded p-3 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <h4 className="text-[10px] font-bold text-white uppercase tracking-wider">
                  Guaranteed Sponsor Peace-of-Mind
                </h4>
                <p className="text-[9px] text-slate-300 leading-snug">
                  Diaspora sponsors receive instant photographic proof of delivery and itemized digital receipts, eliminating family friction and cash misallocation.
                </p>
              </div>
            </div>
            <div className="text-right pl-4">
              <span className="text-xs font-extrabold text-emerald-400 font-mono">98.4%</span>
              <span className="block text-[8px] text-slate-400 uppercase">Target On-Time SLA</span>
            </div>
          </div>
        </div>

        {/* Bottom stats */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[9px] text-slate-500">
          <span>Average Fulfillment Cycle: <strong>38 Minutes</strong> from order placement to doorstep handover</span>
          <span className="font-bold text-slate-800">Harare &amp; Bulawayo Urban Grids</span>
        </div>
      </div>
    </PageWrapper>
  );
};
