import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceHistoriqueComponent } from './device-historique.component';

describe('DeviceHistoriqueComponent', () => {
  let component: DeviceHistoriqueComponent;
  let fixture: ComponentFixture<DeviceHistoriqueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeviceHistoriqueComponent]
    });
    fixture = TestBed.createComponent(DeviceHistoriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
