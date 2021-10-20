import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// https://github.com/Wykks/ngx-mapbox-gl
import {
  MAPBOX_API_KEY, // ngx-mapbox-gl uses this injection token to provide the accessToken
  NgxMapboxGLModule,
} from 'ngx-mapbox-gl';

import { CadmusMaterialModule } from '@myrmidon/cadmus-material';
import { EnvServiceProvider, NgToolsModule } from '@myrmidon/ng-tools';

import { PlacePickerComponent } from './components/place-picker/place-picker.component';
import { CadmusUiFlagsPickerModule } from '@myrmidon/cadmus-ui-flags-picker';

export interface IAtlasPlacePickerModuleConfig {
  mapboxToken: string;
}

@NgModule({
  declarations: [PlacePickerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMapboxGLModule,
    NgToolsModule,
    CadmusMaterialModule,
    CadmusUiFlagsPickerModule
  ],
  exports: [PlacePickerComponent],
  providers: [EnvServiceProvider],
})
export class AtlasPlacePickerModule {
  // This function provides the MapBox token to the ngx-mapbox-gl module via
  // the MAPBOX_API_KEY injection token.
  static forRoot(
    config: IAtlasPlacePickerModuleConfig
  ): ModuleWithProviders<AtlasPlacePickerModule> {
    return {
      ngModule: AtlasPlacePickerModule,
      providers: [
        {
          provide: MAPBOX_API_KEY,
          useValue: config.mapboxToken,
        },
      ],
    };
  }
}
