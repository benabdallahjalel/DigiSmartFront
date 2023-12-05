import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceupdateComponent } from './deviceupdate.component';

describe('DeviceupdateComponent', () => {
  let component: DeviceupdateComponent;
  let fixture: ComponentFixture<DeviceupdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeviceupdateComponent]
    });
    fixture = TestBed.createComponent(DeviceupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
