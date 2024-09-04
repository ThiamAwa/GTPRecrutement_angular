import { TestBed } from '@angular/core/testing';

import { MissionServiceService } from './mission-service.service';

describe('MissionServiceService', () => {
  let service: MissionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MissionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
