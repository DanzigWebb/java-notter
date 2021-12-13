import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoteRoutingModule } from './note-routing.module';
import { NoteComponent } from './note.component';
import { TextareaAutoModule } from '@app/shared/components/textarea-auto/textarea-auto.module';
import { NotesModule } from '@app/notes';


@NgModule({
  declarations: [
    NoteComponent,
  ],
  imports: [
    CommonModule,
    NoteRoutingModule,
    TextareaAutoModule,
    NotesModule
  ]
})
export class NoteModule { }
