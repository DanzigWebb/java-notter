import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
  OnDestroy,
  Output,
  EventEmitter, OnChanges, SimpleChanges
} from '@angular/core';
import * as dayjs from 'dayjs';
import * as isoWeek from 'dayjs/plugin/isoWeek';
import * as localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/ru';
import { Day } from './models/day';
import { Dayjs } from 'dayjs';
import { ModalContext, ModalService, ModalSliderComponent } from 'am-bulba';
import { Platform } from '@angular/cdk/platform';
import { DiaryDto } from '@app/models';
import { DiaryService } from '../diary.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OrganizerModalContextData } from '../organizer.type';

dayjs.extend(isoWeek);
dayjs.extend(localizedFormat);
dayjs.locale('ru');

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit, OnChanges, OnDestroy {

  @Output() onPrev = new EventEmitter()
  @Output() onNext = new EventEmitter()

  @Input() month = dayjs();

  days: Day[] = [];
  data: Map<number, DiaryDto[]> = new Map<number, DiaryDto[]>();

  get isIos() {
    return this.platform.IOS;
  }

  private destroy$ = new Subject();

  constructor(
    private modalService: ModalService,
    private platform: Platform,
    private diaryService: DiaryService,
    private ref: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    this.diaryService.lastMonth$
      .pipe(takeUntil(this.destroy$))
      .subscribe((map) => {
        this.data = map;
        this.ref.detectChanges();
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.month) {
      this.renderMonth()
    }
  }

  renderMonth() {
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
    const items = this.data.get(day.date.toDate().getTime()) || [];
    const data: OrganizerModalContextData = {day, items};

    this.modalService.open(DayModalComponent, data, {
      containerType: ModalSliderComponent
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

@Component({
  template: `
    <div class="p-3 pb-6 relative">
      <app-organizer-table
        [day]="day"
        [items]="items"
        (onClose)="close()">
      </app-organizer-table>
    </div>
  `
})
export class DayModalComponent {
  day: Day;
  items: DiaryDto[] = [];

  constructor(
    private context: ModalContext<OrganizerModalContextData>
  ) {
    this.day = this.context.data?.day!;
    this.items = this.context.data?.items || [];
  }

  close() {
    this.context.close();
  }
}
