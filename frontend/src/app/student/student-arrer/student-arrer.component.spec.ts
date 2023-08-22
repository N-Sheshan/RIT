import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentarrerComponent } from './student-arrer.component';

describe('StudentArrerComponent', () => {
  let component: StudentarrerComponent;
  let fixture: ComponentFixture<StudentarrerComponent>;
  templateUrl: './student-arrer.component.html';
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentarrerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentarrerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
