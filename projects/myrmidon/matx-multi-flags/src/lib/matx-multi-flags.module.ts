import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadmusMaterialModule } from '@myrmidon/cadmus-material';
import { MatxMultiFlagsComponent } from './matx-multi-flags.component';

@NgModule({
  declarations: [MatxMultiFlagsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CadmusMaterialModule
  ],
  exports: [MatxMultiFlagsComponent],
})
export class MatxMultiFlagsModule {}
