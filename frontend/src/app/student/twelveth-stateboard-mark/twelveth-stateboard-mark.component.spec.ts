import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwelvethStateboardMarkComponent } from './twelveth-stateboard-mark.component';

describe('TwelvethStateboardMarkComponent', () => {
  let component: TwelvethStateboardMarkComponent;
  let fixture: ComponentFixture<TwelvethStateboardMarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwelvethStateboardMarkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwelvethStateboardMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
