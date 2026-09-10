import { DEFAULT_FINANCIAL_BASELINE, PROPOSAL_METADATA, THE_FOUR_PILLARS, BASKET_COMPARISON_DATA, FLEET_SPECS, COMMERCIAL_OPTIONS, ROADMAP_SPRINTS } from './proposalData';
import { RAW_PROPOSAL_TEXT } from '../components/TextOnlyDocumentView';
import { computeFinancials, formatUSD, formatNumber } from '../utils/calculations';
import { FinancialModelScenario, LibraryItem } from '../types';

export interface KnowledgeCorpusItem {
  id: string;
  sourceType: 'slide_deck' | 'a4_page' | 'proposal_document' | 'text_only_document' | 'financial_simulator' | 'executive_brief' | 'transcript' | 'live_update';
  title: string;
  referenceTag: string;
  summary: string;
  verbatimContent: string;
  keywords: string[];
}

// 1. SLIDE DECK (14 SLIDES)
export const CORPUS_SLIDE_DECK: KnowledgeCorpusItem[] = [
  {
    id: 'slide-01',
    sourceType: 'slide_deck',
    title: 'Slide 1 · Executive Board Proposal Cover',
    referenceTag: '[SLIDE-01]',
    summary: 'Executive presentation title and strategic positioning for TM Pick n Pay board review.',
    verbatimContent: `SLIDE 1: Executive Board Proposal Cover
Title: TM Pick n Pay Marketplace & Last-Mile Delivery Infrastructure Business Proposal
Subtitle: Evolving Click & Collect into an Open Agnostic Marketplace & Click-to-Door Delivery Ecosystem
Document Code: DOC-TMPNP-EXEC-2026-V2.4 | Classification: Strictly Confidential · Executive Board Proposal
Prepared For: The Executive Leadership Team, TM Pick n Pay (Meikles Retail / Pick n Pay Africa)
Prepared By: Venture Partnership & Digital Infrastructure Working Group
Date: September 2026
Core Positioning: An open-architecture, multi-tenant marketplace framework with TM Pick n Pay uniquely positioned as the primary anchor retail tenant and wholesale backbone driving the entire shared consumer ecosystem.
Live Prototype: https://pnpexpress.vercel.app`,
    keywords: ['cover', 'title', 'meikles', 'confidential', 'prototype', 'positioning']
  },
  {
    id: 'slide-02',
    sourceType: 'slide_deck',
    title: 'Slide 2 · Disclaimer: Strategic Context & System Boundaries',
    referenceTag: '[SLIDE-02]',
    summary: 'Macroeconomic context, abnormal P&L reality, and scope boundaries for the proposed intervention.',
    verbatimContent: `SLIDE 2: Strategic Context & System Boundaries
Key Thesis: The Abnormal P&L Reality. Operating in Zimbabwe's consumer economy requires departing from standard retail assumptions. Defending traditional physical store balance sheets leads to progressive margin attrition. Long-term enterprise leadership demands investing in operational adaptability out of the ordinary.
System Boundaries: Focuses on digital consumer capture, cross-border remittances, B2B wholesale aggregation of informal traders, and dedicated green EV delivery. It does NOT replace existing in-store retail, but monetizes uncaptured cash flows outside store walls.`,
    keywords: ['disclaimer', 'abnormal P&L', 'operational adaptability', 'boundaries', 'margin attrition']
  },
  {
    id: 'slide-03',
    sourceType: 'slide_deck',
    title: 'Slide 3 · Capitalizing on Structural Market Inefficiencies',
    referenceTag: '[SLIDE-03]',
    summary: 'Analysis of four structural market frictions: informalization, gray market runners, remittance fees, and commute penalty.',
    verbatimContent: `SLIDE 3: Structural Market Inefficiencies
Four Structural Frictions:
1. Intense Township Informalization: Over 70% of FMCG volume moves through 10,000+ informal spaza shops and tuck-shops offering localized proximity and broken bulk.
2. Cross-Border Gray Market: Unregulated cross-border 'runners' smuggle goods from SA and Mozambique, evading import duties and undercutting formal shelf prices.
3. Remittance Friction & Cash Diversion: $2B+ annual diaspora inflows face 7-15% transfer fees and cash diversion rather than verified household grocery fulfillment.
4. Commute Penalty: Legacy Click & Collect forces recipients to pay $2-$4 in kombi fares and spend 2 hours queuing, depressing repeat order frequency.`,
    keywords: ['market inefficiencies', 'frictions', 'runners', 'gray market', 'remittances', 'commute penalty', 'tuck-shops']
  },
  {
    id: 'slide-04',
    sourceType: 'slide_deck',
    title: 'Slide 4 · Bypassing Physical Logistics & Operational Friction',
    referenceTag: '[SLIDE-04]',
    summary: 'The Optimization Gap: Diaspora Market, Informal Retail Traders, and Customer Convenience.',
    verbatimContent: `SLIDE 4: The Optimization Gap & Value Vectors
The Optimization Gap: A multi-million dollar distribution gap exists that can only be closed by an open platform integrating three vectors:
1. Diaspora Market: Buyers continue to buy via cross-border delivery, exposing a resilient remittance shopper market ripe for capture.
2. Informal Retail Traders: A wholesale supply gap exists, creating an opportunity to aggregate informal traders into distribution partners.
3. Customer Convenience: Online ordering and payment of goods plus doorstep delivery saves costs on transport, fuel, and time.
Bypassing Friction: Transforming defensive brick-and-mortar CapEx into an offensive, high-throughput digital logistics grid.`,
    keywords: ['optimization gap', 'diaspora market', 'informal retail traders', 'customer convenience', 'logistics']
  },
  {
    id: 'slide-05',
    sourceType: 'slide_deck',
    title: 'Slide 5 · What the Platform Uniquely Delivers (Value Proposition)',
    referenceTag: '[SLIDE-05]',
    summary: 'The Four Strategic Pillars: Customer Closeness, Informal B2B Wholesale, Diaspora Capital, and Intelligent Commerce.',
    verbatimContent: `SLIDE 5: The Four Strategic Pillars of Value Creation
Pillar 1: Customer Closeness & Data-Smart CLV: Direct digital intimacy ('Know Your Customer'), predictive household replenishment, and personalized basket incentives.
Pillar 2: Informal Market Aggregation & B2B Wholesale: TM Pick n Pay becomes primary bulk supplier to 10,000+ tuck-shops, displacing gray market runners with zero store CapEx.
Pillar 3: Diaspora Capital Capture ($61.2M Baseline): Direct foreign currency checkout (USD, GBP, ZAR, AUD) routing global remittance into corporate retail settlement.
Pillar 4: Intelligent Commerce & Corporate Data Lake: Unified data lake powering basket comparison, stock replenishment, and high-margin data feeds sold to FMCG brands.`,
    keywords: ['four pillars', 'value proposition', 'customer closeness', 'wholesale', 'diaspora', 'data lake']
  },
  {
    id: 'slide-06',
    sourceType: 'slide_deck',
    title: 'Slide 6 · Data-Smart Pipeline Projections ($61.2M Baseline)',
    referenceTag: '[SLIDE-06]',
    summary: 'Baseline grocery GMV pipeline math: 40,000 families, $85 basket, 18 orders/yr = $61.2M GMV.',
    verbatimContent: `SLIDE 6: Data-Smart Pipeline Projections
Baseline Pipeline Equation:
- Active Diaspora Families: 40,000 families across South Africa, UK, USA, and Australia.
- Average Order Basket: US$85.00.
- Annual Order Velocity: 18 orders per year (1.5 orders per month).
- Total Annual Retail GMV: 40,000 × $85 × 18 = US$61,200,000 in baseline retail Gross Merchandise Value.
- Total Orders Processed: 720,000 completed grocery deliveries annually.
Network Scaling: Anchored across TM Pick n Pay's 74+ store estate acting as regional fulfillment micro-hubs.`,
    keywords: ['pipeline projections', '61.2M', '40000 families', '85 basket', '18 orders', '720000 orders']
  },
  {
    id: 'slide-07',
    sourceType: 'slide_deck',
    title: 'Slide 7 · Consolidated Ecosystem Throughput & Revenue Calculations',
    referenceTag: '[SLIDE-07]',
    summary: 'Full financial architecture: Phase 1 ($67.65M) + Phase 2 ($4.69M) = $72.35M combined output.',
    verbatimContent: `SLIDE 7: Consolidated Ecosystem Throughput & Revenue Calculations
Combined Annual Ecosystem Output: US$72,349,380
Phase 1: Transactional GMV & Direct Service Flow: US$67,657,680
- Gross Retail GMV: $61,200,000 (720k orders × $85)
- Last-Mile Delivery Fees: $3,240,000 (720k orders × $4.50)
- Foreign Card Surcharge: $1,836,000 (3.0% of GMV)
- Diaspora VIP Memberships: $647,352 (6,000 members × $8.99/mo)
- Retail Media Network Ads: $734,400 (1.2% of GMV)
Phase 2: High-Margin Recurring B2B SaaS Subscriptions: US$4,691,700
- Tenant Platform Access: $717,120 (240 tenants × $249/mo)
- Rider App Software Access: $486,000 (900 riders × $45/mo)
- Solar Garage & Battery Maintenance: $194,400 (900 units × $18/mo)
- FMCG Brand Data Licenses: $720,000 (40 licenses × $1,500/mo)
- Domestic Shopper Plans: $2,154,600 (45,000 shoppers × $3.99/mo)
- B2B Tuck-Shop Platform Fees: $419,580 (3,500 tuck-shops × $9.99/mo)`,
    keywords: ['revenue calculations', 'throughput', '72.3M', '67.65M', '4.69M', 'phase 1', 'phase 2']
  },
  {
    id: 'slide-08',
    sourceType: 'slide_deck',
    title: 'Slide 8 · Strategic Benefits to TM Pick n Pay and the Market',
    referenceTag: '[SLIDE-08]',
    summary: 'Strategic benefits: foreign currency settlement, market expansion, brand equity defense, data leadership.',
    verbatimContent: `SLIDE 8: Strategic Benefits
For TM Pick n Pay:
1. Direct Foreign Currency Inflow: Offshore payments clear directly into corporate Nostro USD accounts, insulating the business against domestic liquidity crunches.
2. Market Expansion Without CapEx: Captures township trade and diaspora remittances without constructing new brick-and-mortar branches.
3. Data Moat: Eliminates 'data blindness' in an informalized economy, unlocking monetization through retail media and FMCG brand analytics.
For the Market:
1. Consumer Savings: Eliminates kombi commute fares and queues.
2. Spaza Traders: Access reliable wholesale pricing and scheduled e-cargo delivery.
3. Delivery Riders: 12-month rent-to-buy vehicle ownership path.`,
    keywords: ['benefits', 'nostro', 'foreign currency', 'data moat', 'market expansion']
  },
  {
    id: 'slide-09',
    sourceType: 'slide_deck',
    title: 'Slide 9 · Aligning Risk, Capital and Structure (Business Models)',
    referenceTag: '[SLIDE-09]',
    summary: 'Commercial options: Option 1 (Independent Concierge & Reseller) vs Option 2 (White-Label Software Licensing).',
    verbatimContent: `SLIDE 9: Commercial Partnership Options
Option 1: Independent Concierge & Reseller
- Badge: Fastest Execution · Zero Direct Retail Risk
- Commercial Take: 5–8% Gross Markup + 3–5% Wholesale Volume Rebate
- Mechanics: Venture operates independently, mirrors TM PnP catalog via API, collects foreign currency, buys stock at wholesale discount, fulfills via owned EV fleet.
Option 2: White-Label Software Licensing & Platform SaaS
- Badge: Enterprise Integrated · Strategic Long-Term Moat
- Commercial Take: 1.5–2.0% GMV Revenue Share
- Mechanics: Complete storefront, dispatch algorithm, and data lake deployed directly under tmpnponline.co.zw over a 5 to 10-year horizon (120 months).`,
    keywords: ['commercial models', 'option 1', 'option 2', 'concierge', 'reseller', 'white-label', 'take rate']
  },
  {
    id: 'slide-10',
    sourceType: 'slide_deck',
    title: 'Slide 10 · Downstream Innovation: Trading Platform End State',
    referenceTag: '[SLIDE-10]',
    summary: 'The long-term vision: an open, destination-agnostic trading platform where price is the reason to participate.',
    verbatimContent: `SLIDE 10: Downstream Innovation & Trading Platform End State
Evolution Path:
Stage 1: TM Pick n Pay Dedicated Fulfillment Engine (Months 1–6)
Stage 2: Category Aggregator (Pharmacies, Bakeries, Hardware) (Months 6–18)
Stage 3: Full Retail-Agnostic Trading Platform (Months 18–36)
Core Concept: As discussed in executive transcripts, the platform matures into an open trading platform where price, proximity, and delivery speed become the reasons to participate, supported by AI inventory telemetry, multi-currency tradable gateways, and EV last-mile logistics.`,
    keywords: ['trading platform', 'end state', 'downstream innovation', 'retail-agnostic', 'pfungwa quote']
  },
  {
    id: 'slide-11',
    sourceType: 'slide_deck',
    title: 'Slide 11 · Full Basket Comparison Engine & Price Audit',
    referenceTag: '[SLIDE-11]',
    summary: 'Empirical 12-item basket audit: TM Pick n Pay ($83.40) vs OK Zimbabwe ($87.10) vs Spar ($89.50) vs Food Lovers ($92.80).',
    verbatimContent: `SLIDE 11: Basket Comparison Engine & Price Audit
Empirical 12-Item Grocery Basket Price Audit:
1. TM Pick n Pay (Anchor Retailer): US$83.40 · 12/12 items fulfilled · Baseline (Lowest Total) · System Default Allocation
2. OK Zimbabwe: US$87.10 · 12/12 items fulfilled · +US$3.70 (+4.4% variance) · Secondary Option
3. Spar Zimbabwe: US$89.50 · 12/12 items fulfilled · +US$6.10 (+7.3% variance) · Premium Tier
4. Food Lovers Market: US$92.80 · 11/12 items fulfilled · +US$9.40 (+11.3% variance) · Specialty / Fresh Focus
Strategic Implication: Because TM PnP consistently delivers the lowest aggregate landed basket cost, the platform algorithm programmatically routes >80% of primary orders to TM Pick n Pay by default. Single-store fulfillment eliminates split-delivery courier costs.`,
    keywords: ['basket comparison', 'price audit', 'ok zimbabwe', 'spar', 'food lovers', '83.40', 'anchor']
  },
  {
    id: 'slide-12',
    sourceType: 'slide_deck',
    title: 'Slide 12 · Owned Delivery Network & Green Fleet Model',
    referenceTag: '[SLIDE-12]',
    summary: 'EV fleet specifications: 500-2,000 units, 12-month rent-to-buy, 5-month asset payback, 10% take rate thereafter.',
    verbatimContent: `SLIDE 12: Owned Last-Mile Delivery Network & Green Fleet
Fleet Architecture:
- Fleet Size: 500 to 2,000 platform-owned electric scooters and heavy-duty cargo e-tricycles.
- Lease Structure: 12-month rent-to-buy lease model; riders pay fixed daily installments from delivery earnings.
- Asset Payback: Capital cost recovered in ~5 months; months 6 to 12 generate direct profit.
- Post-Ownership Platform Fee: Perpetual ~10% platform take rate per completed delivery after ownership transfers.
- Livery Advertising: 80% dedicated to TM Pick n Pay branding (mobile billboards); 20% open to commercial tenants.
- Maintenance & Charging: In-house centralized solar garage ($18/month subscription for parts, battery swaps, and service).
- Inclusivity: Cargo e-tricycles dedicated to peri-urban routes piloted by women rider collectives.`,
    keywords: ['ev fleet', 'scooter', 'e-tricycle', 'rent-to-buy', 'payback', 'solar garage', 'take rate']
  },
  {
    id: 'slide-13',
    sourceType: 'slide_deck',
    title: 'Slide 13 · Bank-Agnostic Payment Rails & Settlement Architecture',
    referenceTag: '[SLIDE-13]',
    summary: 'Payment rails: Visa, Mastercard, PayPal, ZAR EFT, EcoCash, InnBucks with direct Nostro USD settlement.',
    verbatimContent: `SLIDE 13: Bank-Agnostic Payment Rails & Multi-Currency Settlement
Payment Architecture:
- International Cross-Border: Visa, MasterCard, PayPal, Stripe, Apple Pay (settling in USD, GBP, ZAR, AUD).
- Regional Inflow: South African ZAR Electronic Funds Transfer (EFT) and Ozow instant payment rails.
- Domestic Wallets: EcoCash, InnBucks, OneMoney, ZimSwitch local debit cards.
- Direct Settlement: International payments settle directly into TM Pick n Pay's domestic Nostro USD bank accounts.
- FX Volatility Shield: Currency conversion occurs at checkout, eliminating localized exchange rate fluctuation exposure.`,
    keywords: ['payment rails', 'nostro usd', 'ecocash', 'innbucks', 'zar eft', 'visa', 'mastercard']
  },
  {
    id: 'slide-14',
    sourceType: 'slide_deck',
    title: 'Slide 14 · Next Steps, Commercial Charter & Demo App',
    referenceTag: '[SLIDE-14]',
    summary: 'Implementation roadmap: Sprint 1 to 3, 60-Day Pilot across 2 Harare branches, national rollout across 74+ stores.',
    verbatimContent: `SLIDE 14: Implementation Roadmap & Commercial Charter
Roadmap Phases:
- Sprint 01 (Weeks 1–3): Executive Alignment & Governance Mandate.
- Sprint 02 (Weeks 4–7): Field Mapping & Pilot Merchant Densification (Harare & Bulawayo hubs).
- Sprint 03 (Weeks 8–11): API Blueprinting & Secure Systems Integration (TM PnP ERP, POS webhooks, Nostro rails).
- 60-Day Pilot (Months 3–4): Live Operations across 2 Flagship Harare Branches (Borrowdale Village Walk & Avondale) with 50 e-scooters.
- National Scale (Months 5–12+): Rollout across 74+ TM Pick n Pay branch estate and regional corridors.
Live Interactive Prototype: https://pnpexpress.vercel.app`,
    keywords: ['roadmap', 'pilot', 'sprint', 'village walk', 'avondale', '74 stores', 'commercial charter']
  }
];

