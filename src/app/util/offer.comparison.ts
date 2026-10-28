import { ComparisonCategory, OfferOverview } from '../model/offer.overview';
import { FinalOfferOverview } from '../model/final.offer.overview';

type Wins = OfferOverview['wins'];

// Higher score wins the category
const scores: Record<ComparisonCategory, (offer: OfferOverview) => number> = {
  baseCompensation: (offer) => Math.round(offer.baseCompensation),
  takeHomePay: (offer) => Math.round(offer.takeHomePay),
  perks: (offer) => offer.perks.length,
  workPolicy: (offer) => -offer.onSiteWorkDays,
  pto: (offer) => offer.pto,
};

const moneyCategories: ComparisonCategory[] = ['baseCompensation', 'takeHomePay'];

/**
 * Marks which offer wins each category and overall: most categories won takes it,
 * a tie goes to the higher take home pay. Money is only compared when both offers
 * are in the same currency.
 */
export function compareOffers(offerA: OfferOverview, offerB: OfferOverview): FinalOfferOverview {
  const comparableMoney = offerA.baseCompensationCurrency == offerB.baseCompensationCurrency;
  const categories = (Object.keys(scores) as ComparisonCategory[]).filter(
    (category) => comparableMoney || !moneyCategories.includes(category),
  );

  const winsA: Wins = {};
  const winsB: Wins = {};
  for (const category of categories) {
    const scoreA = scores[category](offerA);
    const scoreB = scores[category](offerB);
    winsA[category] = scoreA > scoreB;
    winsB[category] = scoreB > scoreA;
  }

  let totalA = countWins(winsA);
  let totalB = countWins(winsB);
  if (totalA == totalB) {
    totalA += Number(winsA.takeHomePay ?? false);
    totalB += Number(winsB.takeHomePay ?? false);
  }

  return {
    offerA: { ...offerA, wins: winsA, isWinner: totalA > totalB, ...deltas(offerA, offerB, comparableMoney) },
    offerB: { ...offerB, wins: winsB, isWinner: totalB > totalA, ...deltas(offerB, offerA, comparableMoney) },
  };
}

function countWins(wins: Wins) {
  return Object.values(wins).filter(Boolean).length;
}

function deltas(offer: OfferOverview, other: OfferOverview, comparableMoney: boolean) {
  if (!comparableMoney) {
    return {};
  }
  return {
    baseCompensationDelta: offer.baseCompensation - other.baseCompensation,
    takeHomePayDelta: offer.takeHomePay - other.takeHomePay,
  };
}
