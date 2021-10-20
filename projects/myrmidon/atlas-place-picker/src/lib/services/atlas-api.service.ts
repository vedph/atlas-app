import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { EnvService, ErrorService } from '@myrmidon/ng-tools';

/**
 * A page of data.
 */
export interface DataPage<T> {
  pageNumber: number;
  pageSize: number;
  pageCount: number;
  total: number;
  items: T[];
}

/**
 * A lookup data entry.
 */
export interface Lookup {
  id: number;
  group?: string;
  fullName: string;
  shortName?: string;
}

/**
 * Filter for lookup entries.
 */
export interface LookupFilter {
  pageNumber: number;
  pageSize: number;
  prefix?: string;
  shortName?: string;
  group?: string;
}

export interface SpatialFilter {
  pageNumber: number;
  pageSize: number;
  distanceMin?: number;
  distanceMax?: number;
  distanceLon?: number;
  distanceLat?: number;
  swCornerLon?: number;
  swCornerLat?: number;
  neCornerLon?: number;
  neCornerLat?: number;
  containedInBox?: boolean;
}

export interface QuickSearchFilter extends SpatialFilter {
  text?: string;
  matchAny?: boolean;
  placeType?: string;
  rankMin?: number;
  rankMax?: number;
  yearMin?: number;
  yearMax?: number;
  scopes?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AtlasApiService {
  constructor(
    private _http: HttpClient,
    private _error: ErrorService,
    private _env: EnvService
  ) {}

  public getLookup(filter: LookupFilter): Observable<DataPage<Lookup>> {
    let p = new HttpParams();
    p = p.set('pageNumber', filter.pageNumber.toString());
    p = p.set('pageSize', filter.pageSize.toString());

    if (filter.group) {
      p = p.set('group', filter.group);
    }
    if (filter.prefix) {
      p = p.set('prefix', filter.prefix);
    }
    if (filter.shortName) {
      p = p.set('shortName', filter.shortName);
    }

    const url = `${this._env.get('apiUrl')}lookup`;

    return this._http
      .get<DataPage<Lookup>>(url, {
        params: p,
      })
      .pipe(retry(3), catchError(this._error.handleError));
  }

  public quickSearch(filter: QuickSearchFilter): Observable<DataPage<any>> {
    const url = `${this._env.get('apiUrl')}qsearch`;

    return this._http
      .post<DataPage<Lookup>>(url, filter)
      .pipe(retry(3), catchError(this._error.handleError));
  }
}
