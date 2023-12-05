import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCountComponent } from './client-count.component';

describe('ClientCountComponent', () => {
  let component: ClientCountComponent;
  let fixture: ComponentFixture<ClientCountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientCountComponent]
    });
    fixture = TestBed.createComponent(ClientCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
