import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CadmusMaterialModule } from '@myrmidon/cadmus-material';
import { EnvServiceProvider } from '@myrmidon/ng-tools';
import { CadmusRefsLookupModule } from '@myrmidon/cadmus-refs-lookup';

import { AtlasPlacePickerModule } from 'projects/myrmidon/atlas-place-picker/src/public-api';
import { AtlasPlaceLookupModule } from 'projects/myrmidon/atlas-place-lookup/src/public-api';

import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PlacePickerPgComponent } from './components/place-picker-pg/place-picker-pg.component';
import { PlaceLookupPgComponent } from './components/place-lookup-pg/place-lookup-pg.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, PlacePickerPgComponent, PlaceLookupPgComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxMapboxGLModule,
    AtlasPlacePickerModule.forRoot({ mapboxToken: environment.mapboxToken }),
    AtlasPlaceLookupModule,
    BrowserAnimationsModule,
    // material
    FlexLayoutModule,
    CadmusMaterialModule,
    CadmusRefsLookupModule
  ],
  providers: [EnvServiceProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
