import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenthMarksComponent } from './tenth-marks.component';

describe('TenthMarksComponent', () => {
  let component: TenthMarksComponent;
  let fixture: ComponentFixture<TenthMarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenthMarksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenthMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
