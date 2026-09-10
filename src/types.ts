export interface FinancialModelScenario {
  activeDiasporaFamilies: number;
  averageBasketUSD: number;
  ordersPerYear: number;
  deliveryFeeUSD: number;
  cardSurchargePercent: number;
  diasporaMembershipsCount: number;
  diasporaMembershipFeeMonthly: number;
  retailMediaNetworkPercent: number;
  tenantPlatformCount: number;
  tenantPlatformFeeMonthly: number;
  riderCount: number;
  riderPlanFeeMonthly: number;
  garageMaintenanceCount: number;
  garageMaintenanceFeeMonthly: number;
  dataIntelligenceLicenses: number;
  dataIntelligenceFeeMonthly: number;
  shopperSubscribersCount: number;
  shopperPlanFeeMonthly: number;
  tuckShopSubscribersCount: number;
  tuckShopFeeMonthly: number;
  whiteLabelTakeRatePercent: number;
  resellerMarkupPercent: number;
  resellerRebatePercent: number;
}

export interface ProposalSection {
  id: string;
  pageNumber: number;
  title: string;
  category: string;
  summary: string;
}

export interface BasketComparisonItem {
  retailer: string;
  basketTotalUSD: number;
  varianceVsPnP: string;
  itemsFulfilled: string;
  statusBadge: string;
  isAnchor: boolean;
}

export interface PillarDetail {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  strategicImpact: string;
}

export interface FleetSpec {
  metric: string;
  value: string;
  detail: string;
}

export interface LibraryItem {
  id: string;
  title: string;
  type: 'audio' | 'transcript' | 'pdf' | 'document' | 'presentation';
  category: string;
  date: string;
  size?: string;
  duration?: string;
  content?: string;
  audioUrl?: string;
  transcriptText?: string;
}

export interface DraftEdit {
  id: string;
  title: string;
  targetDocument: string;
  content: string;
  createdAt: string;
  status: 'draft' | 'applied';
}

