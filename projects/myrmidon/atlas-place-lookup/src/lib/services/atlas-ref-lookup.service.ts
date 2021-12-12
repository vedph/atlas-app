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

  lookup<T>(filter: RefLookupFilter): Observable<T[]> {
    return this._apiService
      .quickSearch({
        pageNumber: 1,
        pageSize: filter.limit,
        text: filter.text,
      })
      .pipe(map((r) => r.items as unknown[] as T[]));
  }

  getName(item: any): string {
    return item?.name || '';
  }
}
