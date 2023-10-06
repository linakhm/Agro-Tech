import { TestBed } from '@angular/core/testing';

import { ExternaltransfersService } from './externaltransfers.service';

describe('ExternaltransfersService', () => {
  let service: ExternaltransfersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExternaltransfersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
