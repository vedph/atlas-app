import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgToolsModule } from '@myrmidon/ng-tools';
import { CadmusMaterialModule } from '@myrmidon/cadmus-material';
import { AtlasPlacePickerModule } from '@myrmidon/atlas-place-picker';
import { CadmusRefsLookupModule } from '@myrmidon/cadmus-refs-lookup';

import { LookupComponent } from './components/lookup/lookup.component';
import { PlacePickerDialogComponent } from './components/place-picker-dialog/place-picker-dialog.component';

@NgModule({
  declarations: [LookupComponent, PlacePickerDialogComponent],
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
  exports: [LookupComponent, PlacePickerDialogComponent],
})
export class AtlasPlaceLookupModule {}
