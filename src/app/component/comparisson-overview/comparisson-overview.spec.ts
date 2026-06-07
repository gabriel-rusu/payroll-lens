import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparissonOverview } from './comparisson-overview';

describe('ComparissonOverview', () => {
  let component: ComparissonOverview;
  let fixture: ComponentFixture<ComparissonOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComparissonOverview],
    }).compileComponents();

    fixture = TestBed.createComponent(ComparissonOverview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
