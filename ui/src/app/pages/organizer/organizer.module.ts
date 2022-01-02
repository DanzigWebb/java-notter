import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizerRoutingModule } from './organizer-routing.module';
import { OrganizerComponent } from './organizer.component';
import { OrganizerTableComponent } from './organizer-table/organizer-table.component';
import { TextareaAutoModule } from '@app/shared/components/textarea-auto/textarea-auto.module';
import { CalendarComponent } from './calendar/calendar.component';


@NgModule({
  declarations: [
    OrganizerComponent,
    OrganizerTableComponent,
    CalendarComponent
  ],
  imports: [
    CommonModule,
    OrganizerRoutingModule,
    TextareaAutoModule
  ]
})
export class OrganizerModule { }
