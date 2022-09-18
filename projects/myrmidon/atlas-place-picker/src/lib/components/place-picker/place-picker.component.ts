import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import {
  AnyLayout,
  GeoJSONSourceRaw,
  LngLat,
  LngLatBounds,
  Map,
  MapMouseEvent,
  Marker,
  NavigationControl,
} from 'mapbox-gl';
import { take } from 'rxjs/operators';
import {
  AtlasApiService,
  LookupEntry,
  QuickSearchFilter,
  QuickSearchResult,
} from '../../services/atlas-api.service';
// https://www.npmjs.com/package/mapbox-gl-draw-rectangle-restrict-area
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import DrawRectangle, {
  DrawStyles,
} from 'mapbox-gl-draw-rectangle-restrict-area';
import { Flag } from '@myrmidon/cadmus-ui-flags-picker';
import { DataPage } from '@myrmidon/ng-tools';

/**
 * A place picked in the PlacePickerComponent.
 */
export interface PickedPlace {
  id: string;
  title: string;
  typeUri: string;
  typeLabel: string;
  point?: LngLat;
  payload?: any;
}

/**
 * Place picker component.
 */
@Component({
  selector: 'atlas-place-picker',
  templateUrl: './place-picker.component.html',
  styleUrls: ['./place-picker.component.css'],
})
export class PlacePickerComponent implements OnInit {
  private _map?: Map;
  private _rectDraw?: MapboxDraw;
  private _rendered?: boolean;

  public text: UntypedFormControl;
  public matchAny: UntypedFormControl;
  public type: UntypedFormControl;
  public scopes: UntypedFormControl;
  public yearMin: UntypedFormControl;
  public yearMax: UntypedFormControl;
  public rank: UntypedFormControl;

  public hasPoint: UntypedFormControl;
  public distLng: UntypedFormControl;
  public distLat: UntypedFormControl;
  public distMin: UntypedFormControl;
  public distMax: UntypedFormControl;

  public hasBox: UntypedFormControl;
  public boxSwLng: UntypedFormControl;
  public boxSwLat: UntypedFormControl;
  public boxNeLng: UntypedFormControl;
  public boxNeLat: UntypedFormControl;
  public boxContained: UntypedFormControl;

  public limit: UntypedFormControl;
  public form: UntypedFormGroup;

  public currentYear: number;
  public types?: LookupEntry[];
  public availScopes: Flag[];
  public limits: number[];

  public searching?: boolean;
  public currentPage: number;
  public page?: DataPage<QuickSearchResult>;
  public resultSource?: GeoJSON.FeatureCollection<GeoJSON.Point>;
  public rawResultSource?: GeoJSONSourceRaw;
  public labelLayout?: AnyLayout;
  public drawing: UntypedFormControl;
  public marker?: Marker;
  public boxId?: string;

  /**
   * Emitted when user picks a place.
   */
  @Output()
  public placePick: EventEmitter<QuickSearchResult>;

  /**
   * Emitted when user requests to close the picker.
   */
  @Output()
  public pickerClose: EventEmitter<any>;

