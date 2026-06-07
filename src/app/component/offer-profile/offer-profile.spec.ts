import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferProfile } from './offer-profile';

describe('OfferProfile', () => {
  let component: OfferProfile;
  let fixture: ComponentFixture<OfferProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfferProfile],
    }).compileComponents();

    fixture = TestBed.createComponent(OfferProfile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
