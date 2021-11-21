import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { NoteDto, TodoDto } from '@app/models';

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

  checkedTodos: TodoDto[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.parseTodos();
  }

  onCheckedChange(checked: boolean) {
    this.onChecked.emit(checked);
  }

  parseTodos() {
    if (this.note) {
      this.checkedTodos = this.note.todos.filter(todo => todo.checked);
    }

  }
}
