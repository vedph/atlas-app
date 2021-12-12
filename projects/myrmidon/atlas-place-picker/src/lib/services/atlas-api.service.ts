import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { DataPage, EnvService, ErrorService } from '@myrmidon/ng-tools';

/**
 * A lookup data entry.
 */
export interface LookupEntry {
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

export interface QuickSearchResult {
  id: string;
  uriPrefix: string;
  name: string;
  type?: string;
  lat?: number;
  lng?: number;
  payload?: any;
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

  public getLookup(filter: LookupFilter): Observable<DataPage<LookupEntry>> {
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
      .get<DataPage<LookupEntry>>(url, {
        params: p,
      })
      .pipe(retry(3), catchError(this._error.handleError));
  }

  public quickSearch(
    filter: QuickSearchFilter
  ): Observable<DataPage<QuickSearchResult>> {
    const url = `${this._env.get('apiUrl')}qsearch`;

    let p = new HttpParams();
    p = p.set('pageNumber', filter.pageNumber.toString());
    p = p.set('pageSize', filter.pageSize.toString());

    if (filter.distanceMin) {
      p = p.set('distanceMin', filter.distanceMin.toString());
    }
    if (filter.distanceMax) {
      p = p.set('distanceMax', filter.distanceMax.toString());
    }
    if (filter.distanceLon) {
      p = p.set('distanceLon', filter.distanceLon.toString());
    }
    if (filter.distanceLat) {
      p = p.set('distanceLat', filter.distanceLat.toString());
    }
    if (filter.swCornerLon) {
      p = p.set('swCornerLon', filter.swCornerLon.toString());
    }
    if (filter.swCornerLat) {
      p = p.set('swCornerLat', filter.swCornerLat.toString());
    }
    if (filter.neCornerLon) {
      p = p.set('neCornerLon', filter.neCornerLon.toString());
    }
    if (filter.neCornerLat) {
      p = p.set('neCornerLat', filter.neCornerLat.toString());
    }
    if (filter.containedInBox) {
      p = p.set('containedInBox', 'true');
    }
    if (filter.text) {
      p = p.set('text', filter.text);
    }
    if (filter.matchAny) {
      p = p.set('matchAny', 'true');
    }
    if (filter.placeType) {
      p = p.set('placeType', filter.placeType);
    }
    if (filter.rankMin) {
      p = p.set('rankMin', filter.rankMin.toString());
    }
    if (filter.rankMax) {
      p = p.set('rankMax', filter.rankMax.toString());
    }
    if (filter.yearMin) {
      p = p.set('yearMin', filter.yearMin.toString());
    }
    if (filter.yearMax) {
      p = p.set('yearMax', filter.yearMax.toString());
    }
    if (filter.scopes) {
      p = p.set('scopes', filter.scopes);
    }

    return this._http
      .get<DataPage<QuickSearchResult>>(url, {
        params: p,
      })
      .pipe(retry(3), catchError(this._error.handleError));
  }
}
