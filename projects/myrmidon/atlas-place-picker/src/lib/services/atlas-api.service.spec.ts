import { TestBed } from '@angular/core/testing';

import { AtlasApiService } from './atlas-api.service';

describe('AtlasApiService', () => {
  let service: AtlasApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtlasApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
