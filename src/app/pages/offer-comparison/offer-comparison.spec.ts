import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferComparison } from './offer-comparison';

describe('OfferComparison', () => {
  let component: OfferComparison;
  let fixture: ComponentFixture<OfferComparison>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfferComparison],
    }).compileComponents();

    fixture = TestBed.createComponent(OfferComparison);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
