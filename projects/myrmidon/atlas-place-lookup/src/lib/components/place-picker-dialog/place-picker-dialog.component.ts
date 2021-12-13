import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { QuickSearchResult } from '@myrmidon/atlas-place-picker';

@Component({
  selector: 'atlas-place-picker-dialog',
  templateUrl: './place-picker-dialog.component.html',
  styleUrls: ['./place-picker-dialog.component.css'],
})
export class PlacePickerDialogComponent implements OnInit {
  constructor(private _dialogRef: MatDialogRef<PlacePickerDialogComponent>) {}

  ngOnInit(): void {}

  public onPlacePick(result: QuickSearchResult): void {
    this._dialogRef.close(result);
  }

  public onClose(): void {
    this._dialogRef.close();
  }
}
