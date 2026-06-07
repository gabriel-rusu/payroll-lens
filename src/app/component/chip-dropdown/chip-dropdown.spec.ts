import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipDropdown } from './chip-dropdown';

describe('ChipDropdown', () => {
  let component: ChipDropdown;
  let fixture: ComponentFixture<ChipDropdown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChipDropdown],
    }).compileComponents();

    fixture = TestBed.createComponent(ChipDropdown);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
