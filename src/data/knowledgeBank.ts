import { DEFAULT_FINANCIAL_BASELINE, PROPOSAL_METADATA, THE_FOUR_PILLARS, BASKET_COMPARISON_DATA, FLEET_SPECS, COMMERCIAL_OPTIONS, ROADMAP_SPRINTS } from './proposalData';
import { RAW_PROPOSAL_TEXT } from '../components/TextOnlyDocumentView';
import { computeFinancials, formatUSD, formatNumber } from '../utils/calculations';
import { FinancialModelScenario, LibraryItem } from '../types';

export interface KnowledgeCorpusItem {
  id: string;
  sourceType: 'slide_deck' | 'a4_page' | 'proposal_document' | 'text_only_document' | 'financial_simulator' | 'executive_brief' | 'transcript' | 'live_update' | 'ai_training_doc' | 'retail_domain_knowledge';
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

// 6. ALL TRANSCRIPTS CORPUS (VERBATIM WITH EXACT LINE NUMBERS & TIMESTAMPS)
export const CORPUS_TRANSCRIPTS: KnowledgeCorpusItem[] = [
  {
    id: 'transcript-call-1-sept-2026',
    sourceType: 'transcript',
    title: 'TM PnP Call 1 September 2026.txt (625 Lines Verbatim)',
    referenceTag: '[TRANSCRIPT-CALL-1-SEPT-2026]',
    summary: 'Full 625-line strategy alignment transcript between Gugu Nyathi (CIO), Pfungwa, and Boni Muvevi covering the optimization gap, retail-agnostic platform, destination-agnostic diaspora cart, and abnormal P&L reality.',
    verbatimContent: `TRANSCRIPT: TM PnP Call 1 September 2026.txt (File Path: public/transcripts/TM PnP Call 1 September 2026.txt)
Total Lines: 625 Lines
Speakers: Gugu Nyathi (CIO), Pfungwa, Boni Muvevi, Sandy, Zion

Key Line References & Verbatim Excerpts:
- Lines 1-35: Gugu Nyathi introduces the presentation. Boni Muvevi highlights the 3 glaring gaps: Diaspora Market, Formal Retail Traders Market, and Customer Convenience.
- Lines 43-47 [Pfungwa]: "So what the same thing is that the value proposition speaks to the far left? The foundations, which is, we appreciate that there is already a platform through which people can trade, but at the same time, looking at the Gap, there's need for them to close that to make sure that the platform itself is functional, and if it can accommodate the three in the manner in which it is set, it becomes easier."
- Lines 67-68 [Gugu Nyathi]: "The difference between where they are right now is now, you are taking into account the local and the Diaspora Shopper. A targeted tracking multi-currency Gateway for payments that is from the diaspora... whether you're in Australia or you're in UK, or you're in America, you're paying your local currency."
- Lines 73-105 [Pfungwa]: "This thing of not knowing your customer right and not following your customer or not. Incentivizing your customer is now becoming a differentiator... It's an abnormal P&L. Cuz you constantly are trying to adapt. Right, whereas what you should be doing is to say, under normal circumstance, what will our balance sheet look like? Given the scenario, what is it that we're doing to pivot separate differently to make sure that we are adaptable? And what is that Gap? A person who runs strategy and finance will probably get that very fast... because I'm now looking at these three pillars to be able to adapt to remain profitable and sustainable."
- Lines 160-167 [Pfungwa & Gugu Nyathi]: Pfungwa notes: "when you tell them that this thing can run anywhere, even in the tuck-shop, they start now looking at it and say, maybe let's invest in this thing, and we pay big dollar and protect ourselves." Gugu Nyathi confirms: "our offering is sort of agnostic. It's agnostic, it's multi-tenant. It can work for all retailers. But you could have your own custom one."
- Lines 516-524 [Gugu Nyathi & Pfungwa, Timestamp 05:21 & 09:30]:
  * Timestamp 05:21 [Pfungwa]: "the third one is those people are destination agnostic. Meaning you can be anywhere. You can be even be in Zimbabwe, or you can be international. The platform allows participation on a multiple currency tradable gateway."
  * Timestamp 09:30 [Pfungwa]: "Hold something at the back of your mind, which could be a Retail shop agnostic platform. It becomes a trading platform where price becomes the reason to participate, supported by AI inventory intelligence and EV last-mile delivery fleet."`,
    keywords: ['september call', 'lines 1-625', 'gugu nyathi', 'pfungwa', 'boni muvevi', 'abnormal P&L', 'destination agnostic', 'trading platform']
  },
  {
    id: 'transcript-call-10-aug-2026',
    sourceType: 'transcript',
    title: 'TM PnP Call 10 Aug 2026.txt (439 Lines Verbatim)',
    referenceTag: '[TRANSCRIPT-CALL-10-AUG-2026]',
    summary: '439-line transcript detailing Pick n Pay current click-to-collect limitations, WhatsApp AI chatbot integration for elders back home, and shared cart functionality.',
    verbatimContent: `TRANSCRIPT: TM PnP Call 10 Aug 2026.txt (File Path: public/transcripts/TM PnP Call 10 Aug 2026.txt)
Total Lines: 439 Lines
Speakers: Speaker 1 / Gugu Nyathi (CIO), Pfungwa, Boni Muvevi

Key Line References & Verbatim Excerpts:
- Lines 1-34 [Speaker 1 / Gugu Nyathi]: "TM PNP existing pick and pay online shopping experience is a click to collect. You buy stuff at your cart, and then you go and pick it up from any of their shops. It doesn't currently have a delivery service. Our approach therefore would be to offer a shopping experience for people located in the diaspora, who buy using their local currencies there, and can have a shared cart."
- Lines 34-36 [Gugu Nyathi]: "For people back home who don't have access to data, or older people, we will integrate a WhatsApp chatbot integrated into the same app. So, like an Ambula could just speak in a language, and type whatever she wants, and the AI adds it to the cart."
- Lines 41-43 [Gugu Nyathi]: "It will be integrated to their local databases via an API. There's a company that built this for them, so we could integrate with that company. We offer the diaspora angle, and locally we offer a physical delivery service with scooters."
- Lines 45-50 [Pfungwa]: Inquires about multi-user cart participation on local platforms, confirming single-cart limitation on existing setup.`,
    keywords: ['august 10 call', 'lines 1-439', 'click to collect', 'whatsapp chatbot', 'ambula', 'shared cart', 'scooters']
  },
  {
    id: 'transcript-meeting-13-aug-2026',
    sourceType: 'transcript',
    title: 'TM PnP Meeting 13 Aug 2026.txt (Pages 1 to 4 Verbatim)',
    referenceTag: '[TRANSCRIPT-MEETING-13-AUG-2026]',
    summary: '114-line meeting transcript structured across Pages 1 to 4 covering vendor integration, ZimSwitch API, white-label licensing, Malayasha cross-border constraints, and tuck-shop wholesale distributor conversion.',
    verbatimContent: `TRANSCRIPT: TM PnP Meeting 13 Aug 2026.txt (File Path: public/transcripts/TM PnP Meeting 13 Aug 2026.txt)
Total Lines: 114 Lines (Structured across Pages 1, 2, 3, and 4)
Speakers: Speaker 1 (Gugu Nyathi), Speaker 2 (Boni Muvevi), Speaker 3 (Pfungwa), Speaker 4

Key Page & Line References:
- PAGE 1 (Lines 1-16):
  * Line 3 [Speaker 1]: "Because then we have to look at the dynamic that we have with the current developer. How do we-- because he's already got the integration to the API to the sim switch [ZimSwitch], the payments platform locally. The whole thing is already integrated. So either way for us to push this to the market faster, we have to leverage that guy who's developed the website for TM Pick n Pay."
  * Line 10 [Speaker 3/Pfungwa]: Proposes the White-Label Solution / Checkers Sixty60-like model: "We want to introduce this checkers like model for that. That checkers like model for the dispatch, we want the program to provide them as a service. We like a commission model or subscription."
- PAGE 2 (Lines 20-29):
  * Line 24 [Speaker 2/Boni Muvevi]: "Another thing that is happening right now, the Malayasha business is probably very constrained... they are tightening on the movement of goods. A digital platform where Diaspora is buying becomes the next best thing, promoting local sales of goods originally coming from South Africa."
  * Line 29 [Speaker 2]: "Net net the strip line is we are saying through this model TM will replace Mbare Musika or these informal trading models that are currently flourishing in the country."
- PAGE 3 & PAGE 4 (Lines 31-50):
  * Lines 31-35 [Speaker 2 & Speaker 1]: "Instead of the tuck-shop becoming a competitor, it becomes a distributor extension of TM. They compete, but they also complement each other."
  * Line 40 [Speaker 2]: "TM is not a brick and mortar, TM is a brand that should live in people's homes. By leveraging economies of scale and direct manufacturer supply, TM provides wholesale pricing that beats cross-border runners and counterfeits."`,
    keywords: ['meeting 13 aug', 'pages 1 to 4', 'zimswitch', 'checkers sixty60', 'malayasha', 'mbare musika', 'tuck-shop distributor']
  }
];

// 7. PUBLIC/AI-TRAINING DOCUMENTS CORPUS
export const CORPUS_TRAINING_DOCUMENTS: KnowledgeCorpusItem[] = [
  {
    id: 'ai-training-slide-deck',
    sourceType: 'ai_training_doc',
    title: 'TM_Pick_n_Pay_Express_Executive_Slide_Deck_2026.pdf (Slides 1 to 14)',
    referenceTag: '[AI-DOC-SLIDE-DECK]',
    summary: 'Executive board presentation slide deck located in public/ai-training containing all 14 slides, structural market friction diagrams, financial tables, and EV fleet models.',
    verbatimContent: `TRAINING DOCUMENT: TM_Pick_n_Pay_Express_Executive_Slide_Deck_2026.pdf
Location: C:\\Users\\Acer\\Documents\\tmpnpplatform\\tmpnpplatform\\public\\ai-training\\TM_Pick_n_Pay_Express_Executive_Slide_Deck_2026.pdf
Structure: 14 Slides (Slides 01 to 14)

Page / Slide Breakdown:
- Slide 1 [Cover]: TM Pick n Pay Marketplace & Last-Mile Delivery Infrastructure Business Proposal. Document DOC-TMPNP-EXEC-2026-V2.4.
- Slide 2 [Disclaimer]: The Abnormal P&L Reality. Depart from standard retail assumptions; defend store balance sheets via operational adaptability.
- Slide 3 [Frictions]: 4 Market Frictions: Township Informalization (70%+ FMCG), Cross-Border Gray Market Runners, Remittance Friction ($2B+ inflows at 7-15% fee), Commute Penalty ($2-$4 fare, 2hr queues).
- Slide 4 [Optimization Gap]: Vector 1: Diaspora Market; Vector 2: Informal Retail Traders; Vector 3: Customer Convenience.
- Slide 5 [4 Pillars]: Customer Closeness & Data CLV, Informal Market Aggregation, Diaspora Capital Capture ($61.2M), Intelligent Commerce Data Lake.
- Slide 6 [Pipeline]: 40,000 active diaspora families × $85 basket × 18 annual orders = $61.2M GMV (720,000 deliveries).
- Slide 7 [Financial Output]: $72,349,380 combined throughput ($67.65M Phase 1 + $4.69M Phase 2 SaaS).
- Slide 8 [Strategic Benefits]: Direct Nostro USD inflow for TM PnP, zero store CapEx expansion, consumer kombi fare savings.
- Slide 9 [Commercial Options]: Option 1 (Reseller 5-8% markup + 3-5% rebate) vs Option 2 (White-Label SaaS 1.5-2.0% GMV).
- Slide 10 [Trading End State]: Evolution from TM fulfillment (M1-6) to category aggregator (M6-18) to retail-agnostic trading platform (M18-36).
- Slide 11 [Price Audit]: TM PnP ($83.40) vs OK Zimbabwe ($87.10) vs Spar ($89.50) vs Food Lovers ($92.80). >80% default allocation to TM PnP.
- Slide 12 [EV Fleet]: 500-2,000 e-scooters/cargo e-tricycles, 12-month rent-to-buy, 5-month payback, 10% post-ownership fee, $18/mo solar garage.
- Slide 13 [Payment Rails]: Visa, MasterCard, PayPal, ZAR EFT, EcoCash, InnBucks, ZimSwitch -> Direct Nostro USD settlement.
- Slide 14 [Roadmap]: Sprints 1-3, 60-Day Pilot (Borrowdale Village Walk & Avondale with 50 scooters), 74+ store national scale.`,
    keywords: ['ai-training pdf', 'slide deck', 'slides 1-14', '61.2M', '72.35M', 'borrowdale village walk', 'avondale']
  },
  {
    id: 'ai-training-business-proposal',
    sourceType: 'ai_training_doc',
    title: 'TM_Pick_n_Pay_Marketplace_Business_Proposal_2026 (4).pdf (Pages 1 to 10)',
    referenceTag: '[AI-DOC-BUSINESS-PROPOSAL]',
    summary: 'Complete 10-page executive board proposal PDF in public/ai-training containing detailed chapter descriptions, financial breakdowns, and pilot governance rules.',
    verbatimContent: `TRAINING DOCUMENT: TM_Pick_n_Pay_Marketplace_Business_Proposal_2026 (4).pdf
Location: C:\\Users\\Acer\\Documents\\tmpnpplatform\\tmpnpplatform\\public\\ai-training\\TM_Pick_n_Pay_Marketplace_Business_Proposal_2026 (4).pdf
Structure: 10 Formal A4 Pages (Pages 1 to 10)

Page-by-Page Content & Citation Guide:
- Page 1 [Title & Metadata]: Executive Board Proposal, Code DOC-TMPNP-EXEC-2026-V2.4, Prepared for Executive Leadership Team TM Pick n Pay (Meikles Retail / Pick n Pay Africa).
- Page 2 [Executive Summary]: Diagnostic of the Abnormal P&L Reality, baseline $61.2M GMV target, and four strategic pillars.
- Page 3 [Macro Opportunity]: Diagnostic of 4 structural market frictions and conventional store vs digital multi-tenant grid matrix.
- Page 4 [Enterprise Architecture]: 4 Enterprise Components: Multi-tenant storefront, bank-agnostic payment rails, real-time ERP webhooks, FMCG data lake.
- Page 5 [B2B Informal Wholesale]: Engaging 10,000+ tuck-shops as distribution nodes; zero-data app ordering, automated wholesale price tiering, 24-48hr cargo drops.
- Page 6 [Owned EV Logistics Grid]: 500-2,000 EV scooters/tricycles, 12-month rent-to-buy, ~5 month asset payback, solar garage ($18/mo), 80% TM PnP livery.
- Page 7 [Basket Comparison Engine]: Algorithmic list allocation; 12-item audit showing TM PnP ($83.40), OK Zim ($87.10), Spar ($89.50), Food Lovers ($92.80).
- Page 8 [Consolidated Financials]: Phase 1 ($67,657,680) + Phase 2 ($4,691,700) = $72,349,380 annual ecosystem throughput.
- Page 9 [Commercial Models]: Option 1 (Concierge Reseller 5-8% markup + 3-5% rebate = $6.426M) vs Option 2 (White-Label SaaS 1.5-2.0% GMV = $1.071M).
- Page 10 [Pilot Charter & Roadmap]: Sprints 1-3, 60-day pilot across Borrowdale Village Walk & Avondale with 50 scooters, risk safeguards for FX, inventory, and telematic fleet.`,
    keywords: ['ai-training pdf', 'pages 1 to 10', 'business proposal', 'a4 pages', 'borrowdale', 'avondale', 'nostro']
  },
  {
    id: 'ai-training-strategic-text-case',
    sourceType: 'ai_training_doc',
    title: 'TM_Pick_n_Pay_Strategic_Business_Case_Text_Document.pdf',
    referenceTag: '[AI-DOC-TEXT-CASE]',
    summary: 'Executive text business case document in public/ai-training focusing on strategic rationale, corporate board justification, and operational risk mitigation.',
    verbatimContent: `TRAINING DOCUMENT: TM_Pick_n_Pay_Strategic_Business_Case_Text_Document.pdf
Location: C:\\Users\\Acer\\Documents\\tmpnpplatform\\tmpnpplatform\\public\\ai-training\\TM_Pick_n_Pay_Strategic_Business_Case_Text_Document.pdf

Key Strategic Rationale & Case Points:
- Addresses the structural evolution of retail in hyper-inflationary and informalized economies.
- Shift from defending brick-and-mortar shelf space to dominating digital logistics channels.
- Multi-currency liquidity management: Offshore payments clear into domestic Nostro USD bank accounts, securing hard foreign currency liquidity for TM Pick n Pay stock imports.
- B2B Wholesale integration: Displaces informal gray-market runners by supplying 10,000+ tuck-shops directly with genuine FMCG goods at wholesale rates.`,
    keywords: ['text business case', 'strategic business case', 'nostro usd', 'liquidity', 'board case']
  },
  {
    id: 'ai-training-strategic-proposal-2',
    sourceType: 'ai_training_doc',
    title: 'TM_Pick_n_Pay_Strategic_Proposal_Document_2026 (2).pdf',
    referenceTag: '[AI-DOC-STRATEGIC-PROPOSAL-2]',
    summary: 'Comprehensive strategic proposal document (2) in public/ai-training outlining operational execution, technical architecture, and long-term ecosystem expansion.',
    verbatimContent: `TRAINING DOCUMENT: TM_Pick_n_Pay_Strategic_Proposal_Document_2026 (2).pdf
Location: C:\\Users\\Acer\\Documents\\tmpnpplatform\\tmpnpplatform\\public\\ai-training\\TM_Pick_n_Pay_Strategic_Proposal_Document_2026 (2).pdf

Core Operational Specs:
- Architectural compatibility with existing TM Pick n Pay web application and POS vendors.
- Seamless integration with ZimSwitch national payment gateway for domestic debit card processing.
- Multi-tenant marketplace routing enabling third-party category add-ons (Pharmacies, Bakeries, Hardware) without diluting TM Pick n Pay's core retail anchor dominance.`,
    keywords: ['strategic proposal 2', 'technical architecture', 'pos vendor', 'zimswitch', 'multi-tenant']
  }
];

// 8. GLOBAL & ZIMBABWEAN RETAIL / E-COMMERCE DOMAIN KNOWLEDGE CORPUS
export const CORPUS_RETAIL_DOMAIN_KNOWLEDGE: KnowledgeCorpusItem[] = [
  {
    id: 'domain-global-ecommerce-retail',
    sourceType: 'retail_domain_knowledge',
    title: 'Global E-Commerce & Retail Industry Standards',
    referenceTag: '[DOMAIN-GLOBAL-RETAIL]',
    summary: 'Comprehensive domain knowledge on global omnichannel retail, click-and-collect, last-mile delivery, dark stores, retail media networks (RMN), and marketplace economics.',
    verbatimContent: `GLOBAL E-COMMERCE & RETAIL INDUSTRY DOMAIN KNOWLEDGE:
1. Omnichannel Retail Architecture: Seamless integration between physical stores and digital channels. Transition from legacy Click & Collect (customer store pickup) to On-Demand Click-to-Door Delivery (under 45 minutes).
2. Benchmarks (e.g. Checkers Sixty60 in SA, Instacart & Amazon Fresh in US):
   - Checkers Sixty60 (Shoprite SA): Evolved physical supermarket footprint into fulfillment micro-hubs using dedicated rider fleets, capturing massive market share in grocery delivery.
   - Instacart (US): Multi-tenant marketplace connecting multiple grocers on a unified app using crowd/leased couriers.
3. Dark Stores vs Store Micro-Hubs: Using existing high-density store networks (like TM Pick n Pay's 74+ branches) as regional micro-fulfillment centers avoids expensive dedicated dark store real estate CapEx.
4. Algorithmic Basket Allocation: Dynamic routing engine evaluating order item availability, retail pricing, distance, and courier dispatch to minimize split fulfillment and total landed basket cost.
5. Retail Media Networks (RMN): Monetizing digital shelf space and shopper telemetry via sponsored product placements, targeted digital ads, and FMCG brand analytics (1.2% to 3.0% GMV yield).
6. Fleet Rent-to-Buy Economics: Asset-light rider model where couriers pay fixed daily lease fees from delivery earnings over 12 months, recovering asset capital cost in ~5 months and creating micro-entrepreneurs.`,
    keywords: ['global retail', 'ecommerce', 'checkers sixty60', 'instacart', 'amazon', 'dark stores', 'retail media network', 'clv']
  },
  {
    id: 'domain-zimbabwe-retail-economy',
    sourceType: 'retail_domain_knowledge',
    title: 'Zimbabwean Retail Market & Economic Ecosystem',
    referenceTag: '[DOMAIN-ZIM-RETAIL]',
    summary: 'Exhaustive domain knowledge of Zimbabwe retail landscape: Meikles/TM Pick n Pay, OK Zimbabwe, Spar, Nostro USD, ZimSwitch, EcoCash, InnBucks, Malayasha, Mbare Musika, spaza shops, and multi-currency dynamics.',
    verbatimContent: `ZIMBABWEAN RETAIL & ECONOMIC ECOSYSTEM DOMAIN KNOWLEDGE:
1. Major Formal Retail Players:
   - TM Pick n Pay (Meikles Retail / Pick n Pay Africa): Anchor formal retailer operating 74+ stores across Zimbabwe (including flagship Harare branches Borrowdale Village Walk, Avondale, Joina City, Kamfinsa). Uniquely positioned as wholesale and retail anchor.
   - OK Zimbabwe Limited: Primary formal competitor operating OK Supermarkets, Bon Marché, and OK Mart.
   - Spar Zimbabwe: Premium supermarket franchise network.
   - Food Lovers Market: Specialty fresh produce retailer.
2. Township Informalization & Spaza / Tuck-Shop Trade:
   - Over 70% of FMCG trade moves through 10,000+ informal tuck-shops and spaza vendors in high-density suburbs (e.g. Highfield, Mbare, Glen Norah, Chitungwiza, Cowdray Park).
   - Informal traders buy broken bulk, offer localized proximity, but struggle with supply chain reliability and gray-market runner counterfeits.
3. Mbare Musika & Cross-Border Runners (Malayasha):
   - Mbare Musika: Central informal agricultural and FMCG wholesale hub in Harare.
   - Cross-Border Runners (Malayasha): Informal couriers hauling goods across borders from Musina (South Africa) and Mozambique, evading import duties and undercutting formal shelf prices.
   - Strategic Counter-Defense: TM Pick n Pay aggregates tuck-shops as legitimate B2B wholesale buyers, using volume scale to beat runner rates with genuine product guarantees.
4. Currency & Financial Infrastructure:
   - Multi-Currency & Dual Economy: Transactions occur in USD, South African Rand (ZAR), and local currency (ZiG / ZimSwitch debit).
   - Nostro USD Foreign Currency Accounts: Domestic bank accounts holding physical foreign currency. Offshore remittance checkout routes hard USD directly into TM Pick n Pay's Nostro USD accounts.
   - Domestic Payment Rails: ZimSwitch (national debit card switch), EcoCash (mobile money), InnBucks (cash remittance & wallet), OneMoney.
5. Commute Penalty Frictions:
   - Shoppers in Harare/Bulawayo pay $2 to $4 in kombi (minibus) fares and spend up to 2 hours traveling and queuing for groceries. Doorstep EV delivery under $4.50 eliminates this commute friction.`,
    keywords: ['zimbabwe retail', 'meikles', 'tm pick n pay', 'ok zimbabwe', 'spar', 'food lovers', 'mbare musika', 'malayasha', 'nostro usd', 'ecocash', 'innbucks', 'zimswitch', 'zig']
  }
];

// Combine all primary corpora into a single authoritative repository
export const MASTER_KNOWLEDGE_BANK: KnowledgeCorpusItem[] = [
  ...CORPUS_SLIDE_DECK,
  ...CORPUS_A4_PAGES,
  ...CORPUS_MASTER_PROPOSAL,
  ...CORPUS_FINANCIAL_SIMULATOR,
  ...CORPUS_EXECUTIVE_BRIEF,
  ...CORPUS_TRANSCRIPTS,
  ...CORPUS_TRAINING_DOCUMENTS,
  ...CORPUS_RETAIL_DOMAIN_KNOWLEDGE
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

=== 5. ALL TRANSCRIPTS & RECORDING LOGS (LINE NUMBERS & PAGES) ===
${CORPUS_TRANSCRIPTS.map(t => `${t.referenceTag} ${t.title}:\n${t.verbatimContent}`).join('\n\n')}

=== 6. PUBLIC/AI-TRAINING FOLDER DOCUMENTS ===
${CORPUS_TRAINING_DOCUMENTS.map(d => `${d.referenceTag} ${d.title}:\n${d.verbatimContent}`).join('\n\n')}

=== 7. GLOBAL & ZIMBABWEAN RETAIL E-COMMERCE DOMAIN KNOWLEDGE ===
${CORPUS_RETAIL_DOMAIN_KNOWLEDGE.map(r => `${r.referenceTag} ${r.title}:\n${r.verbatimContent}`).join('\n\n')}

=== 8. MASTER TEXT PROPOSAL (COMPLETE RAW TEXT) ===
${RAW_PROPOSAL_TEXT}

=== 9. LIVE DYNAMIC USER REPOSITORY UPDATES ===
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
