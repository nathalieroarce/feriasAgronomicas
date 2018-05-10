import { TestBed, inject } from '@angular/core/testing';

import { ProductsManagementService } from './products-management.service';

describe('ProductsManagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductsManagementService]
    });
  });

  it('should be created', inject([ProductsManagementService], (service: ProductsManagementService) => {
    expect(service).toBeTruthy();
  }));
});
