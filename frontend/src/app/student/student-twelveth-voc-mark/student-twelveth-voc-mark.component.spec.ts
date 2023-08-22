import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTwelvethVocMarkComponent } from './student-twelveth-voc-mark.component';

describe('StudentTwelvethVocMarkComponent', () => {
  let component: StudentTwelvethVocMarkComponent;
  let fixture: ComponentFixture<StudentTwelvethVocMarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentTwelvethVocMarkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentTwelvethVocMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
