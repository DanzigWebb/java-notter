import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupRoutingModule } from './group-routing.module';
import { GroupPageComponent } from './group-page/group-page.component';
import { GroupComponent } from './group.component';
import { NotesModule } from '@app/notes';
import { FormGroupModule, MenuModule } from 'am-bulba';
import { ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from '@app/shared/components/tooltip/tooltip.module';
import { TagsModule } from '@app/shared/components/tags/tags.module';
import { ContenteditableModule } from '@app/shared/contenteditable/contenteditable.module';
import { TextareaAutoModule } from '@app/shared/components/textarea-auto/textarea-auto.module';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    GroupPageComponent,
    GroupComponent,
  ],
  imports: [
    CommonModule,
    GroupRoutingModule,
    NotesModule,
    FormGroupModule,
    ReactiveFormsModule,
    TooltipModule,
    MenuModule,
    TagsModule,
    ContenteditableModule,
    TextareaAutoModule,
    DragDropModule,
  ]
})
export class GroupModule {
}
