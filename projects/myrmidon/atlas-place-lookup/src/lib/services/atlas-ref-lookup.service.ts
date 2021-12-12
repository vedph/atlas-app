import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AtlasApiService } from '@myrmidon/atlas-place-picker';
import {
  RefLookupFilter,
  RefLookupService,
} from '@myrmidon/cadmus-refs-lookup';

@Injectable({
  providedIn: 'root',
})
export class AtlasRefLookupService implements RefLookupService {
  constructor(private _apiService: AtlasApiService) {}

  lookup<T>(filter: RefLookupFilter): Observable<T[]> {
    throw new Error('Method not implemented.');
  }

  getName(item: any): string {
    throw new Error('Method not implemented.');
  }
}
