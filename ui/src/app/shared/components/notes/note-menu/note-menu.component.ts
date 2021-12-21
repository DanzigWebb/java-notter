import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { NoteDto, TagCreateDto, TagDto, TodoCreateDto, TodoDto, UpdateOrderDto } from '@app/models';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { TagFacade } from '@app/store/tag';
import { NoteFacade } from '@app/store/note';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { NoteMenuFacade } from '@app/store/ui/note-menu';
import { OptionComponent } from 'am-bulba';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-note-menu',
  templateUrl: './note-menu.component.html',
  styleUrls: ['./note-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteMenuComponent implements OnInit, OnChanges, OnDestroy {

  @Input() note!: NoteDto;
  @Output() noteChange = new EventEmitter();

  @Input() tags: TagDto[] = [];
  @Input() isOpen: boolean | null = false;
  @Input() width: number | string | undefined;

  @Output() onUpdateNote = new EventEmitter<NoteDto>();
  @Output() onDeleteNote = new EventEmitter<NoteDto>();
  @Output() onClose = new EventEmitter();

  form: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: '',
    tags: []
  });

  isShow = true;
  todos: TodoDto[] = [];
  tags$ = this.tagFacade.tags$.pipe(
    map(tags => tags.filter(tag => !this.note.tags.some(t => t.id === tag.id)))
  );

  tagSearchControl = new FormControl();

  get checkedTodos() {
    return this.note?.todos.filter(t => t.checked) || [];
  }

  private destroy$ = new Subject();

  constructor(
    public menu: NoteMenuFacade,
    private fb: FormBuilder,
    private tagFacade: TagFacade,
    private noteFacade: NoteFacade,
  ) {
  }

  ngOnInit(): void {
    this.getTodos();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.note) {
      if (changes.note.currentValue) {
        this.updateForm();
        this.getTodos();
        this.isShow = true;
      }
    }
  }

  getTodos() {
    const todos = this.note ? [...this.note.todos] : [];
    this.todos = todos.sort(
      (a, b) => (a.order || 0) - (b.order || 0)
    );
  }

  private updateForm() {
    this.form.reset();

    this.updateControl('title', this.note?.title || '');
    this.updateControl('description', this.note?.description || '');
    this.updateControl('tags', this.note?.tags.map(t => t.id) || []);

    this.tags.length
      ? this.form.get('tags')?.enable()
      : this.form.get('tags')?.disable();
  }

  private updateControl<T>(controlName: string, value: T) {
    this.form.get(controlName)?.setValue(value);
  }

  createTag(dto: TagCreateDto) {
    this.tagFacade.create(dto).subscribe();
  }

  addTodo(input: HTMLInputElement) {
    if (this.note && input.value) {
      const dto: TodoCreateDto = {
        title: input.value
      };

      this.noteFacade.addTodo(dto, this.note)
        .subscribe(() => {
          input.value = '';
        });
    } else {
      input.focus();
    }
  }

  deleteTodo(todo: TodoDto) {
    this.noteFacade.deleteTodo(todo.id, this.note!);
  }

  completeTodo(checked: boolean, todo: TodoDto) {
    const updated: TodoDto = {...todo, checked};
    this.noteFacade.updateTodo(updated, this.note!);
  }

  updateTodo(title: string, todo: TodoDto) {
    const updated: TodoDto = {...todo, title};
    this.noteFacade.updateTodo(updated, this.note!);
  }

  deleteNote() {
    this.onDeleteNote.emit(this.note!);
  }

  dropTodo(event: CdkDragDrop<TodoDto[], any>) {
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);

    console.log(this.todos);

    const dto: UpdateOrderDto[] = [];
    this.todos.forEach((todo, index) => {
      dto.push({
        entityId: todo.id,
        order: index
      })
    })

    this.noteFacade.updateTodoOrder(dto, this.note);
  }

  onCheckTag(option: OptionComponent<TagDto>) {
    const tag = option.getValue();
    this.addTag(tag);
    this.noteChange.emit(this.note);
    this.tagSearchControl.reset();
  }

  addTag(tag: TagDto) {
    this.note.tags.push(tag);
  }

  removeTag(tag: TagDto) {
    this.note.tags = this.note?.tags.filter(t => t !== tag);
    this.noteChange.emit(this.note);
  }

  close() {
    this.menu.close();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
