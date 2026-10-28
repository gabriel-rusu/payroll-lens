import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComparisonOverview } from './comparison-overview.component';
import { defaultOffer } from '../../util/offer.defaults';

describe('ComparissonOverview', () => {
  let component: ComparisonOverview;
  let fixture: ComponentFixture<ComparisonOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComparisonOverview],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(ComparisonOverview);
    fixture.componentRef.setInput('offers', {
      positionAOffer: defaultOffer({ baseSalary: 9000 }),
      positionBOffer: defaultOffer({ baseSalary: 8000 }),
    });
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
