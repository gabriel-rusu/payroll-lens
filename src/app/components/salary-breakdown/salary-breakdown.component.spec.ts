import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryBreakdownComponent } from './salary-breakdown.component';

describe('SalaryBreakdownComponent', () => {
  let component: SalaryBreakdownComponent;
  let fixture: ComponentFixture<SalaryBreakdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalaryBreakdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalaryBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
