import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtlasLookupComponent } from './atlas-lookup.component';

describe('AtlasLookupComponent', () => {
  let component: AtlasLookupComponent;
  let fixture: ComponentFixture<AtlasLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtlasLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtlasLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
