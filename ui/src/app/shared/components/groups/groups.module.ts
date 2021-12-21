import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateGroupFormComponent } from './create-group-form/create-group-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GroupCardComponent } from './group-card/group-card.component';
import { FormGroupModule, MenuModule } from 'am-bulba';
import { TooltipModule } from '@app/shared/components/tooltip/tooltip.module';
import { NotesModule } from '@app/notes';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TextareaAutoModule } from '@app/shared/components/textarea-auto/textarea-auto.module';
import { CreateGroupModalComponent } from './create-group-modal/create-group-modal.component';


@NgModule({
  declarations: [
    CreateGroupFormComponent,
    GroupCardComponent,
    CreateGroupModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MenuModule,
    TooltipModule,
    NotesModule,
    DragDropModule,
    TextareaAutoModule,
    FormGroupModule
  ],
  exports: [
    CreateGroupFormComponent,
    GroupCardComponent
  ]
})
export class GroupsModule {
}
