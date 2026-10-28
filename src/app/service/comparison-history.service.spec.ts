import { TestBed } from '@angular/core/testing';
import { ComparisonHistoryService } from './comparison-history.service';
import { defaultOffer } from '../util/offer.defaults';
import { FinalOffer } from '../model/offer-comparison';

const comparison = (jobTitle: string): FinalOffer => ({
  positionAOffer: defaultOffer({ jobTitle }),
  positionBOffer: defaultOffer(),
});

describe('ComparisonHistoryService', () => {
  const create = () => TestBed.inject(ComparisonHistoryService);

  beforeEach(() => {
    localStorage.clear();
    TestBed.resetTestingModule();
  });

  it('saves new comparisons newest first and persists them', () => {
    const history = create();
    history.save(comparison('First'));
    history.save(comparison('Second'));

    expect(history.comparisons().map((saved) => saved.offers.positionAOffer.jobTitle)).toEqual([
      'Second',
      'First',
    ]);
    expect(JSON.parse(localStorage.getItem('saved-comparisons')!)).toHaveLength(2);
  });

  it('updates a comparison in place when saved with its id', () => {
    const history = create();
    const id = history.save(comparison('Draft'));
    history.save(comparison('Final'), id);

    expect(history.comparisons()).toHaveLength(1);
    expect(history.find(id)?.offers.positionAOffer.jobTitle).toBe('Final');
  });

  it('deletes a comparison', () => {
    const history = create();
    const id = history.save(comparison('Gone'));
    history.remove(id);

    expect(history.comparisons()).toEqual([]);
    expect(JSON.parse(localStorage.getItem('saved-comparisons')!)).toEqual([]);
  });

  it('migrates distinct legacy saves and drops the old key', () => {
    localStorage.setItem(
      'offer-comparison',
      JSON.stringify([comparison('Old'), comparison('Old'), comparison('Newer')]),
    );
    const history = create();

    expect(history.comparisons().map((saved) => saved.offers.positionAOffer.jobTitle)).toEqual([
      'Newer',
      'Old',
    ]);
    expect(localStorage.getItem('offer-comparison')).toBeNull();
  });
});
