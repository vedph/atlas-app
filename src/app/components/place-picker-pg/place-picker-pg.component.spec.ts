import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacePickerPgComponent } from './place-picker-pg.component';

describe('PlacePickerPgComponent', () => {
  let component: PlacePickerPgComponent;
  let fixture: ComponentFixture<PlacePickerPgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlacePickerPgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacePickerPgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
