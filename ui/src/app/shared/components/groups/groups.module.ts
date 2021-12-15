import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateGroupFormComponent } from './create-group-form/create-group-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GroupCardComponent } from './group-card/group-card.component';
import { MenuModule } from 'am-bulba';
import { TooltipModule } from '@app/shared/components/tooltip/tooltip.module';
import { NotesModule } from '@app/notes';
import { DragDropModule } from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [
    CreateGroupFormComponent,
    GroupCardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MenuModule,
    TooltipModule,
    NotesModule,
    DragDropModule
  ],
    exports: [
        CreateGroupFormComponent,
        GroupCardComponent
    ]
})
export class GroupsModule { }
