import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayadminComponent } from './displayadmin.component';

describe('DisplayadminComponent', () => {
  let component: DisplayadminComponent;
  let fixture: ComponentFixture<DisplayadminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayadminComponent]
    });
    fixture = TestBed.createComponent(DisplayadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
