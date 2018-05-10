import { TestBed, inject } from '@angular/core/testing';

import { EnterpriseRegistrationService } from './enterprise-registration.service';

describe('EnterpriseRegistrationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnterpriseRegistrationService]
    });
  });

  it('should be created', inject([EnterpriseRegistrationService], (service: EnterpriseRegistrationService) => {
    expect(service).toBeTruthy();
  }));
});
