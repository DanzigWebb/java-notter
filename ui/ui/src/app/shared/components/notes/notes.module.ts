import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateNoteFormComponent } from './create-note-form/create-note-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NoteItemComponent } from './note-item/note-item.component';
import { TooltipModule } from '@app/shared/components/tooltip/tooltip.module';


@NgModule({
  declarations: [
    CreateNoteFormComponent,
    NoteItemComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TooltipModule
  ],
    exports: [
        CreateNoteFormComponent,
        NoteItemComponent
    ]
})
export class NotesModule { }
