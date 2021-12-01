import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateNoteFormComponent } from './create-note-form/create-note-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NoteItemComponent } from './note-item/note-item.component';
import { TooltipModule } from '@app/shared/components/tooltip/tooltip.module';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TextareaAutoModule } from '@app/shared/components/textarea-auto/textarea-auto.module';
import { NoteMenuComponent } from './note-menu/note-menu.component';
import { ContenteditableModule } from '@app/shared/contenteditable/contenteditable.module';
import { FormGroupModule, MenuModule } from 'am-bulba';
import { TagsModule } from '@app/shared/components/tags/tags.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RouterModule } from '@angular/router';
import { NoteSearchComponent } from './note-search/note-search.component';


@NgModule({
  declarations: [
    CreateNoteFormComponent,
    NoteItemComponent,
    TodoItemComponent,
    NoteMenuComponent,
    NoteSearchComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TooltipModule,
        TextareaAutoModule,
        ContenteditableModule,
        MenuModule,
        TagsModule,
        FormGroupModule,
        DragDropModule,
        RouterModule
    ],
  exports: [
    CreateNoteFormComponent,
    NoteItemComponent,
    TodoItemComponent,
    NoteMenuComponent,
    NoteSearchComponent
  ]
})
export class NotesModule { }
