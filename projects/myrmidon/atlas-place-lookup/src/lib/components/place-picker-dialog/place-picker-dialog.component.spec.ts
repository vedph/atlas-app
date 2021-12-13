import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacePickerDialogComponent } from './place-picker-dialog.component';

describe('PlacePickerDialogComponent', () => {
  let component: PlacePickerDialogComponent;
  let fixture: ComponentFixture<PlacePickerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlacePickerDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacePickerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
