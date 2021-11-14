import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateNoteFormComponent } from './create-note-form/create-note-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateNoteFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    CreateNoteFormComponent
  ]
})
export class NotesModule { }
