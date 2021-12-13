import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { QuickSearchResult } from '@myrmidon/atlas-place-picker';

import { AtlasRefLookupService } from '../../services/atlas-ref-lookup.service';
import { PlacePickerDialogComponent } from '../place-picker-dialog/place-picker-dialog.component';

@Component({
  selector: 'atlas-lookup',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.css'],
})
export class LookupComponent implements OnInit {
  @Input()
  public item: QuickSearchResult | undefined;

  @Output()
  public itemChange: EventEmitter<QuickSearchResult>;

  constructor(
    public service: AtlasRefLookupService,
    private _dialog: MatDialog
  ) {
    this.itemChange = new EventEmitter<QuickSearchResult>();
  }

  ngOnInit(): void {}

  public onItemChange(item: QuickSearchResult): void {
    this.item = item;
    this.itemChange.emit(item);
  }

  public onMoreRequest(): void {
    this._dialog
      .open(PlacePickerDialogComponent)
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.item = result;
        }
      });
  }
}