// 2. A4 PAGES (PAGES 1 TO 10)
export const CORPUS_A4_PAGES: KnowledgeCorpusItem[] = [
  {
    id: 'page-01',
    sourceType: 'a4_page',
    title: 'A4 Page 1 · Formal Board Cover & Executive Metadata',
    referenceTag: '[A4-PAGE-01]',
    summary: 'Formal board cover page with document metadata and strategic statement.',
    verbatimContent: `A4 PAGE 1: Formal Proposal Cover
Title: TM Pick n Pay Marketplace & Last-Mile Delivery Infrastructure Business Proposal
Subtitle: Evolving Click & Collect into an Open Agnostic Marketplace & Click-to-Door Delivery Ecosystem
Code: DOC-TMPNP-EXEC-2026-V2.4 | Classification: Strictly Confidential · Executive Board Proposal
Prepared For: The Executive Leadership Team, TM Pick n Pay (Meikles Retail / Pick n Pay Africa)
Prepared By: Venture Partnership & Digital Infrastructure Working Group
Date: September 2026
Strategic Statement: An open-architecture, multi-tenant marketplace framework with TM Pick n Pay uniquely positioned as the primary anchor retail tenant and wholesale backbone driving the entire shared consumer ecosystem.`,
    keywords: ['page 1', 'cover', 'doc-tmpnp-exec-2026-v2.4', 'meikles', 'confidential']
  },
  {
    id: 'page-02',
    sourceType: 'a4_page',
    title: 'A4 Page 2 · Executive Summary & The Abnormal P&L Reality',
    referenceTag: '[A4-PAGE-02]',
    summary: 'Executive summary detailing the abnormal P&L reality and the four strategic pillars.',
    verbatimContent: `A4 PAGE 2: Executive Summary & Strategic Context
Heading: Executive Summary & Strategic Context
The 'Abnormal P&L' Reality: Evaluating retail operations in Zimbabwe based on historical financial normalcy is no longer viable. In an economy undergoing rapid informalization, protecting a static brick-and-mortar balance sheet leads to margin attrition. Sustainable enterprise leadership requires investing in operational adaptability—turning defensive operating expenses into an aggressive, technology-driven growth engine that captures non-traditional cash flows.
Baseline Target: $61,200,000 baseline retail GMV (40,000 families spending $85/month across 18 annual orders) anchored across 74+ TM PnP branches.
The Four Strategic Pillars:
1. Customer Closeness & Data-Smart CLV (direct consumer intimacy and predictive replenishment)
2. Informal Market Aggregation & B2B Wholesale (10,000+ tuck-shops as distribution nodes)
3. Diaspora Capital Capture ($61.2M baseline cross-border inflow)
4. Intelligent Commerce & Corporate Data Lake (AI-driven basket optimization and FMCG telemetry)`,
    keywords: ['page 2', 'executive summary', 'abnormal P&L', 'four pillars', '61.2M']
  },
  {
    id: 'page-03',
    sourceType: 'a4_page',
    title: 'A4 Page 3 · Macro Opportunity & Structural Market Frictions',
    referenceTag: '[A4-PAGE-03]',
    summary: 'Detailed diagnostic of 4 macroeconomic frictions and the conventional store vs digital grid comparison.',
    verbatimContent: `A4 PAGE 3: Macro Opportunity & Market Analysis
The Four Underlying Structural Frictions:
1. Intense Township Informalization: Over 70% of FMCG volume in urban centers moves through informal tuck-shops and spaza shops offering hyper-flexible pack sizes.
2. Widespread Gray Market Infiltration: Cross-border runners haul basic goods from SA and Mozambique, evading import duties and undercutting formal shelf prices.
3. Inefficiencies in Diaspora Remittances: Over $2B in diaspora inflows suffer 7-15% transfer fees and cash diversion rather than verified grocery delivery.
4. Heavy Commute Penalty on Consumers: Click & Collect forces recipients to pay $2-$4 in kombi fares and spend 2 hours queuing.
Conventional Store vs Proposed Multi-Tenant Grid:
- CapEx: $500k-$1.5M per branch vs Asset-light software & low-cost EV staging micro-hubs.
- Reach: 2-4 km walking radius vs Metropolitan Harare, Bulawayo, Gweru, Mutare.
- Diaspora FX: Reactive walk-in cash shortages vs Direct foreign card settlement into corporate Nostro USD.
- Informal Trade: Competing adversaries vs Contracted B2B wholesale buyers via mobile app.
- Consumer Data: Anonymous till slips vs Continuous household telemetry and brand ad feeds.`,
    keywords: ['page 3', 'macro opportunity', 'frictions', 'runners', 'comparison', 'kombi', 'commute']
  },
  {
    id: 'page-04',
    sourceType: 'a4_page',
    title: 'A4 Page 4 · Enterprise Platform Architecture & Data Lake Moat',
    referenceTag: '[A4-PAGE-04]',
    summary: 'Technical architecture: Multi-tenant storefront, bank-agnostic payment rails, ERP webhooks, and FMCG brand data lake.',
    verbatimContent: `A4 PAGE 4: Enterprise Platform Architecture & Data Lake Moat
The 4 Enterprise Components:
1. Multi-Tenant Storefront Engine: Powers both public marketplace and white-label tenant app under tmpnponline.co.zw, sharing a centralized logistics grid.
2. Bank-Agnostic Payment Rails: Orchestrates international Visa, MasterCard, PayPal, ZAR EFT, EcoCash, and InnBucks with direct Nostro USD settlement.
3. Real-Time ERP & POS Webhooks: Low-latency API sync with TM Pick n Pay branch POS for stock validation, localized pricing, and automated item substitutions.
4. FMCG Brand Data Lake: Centralizes granular household consumption metrics, creating an independent data asset monetized back to manufacturing brands.`,
    keywords: ['page 4', 'architecture', 'data lake', 'storefront', 'erp webhooks', 'pos', 'fmcg']
  },
  {
    id: 'page-05',
    sourceType: 'a4_page',
    title: 'A4 Page 5 · B2B Informal Trader Wholesale Aggregation',
    referenceTag: '[A4-PAGE-05]',
    summary: 'Supply chain transformation: Engaging 10,000+ tuck-shops as distribution nodes with $9.99/mo subscription.',
    verbatimContent: `A4 PAGE 5: Supply Chain Transformation: B2B Informal Trader Aggregation
Core Concept: Spaza shops engaged as TM Pick n Pay's decentralized distribution network via a structured B2B replenishment platform at $9.99/month.
The 3-Step Supply Cycle:
1. Digital Reordering: Informal merchants order bulk staple packs via a zero-data mobile interface without leaving their physical shops.
2. Automated Wholesale Price Tiering: TM Pick n Pay volume purchasing beats cross-border runner rates, protecting margins and merchant loyalty.
3. Scheduled Cargo Drop: Electric cargo tricycles deliver bulk orders to shop doors within 24-48 hours, eliminating expensive third-party transport rentals.
Impact: Displaces gray market smuggling, eliminates counterfeit risks, and expands physical footprint with zero store CapEx.`,
    keywords: ['page 5', 'informal trader', 'b2b wholesale', 'tuck-shop', 'spaza', 'zero-data', 'cargo drop']
  },
  {
    id: 'page-06',
    sourceType: 'a4_page',
    title: 'A4 Page 6 · Owned Green EV Fleet & Last-Mile Logistics Grid',
    referenceTag: '[A4-PAGE-06]',
    summary: 'Full last-mile fleet logistics: 500-2,000 units, 12-month rent-to-buy, 5-month asset payback, 10% take rate, solar garage.',
    verbatimContent: `A4 PAGE 6: Owned Last-Mile Delivery Network & Fleet Specs
Fleet Model:
- Scaling from 500 to 2,000 platform-owned electric scooters and heavy-duty cargo e-tricycles.
- 12-Month Rent-to-Buy Lease: Fixed daily lease installments from delivery earnings until asset ownership transfers.
- Asset Payback in ~5 Months: Months 6 to 12 generate direct profit.
- Perpetual Post-Ownership Take Rate: ~10% platform take rate per delivery.
- In-House Solar Garage: $18/month subscription for spare parts, battery swaps, and maintenance.
- Mobile Billboard Advertising: 80% TM Pick n Pay livery, 20% open to commercial tenants.
- Social Inclusivity: Dedicated cargo e-tricycles piloted by women rider collectives for peri-urban and rural corridors.`,
    keywords: ['page 6', 'fleet specs', 'ev logistics', 'rent-to-buy', 'solar garage', 'asset payback']
  },
  {
    id: 'page-07',
    sourceType: 'a4_page',
    title: 'A4 Page 7 · Basket Comparison Engine & Empirical Price Audit',
    referenceTag: '[A4-PAGE-07]',
    summary: 'Price audit data: TM Pick n Pay ($83.40) vs OK Zimbabwe ($87.10) vs Spar ($89.50) vs Food Lovers ($92.80).',
    verbatimContent: `A4 PAGE 7: Algorithmic Basket Optimization & Price Audit
How It Works: Engine analyzes grocery list across all available retailers, calculating landed basket cost including product prices, availability, and delivery dispatch.
Empirical 12-Item Audit Findings:
- TM Pick n Pay: $83.40 (Baseline / Lowest Total, 12/12 items) · Default System Allocation
- OK Zimbabwe: $87.10 (+US$3.70 / +4.4%, 12/12 items) · Secondary Option
- Spar Zimbabwe: $89.50 (+US$6.10 / +7.3%, 12/12 items) · Premium Tier
- Food Lovers Market: $92.80 (+US$9.40 / +11.3%, 11/12 items) · Specialty / Fresh
Single-Store Fulfillment Advantage: >80% of orders allocate to TM Pick n Pay, avoiding multi-stop courier fragmentation and lowering logistics costs.`,
    keywords: ['page 7', 'basket comparison', 'price audit', '83.40', 'ok zimbabwe', 'spar', 'single-store']
  },
  {
    id: 'page-08',
    sourceType: 'a4_page',
    title: 'A4 Page 8 · Consolidated Ecosystem Throughput & Revenue Projections',
    referenceTag: '[A4-PAGE-08]',
    summary: 'Full financial breakdown: $61.2M GMV, $67.65M Phase 1, $4.69M Phase 2, $72.35M combined ecosystem output.',
    verbatimContent: `A4 PAGE 8: Consolidated Ecosystem Throughput & Revenue Projections
Combined Annual Ecosystem Output: US$72,349,380
Baseline: 40,000 families × $85/basket × 18 orders/yr = US$61,200,000 Gross Merchandise Value.
Phase 1: Transactional GMV Streams (US$67,657,680)
1. Gross Retail GMV: $61,200,000 (720,000 orders)
2. Last-Mile Delivery Fees: $3,240,000 (720k orders × $4.50)
3. Foreign Card Surcharge: $1,836,000 (3.0% of GMV)
4. Diaspora VIP Memberships: $647,352 (6,000 members × $8.99/mo)
5. Retail Media Network Ads: $734,400 (1.2% of GMV)
Phase 2: High-Margin Recurring B2B SaaS Subscriptions (US$4,691,700)
6. Retail Tenant Access Fees: $717,120 (240 tenants × $249/mo)
7. Rider Software Access: $486,000 (900 riders × $45/mo)
8. Solar Garage & Battery Maintenance: $194,400 (900 units × $18/mo)
9. FMCG Brand Data Licenses: $720,000 (40 licenses × $1,500/mo)
10. Domestic Shopper Fast-Pass: $2,154,600 (45,000 shoppers × $3.99/mo)
11. B2B Tuck-Shop Platform Memberships: $419,580 (3,500 tuck-shops × $9.99/mo)`,
    keywords: ['page 8', 'financial projections', '72.3M', '61.2M', '67.65M', '4.69M', 'revenue streams']
  },
  {
    id: 'page-09',
    sourceType: 'a4_page',
    title: 'A4 Page 9 · Commercial Partnership Structuring Options',
    referenceTag: '[A4-PAGE-09]',
    summary: 'Option 1 (Concierge / Reseller: 5-8% markup + 3-5% rebate) vs Option 2 (White-Label SaaS: 1.5-2.0% GMV).',
    verbatimContent: `A4 PAGE 9: Commercial Partnership Structuring Options
Two Alternative Commercial Structures:
Option 1: Independent Concierge & Reseller
- Badge: Fastest Execution · Zero Direct Retail Risk
- Financial Structure: 5–8% Gross Markup on retail transactions + 3–5% Wholesale Volume Rebate paid by TM PnP.
- Mechanics: Venture operates independently, mirrors catalog via API, processes foreign exchange, buys stock at wholesale discount, fulfills via owned EV fleet. TM PnP provides catalog API, wholesale pricing, and store collection bays.
Option 2: White-Label Software Licensing & Platform SaaS
- Badge: Enterprise Integrated · Strategic Long-Term Moat
- Financial Structure: 1.5–2.0% GMV Revenue Share over a 5 to 10-year horizon (120 months).
- Mechanics: Complete platform deployed directly into tmpnponline.co.zw and TM PnP ERP. TM PnP owns customer brand and banking; venture provides software, 99.9% uptime SLA, algorithm optimization, and data lake telemetry.`,
    keywords: ['page 9', 'commercial options', 'option 1', 'option 2', 'concierge', 'reseller', 'white-label', 'take rate']
  },
  {
    id: 'page-10',
    sourceType: 'a4_page',
    title: 'A4 Page 10 · Sixty-Day Pilot Charter, Roadmap & Risk Safeguards',
    referenceTag: '[A4-PAGE-10]',
    summary: 'Execution roadmap: Sprints 1 to 3, 60-day pilot at Borrowdale Village Walk and Avondale, risk management layers.',
    verbatimContent: `A4 PAGE 10: Sixty-Day Pilot Charter, Roadmap & Governance
Implementation Roadmap:
- Sprint 01 (Weeks 1–3): Executive Alignment & Governance Mandate.
- Sprint 02 (Weeks 4–7): Field Mapping & Pilot Merchant Densification (Harare & Bulawayo hubs).
- Sprint 03 (Weeks 8–11): API Blueprinting & Secure Systems Integration (TM PnP ERP, POS webhooks, Nostro rails).
- 60-Day Pilot (Months 3–4): Live operations across 2 Flagship Harare Branches (Borrowdale Village Walk & Avondale) with 50 e-scooter couriers. Validating 5,000+ orders, sub-45 min delivery SLA, and tuck-shop drops.
- National Scale (Months 5–12+): Rollout across 74+ TM Pick n Pay branch estate.
Risk Management Safeguards:
1. FX Settlement: Direct automated settlement into TM Pick n Pay domestic Nostro USD accounts.
2. Inventory Integrity: Real-time POS webhooks for stock validation and automated substitutions.
3. Fleet Telematics: Dual-SIM GPS tracking, geo-fenced routes, remote battery shutoff, and full insurance.
Live Prototype: https://pnpexpress.vercel.app`,
    keywords: ['page 10', 'pilot charter', 'village walk', 'avondale', 'roadmap', 'risk safeguards', 'nostro']
  }
];

