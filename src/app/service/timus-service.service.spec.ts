import { TestBed, inject } from '@angular/core/testing';

import { TimusServiceService } from './timus-service.service';

describe('TimusServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimusServiceService]
    });
  });

  it('should be created', inject([TimusServiceService], (service: TimusServiceService) => {
    expect(service).toBeTruthy();
  }));
});
