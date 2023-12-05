import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuFooterButtonsComponent } from './menu-footer-buttons.component';

describe('MenuFooterButtonsComponent', () => {
  let component: MenuFooterButtonsComponent;
  let fixture: ComponentFixture<MenuFooterButtonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuFooterButtonsComponent]
    });
    fixture = TestBed.createComponent(MenuFooterButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
