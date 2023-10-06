import { TestBed } from '@angular/core/testing';

import { BeginninginventoryService } from './beginninginventory.service';

describe('BeginninginventoryService', () => {
  let service: BeginninginventoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeginninginventoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
