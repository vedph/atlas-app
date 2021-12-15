import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AtlasApiService } from '@myrmidon/atlas-place-picker';
import {
  RefLookupFilter,
  RefLookupService,
} from '@myrmidon/cadmus-refs-lookup';

/**
 * Lookup service adapter. This adapts the atlas API lookup service
 * to the generic Cadmus lookup service, used in a lookup control.
 */
@Injectable({
  providedIn: 'root',
})
export class AtlasRefLookupService implements RefLookupService {
  constructor(private _apiService: AtlasApiService) {}

  lookup(filter: RefLookupFilter): Observable<any[]> {
    return this._apiService
      .quickSearch({
        pageNumber: 1,
        pageSize: filter.limit,
        text: '*=' + filter.text,
        scopes: 'plttl'
      })
      .pipe(map((r) => r.items));
  }

  getName(item: any): string {
    return item?.name || '';
  }
}
