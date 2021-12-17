import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { TodoDto } from '@app/models';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-todo-item',
  exportAs: 'appTodoItem',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent implements OnInit, OnDestroy {

  @Input() todo!: TodoDto;
  @Output() todoChange = new EventEmitter<TodoDto>();

  @Output() onToggle = new EventEmitter<boolean>();
  @Output() onDelete = new EventEmitter<TodoDto>();
  @Output() onChange = new EventEmitter<string>();

  control = new FormControl('');

  private destroy$ = new Subject();

  constructor() {
  }

  ngOnInit(): void {
    this.control.setValue(this.todo?.title);
  }

  changeEmit(title: string) {
    if (title.trim() !== this.todo?.title.trim()) {
      this.onChange.emit(title);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
