import { TestBed, inject } from '@angular/core/testing';

import { EnterpriseRegistrationService } from './enterprise-registration.service';
import { HttpModule } from '@angular/http';

describe('EnterpriseRegistrationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpModule],
      providers: [EnterpriseRegistrationService]
    });
  });

  it('should be created', inject([EnterpriseRegistrationService], (service: EnterpriseRegistrationService) => {
    expect(service).toBeTruthy();
  }));
});
