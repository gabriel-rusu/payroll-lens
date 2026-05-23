import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacationPlanner } from './vacation-planner';

describe('VacationPlanner', () => {
  let component: VacationPlanner;
  let fixture: ComponentFixture<VacationPlanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VacationPlanner],
    }).compileComponents();

    fixture = TestBed.createComponent(VacationPlanner);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
