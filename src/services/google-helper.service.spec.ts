import { TestBed } from '@angular/core/testing';

import { GoogleHelperService } from './google-helper.service';

describe('GoogleHelperService', () => {
  let service: GoogleHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
