import React, { useState } from 'react';
import { PROPOSAL_METADATA, THE_FOUR_PILLARS, BASKET_COMPARISON_DATA, COMMERCIAL_OPTIONS, ROADMAP_SPRINTS } from '../data/proposalData';
import { Copy, Check, FileText, Download, ExternalLink, ShieldCheck } from 'lucide-react';

export const ExecutiveSummaryView: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const fullTextSummary = `# ${PROPOSAL_METADATA.documentTitle}
## ${PROPOSAL_METADATA.documentSubtitle}
**Reference ID:** ${PROPOSAL_METADATA.documentCode} | **Date:** ${PROPOSAL_METADATA.date} | **Classification:** ${PROPOSAL_METADATA.classification}
**Prepared For:** ${PROPOSAL_METADATA.preparedFor}
**Prepared By:** ${PROPOSAL_METADATA.preparedBy}

---

### 1. Executive Summary & Strategic Positioning
The Zimbabwean retail economy has experienced extensive informalization. While physical supermarkets remain viable in structured urban nodes, traditional balance-sheet defense is no longer sufficient. Enterprise sustainability requires investing in operational adaptability out of the ordinary—turning defensive infrastructure costs into offensive, high-margin P&L drivers.

**Core Positioning:** TM Pick n Pay is uniquely positioned as the primary anchor retail tenant and wholesale supply backbone of an open-architecture, multi-tenant marketplace ("Takealot for Southern Africa"), capturing both diaspora remittances and informal township trade.

---

### 2. The Four Pillars of Strategic Intervention
1. **Customer Closeness & Data-Smart CLV:** Direct digital customer intimacy ("Know Your Customer"), tracking household replenishment triggers and maximizing lifetime value.
2. **Informal Market Aggregation & B2B Wholesale:** TM Pick n Pay steps in as the primary bulk wholesale distributor to 10,000+ local tuck-shops and spaza vendors, displacing counterfeit/gray market goods and cleaning supply chains without physical store CapEx.
3. **Diaspora Capital Capture ($61.2M Baseline):** Intercepting 100,000 to 500,000+ global diaspora senders (SA, UK, USA, Australia) via multi-currency checkout (USD, GBP, ZAR, AUD) that routes foreign capital directly into domestic retail settlement.
4. **Intelligent Commerce & Data Lake Moat:** A corporate data lake and AI engine driving real-time basket comparison, predictive replenishment, and high-margin data analytics sold to FMCG manufacturers.

---

### 3. Financial Model & Baseline Economics ($61.2M GMV)
- **Baseline Cohort:** 40,000 diaspora families spending $85/month across 18 annual orders = **US$61,200,000 Gross Merchandise Value (GMV)**.
- **Phase 1 Gross Throughput:** **US$67,657,680** (includes $61.2M GMV + $3.24M delivery fees + $1.836M FX surcharge + $647k priority memberships + $734k retail media network).
- **Phase 2 Recurring SaaS & Subscriptions:** **US$4,691,700** (Tenant platform fees, rider plans, garage maintenance, FMCG data intelligence, shopper plans, and tuck-shop trading app).
- **Combined Annual Ecosystem Output:** **US$72,349,380 Gross Throughput**.

---

### 4. Owned Last-Mile Delivery Network
- **Fleet:** 500 to 2,000 platform-owned electric scooters and heavy-duty cargo e-tricycles.
- **Empowerment Model:** 12-month rent-to-buy lease with ~5 month asset payback; ~10% platform fee thereafter.
- **In-House Garage:** Dedicated maintenance and battery swap network ($18/mo).
- **Inclusivity:** E-Tricycles deployed for rural/peri-urban routes piloted by women rider collectives.

---

### 5. Basket-Level Comparison Engine
- Calculates total basket pricing across TM Pick n Pay, OK Zimbabwe, Spar, and Food Lovers.
- TM Pick n Pay consistently wins default basket allocation (~$83.40 baseline basket).
- Single-store cluster logistics avoid multi-stop courier fragmentation.

---

### 6. Commercial Model Options
- **Option 1 (Independent Concierge/Reseller):** 5–8% gross markup + 3–5% wholesale volume rebate.
- **Option 2 (White-Label Software SaaS):** 1.5–2.0% GMV revenue share on a 5 to 10-year horizon (120 months).

---

### 7. Execution Roadmap & 60-Day Pilot
- **Sprint 1 (Weeks 1-3):** Executive Agreement & Governance Mandate.
- **Sprint 2 (Weeks 4-7):** Field Mapping & Pilot Merchant Densification (Harare & Bulawayo).
- **Sprint 3 (Weeks 8-11):** API Blueprinting, Security Tokens & ERP Connectors.
- **60-Day Pilot (Months 3-4):** Live operations across 2 Flagship Harare Branches with 50 e-scooter couriers.
- **National Scale (Months 5-12+):** National rollout across 74+ TM Pick n Pay branch estate.
- **Live Prototype:** ${PROPOSAL_METADATA.livePrototypeUrl}
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullTextSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden my-6">
      <div className="bg-slate-900 text-white p-6 border-b border-slate-800 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-red-500 font-bold uppercase tracking-wider mb-1">
            <FileText className="w-4 h-4" />
            Executive Briefing
          </div>
          <h2 className="text-xl font-bold text-white">
            Document Summary &amp; Structured Text Overview
          </h2>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition shadow"
        >
          {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
          {copied ? "Copied to Clipboard!" : "Copy Full Executive Summary"}
        </button>
      </div>

      <div className="p-8 prose prose-slate max-w-none text-xs leading-relaxed space-y-6">
        <div className="bg-slate-50 border-l-4 border-red-600 p-4 rounded-r text-slate-700">
          <strong className="text-slate-900 block text-sm mb-1">Strategic Context:</strong>
          {PROPOSAL_METADATA.strategicPositioning}
        </div>

        <div>
          <h3 className="text-base font-bold text-slate-900 mb-2">The Four Core Pillars</h3>
          <div className="grid grid-cols-2 gap-3 not-prose">
            {THE_FOUR_PILLARS.map((p) => (
              <div key={p.number} className="border border-slate-200 rounded p-3 bg-white">
                <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5 mb-1">
                  <span className="w-4 h-4 rounded-full bg-slate-900 text-white text-[9px] flex items-center justify-center font-mono">
                    {p.number}
                  </span>
                  {p.title}
                </div>
                <p className="text-[10px] text-slate-600">{p.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-base font-bold text-slate-900 mb-2">Financial Snapshot ($61.2M GMV Baseline)</h3>
          <div className="overflow-x-auto not-prose">
            <table className="w-full text-left text-[11px] border border-slate-200">
              <thead className="bg-slate-100 font-bold text-slate-900">
                <tr>
                  <th className="p-2 border-b">Revenue Stream</th>
                  <th className="p-2 border-b">Volume / Rate</th>
                  <th className="p-2 border-b text-right">Annual Throughput (USD)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-2 font-medium">Gross Retail Basket GMV</td>
                  <td className="p-2 text-slate-500">40k families x $85 x 18 orders</td>
                  <td className="p-2 font-mono font-bold text-right text-slate-900">$61,200,000</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium">Last-Mile Delivery Fees</td>
                  <td className="p-2 text-slate-500">720k drops @ $4.50</td>
                  <td className="p-2 font-mono font-bold text-right text-slate-900">$3,240,000</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium">Cross-Border FX Surcharge</td>
                  <td className="p-2 text-slate-500">3.0% on gross GMV</td>
                  <td className="p-2 font-mono font-bold text-right text-slate-900">$1,836,000</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium">Recurring Subscriptions (Phase 2)</td>
                  <td className="p-2 text-slate-500">Tenants, riders, tuck-shops, data</td>
                  <td className="p-2 font-mono font-bold text-right text-purple-700">$4,691,700</td>
                </tr>
                <tr className="bg-red-50 font-bold">
                  <td className="p-2 text-red-900">Combined Annual Gross Output</td>
                  <td className="p-2 text-red-800">GMV + All Ancillary Services</td>
                  <td className="p-2 font-mono text-right text-red-900 text-xs">$72,349,380</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 not-prose">
          <span>Official Proposal Document: {PROPOSAL_METADATA.documentCode}</span>
          <a
            href={PROPOSAL_METADATA.livePrototypeUrl}
            target="_blank"
            rel="noreferrer"
            className="text-red-600 font-bold hover:underline flex items-center gap-1"
          >
            Launch Prototype App <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
