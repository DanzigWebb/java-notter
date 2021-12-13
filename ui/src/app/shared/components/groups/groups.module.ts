import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateGroupFormComponent } from './create-group-form/create-group-form.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CreateGroupFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    CreateGroupFormComponent
  ]
})
export class GroupsModule { }
