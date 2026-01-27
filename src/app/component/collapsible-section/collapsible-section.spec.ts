import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapsibleSection } from './collapsible-section';

describe('CollapsibleSection', () => {
  let component: CollapsibleSection;
  let fixture: ComponentFixture<CollapsibleSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollapsibleSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollapsibleSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
