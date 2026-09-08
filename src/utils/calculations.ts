import { FinancialModelScenario } from '../types';

export interface CalculatedFinancials {
  grossRetailGMV: number;
  totalOrdersPerYear: number;
  lastMileDeliveryFees: number;
  crossBorderCardSurcharge: number;
  diasporaMembershipsAnnual: number;
  retailMediaNetworkRevenue: number;
  phase1GrossThroughput: number;

  tenantPlatformFeesAnnual: number;
  riderPlansAnnual: number;
  garageMaintenanceAnnual: number;
  dataIntelligenceAnnual: number;
  shopperPlansAnnual: number;
  tuckShopTradingAppAnnual: number;
  phase2SubscriptionsSubtotal: number;

  combinedAnnualEcosystemGross: number;

  // Commercial model yields
  whiteLabelAnnualRevenue: number;
  resellerGrossMarkupRevenue: number;
  resellerRebateRevenue: number;
  resellerTotalYield: number;
}

export function computeFinancials(params: FinancialModelScenario): CalculatedFinancials {
  const totalOrdersPerYear = params.activeDiasporaFamilies * params.ordersPerYear;
  const grossRetailGMV = params.activeDiasporaFamilies * params.averageBasketUSD * params.ordersPerYear;
  
  const lastMileDeliveryFees = totalOrdersPerYear * params.deliveryFeeUSD;
  const crossBorderCardSurcharge = grossRetailGMV * (params.cardSurchargePercent / 100);
  const diasporaMembershipsAnnual = params.diasporaMembershipsCount * params.diasporaMembershipFeeMonthly * 12;
  const retailMediaNetworkRevenue = grossRetailGMV * (params.retailMediaNetworkPercent / 100);

  const phase1GrossThroughput = grossRetailGMV + lastMileDeliveryFees + crossBorderCardSurcharge + diasporaMembershipsAnnual + retailMediaNetworkRevenue;

  const tenantPlatformFeesAnnual = params.tenantPlatformCount * params.tenantPlatformFeeMonthly * 12;
  const riderPlansAnnual = params.riderCount * params.riderPlanFeeMonthly * 12;
  const garageMaintenanceAnnual = params.garageMaintenanceCount * params.garageMaintenanceFeeMonthly * 12;
  const dataIntelligenceAnnual = params.dataIntelligenceLicenses * params.dataIntelligenceFeeMonthly * 12;
  const shopperPlansAnnual = params.shopperSubscribersCount * params.shopperPlanFeeMonthly * 12;
  const tuckShopTradingAppAnnual = params.tuckShopSubscribersCount * params.tuckShopFeeMonthly * 12;

  const phase2SubscriptionsSubtotal = tenantPlatformFeesAnnual + riderPlansAnnual + garageMaintenanceAnnual + dataIntelligenceAnnual + shopperPlansAnnual + tuckShopTradingAppAnnual;

  const combinedAnnualEcosystemGross = phase1GrossThroughput + phase2SubscriptionsSubtotal;

  const whiteLabelAnnualRevenue = grossRetailGMV * (params.whiteLabelTakeRatePercent / 100);
  const resellerGrossMarkupRevenue = grossRetailGMV * (params.resellerMarkupPercent / 100);
  const resellerRebateRevenue = grossRetailGMV * (params.resellerRebatePercent / 100);
  const resellerTotalYield = resellerGrossMarkupRevenue + resellerRebateRevenue;

  return {
    grossRetailGMV,
    totalOrdersPerYear,
    lastMileDeliveryFees,
    crossBorderCardSurcharge,
    diasporaMembershipsAnnual,
    retailMediaNetworkRevenue,
    phase1GrossThroughput,

    tenantPlatformFeesAnnual,
    riderPlansAnnual,
    garageMaintenanceAnnual,
    dataIntelligenceAnnual,
    shopperPlansAnnual,
    tuckShopTradingAppAnnual,
    phase2SubscriptionsSubtotal,

    combinedAnnualEcosystemGross,

    whiteLabelAnnualRevenue,
    resellerGrossMarkupRevenue,
    resellerRebateRevenue,
    resellerTotalYield,
  };
}

export function formatUSD(amount: number, compact: boolean = false): string {
  if (compact) {
    if (amount >= 1_000_000) {
      return `$${(amount / 1_000_000).toFixed(2)}M`;
    }
    if (amount >= 1_000) {
      return `$${(amount / 1_000).toFixed(1)}k`;
    }
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}
