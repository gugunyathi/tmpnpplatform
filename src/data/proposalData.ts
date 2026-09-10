import { FinancialModelScenario, BasketComparisonItem, PillarDetail } from '../types';

export const DEFAULT_FINANCIAL_BASELINE: FinancialModelScenario = {
  activeDiasporaFamilies: 40000,
  averageBasketUSD: 85,
  ordersPerYear: 18,
  deliveryFeeUSD: 4.50,
  cardSurchargePercent: 3.0,
  diasporaMembershipsCount: 6000,
  diasporaMembershipFeeMonthly: 8.99,
  retailMediaNetworkPercent: 1.2,
  tenantPlatformCount: 240,
  tenantPlatformFeeMonthly: 249,
  riderCount: 900,
  riderPlanFeeMonthly: 45,
  garageMaintenanceCount: 900,
  garageMaintenanceFeeMonthly: 18,
  dataIntelligenceLicenses: 40,
  dataIntelligenceFeeMonthly: 1500,
  shopperSubscribersCount: 45000,
  shopperPlanFeeMonthly: 3.99,
  tuckShopSubscribersCount: 3500,
  tuckShopFeeMonthly: 9.99,
  whiteLabelTakeRatePercent: 1.75, // 1.5% - 2%
  resellerMarkupPercent: 6.5, // 5% - 8%
  resellerRebatePercent: 4.0, // 3% - 5%
};

export const PROPOSAL_METADATA = {
  documentTitle: "TM Pick n Pay Marketplace & Last-Mile Delivery Infrastructure Business Proposal",
  documentSubtitle: "Evolving Click & Collect into an Open Agnostic Marketplace & Click-to-Door Delivery Ecosystem",
  documentCode: "DOC-TMPNP-EXEC-2026-V2.4",
  classification: "Strictly Confidential · Executive Board Proposal",
  preparedFor: "The Executive Leadership Team, TM Pick n Pay (Meikles Retail / Pick n Pay Africa)",
  preparedBy: "Venture Partnership & Digital Infrastructure Working Group",
  date: "September 2026",
  strategicPositioning: "An open-architecture, multi-tenant marketplace framework with TM Pick n Pay uniquely positioned as the primary anchor retail tenant and wholesale backbone driving the entire shared consumer ecosystem.",
  livePrototypeUrl: "https://pnpexpress.vercel.app",
  targetPilotScope: "60-Day Pilot across 2 Flagship Harare Branches with scaling to 74+ National Stores",
};

export const THE_FOUR_PILLARS: PillarDetail[] = [
  {
    number: "01",
    title: "Customer Closeness & Data-Smart CLV",
    subtitle: "Direct Household Relationship & Data Ownership",
    description: "Re-establishing direct consumer intimacy ('Know Your Customer'). Building end-to-end digital visibility into household preferences, purchase velocity, replenishment frequency, and spending triggers across domestic and diaspora buyers.",
    strategicImpact: "Transforms passive in-store footfall into active, predictive demand tracking with personalized basket incentives and high lifetime customer value."
  },
  {
    number: "02",
    title: "Informal Market Aggregation & B2B Wholesale",
    subtitle: "Wholesale Supply & Decentralized Distribution",
    description: "Formally embracing Zimbabwe's massive informal retail sector (10,000+ township spaza shops and tuck-shops). TM Pick n Pay steps in as the bulk wholesale supplier, cleaning supply chains and turning informal traders into affiliated distribution nodes.",
    strategicImpact: "Displaces unregulated cross-border gray market smuggling, counterfeit goods, and unmanaged tax leakage while expanding physical footprint with zero CapEx."
  },
  {
    number: "03",
    title: "Diaspora Capital Capture ($61.2M Baseline)",
    subtitle: "Cross-Border Foreign Currency Inflow Pipeline",
    description: "Intercepting the resilient 100,000 to 500,000+ global diaspora corridor (South Africa, United Kingdom, USA, Australia). Enables seamless multi-currency checkout (USD, GBP, ZAR, AUD) that routes remittance directly into corporate retail settlement.",
    strategicImpact: "Guarantees direct household doorstep delivery verification for overseas sponsors rather than cash diversion, securing guaranteed retail spend."
  },
  {
    number: "04",
    title: "Intelligent Commerce & Corporate Data Lake",
    subtitle: "AI Engine for Margin Optimization & Monetization",
    description: "Underpinning the entire multi-tenant grid with a unified corporate data lake and AI intelligence layer. Powers real-time basket optimization, predictive stock replenishment, dynamic pricing, and monetization streams sold to FMCG brand manufacturers.",
    strategicImpact: "Eliminates dangerous 'data blindness' in an informalized economy, serving as the foundational catalyst for profitability, sustainability, and adaptability."
  }
];

