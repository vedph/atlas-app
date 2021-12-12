import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceLookupPgComponent } from './place-lookup-pg.component';

describe('PlaceLookupPgComponent', () => {
  let component: PlaceLookupPgComponent;
  let fixture: ComponentFixture<PlaceLookupPgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaceLookupPgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceLookupPgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