  constructor(formBuilder: UntypedFormBuilder, private _apiService: AtlasApiService) {
    this.placePick = new EventEmitter<QuickSearchResult>();
    this.pickerClose = new EventEmitter<any>();
    this.currentYear = new Date().getFullYear();
    this.currentPage = 0;
    this.limits = [10, 20, 50, 75, 100];
    this.availScopes = [
      { id: 'plttl', label: 'place title' },
      { id: 'pldsc', label: 'place description' },
      { id: 'pldtl', label: 'place details' },
      { id: 'lcttl', label: 'location title' },
      { id: 'nmrmz', label: 'romanized name' },
      { id: 'nmatt', label: 'name attestation' },
      { id: 'nmdsc', label: 'name description' },
    ];
    // https://stackoverflow.com/questions/62343360/add-text-to-mapbox-marker
    this.labelLayout = {
      'text-field': ['get', 'title'],
      'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
      'text-radial-offset': 0.5,
      'text-justify': 'auto',
      'icon-image': ['concat', ['get', 'icon'], '-15'],
    };
    // form
    this.text = formBuilder.control(null, Validators.maxLength(500));
    this.matchAny = formBuilder.control(false);
    this.type = formBuilder.control(null);
    this.scopes = formBuilder.control(['plttl', 'lcttl', 'nmrmz']);
    this.yearMin = formBuilder.control(0);
    this.yearMax = formBuilder.control(0);
    this.rank = formBuilder.control(0);
    this.hasPoint = formBuilder.control(false);
    this.distMin = formBuilder.control(0);
    this.distMax = formBuilder.control(0);
    this.distLng = formBuilder.control(0);
    this.distLat = formBuilder.control(0);
    this.hasBox = formBuilder.control(false);
    this.boxSwLng = formBuilder.control(0);
    this.boxSwLat = formBuilder.control(0);
    this.boxNeLng = formBuilder.control(0);
    this.boxNeLat = formBuilder.control(0);
    this.boxContained = formBuilder.control(false);
    this.limit = formBuilder.control(20);
    this.form = formBuilder.group({
      text: this.text,
      matchAny: this.matchAny,
      type: this.type,
      scopes: this.scopes,
      yearMin: this.yearMin,
      yearMax: this.yearMax,
      rank: this.rank,
      hasPoint: this.hasPoint,
      distMin: this.distMin,
      distMax: this.distMax,
      distLng: this.distLng,
      distLat: this.distLat,
      hasBox: this.hasBox,
      boxSwLng: this.boxSwLng,
      boxSwLat: this.boxSwLat,
      boxNeLng: this.boxNeLng,
      boxNeLat: this.boxNeLat,
      boxContained: this.boxContained,
      limit: this.limit,
    });
    this.drawing = formBuilder.control(0);
  }

  ngOnInit(): void {
    this.toggleDist(false);
    this.toggleBox(false);

    this._apiService
      .getLookup({
        pageNumber: 1,
        pageSize: 0,
        prefix: 'https://pleiades.stoa.org/vocabularies/place-types/',
      })
      .pipe(take(1))
      .subscribe((page) => {
        this.types = page.items.filter((t) => t.shortName);
      });

    // spatial togglers:
    // when "has-point" changes, toggles its controls
    this.hasPoint.valueChanges.subscribe((value) => {
      this.toggleDist(value);
    });
    // when "has-box" changes, toggle its controls
    this.hasBox.valueChanges.subscribe((value) => {
      this.toggleBox(value);
    });
    // when draw mode changes, set map mode accordingly
    this.drawing.valueChanges.subscribe((value) => {
      if (value === 2) {
        // rect
        // https://www.npmjs.com/package/mapbox-gl-draw-rectangle-restrict-area
        this._rectDraw?.changeMode(
          'draw_rectangle' as any,
          {
            areaChangedCallback: (area: any) => {
              console.log(area);
            },
          } as any
        );
      } else {
        // normal or point
        this._rectDraw?.changeMode('simple_select');
      }
    });
  }

  private getShortType(type: string): string {
    if (!type) {
      return type;
    }
    const i = type.lastIndexOf('/');
    return i > -1 ? type.substring(i + 1) : type;
  }

