import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceListeComponent } from './device-liste.component';

describe('DeviceListeComponent', () => {
  let component: DeviceListeComponent;
  let fixture: ComponentFixture<DeviceListeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeviceListeComponent]
    });
    fixture = TestBed.createComponent(DeviceListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
