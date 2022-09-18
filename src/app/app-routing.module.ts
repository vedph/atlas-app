import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { PlaceLookupPgComponent } from './components/place-lookup-pg/place-lookup-pg.component';
import { PlacePickerPgComponent } from './components/place-picker-pg/place-picker-pg.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'picker', component: PlacePickerPgComponent },
  { path: 'lookup', component: PlaceLookupPgComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
