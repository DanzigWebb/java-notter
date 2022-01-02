import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizerRoutingModule } from './organizer-routing.module';
import { OrganizerComponent } from './organizer.component';
import { OrganizerTableComponent } from './organizer-table/organizer-table.component';
import { TextareaAutoModule } from '@app/shared/components/textarea-auto/textarea-auto.module';


@NgModule({
  declarations: [
    OrganizerComponent,
    OrganizerTableComponent
  ],
  imports: [
    CommonModule,
    OrganizerRoutingModule,
    TextareaAutoModule
  ]
})
export class OrganizerModule { }
