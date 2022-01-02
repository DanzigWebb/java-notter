import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import * as dayjs from 'dayjs';
import * as isoWeek from 'dayjs/plugin/isoWeek';
import * as localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/ru';
import { Day } from './models/day';
import { Dayjs } from 'dayjs';
import { ModalContext, ModalService, ModalSliderComponent } from 'am-bulba';
import { Platform } from '@angular/cdk/platform';

dayjs.extend(isoWeek);
dayjs.extend(localizedFormat);
dayjs.locale('ru');

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit {

  @Input() month = dayjs();

  days: Day[] = [];

  get isIos() {
    return this.platform.IOS;
  }

  constructor(
    private modalService: ModalService,
    private platform: Platform,
  ) {
  }

  ngOnInit(): void {
    this.init();
  }

  init() {
    const month = this.month.clone();
    const monthDays = this.getDaysOfMonth(month);
    const daysBefore = this.getDaysBefore(monthDays[0].date);
    const daysAfter = this.getDaysAfter(monthDays[monthDays.length - 1].date);

    this.days = [...daysBefore, ...monthDays, ...daysAfter];
  }


  getDaysOfMonth(currentMonth: Dayjs) {
    const output: Day[] = [];
    const allDays = currentMonth.daysInMonth();

    let count = 1;
    while (count <= allDays) {
      const date = dayjs(new Date(currentMonth.year(), currentMonth.month(), count));
      const day = new Day(date, true, false);
      output.push(day);
      count++;
    }

    return output;
  }

  getDaysBefore(firstDay: Dayjs) {
    const output: Day[] = [];
    const dayOfWeek = firstDay.isoWeekday();

    let count = 1;
    while (dayOfWeek !== count) {
      const date = firstDay.subtract(count, 'day');
      const day = new Day(date, false, false);
      output.push(day);
      count++;
    }

    return output.reverse();
  }

  getDaysAfter(lastDay: Dayjs) {
    const output: Day[] = [];
    let dayOfWeek = lastDay.isoWeekday();

    let count = 7;
    while (dayOfWeek !== count) {
      const date = lastDay.add(dayOfWeek, 'day');
      const day = new Day(date, false, false);
      output.push(day);
      dayOfWeek++;
    }

    return output;
  }

  openDay(day: Day) {
    this.modalService.open(DayModalComponent, day, {
      containerType: ModalSliderComponent
    })
  }
}

@Component({
  template: `
    <div class="p-3 pb-6 relative">
      <h2 class="text-lg font-semibold sticky top-0 pb-4 bg-base-200 z-10">{{day.date.format('LL')}}</h2>
      <app-organizer-table (onClose)="close()"></app-organizer-table>
    </div>
  `
})
export class DayModalComponent {
  day: Day;

  constructor(
    private context: ModalContext<Day>
  ) {
    this.day = this.context.data!;
  }

  close() {
    this.context.close();
  }
}
