import { TestBed } from '@angular/core/testing';

import { GrowoutService } from './growout.service';

describe('GrowoutService', () => {
  let service: GrowoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrowoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
