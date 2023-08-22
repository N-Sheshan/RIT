import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwelvethIcseCbseMarkComponent } from './twelveth-icse-cbse-mark.component';

describe('TwelvethIcseCbseMarkComponent', () => {
  let component: TwelvethIcseCbseMarkComponent;
  let fixture: ComponentFixture<TwelvethIcseCbseMarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwelvethIcseCbseMarkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwelvethIcseCbseMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
