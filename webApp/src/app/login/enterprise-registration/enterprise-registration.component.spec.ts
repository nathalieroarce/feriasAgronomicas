import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseRegistrationComponent } from './enterprise-registration.component';

describe('EnterpriseRegistrationComponent', () => {
  let component: EnterpriseRegistrationComponent;
  let fixture: ComponentFixture<EnterpriseRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterpriseRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterpriseRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
