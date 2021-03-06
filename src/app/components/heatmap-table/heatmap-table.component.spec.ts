import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatmapTableComponent } from './heatmap-table.component';

describe('HeatmapTableComponent', () => {
  let component: HeatmapTableComponent;
  let fixture: ComponentFixture<HeatmapTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeatmapTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeatmapTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
