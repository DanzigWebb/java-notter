import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizerRoutingModule } from './organizer-routing.module';
import { OrganizerComponent } from './organizer.component';
import { OrganizerTableComponent } from './organizer-table/organizer-table.component';
import { TextareaAutoModule } from '@app/shared/components/textarea-auto/textarea-auto.module';
import { CalendarComponent, DayModalComponent } from './calendar/calendar.component';
import { FormsModule } from '@angular/forms';
import { TabsModule } from 'am-bulba';
import { ContenteditableModule } from '@app/shared/contenteditable/contenteditable.module';
import { DayComponent } from './calendar/day/day.component';


@NgModule({
  declarations: [
    OrganizerComponent,
    OrganizerTableComponent,
    CalendarComponent,
    DayModalComponent,
    DayComponent
  ],
  imports: [
    CommonModule,
    OrganizerRoutingModule,
    TextareaAutoModule,
    FormsModule,
    TabsModule,
    ContenteditableModule
  ]
})
export class OrganizerModule { }
