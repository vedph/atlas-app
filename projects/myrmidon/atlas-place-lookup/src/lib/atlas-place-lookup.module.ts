import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgToolsModule } from '@myrmidon/ng-tools';
import { CadmusMaterialModule } from '@myrmidon/cadmus-material';
import { AtlasPlacePickerModule } from '@myrmidon/atlas-place-picker';
import { CadmusRefsLookupModule } from '@myrmidon/cadmus-refs-lookup';

import { AtlasLookupComponent } from './components/atlas-lookup/atlas-lookup.component';

@NgModule({
  declarations: [AtlasLookupComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgToolsModule,
    CadmusMaterialModule,
    CadmusRefsLookupModule,
    AtlasPlacePickerModule,
  ],
  exports: [AtlasLookupComponent],
})
export class AtlasPlaceLookupModule {}