  private getFilter(noReset: boolean): QuickSearchFilter {
    const filter: QuickSearchFilter = {
      pageNumber: noReset ? this.currentPage : 1,
      pageSize: this.limit.value,
      text: this.text.value?.trim(),
      placeType: this.type.value ? '/' + this.type.value : undefined,
      scopes: this.scopes.value?.length
        ? this.scopes.value.join(',')
        : undefined,
      yearMin: this.yearMin.value,
      yearMax: this.yearMax.value,
      rankMin: this.rank.value,
    };

    if (this.hasPoint.value) {
      filter.distanceLon = this.distLng.value;
      filter.distanceLat = this.distLat.value;
      filter.distanceMin = this.distMin.value;
      filter.distanceMax = this.distMax.value;
    }
    if (this.hasBox.value) {
      filter.swCornerLon = this.boxSwLng.value;
      filter.swCornerLat = this.boxSwLat.value;
      filter.neCornerLon = this.boxNeLng.value;
      filter.neCornerLat = this.boxNeLat.value;
      filter.containedInBox = this.boxContained.value;
    }
    return filter;
  }

  /**
   * Execute the search.
   * @param noReset False to avoid resetting page to 1.
   */
  public search(noReset = false): void {
    const filter = this.getFilter(noReset);
    this.searching = true;
    this._apiService
      .quickSearch(filter)
      .pipe(take(1))
      .subscribe(
        (page) => {
          this.searching = false;
          this.currentPage = page.pageNumber;
          this.page = page;
          // this.page = {
          //   ...page,
          //   items: page.items.map((r) => {
          //     return {
          //       id: r.id,
          //       title: r.title,
          //       typeUri: r.type,
          //       typeLabel: this.getShortType(r.type),
          //       point:
          //         r.rp_lon && r.rp_lat
          //           ? new LngLat(r.rp_lon, r.rp_lat)
          //           : undefined,
          //       payload: r,
          //     };
          //   }),
          // };
          this.setFeaturesFromPage();
        },
        (error) => {
          this.searching = false;
          console.error(error?.toString());
        }
      );
  }

  public onPageChange(event: PageEvent): void {
    // https://material.angular.io/components/paginator/api
    this.currentPage = event.pageIndex + 1;
    if (event.pageSize !== this.currentPage) {
      // when searching after a page change we must not reset page
      this.search(true);
    }
  }

  public onScopeChange(ids: string[]): void {
    this.scopes.setValue(ids);
  }

  //#region Spatial
  private toggleDist(enabled: boolean): void {
    if (enabled) {
      this.distMin.enable();
      this.distMax.enable();
      this.distLng.enable();
      this.distLat.enable();
    } else {
      this.distMin.disable();
      this.distMax.disable();
      this.distLng.disable();
      this.distLat.disable();
    }
  }

  private toggleBox(enabled: boolean): void {
    if (enabled) {
      this.boxSwLng.enable();
      this.boxSwLat.enable();
      this.boxNeLng.enable();
      this.boxNeLat.enable();
      this.boxContained.enable();
    } else {
      this.boxSwLng.disable();
      this.boxSwLat.disable();
      this.boxNeLng.disable();
      this.boxNeLat.disable();
      this.boxContained.disable();
    }
  }

  private getRectBounds(points: LngLat[]): LngLatBounds | null {
    // min lng,lat and max lng,lat
    const min = new LngLat(180, 90);
    const max = new LngLat(-180, -90);
    points.forEach((pt) => {
      // min
      if (min.lng > pt.lng) {
        min.lng = pt.lng;
      }
      if (min.lat > pt.lat) {
        min.lat = pt.lat;
      }
      // max
      if (max.lng < pt.lng) {
        max.lng = pt.lng;
      }
      if (max.lat < pt.lat) {
        max.lat = pt.lat;
      }
    });
    return new LngLatBounds(min, max);
  }

  private setFeaturesFromPage(): void {
    const features: GeoJSON.Feature<GeoJSON.Point>[] = [];
    if (this.page) {
      this.page.items
        .filter((r) => r.lat)
        .forEach((r) => {
          features.push({
            type: 'Feature',
            properties: {
              id: r.id,
              title: r.name,
            },
            geometry: {
              type: 'Point',
              coordinates: [r.lng || 0, r.lat || 0],
            },
          });
        });
    }
    // the markers source
    this.resultSource = {
      type: 'FeatureCollection',
      features: features,
    };
    // the markers labels source
    this.rawResultSource = {
      type: 'geojson',
      data: this.resultSource,
    };
    // fit to markers bounds
    if (this.page) {
      const pagePoints: LngLat[] = this.page.items
        .filter((r) => r.lat)
        .map((r) => new LngLat(r.lng!, r.lat!)) as LngLat[];
      const bounds = this.getRectBounds(pagePoints);
      if (bounds) {
        this._map?.fitBounds(bounds);
      }
    }
  }

