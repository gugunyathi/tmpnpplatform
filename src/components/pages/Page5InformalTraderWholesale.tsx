import React from 'react';
import { PageWrapper } from './PageWrapper';
import { Store, Building2, ShieldCheck, Truck, Smartphone, Check, ArrowRight } from 'lucide-react';

interface PageProps {
  idPrefix?: string;
  extraClassName?: string;
}

export const Page5InformalTraderWholesale: React.FC<PageProps> = ({ idPrefix, extraClassName }) => {
  return (
    <PageWrapper pageNumber={5} sectionCategory="DISTRIBUTION STRATEGY & INFORMAL AGGREGATION" idPrefix={idPrefix} extraClassName={extraClassName}>
      <div className="flex flex-col h-full justify-between">
        <div>
          {/* Header */}
          <div className="mb-3.5">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Decentralized Footprint Expansion Without Capital Expense
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Extending physical coverage into high-density townships and rural communities by turning informal traders into logistics nodes.
            </p>
          </div>

          {/* Strategy Pillars */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="border border-slate-200 rounded p-3 bg-white">
              <div className="flex items-center gap-1.5 text-red-600 mb-1.5">
                <Building2 className="w-4 h-4" />
                <h4 className="text-[11px] font-bold uppercase">Corporate as Distributor</h4>
              </div>
              <p className="text-[10px] text-slate-600 leading-relaxed mb-2">
                Repositions TM Pick n Pay to step in as the primary bulk wholesale distributor to independent informal retail networks, capturing previously unreachable transaction volume.
              </p>
              <div className="bg-slate-50 border-l-2 border-red-500 pl-2 py-1 text-[9px] text-slate-700 font-medium">
                TM PnP becomes the wholesale supply backbone of Zimbabwe.
              </div>
            </div>

            <div className="border border-slate-200 rounded p-3 bg-white">
              <div className="flex items-center gap-1.5 text-emerald-600 mb-1.5">
                <ShieldCheck className="w-4 h-4" />
                <h4 className="text-[11px] font-bold uppercase">Gray Market Displacement</h4>
              </div>
              <p className="text-[10px] text-slate-600 leading-relaxed mb-2">
                Displaces un-policed cross-border gray trading, tax evasion, and counterfeit products by feeding verified, high-quality corporate inventory straight into township shops.
              </p>
              <div className="bg-slate-50 border-l-2 border-emerald-500 pl-2 py-1 text-[9px] text-slate-700 font-medium">
                Legitimizes trade, aligns with government &amp; protects consumers.
              </div>
            </div>

            <div className="border border-slate-200 rounded p-3 bg-white">
              <div className="flex items-center gap-1.5 text-blue-600 mb-1.5">
                <Store className="w-4 h-4" />
                <h4 className="text-[11px] font-bold uppercase">Zero-CapEx Micro-Nodes</h4>
              </div>
              <p className="text-[10px] text-slate-600 leading-relaxed mb-2">
                Integrates affiliated informal local traders as decentralized collection and delivery nodes, bypassing heavy brick-and-mortar building costs while accelerating speed to door.
              </p>
              <div className="bg-slate-50 border-l-2 border-blue-500 pl-2 py-1 text-[9px] text-slate-700 font-medium">
                Instant density across townships without building new branches.
              </div>
            </div>
          </div>

          {/* B2B Tuck-Shop Integration Flow */}
          <div className="border border-slate-200 rounded p-3.5 bg-slate-50 mb-3.5">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-2.5 flex items-center justify-between">
              <span>B2B Informal Trader Platform Architecture &amp; Replenishment Flow</span>
              <span className="text-[9px] font-mono font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded">
                US$9.99 / Month Trader App
              </span>
            </h3>

            <div className="grid grid-cols-4 gap-2 mb-3">
              <div className="bg-white border border-slate-200 rounded p-2 text-center">
                <div className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-bold mx-auto mb-1 flex items-center justify-center">1</div>
                <div className="text-[10px] font-bold text-slate-900 mb-0.5">Trader Orders in App</div>
                <div className="text-[8px] text-slate-500">Tuck-shop orders bulk sugar, flour, oil via mobile app at wholesale tiers.</div>
              </div>

              <div className="bg-white border border-slate-200 rounded p-2 text-center">
                <div className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-bold mx-auto mb-1 flex items-center justify-center">2</div>
                <div className="text-[10px] font-bold text-slate-900 mb-0.5">Automated TM Staging</div>
                <div className="text-[8px] text-slate-500">Nearest TM PnP branch stages pallet orders in dedicated B2B collection bays.</div>
              </div>

              <div className="bg-white border border-slate-200 rounded p-2 text-center">
                <div className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-bold mx-auto mb-1 flex items-center justify-center">3</div>
                <div className="text-[10px] font-bold text-slate-900 mb-0.5">Consolidated Dispatch</div>
                <div className="text-[8px] text-slate-500">Electric cargo tricycles or trucks route consolidated deliveries to commercial bazaars.</div>
              </div>

              <div className="bg-white border border-slate-200 rounded p-2 text-center">
                <div className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold mx-auto mb-1 flex items-center justify-center">4</div>
                <div className="text-[10px] font-bold text-slate-900 mb-0.5">Neighborhood Drop</div>
                <div className="text-[8px] text-slate-500">Trader acts as neighborhood click-to-collect pickup point for nearby residents.</div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded p-2.5 flex items-center justify-between text-[10px]">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-slate-700" />
                <span className="font-semibold text-slate-800">Target Trader Base: 3,500 Active Township Spazas</span>
              </div>
              <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded">
                Annual Subscription Yield: US$419,580
              </span>
            </div>
          </div>

          {/* Strategic Defense Against Counterfeits */}
          <div className="bg-slate-900 text-slate-200 rounded p-3 border border-slate-800">
            <h4 className="text-[10px] font-bold text-white uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              National Economic Impact &amp; Formalization Benefit
            </h4>
            <p className="text-[9px] text-slate-300 leading-relaxed">
              By transforming 10,000+ unorganized informal traders into structured retail affiliates of TM Pick n Pay, the platform cleans the national food supply chain, reduces price gouging in townships, restores formal VAT and tax compliance, and guarantees that communities receive safe, authentic consumer staples.
            </p>
          </div>
        </div>

        {/* Bottom stats */}
        <div className="pt-2 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-slate-600 text-[10px]">
          <div><span className="text-slate-400">Township Density:</span> <strong className="text-slate-900">10-20 Shops / Bazaar</strong></div>
          <div><span className="text-slate-400">Targeted B2B Volume:</span> <strong className="text-slate-900">$15M+ Wholesale GMV</strong></div>
          <div><span className="text-slate-400">Physical CapEx Saved:</span> <strong className="text-slate-900">100% (Asset-Light)</strong></div>
        </div>
      </div>
    </PageWrapper>
  );
};
