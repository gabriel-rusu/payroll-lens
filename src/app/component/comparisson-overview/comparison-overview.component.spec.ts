import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisonOverview } from './comparison-overview.component';

describe('ComparissonOverview', () => {
  let component: ComparisonOverview;
  let fixture: ComponentFixture<ComparisonOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComparisonOverview],
    }).compileComponents();

    fixture = TestBed.createComponent(ComparisonOverview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