export const BASKET_COMPARISON_DATA: BasketComparisonItem[] = [
  {
    retailer: "TM Pick n Pay (Anchor Retailer)",
    basketTotalUSD: 83.40,
    varianceVsPnP: "Baseline (Lowest Total)",
    itemsFulfilled: "12 / 12 Items",
    statusBadge: "Best Value · Default Allocation",
    isAnchor: true
  },
  {
    retailer: "OK Zimbabwe",
    basketTotalUSD: 87.10,
    varianceVsPnP: "+US$3.70 (+4.4%)",
    itemsFulfilled: "12 / 12 Items",
    statusBadge: "Secondary Option",
    isAnchor: false
  },
  {
    retailer: "Spar Zimbabwe",
    basketTotalUSD: 89.50,
    varianceVsPnP: "+US$6.10 (+7.3%)",
    itemsFulfilled: "12 / 12 Items",
    statusBadge: "Premium Tier",
    isAnchor: false
  },
  {
    retailer: "Food Lovers Market",
    basketTotalUSD: 92.80,
    varianceVsPnP: "+US$9.40 (+11.3%)",
    itemsFulfilled: "11 / 12 Items (Partial)",
    statusBadge: "Specialty / Fresh Focus",
    isAnchor: false
  }
];

export const FLEET_SPECS = [
  { metric: "Fleet Size", value: "500 – 2,000 Units", detail: "Platform owned scooters and heavy-duty cargo e-tricycles" },
  { metric: "Rent-to-Buy Period", value: "12 Months", detail: "Riders pay daily lease installments until full asset ownership transfers" },
  { metric: "Asset Payback", value: "~5 Months", detail: "Capital cost recovered rapidly; months 6 to 12 generate direct profit" },
  { metric: "Post-Ownership Fee", value: "~10% Take Rate", detail: "Perpetual recurring platform connection fee per completed delivery" },
  { metric: "Livery Advertising", value: "80% TM PnP / 20% Open", detail: "Branded mobile billboards circulating across dense high-traffic routes" },
  { metric: "In-House Garage", value: "US$18 / month", detail: "Mandatory parts, battery swaps, and maintenance subscription plan" },
  { metric: "Rural Inclusivity", value: "E-Tricycle Cohorts", detail: "Specialized three-wheel cargo units piloted by women rider collectives" }
];

