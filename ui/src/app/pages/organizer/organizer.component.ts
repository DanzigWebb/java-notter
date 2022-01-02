import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizerComponent implements OnInit {

  month = dayjs()

  constructor() { }

  ngOnInit(): void {
  }

}
