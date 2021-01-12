import { TestBed } from '@angular/core/testing';

import { FlickrApiService } from './flickr-api.service';

describe('FlickrApiService', () => {
  let service: FlickrApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlickrApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