// 3. MASTER PROPOSAL & TEXT-ONLY DOCUMENT
export const CORPUS_MASTER_PROPOSAL: KnowledgeCorpusItem[] = [
  {
    id: 'master-proposal-full',
    sourceType: 'proposal_document',
    title: 'Master Strategic Business Proposal (Complete Document)',
    referenceTag: '[PROPOSAL-DOC-FULL]',
    summary: 'The complete, unabridged executive board proposal document covering all chapters, empirical audits, and governance frameworks.',
    verbatimContent: RAW_PROPOSAL_TEXT,
    keywords: ['master proposal', 'raw text', 'complete business case', 'board document', 'comprehensive']
  }
];

// 4. FINANCIAL SIMULATOR CORPUS
export const CORPUS_FINANCIAL_SIMULATOR: KnowledgeCorpusItem[] = [
  {
    id: 'fin-sim-model',
    sourceType: 'financial_simulator',
    title: 'Financial Simulator Engine & Calculations',
    referenceTag: '[FIN-SIM-ENGINE]',
    summary: 'Full interactive mathematical simulation engine, parameters, formulas, and baseline financial output.',
    verbatimContent: `FINANCIAL SIMULATOR ENGINE:
Mathematical Formulas:
- Total Orders Per Year = activeDiasporaFamilies × ordersPerYear
  Baseline: 40,000 × 18 = 720,000 orders
- Gross Retail GMV = activeDiasporaFamilies × averageBasketUSD × ordersPerYear
  Baseline: 40,000 × $85 × 18 = US$61,200,000
- Last-Mile Delivery Fees = totalOrdersPerYear × deliveryFeeUSD
  Baseline: 720,000 × $4.50 = US$3,240,000
- Cross-Border Card Surcharge = Gross Retail GMV × (cardSurchargePercent / 100)
  Baseline: $61,200,000 × 3.0% = US$1,836,000
- Diaspora Memberships = diasporaMembershipsCount × diasporaMembershipFeeMonthly × 12
  Baseline: 6,000 × $8.99 × 12 = US$647,280
- Retail Media Network = Gross Retail GMV × (retailMediaNetworkPercent / 100)
  Baseline: $61,200,000 × 1.2% = US$734,400
Phase 1 Gross Throughput = GMV + Delivery Fees + Card Surcharge + Memberships + Retail Media = US$67,657,680
Phase 2 Recurring Subscriptions:
- Tenant Platform Fees: 240 tenants × $249/mo × 12 = US$717,120
- Rider Software Plans: 900 riders × $45/mo × 12 = US$486,000
- Solar Garage & Maintenance: 900 units × $18/mo × 12 = US$194,400
- FMCG Brand Data Licenses: 40 licenses × $1,500/mo × 12 = US$720,000
- Domestic Shopper Fast-Pass: 45,000 shoppers × $3.99/mo × 12 = US$2,154,600
- B2B Tuck-Shop Platform: 3,500 tuck-shops × $9.99/mo × 12 = US$419,580
Phase 2 Subscriptions Subtotal = US$4,691,700
Combined Annual Ecosystem Gross Throughput = Phase 1 ($67,657,680) + Phase 2 ($4,691,700) = US$72,349,380
Commercial Model Projections:
- Option 1 (Reseller Total Yield): 6.5% Gross Markup ($3,978,000) + 4.0% Wholesale Rebate ($2,448,000) = US$6,426,000
- Option 2 (White-Label SaaS): 1.75% Take Rate on $61.2M GMV = US$1,071,000 annually`,
    keywords: ['financial simulator', 'calculations', 'formulas', '61.2M', '72.35M', 'phase 1', 'phase 2', 'yield']
  }
];

