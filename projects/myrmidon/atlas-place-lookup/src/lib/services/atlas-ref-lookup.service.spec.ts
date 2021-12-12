import { TestBed } from '@angular/core/testing';

import { AtlasRefLookupService } from './atlas-ref-lookup.service';

describe('AtlasRefLookupService', () => {
  let service: AtlasRefLookupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtlasRefLookupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
