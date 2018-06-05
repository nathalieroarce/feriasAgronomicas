import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginMainViewComponent } from './login-main-view.component';

describe('LoginMainViewComponent', () => {
  let component: LoginMainViewComponent;
  let fixture: ComponentFixture<LoginMainViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginMainViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginMainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
