import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutOfOfficeSlot } from './out-of-office-slot';

describe('OutOfOfficeSlot', () => {
  let component: OutOfOfficeSlot;
  let fixture: ComponentFixture<OutOfOfficeSlot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutOfOfficeSlot],
    }).compileComponents();

    fixture = TestBed.createComponent(OutOfOfficeSlot);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
