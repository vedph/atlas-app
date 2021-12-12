import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CadmusMaterialModule } from '@myrmidon/cadmus-material';
import { RouterModule } from '@angular/router';
import { EnvServiceProvider } from '@myrmidon/ng-tools';
import { CadmusRefsLookupModule } from '@myrmidon/cadmus-refs-lookup';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AtlasPlacePickerModule } from 'projects/myrmidon/atlas-place-picker/src/public-api';
import { HomeComponent } from './components/home/home.component';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxMapboxGLModule,
    AtlasPlacePickerModule.forRoot({ mapboxToken: environment.mapboxToken }),
    BrowserAnimationsModule,
    RouterModule.forRoot(
      [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', component: HomeComponent },
      ],
      // {
      //   initialNavigation: 'enabled',
      //   useHash: true,
      //   relativeLinkResolution: 'legacy',
      // }
    ),
    // material
    FlexLayoutModule,
    CadmusMaterialModule,
    CadmusRefsLookupModule
  ],
  providers: [EnvServiceProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