// 5. EXECUTIVE BRIEF CORPUS
export const CORPUS_EXECUTIVE_BRIEF: KnowledgeCorpusItem[] = [
  {
    id: 'exec-brief',
    sourceType: 'executive_brief',
    title: 'Executive Brief & High-Level Board Summary',
    referenceTag: '[EXEC-BRIEF]',
    summary: 'Concise executive overview of core investment thesis, value vectors, and strategic milestones.',
    verbatimContent: `EXECUTIVE BRIEF: High-Level Board Summary
Document Code: DOC-TMPNP-EXEC-2026-V2.4 | Classification: Strictly Confidential
Thesis: Turning defensive physical store infrastructure into an offensive, high-margin multi-tenant marketplace and electric last-mile logistics grid.
Core Pillars:
1. Customer Closeness & Data-Smart CLV
2. Informal Market Aggregation & B2B Wholesale
3. Diaspora Capital Capture ($61.2M Baseline)
4. Intelligent Commerce & Corporate Data Lake Moat
The Optimization Gap: Captures Diaspora Market, Informal Retail Traders, and Customer Convenience.
Combined Output: US$72,349,380 annual ecosystem throughput.
Commercial Options: Option 1 (Independent Concierge 5-8% markup + 3-5% rebate) vs Option 2 (White-Label 1.5-2.0% GMV take rate).
Pilot: 60-day controlled validation at Borrowdale Village Walk & Avondale with 50 e-scooters.`,
    keywords: ['executive brief', 'board summary', 'thesis', 'kpis', 'commercial options']
  }
];

