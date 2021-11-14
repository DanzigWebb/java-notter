import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupRoutingModule } from './group-routing.module';
import { GroupPageComponent } from './group-page/group-page.component';
import { GroupComponent } from './group.component';
import { NotesModule } from '@app/notes';
import { GroupPageMenuComponent } from './group-page/group-page-menu/group-page-menu.component';
import { FormGroupModule } from 'am-bulba';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GroupPageComponent,
    GroupComponent,
    GroupPageMenuComponent
  ],
  imports: [
    CommonModule,
    GroupRoutingModule,
    NotesModule,
    FormGroupModule,
    ReactiveFormsModule
  ]
})
export class GroupModule {
}
