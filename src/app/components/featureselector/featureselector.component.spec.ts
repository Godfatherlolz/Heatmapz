import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureselectorComponent } from './featureselector.component';

describe('FeatureselectorComponent', () => {
  let component: FeatureselectorComponent;
  let fixture: ComponentFixture<FeatureselectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureselectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureselectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
