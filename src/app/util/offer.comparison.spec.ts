import { compareOffers } from './offer.comparison';
import { buildOfferOverview, computePay, onSiteWorkDays } from './offer.calculations';
import { defaultOffer } from './offer.defaults';
import { Currency, Frequency, IncomeType, TaxOrder, TaxType, WorkPolicy } from './constants';
import { Tax } from '../model/tax';

const taxes = [
  new Tax('Social insurance', 'CAS', TaxType.EMPLOYEE, 25, TaxOrder.GROSS, 0),
  new Tax('Health insurance', 'CASS', TaxType.EMPLOYEE, 10, TaxOrder.GROSS, 0),
  new Tax('Income tax', 'PIT', TaxType.EMPLOYEE, 10, TaxOrder.REMAINING, 0),
];

describe('computePay', () => {
  it('derives monthly gross from a monthly net salary', () => {
    const pay = computePay(defaultOffer({ baseSalary: 5850, salaryType: IncomeType.NET }), taxes);
    expect(pay.takeHomePay).toBeCloseTo(5850);
    expect(pay.baseCompensation).toBeCloseTo(10000);
  });

  it('adds a yearly bonus of one monthly salary as a twelfth per month', () => {
    const pay = computePay(
      defaultOffer({ baseSalary: 6000, salaryType: IncomeType.NET, annualBonusPercentage: 100 }),
      taxes,
    );
    expect(pay.takeHomePay).toBeCloseTo(6000 + 6000 / 12);
  });

  it('reports annual salaries per month with the bonus spread across months', () => {
    const pay = computePay(
      defaultOffer({
        baseSalary: 120000,
        salaryType: IncomeType.GROSS,
        frequency: Frequency.Annually,
        annualBonusPercentage: 10,
      }),
      taxes,
    );
    expect(pay.baseCompensation).toBeCloseTo(10000 * (1 + 0.1 / 12));
    expect(pay.takeHomePay).toBeCloseTo(5850 * (1 + 0.1 / 12));
  });
});

describe('onSiteWorkDays', () => {
  it('follows the work policy', () => {
    expect(onSiteWorkDays(defaultOffer({ workPolicy: WorkPolicy.Remote, onSiteWorkDays: 3 }))).toBe(0);
    expect(onSiteWorkDays(defaultOffer({ workPolicy: WorkPolicy.OnSite, onSiteWorkDays: 3 }))).toBe(5);
    expect(onSiteWorkDays(defaultOffer({ workPolicy: WorkPolicy.Hybrid, onSiteWorkDays: 2 }))).toBe(2);
  });
});

describe('buildOfferOverview', () => {
  const euroOffer = defaultOffer({ baseSalary: 1000, salaryCurrency: Currency.EURO });

  it('converts into the comparison currency when a rate is known', () => {
    const overview = buildOfferOverview(euroOffer, [], Currency.RON, { [Currency.EURO]: 5 });
    expect(overview.baseCompensationCurrency).toBe(Currency.RON);
    expect(overview.takeHomePay).toBeCloseTo(5000);
    expect(overview.baseCompensationNote).toContain('converted from EUR');
  });

  it('keeps the offer currency when no rate is known', () => {
    const overview = buildOfferOverview(euroOffer, [], Currency.RON, {});
    expect(overview.baseCompensationCurrency).toBe(Currency.EURO);
    expect(overview.takeHomePay).toBeCloseTo(1000);
  });
});

describe('compareOffers', () => {
  const overview = (overrides: Parameters<typeof defaultOffer>[0], currency = Currency.RON) =>
    buildOfferOverview(defaultOffer(overrides), [], currency, {});

  it('picks the offer winning the most categories', () => {
    const { offerA, offerB } = compareOffers(
      overview({ baseSalary: 9000 }),
      overview({
        baseSalary: 8000,
        vacationDays: 28,
        workPolicy: WorkPolicy.Remote,
        perks: [{ name: 'Gym membership' }, { name: 'Food credit' }],
      }),
    );
    expect(offerA.wins).toMatchObject({ baseCompensation: true, takeHomePay: true, pto: false });
    expect(offerB.wins).toMatchObject({ perks: true, workPolicy: true, pto: true });
    expect(offerA.isWinner).toBe(false);
    expect(offerB.isWinner).toBe(true);
  });

  it('breaks a tie on take home pay', () => {
    // A wins both pay categories, B wins work policy and PTO, perks are even
    const { offerA, offerB } = compareOffers(
      overview({ baseSalary: 9000 }),
      overview({ baseSalary: 8000, vacationDays: 28, workPolicy: WorkPolicy.Remote }),
    );
    expect(offerA.isWinner).toBe(true);
    expect(offerB.isWinner).toBe(false);
  });

  it('reports pay deltas', () => {
    const { offerA, offerB } = compareOffers(overview({ baseSalary: 9000 }), overview({ baseSalary: 8000 }));
    expect(offerA.takeHomePayDelta).toBeCloseTo(1000);
    expect(offerB.takeHomePayDelta).toBeCloseTo(-1000);
  });

  it('skips money categories across currencies', () => {
    const { offerA, offerB } = compareOffers(
      overview({ baseSalary: 9000 }),
      overview({ baseSalary: 100, salaryCurrency: Currency.EURO }, Currency.RON),
    );
    expect(offerA.wins.takeHomePay).toBeUndefined();
    expect(offerA.takeHomePayDelta).toBeUndefined();
    expect(offerA.isWinner || offerB.isWinner).toBe(false);
  });

  it('declares no winner for identical offers', () => {
    const { offerA, offerB } = compareOffers(overview({}), overview({}));
    expect(offerA.isWinner).toBe(false);
    expect(offerB.isWinner).toBe(false);
  });
});
