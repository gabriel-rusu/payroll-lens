import { Offer } from '../model/offer';
import { OfferOverview } from '../model/offer.overview';
import { Tax } from '../model/tax';
import { Income } from '../model/income';
import { ConversionRates } from '../model/exchange.rate';
import { CalculatorFactory } from '../strategy/calculator.factory';
import { formatMoney } from '../pipe/money.pipe';
import { Currency, CurrencyIsoCode, Frequency, WorkPolicy } from './constants';

// Monthly gross and net in the offer's own currency. The bonus is a percentage of one monthly salary,
// paid once a year, so it adds a twelfth of that per month (100% adds salary / 12).
export function computePay(offer: Offer, taxes: Tax[]) {
  const monthlySalary =
    offer.frequency == Frequency.Annually ? offer.baseSalary / 12 : offer.baseSalary;
  const income = CalculatorFactory.get(offer.salaryType).computeTaxRates(
    new Income('', '', monthlySalary, ''),
    taxes,
  );
  const bonusFactor = 1 + offer.annualBonusPercentage / 100 / 12;

  return {
    baseCompensation: income.grossIncome * bonusFactor,
    takeHomePay: income.netIncome * bonusFactor,
  };
}

export function onSiteWorkDays(offer: Offer): number {
  switch (offer.workPolicy) {
    case WorkPolicy.Remote:
      return 0;
    case WorkPolicy.OnSite:
      return 5;
    default:
      return offer.onSiteWorkDays ?? 0;
  }
}

// Money is expressed in `currency` when a rate is known, otherwise it stays in the offer's own currency
export function buildOfferOverview(
  offer: Offer,
  taxes: Tax[],
  currency: Currency,
  rates: ConversionRates,
): OfferOverview {
  const pay = computePay(offer, taxes);
  const rate = offer.salaryCurrency == currency ? 1 : rates[offer.salaryCurrency];
  const converted = rate != null && offer.salaryCurrency != currency;

  return {
    jobTitle: offer.jobTitle,
    companyName: offer.companyName,
    baseCompensation: pay.baseCompensation * (rate ?? 1),
    baseCompensationCurrency: rate != null ? currency : offer.salaryCurrency,
    baseCompensationNote: baseCompensationNote(offer, converted),
    takeHomePay: pay.takeHomePay * (rate ?? 1),
    takeHomePayNote: takeHomePayNote(offer),
    workPolicy: offer.workPolicy,
    onSiteWorkDays: onSiteWorkDays(offer),
    perks: offer.perks ?? [],
    pto: offer.vacationDays,
    isWinner: false,
    wins: {},
  };
}

function baseCompensationNote(offer: Offer, converted: boolean) {
  let note = 'Monthly gross';
  if (offer.annualBonusPercentage > 0) {
    note += ` incl. ${offer.annualBonusPercentage}% bonus`;
  }
  if (converted) {
    note += ` · converted from ${CurrencyIsoCode[offer.salaryCurrency]}`;
  }
  return note;
}

function takeHomePayNote(offer: Offer) {
  const note = 'Monthly net with annual bonus included';
  if (!(offer.equity > 0)) {
    return note;
  }
  const months = offer.vestingPeriod * 12;
  const monthlyEquity = offer.equity / months;
  return (
    note +
    `, plus ~${formatMoney(monthlyEquity, offer.equityCurrency)}/month pre tax` +
    ` (~${formatMoney(monthlyEquity * 0.9, offer.equityCurrency)} after tax) from equity over the first ${months} months`
  );
}
