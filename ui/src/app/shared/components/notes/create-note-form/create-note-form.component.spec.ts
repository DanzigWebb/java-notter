import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNoteFormComponent } from './create-note-form.component';

describe('CreateNoteFormComponent', () => {
  let component: CreateNoteFormComponent;
  let fixture: ComponentFixture<CreateNoteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNoteFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNoteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