// 6. ALL TRANSCRIPTS CORPUS (VERBATIM WITH TIMESTAMPS)
export const CORPUS_TRANSCRIPTS: KnowledgeCorpusItem[] = [
  {
    id: 'transcript-01',
    sourceType: 'transcript',
    title: 'Executive_Board_Strategy_Alignment_Meeting_2026-09-09.txt',
    referenceTag: '[TRANSCRIPT-01]',
    summary: 'Full executive strategy meeting transcript featuring Gugu Nyathi, Pfungwa, Boni Muvevi, and Sandy discussing Pick n Pay online, click-to-collect vs delivery, shared cart, diaspora angle, and trading platform end-state.',
    verbatimContent: `TRANSCRIPT 1: Executive Board Strategy Alignment Meeting (2026-09-09)
Speakers: Speaker 1 / Gugu Nyathi (CIO), Pfungwa, Boni Muvevi, Sandy
Duration: 26:14

Speaker 1 00:00: Bonnie, how's it?
pfungwa 00:02: Good, good, good, Sandy.
Speaker 1 00:05: No, all good, all good.
pfungwa 00:07: How's it going, Funga? Pretty well, man. Thanks a lot.
Speaker 1 00:14: Okay, we've got Google here. Google like you to meet Funga. Google, Google is our CIO. so yeah, he will be giving us a presentation basically today. Okay, nice to meet you, Funga. Thanks for coming on the call.
pfungwa 00:33: No worries, man. Thanks.
Speaker 1 00:35: Okay, so I'm not sure how much you have seen so far, but I'm quickly just gonna share my screen to show you what we've been up to, right? Can you see my screen?
pfungwa 00:47: Yes.
Speaker 1 00:48: Okay. All right. So first and foremost, I think the the proposal was pick and pay online, right? So TMPNP. So in my research, I found out that they already have a an online shopping system, right? And you can select this is this is the pick and the existing pick and pay online shopping experience, but it's a click to collect. So you you buy stuff at your cart, and then you go and pick it up from any of their shops. So it seems it doesn't currently have a delivery service. Okay, so I think our approach, therefore, would be to rather offer, sorry, to enhance what they already have, right? Which would be to offer a shopping experience for people located in the diaspora, who then buy using their local currencies there, and can have a shared cart. So this is the the prototype that I did. Okay, so it allows for you know multiple people. So these all would be like family members. They can do this on a live shopping experience, or they can just do it as a generic. You know, send something to an app. So whoever initiates the app would add other users. So they would add users, send them a code by number, and they would add them to a shopping cart. And various members from different, you know, with different mobile numbers, could all come together and participate in one shopping experience. Okay, this could be via a live call or or via just a generic shopping experience. And then for the people in back home who don't have, you know, maybe they might not have access to data, or it might be the older people, right? We will integrate this WhatsApp a WhatsApp platform where there's a WhatsApp chatbot that allows is integrated into the same app. So, like an Ambula could just speak in a language, and she could just type in, you know, whatever she wants, and then the AI would add it to the cart, and then whoever makes the payment on the other side would pay, you know, or the family members would split the payments across all of them. Okay, so just to simulate a quick one, I'll just show you here. Obviously, I'm just gonna simulate a quick one. So this could be a live call with multiple people. So it could be all of us.
pfungwa 03:34: just a quick one, right? I mean, it's yeah the the shopping experience is on the on the local grocery database.
Speaker 1 03:47: Yeah, so it it will be integrated to the local their local databases. So they could probably give us an API to be able to plug into their current app because they already have the TM PMP online, right? Yeah. So it will be an integration either via this app. So this there's a company that built this for them. So we could integrate with that company. So we would offer the diaspora angle, and then locally, I think we would then obviously need to offer a physical, you know, delivery service, right? Because currently they don't have that. They don't have the, you know, the scooters and the sort of the logistical system for that, right? Yeah. So yeah, we we would.
pfungwa 04:30: So tell me, it will be that. Yeah.
pfungwa 04:32: Yeah. So tell me on the local platform, right? Does it have the same feature where you can add a few people to participate in the purchase or not?
Speaker 1 04:43: No, it doesn't have that. So it's a single shopping cart system, where so this is a local one I'm showing you now. Yes. So it can add products. Yes, it's your just your normal pick and pay app like we have in South Africa. Yeah, so check out. Yeah, so it doesn't have all of that.
pfungwa 05:00: Okay, so let's take notes as we go along. Okay, so one is a platform for delivery. Okay, the second one is an enhancement of the current user experience, where you can have participation of more than one people contributing towards the shopping experience.
pfungwa 05:21: the third one is those people are destination agnostic. Meaning you can be anywhere. You can be even be in Zimbabwe, or you can be international. The platform allows participation on a multiple currency tradable gateway.
pfungwa 09:30: Hold something at the back of your mind, which could be a Retail shop agnostic platform. It becomes a trading platform where price becomes the reason to participate, supported by AI inventory intelligence and EV last-mile delivery fleet.`,
    keywords: ['transcript', 'meeting', 'gugu nyathi', 'pfungwa', 'boni muvevi', 'destination agnostic', 'trading platform', 'click to collect']
  },
  {
    id: 'transcript-02',
    sourceType: 'transcript',
    title: 'Full_Meeting_Transcription_OtterAI_2026-09-09.txt',
    referenceTag: '[TRANSCRIPT-02]',
    summary: 'OtterAI transcription discussing integration with the existing Pick n Pay software vendor, API connection, and ZimSwitch local payments platform.',
    verbatimContent: `TRANSCRIPT 2: Full Meeting Transcription (OtterAI 2026-09-09)
Topics: Pick n Pay vendor dynamics, API integration, ZimSwitch local payments.
Verbatim Excerpt:
"Okay. I think the biggest risk here is, but I guess I wouldn't call it a risk to say, but it is, for some extent, they already have someone who developed this system for them. So I think the one question that could always ask is, why we can always get our guy to add a diaspora link. Why do we need you guys? What are you going to bring to the team?
Because then we have to look at the dynamic that we have with the current developer. How do we-- because he's already got the integration to the API to the sim switch, the payments platform locally. The whole thing is already integrated. So either way for us to push this to the market faster, we have to leverage that guy who's developed this thing, the website for TM Pick n Pay. We don't have to integrate via somehow. He has to help us with that integration."`,
    keywords: ['otterai', 'developer', 'vendor', 'zimswitch', 'integration', 'risk', 'api']
  },
  {
    id: 'transcript-03',
    sourceType: 'transcript',
    title: 'Strategy_Discussion_Gugu_Pfungwa_Boni_Zion_2026-09-09.txt',
    referenceTag: '[TRANSCRIPT-03]',
    summary: 'Discussion between Gugu Nyathi, Pfungwa, Boni Muvevi, and Zion focusing on clarifying the Gap and value proposition.',
    verbatimContent: `TRANSCRIPT 3: Strategy Discussion (Gugu, Pfungwa, Boni, Zion 2026-09-09)
Topics: Initial alignment on the Gap, value proposition, and slide 1 walk-through.
Verbatim Excerpt:
"Gugu Nyathi: Uh. I think it's on mute. So, you guys can unmute yourself. Yeah, and Zion is on mute. You can unmute when you want to talk. I think Mr Funko is still on mute. Okay. Greetings. How are you doing?
Pfungwa: Very well. Very well, thank you. Thank you.
Gugu Nyathi: Okay, so I think it's over to you, Bonnie, and fungua.
Boni Muvevi: I think, maybe, uh, Google, if you can just start. Just taking us through the updated version, and then we can take it from there.
Gugu Nyathi: Yeah.
Boni Muvevi: Google. Let's just go back to the. Cuz I think that's the first page.
Gugu Nyathi: Okay.
Boni Muvevi: I think just. So that we, we quite clear on. On the Gap and the value proposition."`,
    keywords: ['gugu nyathi', 'pfungwa', 'boni muvevi', 'zion', 'gap', 'value proposition']
  }
];

