import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Day } from '../models/day';
import { DiaryDto } from '@app/models';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayComponent implements OnInit {

  @Input() day!: Day;
  @Input() data: DiaryDto[] | undefined;

  constructor() { }

  ngOnInit(): void {
  }
}
