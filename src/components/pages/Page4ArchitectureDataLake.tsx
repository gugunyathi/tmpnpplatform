import React from 'react';
import { PageWrapper } from './PageWrapper';
import { Server, Database, Shield, Lock, CreditCard, Cpu, Network, CheckCircle } from 'lucide-react';

interface PageProps {
  idPrefix?: string;
  extraClassName?: string;
}

export const Page4ArchitectureDataLake: React.FC<PageProps> = ({ idPrefix, extraClassName }) => {
  return (
    <PageWrapper pageNumber={4} sectionCategory="PLATFORM ARCHITECTURE & INTELLIGENT COMMERCE" idPrefix={idPrefix} extraClassName={extraClassName}>
      <div className="flex flex-col h-full justify-between">
        <div>
          {/* Header */}
          <div className="mb-3.5">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Multi-Tenant Architecture &amp; Intelligent Commerce Moat
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Open digital infrastructure designed to scale market transactions without single-retailer limitations.
            </p>
          </div>

          {/* Architecture 3-Card Design */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="border border-slate-200 rounded p-3 bg-white">
              <div className="flex items-center gap-1.5 text-blue-600 mb-1.5">
                <Network className="w-4 h-4" />
                <h4 className="text-[11px] font-bold uppercase">Agnostic Inception</h4>
              </div>
              <p className="text-[10px] text-slate-600 leading-relaxed mb-2">
                Built from day one as an open-ended, multi-tenant marketplace framework ("Takealot for Southern Africa"), rejecting single-retailer application restrictions and siloed codebases.
              </p>
              <div className="text-[9px] bg-blue-50 text-blue-800 p-1.5 rounded font-medium">
                High-throughput API adapters for any vetted merchant or courier.
              </div>
            </div>

            <div className="border border-slate-200 rounded p-3 bg-white">
              <div className="flex items-center gap-1.5 text-red-600 mb-1.5">
                <Shield className="w-4 h-4" />
                <h4 className="text-[11px] font-bold uppercase">Enterprise Segregation</h4>
              </div>
              <p className="text-[10px] text-slate-600 leading-relaxed mb-2">
                Drives massive aggregate market volume across the grid while preserving the capacity for TM Pick n Pay to partition dedicated, white-labeled private spaces (tmpnponline.co.zw).
              </p>
              <div className="text-[9px] bg-red-50 text-red-800 p-1.5 rounded font-medium">
                Cryptographic tenant isolation and strict corporate data segregation.
              </div>
            </div>

            <div className="border border-slate-200 rounded p-3 bg-white">
              <div className="flex items-center gap-1.5 text-purple-600 mb-1.5">
                <Database className="w-4 h-4" />
                <h4 className="text-[11px] font-bold uppercase">Data Lake as Moat</h4>
              </div>
              <p className="text-[10px] text-slate-600 leading-relaxed mb-2">
                Eliminates data blindness by tracking customer lifetime value (CLV), household replenishment velocity, basket triggers, and selling anonymized analytics back to FMCG suppliers.
              </p>
              <div className="text-[9px] bg-purple-50 text-purple-800 p-1.5 rounded font-medium">
                Real-time algorithmic demand forecasting &amp; dynamic pricing.
              </div>
            </div>
          </div>

          {/* Payment Gateway Rails Section */}
          <div className="border border-slate-200 rounded p-3.5 bg-slate-50 mb-3.5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
                Bank-Agnostic by Design, Multi-Bank &amp; Cross-Border in Practice
              </h3>
              <span className="text-[9px] font-mono font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                Zero Core Bank Lock-In
              </span>
            </div>

            <p className="text-[10px] text-slate-600 leading-relaxed mb-3">
              <strong>Design Rule:</strong> No bank-specific logic in the core codebase. Banking rails operate as modular plug-and-play adapters, allowing institutions to be connected or replaced via simple configuration changes without requiring code rebuilds.
            </p>

            <div className="grid grid-cols-3 gap-2.5 text-[10px]">
              <div className="bg-white border border-slate-200 p-2.5 rounded">
                <div className="font-bold text-slate-900 mb-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Global Diaspora Checkout
                </div>
                <p className="text-slate-600 text-[9px] leading-snug">
                  Accepts Visa, Mastercard, AMEX in USD, GBP, ZAR, AUD. Smart routing dynamically chooses optimal acquiring bank by shopper origin.
                </p>
              </div>

              <div className="bg-white border border-slate-200 p-2.5 rounded">
                <div className="font-bold text-slate-900 mb-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  Local Settlement Rails
                </div>
                <p className="text-slate-600 text-[9px] leading-snug">
                  Integrated with ZimSwitch, EcoCash, InnBucks, and direct ZIPIT bank integrations for domestic buyers and tuck-shop B2B replenishment.
                </p>
              </div>

              <div className="bg-white border border-slate-200 p-2.5 rounded">
                <div className="font-bold text-slate-900 mb-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  Crypto &amp; Remittance Fallback
                </div>
                <p className="text-slate-600 text-[9px] leading-snug">
                  Automatic fallback to USDC stablecoin rails and Western Union API bridge if foreign card acquiring experiences interbank disruption.
                </p>
              </div>
            </div>
          </div>

          {/* Value to Banks & Retailer */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-900 text-white rounded p-3">
              <h4 className="text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-1">
                Value Proposition to Commercial Banks
              </h4>
              <p className="text-[9px] text-slate-300 leading-relaxed">
                Banks plug remittance APIs into the platform and gain valuable transaction share-of-wallet: recurring foreign currency inflows landing directly as merchant retail settlement rather than un-banked cash-out.
              </p>
            </div>

            <div className="bg-slate-900 text-white rounded p-3">
              <h4 className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1">
                Value Proposition to TM Pick n Pay
              </h4>
              <p className="text-[9px] text-slate-300 leading-relaxed">
                Banks bring massive captured audiences; the marketplace platform instantly converts diaspora bank account balances into physical grocery baskets fulfilled inside TM Pick n Pay's national branch network.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom SLA note */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[9px] text-slate-500">
          <span>Security: SOC2 Type II, ISO 27001 compliant architecture with encrypted tokenization</span>
          <span className="font-bold text-slate-700">99.95% API Uptime SLA Guarantee</span>
        </div>
      </div>
    </PageWrapper>
  );
};
