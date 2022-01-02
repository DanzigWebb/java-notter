import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-organizer-table',
  templateUrl: './organizer-table.component.html',
  styleUrls: ['./organizer-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizerTableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
