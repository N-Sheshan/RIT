import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssesmentEntryComponent } from './assesment-entry.component';

describe('AssesmentEntryComponent', () => {
  let component: AssesmentEntryComponent;
  let fixture: ComponentFixture<AssesmentEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssesmentEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssesmentEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
