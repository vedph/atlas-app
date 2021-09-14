import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FlexLayoutModule } from '@angular/flex-layout';

import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

import { EnvServiceProvider } from 'projects/myrmidon/ng-environment/src/public-api';
import { AtlasPlacePickerModule } from 'projects/myrmidon/atlas-place-picker/src/public-api';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CadmusMaterialModule } from '@myrmidon/cadmus-material';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { NgEnvironmentModule } from '@myrmidon/ng-environment';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxMapboxGLModule,
    NgEnvironmentModule,
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
  ],
  providers: [EnvServiceProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
