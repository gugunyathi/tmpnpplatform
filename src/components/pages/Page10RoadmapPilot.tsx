import React from 'react';
import { PageWrapper } from './PageWrapper';
import { ROADMAP_SPRINTS, PROPOSAL_METADATA } from '../../data/proposalData';
import { Calendar, CheckCircle, ExternalLink, Flag, ArrowRight, ShieldCheck, PenTool } from 'lucide-react';

interface PageProps {
  idPrefix?: string;
  extraClassName?: string;
}

export const Page10RoadmapPilot: React.FC<PageProps> = ({ idPrefix, extraClassName }) => {
  return (
    <PageWrapper pageNumber={10} sectionCategory="OPERATIONAL ROADMAP & ACTION PLAN" idPrefix={idPrefix} extraClassName={extraClassName}>
      <div className="flex flex-col h-full justify-between">
        <div>
          {/* Header */}
          <div className="mb-3">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Operational Roadmap, 60-Day Pilot &amp; Governance
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Structured deployment execution from executive alignment to field mapping, pilot launch, and national expansion.
            </p>
          </div>

          {/* Sprints Timeline Grid */}
          <div className="space-y-2 mb-3.5">
            {ROADMAP_SPRINTS.map((item, idx) => (
              <div
                key={idx}
                className={`p-2.5 rounded border text-[10px] flex items-start justify-between ${
                  item.sprint.includes('Pilot')
                    ? 'bg-red-50/80 border-red-300 shadow-xs'
                    : item.sprint.includes('National')
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="w-28 shrink-0">
                  <span
                    className={`font-mono font-bold text-[9px] px-1.5 py-0.5 rounded uppercase ${
                      item.sprint.includes('Pilot')
                        ? 'bg-red-600 text-white'
                        : item.sprint.includes('National')
                        ? 'bg-emerald-500 text-slate-900'
                        : 'bg-slate-100 text-slate-800'
                    }`}
                  >
                    {item.sprint}
                  </span>
                  <div className={`text-[8px] mt-1 font-semibold ${item.sprint.includes('National') ? 'text-slate-400' : 'text-slate-500'}`}>
                    {item.duration}
                  </div>
                </div>

                <div className="flex-1 px-3">
                  <div className={`font-bold text-[10.5px] mb-0.5 ${item.sprint.includes('National') ? 'text-white' : 'text-slate-900'}`}>
                    {item.title}
                  </div>
                  <div className={`text-[9px] mb-1 italic ${item.sprint.includes('National') ? 'text-slate-300' : 'text-slate-500'}`}>
                    Focus: {item.focus}
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[8.5px]">
                    {item.deliverables.map((deliv, dIdx) => (
                      <span key={dIdx} className={item.sprint.includes('National') ? 'text-slate-300' : 'text-slate-600'}>
                        • {deliv}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recommended Immediate Next Steps */}
          <div className="border border-slate-200 rounded p-3 bg-slate-50 mb-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Flag className="w-3.5 h-3.5 text-red-600" />
                Recommended Immediate Next Step: Mandate 60-Day Harare Pilot
              </span>
              <span className="text-[9px] font-mono font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded">
                Harare Flagship Branches
              </span>
            </h3>
            <p className="text-[10px] text-slate-600 leading-relaxed mb-2">
              Select preferred commercial operating model (Option 1 Reseller vs Option 2 White-Label SaaS) and authorize a controlled 60-day live pilot across two flagship Harare branches (Borrowdale &amp; Avondale) with 50 dedicated e-scooter couriers.
            </p>

            <div className="bg-white border border-slate-200 rounded p-2 flex items-center justify-between text-[10px]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="font-semibold text-slate-900">Interactive Prototype Live:</span>
                <a
                  href={PROPOSAL_METADATA.livePrototypeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-red-600 font-bold hover:underline flex items-center gap-1"
                >
                  {PROPOSAL_METADATA.livePrototypeUrl}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <span className="text-[9px] text-slate-400 font-mono">Mobile App &amp; Web Console Ready</span>
            </div>
          </div>

          {/* Executive Sign-Off Governance Block */}
          <div className="border border-slate-300 rounded p-3 bg-white">
            <div className="text-[10px] font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <PenTool className="w-3.5 h-3.5 text-slate-700" />
              Executive Proposal Acceptance &amp; Governance Sign-Off
            </div>

            <div className="grid grid-cols-3 gap-3 text-[9px]">
              <div className="border-t border-slate-300 pt-1.5">
                <div className="text-slate-400 uppercase font-semibold">For: TM Pick n Pay / Meikles</div>
                <div className="font-bold text-slate-800 mt-1">Executive Leadership Team</div>
                <div className="text-slate-500 italic mt-3">Signature &amp; Date</div>
              </div>

              <div className="border-t border-slate-300 pt-1.5">
                <div className="text-slate-400 uppercase font-semibold">For: Infrastructure Partner</div>
                <div className="font-bold text-slate-800 mt-1">Managing Director / Partner</div>
                <div className="text-slate-500 italic mt-3">Signature &amp; Date</div>
              </div>

              <div className="border-t border-slate-300 pt-1.5">
                <div className="text-slate-400 uppercase font-semibold">Governance Mandate</div>
                <div className="font-bold text-emerald-700 mt-1">60-Day Pilot Approved</div>
                <div className="text-slate-500 italic mt-3">Ref: {PROPOSAL_METADATA.documentCode}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Closing */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[9px] text-slate-500">
          <span>TM Pick n Pay Marketplace &amp; Last-Mile Delivery Infrastructure Business Proposal</span>
          <span className="font-bold text-slate-800">End of Proposal Document</span>
        </div>
      </div>
    </PageWrapper>
  );
};