  public onMapLoad(map: Map): void {
    this._map = map;
    // navigation
    this._map.addControl(new NavigationControl());
    // rectangle drawing
    this._rectDraw = new MapboxDraw({
      userProperties: true,
      displayControlsDefault: false,
      styles: DrawStyles,
      modes: Object.assign(MapboxDraw.modes, {
        draw_rectangle: DrawRectangle,
      }) as any,
    });
    map.addControl(this._rectDraw);
    map.on('draw.create', (feature) => {
      // a rectangle was drawn
      console.log(feature);
      this.boxId = feature.features[0].id;
      const rectPoints: LngLat[] =
        feature.features[0].geometry.coordinates[0].map(
          (a: number[]) => new LngLat(a[0], a[1])
        );
      const bounds = this.getRectBounds(rectPoints);
      if (bounds) {
        const sw = bounds.getSouthWest();
        const ne = bounds.getNorthEast();
        this.boxSwLng.setValue(sw.lng);
        this.boxSwLat.setValue(sw.lat);
        this.boxNeLng.setValue(ne.lng);
        this.boxNeLat.setValue(ne.lat);
        this.hasBox.setValue(true);
        // TODO
      }
    });
  }

  private updateDistancePt(point: LngLat): void {
    this.hasPoint.setValue(true);
    this.distLng.setValue(point.lng);
    this.distLat.setValue(point.lat);
  }

  public removeDistanceMarker(): void {
    if (this.marker) {
      this.marker.remove();
      this.marker = undefined;
    }
  }

  private onDistanceMarkerDragEnd(): void {
    this.updateDistancePt(this.marker!.getLngLat());
  }

  private addDistanceMarker(lngLat: LngLat): void {
    if (!this._map) {
      return;
    }
    this.removeDistanceMarker();
    this.marker = new Marker({
      color: '#F56476',
    });
    this.marker.setLngLat(lngLat);
    this.marker.setDraggable(true);
    this.marker.addTo(this._map);
    this.updateDistancePt(lngLat);
    // https://docs.mapbox.com/mapbox-gl-js/example/drag-a-marker/
    this.marker.on('dragend', () => this.onDistanceMarkerDragEnd);
    this.hasPoint.setValue(true);
  }

  public addDistanceMarkerFromPt(): void {
    this.removeDistanceMarker();
    this.addDistanceMarker(new LngLat(this.distLng.value, this.distLat.value));
  }

  public removeBox(): void {
    if (this.boxId) {
      // https://github.com/mapbox/mapbox-gl-draw/blob/main/docs/API.md
      this._rectDraw?.delete(this.boxId);
      this.boxId = undefined;
    }
  }

  public onMapClick(event: MapMouseEvent): void {
    if (!this._map || !event.lngLat) {
      return;
    }
    console.log(event.point);
    switch (this.drawing.value) {
      case 1: // point
        this.addDistanceMarker(event.lngLat);
        break;
      case 2: // box
        break;
    }
  }

  public onRender(event): void {
    // resize to fit container
    // https://github.com/Wykks/ngx-mapbox-gl/issues/344
    if (!this._rendered) {
      event.target.resize();
      this._rendered = true;
    }
  }
  //#endregion

  public onPlacePick(event: QuickSearchResult): void {
    this.placePick.emit(event);
  }

  public onPickerClose(): void {
    this.pickerClose.emit();
  }
}
