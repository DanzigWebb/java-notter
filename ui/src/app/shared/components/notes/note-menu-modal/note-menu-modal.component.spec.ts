import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteMenuModalComponent } from './note-menu-modal.component';

describe('NoteMenuModalComponent', () => {
  let component: NoteMenuModalComponent;
  let fixture: ComponentFixture<NoteMenuModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteMenuModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteMenuModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
