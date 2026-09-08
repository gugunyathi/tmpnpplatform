import React from 'react';
import { PageWrapper } from './PageWrapper';
import { FLEET_SPECS } from '../../data/proposalData';
import { Truck, BatteryCharging, Wrench, Megaphone, Users, Award, ShieldCheck } from 'lucide-react';

interface PageProps {
  idPrefix?: string;
  extraClassName?: string;
}

export const Page6OwnedFleetLastMile: React.FC<PageProps> = ({ idPrefix, extraClassName }) => {
  return (
    <PageWrapper pageNumber={6} sectionCategory="LAST-MILE INFRASTRUCTURE & FLEET ECONOMICS" idPrefix={idPrefix} extraClassName={extraClassName}>
      <div className="flex flex-col h-full justify-between">
        <div>
          {/* Header */}
          <div className="mb-3.5">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              The Last Mile is Owned, Not Outsourced
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Building a proprietary green electric delivery grid with sustainable rider lease-to-own economics.
            </p>
          </div>

          {/* 4 Fleet Stat Callouts */}
          <div className="grid grid-cols-4 gap-2.5 mb-4">
            <div className="bg-slate-900 text-white rounded p-3 text-center">
              <span className="text-[9px] text-slate-400 font-semibold uppercase block mb-0.5">Fleet Capacity</span>
              <div className="text-lg font-black text-white">500 – 2,000</div>
              <div className="text-[8px] text-slate-400">Electric Scooters &amp; Trikes</div>
            </div>

            <div className="bg-slate-900 text-white rounded p-3 text-center">
              <span className="text-[9px] text-slate-400 font-semibold uppercase block mb-0.5">Rent-to-Buy Period</span>
              <div className="text-lg font-black text-amber-400">12 Months</div>
              <div className="text-[8px] text-slate-400">Full Asset Ownership Transfer</div>
            </div>

            <div className="bg-slate-900 text-white rounded p-3 text-center">
              <span className="text-[9px] text-slate-400 font-semibold uppercase block mb-0.5">Asset Payback</span>
              <div className="text-lg font-black text-emerald-400">~5 Months</div>
              <div className="text-[8px] text-slate-400">Months 6-12 Are Net Margin</div>
            </div>

            <div className="bg-slate-900 text-white rounded p-3 text-center">
              <span className="text-[9px] text-slate-400 font-semibold uppercase block mb-0.5">Post-Ownership Take</span>
              <div className="text-lg font-black text-blue-400">~10% Fee</div>
              <div className="text-[8px] text-slate-400">Per Dollar Earned Perpetual</div>
            </div>
          </div>

          {/* 3 Strategic Fleet Operational Pillars */}
          <div className="grid grid-cols-3 gap-3 mb-3.5">
            <div className="border border-slate-200 rounded p-3 bg-white">
              <div className="flex items-center gap-1.5 text-blue-600 mb-1.5">
                <Award className="w-4 h-4" />
                <h4 className="text-[11px] font-bold uppercase">Rent-to-Buy Empowerment</h4>
              </div>
              <p className="text-[10px] text-slate-600 leading-relaxed mb-2">
                Riders pay daily operational lease fees for 12 months, after which they own the electric scooter. The asset repays itself in roughly 5 months; remaining months provide software margin.
              </p>
              <div className="text-[9px] bg-blue-50 text-blue-800 p-1.5 rounded font-medium">
                Drives exceptional rider retention, vehicle care, and SLA reliability.
              </div>
            </div>

            <div className="border border-slate-200 rounded p-3 bg-white">
              <div className="flex items-center gap-1.5 text-red-600 mb-1.5">
                <Megaphone className="w-4 h-4" />
                <h4 className="text-[11px] font-bold uppercase">Moving Media Network</h4>
              </div>
              <p className="text-[10px] text-slate-600 leading-relaxed mb-2">
                Scooter delivery boxes and fairings act as moving billboards: 80% reserved exclusively for TM Pick n Pay branding; 20% monetized as open advertising inventory for top FMCG brands.
              </p>
              <div className="text-[9px] bg-red-50 text-red-800 p-1.5 rounded font-medium">
                High-visibility brand dominance across Harare and Bulawayo roads.
              </div>
            </div>

            <div className="border border-slate-200 rounded p-3 bg-white">
              <div className="flex items-center gap-1.5 text-purple-600 mb-1.5">
                <Wrench className="w-4 h-4" />
                <h4 className="text-[11px] font-bold uppercase">In-House Garage Ecosystem</h4>
              </div>
              <p className="text-[10px] text-slate-600 leading-relaxed mb-2">
                Repairs, certified spare parts, battery swap stations, and maintenance remain inside the platform via a mandatory $18/mo subscription plan, preserving uptime and asset life.
              </p>
              <div className="text-[9px] bg-purple-50 text-purple-800 p-1.5 rounded font-medium">
                Generates $194k+ annual recurring garage subscription revenue.
              </div>
            </div>
          </div>

          {/* Rural Expansion & Women Rider Cohort */}
          <div className="border border-slate-200 rounded p-3.5 bg-slate-50 mb-3.5">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-emerald-100 text-emerald-800 rounded">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-1">
                  Inclusive Rural Logistics &amp; Women Rider E-Tricycle Cohorts
                </h3>
                <p className="text-[10px] text-slate-600 leading-relaxed mb-2">
                  To service peri-urban townships, dirt road networks, and rural growth points without damage to standard two-wheelers, the platform deploys heavy-duty cargo electric tricycles. The first designated cohort of tricycle operators is structured specifically for women riders, creating high-dignity entrepreneurial employment and trusted doorstep community engagement.
                </p>
                <div className="flex items-center gap-4 text-[9px] text-slate-700 font-semibold">
                  <span>✓ 300kg Cargo Payload per Trike</span>
                  <span>✓ Dual Battery Range &gt; 120km</span>
                  <span>✓ Solar Charging Depot Integration</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fleet Financial Snapshot */}
        <div className="bg-slate-900 text-white p-2.5 rounded flex items-center justify-between text-[10px]">
          <div className="flex items-center gap-3">
            <span className="text-amber-400 font-bold">Rider Fleet Plans:</span>
            <span className="text-slate-300">900 riders @ $45/mo = <strong>$486,000/yr</strong></span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-emerald-400 font-bold">Delivery Fee Volume:</span>
            <span className="text-slate-300">720,000 drops @ $4.50 = <strong>$3,240,000/yr</strong></span>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};