export const COMMERCIAL_OPTIONS = [
  {
    id: "option-1",
    name: "Option 1: Independent Concierge & Reseller",
    badge: "Fastest Execution · Zero Direct Retail Risk",
    setupFee: "TBA / Capitalized in Working Capital",
    commercialTake: "5–8% Gross Markup + 3–5% Wholesale Rebate",
    description: "The venture operates as an independent concierge entity mirroring TM Pick n Pay's catalog via high-throughput API. Diaspora and local shoppers pay in foreign currency; we purchase stock from TM PnP at wholesale discount and fulfill through our dedicated last-mile courier fleet.",
    tmPnPResponsibilities: [
      "Catalog and inventory data feed access via secure API",
      "Bulk wholesale pricing structure and dedicated store collection bays",
      "Wholesale volume rebates paid on monthly throughput thresholds"
    ],
    platformResponsibilities: [
      "Global multi-currency merchant processing and FX risk management",
      "Full last-mile fleet ownership, rider dispatch, and doorstep SLA guarantee",
      "Customer acquisition, diaspora marketing, and customer support operations"
    ],
    financialImplication: "TM PnP gains guaranteed incremental basket volume and foreign currency cash receipts with zero logistics overhead."
  },
  {
    id: "option-2",
    name: "Option 2: White-Label Software Licensing & Platform SaaS",
    badge: "Enterprise Integrated · Strategic Long-Term Moat",
    setupFee: "TBA / Enterprise Integration Scope",
    commercialTake: "1.5–2.0% GMV Revenue Share",
    description: "We deploy the complete cross-border storefront, data lake, intelligent dispatch, and rider application suite as a licensed white-label extension directly integrated into tmpnponline.co.zw and TM Pick n Pay's corporate ERP.",
    tmPnPResponsibilities: [
      "Direct brand ownership, customer relationship management, and promotion",
      "Integration into corporate banking facilities and merchant acquiring",
      "Contracting third-party or dedicated courier fleets using platform software"
    ],
    platformResponsibilities: [
      "Cloud platform maintenance, 99.9% uptime SLA, and security updates",
      "Continuous algorithmic optimization for basket comparison and dispatch",
      "Dedicated enterprise support, feature sprints, and data lake reporting"
    ],
    financialImplication: "Lowest marginal operating cost for TM PnP, establishing a proprietary digital ecosystem over a 5 to 10-year horizon (120 months)."
  }
];

export const ROADMAP_SPRINTS = [
  {
    sprint: "Sprint 01",
    duration: "Weeks 1 – 3",
    title: "Executive Alignment & Strategic Mandate",
    focus: "Governance & Architecture Consensus",
    deliverables: [
      "Finalize commercial model selection (Concierge vs. White-Label SaaS)",
      "Establish venture steering committee and executive reporting cadences",
      "Define regulatory, foreign exchange, and tax compliance frameworks"
    ]
  },
  {
    sprint: "Sprint 02",
    duration: "Weeks 4 – 7",
    title: "Field Mapping & Pilot Merchant Densification",
    focus: "Harare & Bulawayo Supply Hubs",
    deliverables: [
      "Deploy field discovery teams to map 500+ tuck-shops and spaza vendors",
      "Assess branch fulfillment capacity and staging bays at 2 flagship stores",
      "Onboard initial 50-rider electric scooter cohort and lease contracts"
    ]
  },
  {
    sprint: "Sprint 03",
    duration: "Weeks 8 – 11",
    title: "API Blueprinting & Secure Systems Integration",
    focus: "Data Lake, Payment Rails & ERP",
    deliverables: [
      "Connect real-time SKU inventory and pricing feeds from TM PnP ERP",
      "Deploy bank-agnostic multi-currency payment gateway and USDC fallback rails",
      "Implement real-time driver dispatch, SMS tracking, and proof-of-delivery"
    ]
  },
  {
    sprint: "60-Day Pilot",
    duration: "Months 3 – 4",
    title: "Live Operations across 2 Flagship Harare Branches",
    focus: "Controlled Market Validation",
    deliverables: [
      "Process 5,000+ live diaspora & local orders with sub-45 minute SLA",
      "Validate basket comparison algorithms and wholesale tuck-shop replenishment",
      "Audit unit economics, customer satisfaction (NPS > 75), and rider payback"
    ]
  },
  {
    sprint: "National Scale",
    duration: "Months 5 – 12+",
    title: "Rollout Across 74+ Store Estate & Regional Corridors",
    focus: "National Omnichannel Dominance",
    deliverables: [
      "Scale fleet to 1,500+ e-scooters across Bulawayo, Mutare, Gweru, and Masvingo",
      "Expand informal trader network to 3,500+ active B2B tuck-shops",
      "Commercialize FMCG Data Lake intelligence stream to top 40 brand partners"
    ]
  }
];
