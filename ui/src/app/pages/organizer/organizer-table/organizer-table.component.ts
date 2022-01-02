import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-organizer-table',
  templateUrl: './organizer-table.component.html',
  styleUrls: ['./organizer-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizerTableComponent implements OnInit {

  @Output() onClose = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  close() {
    this.onClose.emit();
  }
}
