import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatxMultiFlagsComponent } from './matx-multi-flags.component';

describe('MatxMultiFlagsComponent', () => {
  let component: MatxMultiFlagsComponent;
  let fixture: ComponentFixture<MatxMultiFlagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatxMultiFlagsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatxMultiFlagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
