import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorlistComponent } from './sensorlist.component';

describe('SensorlistComponent', () => {
  let component: SensorlistComponent;
  let fixture: ComponentFixture<SensorlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SensorlistComponent]
    });
    fixture = TestBed.createComponent(SensorlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