// Combine all primary corpora into a single authoritative repository
export const MASTER_KNOWLEDGE_BANK: KnowledgeCorpusItem[] = [
  ...CORPUS_SLIDE_DECK,
  ...CORPUS_A4_PAGES,
  ...CORPUS_MASTER_PROPOSAL,
  ...CORPUS_FINANCIAL_SIMULATOR,
  ...CORPUS_EXECUTIVE_BRIEF,
  ...CORPUS_TRANSCRIPTS
];

// Continuous Learning Engine: Builds full dynamic context including live site updates
export function buildComprehensiveKnowledgeContext(
  liveItems?: LibraryItem[],
  liveFinancialParams?: FinancialModelScenario,
  additionalLiveNotes?: string
): string {
  const f = liveFinancialParams ? computeFinancials(liveFinancialParams) : computeFinancials(DEFAULT_FINANCIAL_BASELINE);

  let dynamicItemsText = '';
  if (liveItems && liveItems.length > 0) {
    dynamicItemsText = liveItems
      .map(item => `[LIVE REPOSITORY ITEM: ${item.title} (${item.category}, ${item.date})]\n${item.transcriptText || item.content || '(Binary asset registered in repository)'}`)
      .join('\n\n');
  }

  return `=== AUTHORITATIVE EXECUTIVE KNOWLEDGE BANK (CONTINUOUS LEARNING ACTIVE) ===
PROJECT: TM Pick n Pay Marketplace & Last-Mile Delivery Infrastructure Business Proposal
CODE: DOC-TMPNP-EXEC-2026-V2.4 | CLASSIFICATION: Strictly Confidential
CORE THESIS: Open-architecture multi-tenant marketplace and proprietary green EV last-mile delivery grid anchoring TM Pick n Pay as the foundational retail and wholesale engine.

=== 1. LIVE FINANCIAL SIMULATOR STATUS ===
- Active Diaspora Families: ${formatNumber(liveFinancialParams?.activeDiasporaFamilies ?? DEFAULT_FINANCIAL_BASELINE.activeDiasporaFamilies)}
- Average Order Basket: $${liveFinancialParams?.averageBasketUSD ?? DEFAULT_FINANCIAL_BASELINE.averageBasketUSD}
- Annual Order Frequency: ${liveFinancialParams?.ordersPerYear ?? DEFAULT_FINANCIAL_BASELINE.ordersPerYear} orders/year
- Gross Retail GMV: ${formatUSD(f.grossRetailGMV)} (${formatNumber(f.totalOrdersPerYear)} orders)
- Phase 1 Gross Throughput: ${formatUSD(f.phase1GrossThroughput)} (Includes GMV + Delivery Fees ${formatUSD(f.lastMileDeliveryFees)} + Card Surcharge ${formatUSD(f.crossBorderCardSurcharge)} + Memberships ${formatUSD(f.diasporaMembershipsAnnual)} + Media Ads ${formatUSD(f.retailMediaNetworkRevenue)})
- Phase 2 Recurring SaaS Subtotal: ${formatUSD(f.phase2SubscriptionsSubtotal)} (Tenant Fees ${formatUSD(f.tenantPlatformFeesAnnual)} + Rider Plans ${formatUSD(f.riderPlansAnnual)} + Garage ${formatUSD(f.garageMaintenanceAnnual)} + FMCG Data ${formatUSD(f.dataIntelligenceAnnual)} + Shopper Plans ${formatUSD(f.shopperPlansAnnual)} + Tuck-Shop App ${formatUSD(f.tuckShopTradingAppAnnual)})
- Combined Annual Ecosystem Gross Output: ${formatUSD(f.combinedAnnualEcosystemGross)}
- Commercial Model Yields: Option 1 Reseller Total Yield: ${formatUSD(f.resellerTotalYield)} (Markup: ${formatUSD(f.resellerGrossMarkupRevenue)} + Rebate: ${formatUSD(f.resellerRebateRevenue)}) | Option 2 White-Label SaaS: ${formatUSD(f.whiteLabelAnnualRevenue)}

=== 2. SLIDE DECK (14 SLIDES VERBATIM) ===
${CORPUS_SLIDE_DECK.map(s => `${s.referenceTag} ${s.title}:\n${s.verbatimContent}`).join('\n\n')}

=== 3. A4 PAGES (PAGES 1 TO 10 VERBATIM) ===
${CORPUS_A4_PAGES.map(p => `${p.referenceTag} ${p.title}:\n${p.verbatimContent}`).join('\n\n')}

=== 4. EXECUTIVE BRIEF & PROPOSAL HIGHLIGHTS ===
${CORPUS_EXECUTIVE_BRIEF[0].verbatimContent}

=== 5. ALL TRANSCRIPTS & RECORDING LOGS VERBATIM ===
${CORPUS_TRANSCRIPTS.map(t => `${t.referenceTag} ${t.title}:\n${t.verbatimContent}`).join('\n\n')}

=== 6. MASTER TEXT PROPOSAL (COMPLETE RAW TEXT) ===
${RAW_PROPOSAL_TEXT}

=== 7. LIVE DYNAMIC USER REPOSITORY UPDATES ===
${dynamicItemsText || 'No custom uploaded items yet. Continuous learning watching for live additions.'}
${additionalLiveNotes ? `Live User Note:\n${additionalLiveNotes}` : ''}
`;
}

// Verbatim Search & Cross-Referencing Tool for the Client
export function searchKnowledgeBankVerbatim(query: string): KnowledgeCorpusItem[] {
  if (!query || !query.trim()) return MASTER_KNOWLEDGE_BANK.slice(0, 8);
  const q = query.toLowerCase().trim();
  const tokens = q.split(/\s+/).filter(Boolean);

  return MASTER_KNOWLEDGE_BANK.filter(item => {
    const textToSearch = (
      item.title + ' ' +
      item.referenceTag + ' ' +
      item.summary + ' ' +
      item.verbatimContent + ' ' +
      item.keywords.join(' ')
    ).toLowerCase();

    return tokens.every(token => textToSearch.includes(token));
  });
}
