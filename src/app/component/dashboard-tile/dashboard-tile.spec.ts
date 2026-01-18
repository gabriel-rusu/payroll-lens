import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTile } from './dashboard-tile';

describe('DashboardTile', () => {
  let component: DashboardTile;
  let fixture: ComponentFixture<DashboardTile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardTile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardTile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
