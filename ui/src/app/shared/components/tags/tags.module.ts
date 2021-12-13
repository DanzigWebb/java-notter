import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTagFormComponent } from './create-tag-form/create-tag-form.component';
import { FormGroupModule } from 'am-bulba';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CreateTagFormComponent
  ],
  imports: [
    CommonModule,
    FormGroupModule,
    ReactiveFormsModule
  ],
  exports: [
    CreateTagFormComponent
  ]
})
export class TagsModule { }
