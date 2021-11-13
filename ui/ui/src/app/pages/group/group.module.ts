import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupRoutingModule } from './group-routing.module';
import { GroupPageComponent } from './group-page/group-page.component';
import { GroupComponent } from './group.component';


@NgModule({
  declarations: [
    GroupPageComponent,
    GroupComponent
  ],
  imports: [
    CommonModule,
    GroupRoutingModule
  ]
})
export class GroupModule { }
