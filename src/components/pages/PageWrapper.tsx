import React from 'react';
import { PROPOSAL_METADATA } from '../../data/proposalData';
import { TMPicknPaySquareLogo } from '../TMPicknPaySquareLogo';
import { ShoppingBag, ShieldCheck, ChevronRight } from 'lucide-react';

interface PageWrapperProps {
  pageNumber: number;
  totalPages?: number;
  sectionCategory?: string;
  children: React.ReactNode;
  hideHeaderFooter?: boolean;
  idPrefix?: string;
  extraClassName?: string;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({
  pageNumber,
  totalPages = 10,
  sectionCategory = "STRATEGIC PROPOSAL",
  children,
  hideHeaderFooter = false,
  idPrefix = "proposal-page",
  extraClassName = "",
}) => {
  return (
    <div
      id={`${idPrefix}-${pageNumber}`}
      className={`a4-page a4-screen-page bg-white text-slate-800 relative flex flex-col justify-between shadow-2xl mx-auto my-6 print:my-0 print:shadow-none transition-all duration-300 rounded-none border border-slate-200 print:border-none ${extraClassName}`}
      style={{
        padding: hideHeaderFooter ? '0' : '14mm 16mm 12mm 16mm',
      }}
    >
      {!hideHeaderFooter && (
        <header className="w-full pb-3 mb-4 border-b border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center space-x-2.5">
            <TMPicknPaySquareLogo size={24} className="border border-slate-200 shadow-2xs" />
            <div className="h-4 w-px bg-slate-300"></div>
            <span className="uppercase tracking-wider font-semibold text-[10px] text-red-600 flex items-center gap-1">
              {sectionCategory}
            </span>
          </div>
          <div className="flex items-center space-x-3 text-[10px] text-slate-400 font-mono">
            <span>{PROPOSAL_METADATA.documentCode}</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-300"></span>
            <span className="font-bold text-slate-700">PAGE {String(pageNumber).padStart(2, '0')}</span>
          </div>
        </header>
      )}

      <main className="flex-1 flex flex-col justify-start relative z-10 overflow-hidden">
        {children}
      </main>

      {!hideHeaderFooter && (
        <footer className="w-full pt-3 mt-3 border-t border-slate-200 flex items-center justify-between text-[9px] text-slate-400 font-medium">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-600">TM Pick n Pay Express — Click-to-Door Infrastructure</span>
            <span>·</span>
            <span className="italic">Strictly Confidential · Executive Board Proposal</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono font-bold text-[10px]">
              {pageNumber} / {totalPages}
            </span>
          </div>
        </footer>
      )}
    </div>
  );
};
