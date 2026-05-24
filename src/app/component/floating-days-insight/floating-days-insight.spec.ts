import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingDaysInsight } from './floating-days-insight';

describe('FloatingDaysInsight', () => {
  let component: FloatingDaysInsight;
  let fixture: ComponentFixture<FloatingDaysInsight>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloatingDaysInsight],
    }).compileComponents();

    fixture = TestBed.createComponent(FloatingDaysInsight);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
