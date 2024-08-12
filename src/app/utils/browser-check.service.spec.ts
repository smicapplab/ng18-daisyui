import { TestBed } from '@angular/core/testing';

import { BrowserCheckService } from './browser-check.service';

describe('BrowserCheckService', () => {
  let service: BrowserCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrowserCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
