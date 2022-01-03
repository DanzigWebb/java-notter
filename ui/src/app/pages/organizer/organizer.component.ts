import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import * as dayjs from 'dayjs';
import { DiaryService } from './diary.service';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizerComponent implements OnInit {

  month = dayjs()

  constructor(
    private diaryService: DiaryService
  ) { }

  ngOnInit(): void {
    const date = this.month;
    const start = date.startOf('M');
    const end = date.endOf('M');

    this.diaryService.get(start.toDate().getTime(), end.toDate().getTime()).subscribe(data => {
      console.log(data);
    })
  }

}
