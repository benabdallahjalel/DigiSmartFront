import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorListeComponent } from './sensor-liste.component';

describe('SensorListeComponent', () => {
  let component: SensorListeComponent;
  let fixture: ComponentFixture<SensorListeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SensorListeComponent]
    });
    fixture = TestBed.createComponent(SensorListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
