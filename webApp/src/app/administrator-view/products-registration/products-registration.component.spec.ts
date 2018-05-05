import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsRegistrationComponent } from './products-registration.component';

describe('ProductsRegistrationComponent', () => {
  let component: ProductsRegistrationComponent;
  let fixture: ComponentFixture<ProductsRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
