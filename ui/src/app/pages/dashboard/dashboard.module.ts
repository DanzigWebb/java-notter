import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NotesModule } from '@app/notes';
import { GroupsModule } from '@app/groups';
import { TextareaAutoModule } from '@app/shared/components/textarea-auto/textarea-auto.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent,
    DashboardPageComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DragDropModule,
    NotesModule,
    GroupsModule,
    TextareaAutoModule,
    FormsModule
  ]
})
export class DashboardModule { }
