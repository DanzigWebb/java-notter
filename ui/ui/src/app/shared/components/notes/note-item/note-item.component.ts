import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { NoteDto } from '@app/models';

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteItemComponent implements OnInit {

  @Input() note: NoteDto | null = null;
  @Input() checked = false;

  @Output() onChecked = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onCheckedChange(checked: boolean) {
    this.onChecked.emit(checked);
  }
}
