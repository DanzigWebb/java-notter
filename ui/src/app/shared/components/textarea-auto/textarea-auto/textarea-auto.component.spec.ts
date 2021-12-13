import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextareaAutoComponent } from './textarea-auto.component';

describe('TextareaAutoComponent', () => {
  let component: TextareaAutoComponent;
  let fixture: ComponentFixture<TextareaAutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextareaAutoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaAutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
