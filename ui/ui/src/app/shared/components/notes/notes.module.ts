import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateNoteFormComponent } from './create-note-form/create-note-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NoteItemComponent } from './note-item/note-item.component';
import { TooltipModule } from '@app/shared/components/tooltip/tooltip.module';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TextareaAutoModule } from '@app/shared/components/textarea-auto/textarea-auto.module';


@NgModule({
  declarations: [
    CreateNoteFormComponent,
    NoteItemComponent,
    TodoItemComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TooltipModule,
    TextareaAutoModule
  ],
  exports: [
    CreateNoteFormComponent,
    NoteItemComponent,
    TodoItemComponent
  ]
})
export class NotesModule { }
