import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  OnChanges
} from '@angular/core';
import { NoteDto, TagCreateDto, TagDto, TodoCreateDto, TodoDto } from '@app/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, filter, takeUntil, tap } from 'rxjs/operators';
import { TagFacade } from '@app/store/tag';
import { NoteFacade } from '@app/store/note';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-group-page-menu',
  templateUrl: './group-page-menu.component.html',
  styleUrls: ['./group-page-menu.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({
          width: '0',
          opacity: 0,
          overflow: 'hidden'
        }),
        animate('160ms cubic-bezier(0.4, 0, 0.2, 1)', style({width: '*', opacity: 1,}))
      ]),
      transition(':leave', [
        animate('160ms ease-in-out', style({width: 0, overflow: 'hidden'}))
      ])
    ])
  ]
})
export class GroupPageMenuComponent implements OnInit, OnChanges, OnDestroy {

  @Input() note: NoteDto | null = null;
  @Input() tags: TagDto[] = [];

  @Output() onUpdateNote = new EventEmitter<NoteDto>();
  @Output() onDeleteNote = new EventEmitter<NoteDto>();

  form: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: '',
    tags: []
  });

  get checkedTodos() {
    return this.note?.todos.filter(t => t.checked) || []
  }

  private destroy$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private tagFacade: TagFacade,
    private noteFacade: NoteFacade
  ) {
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(
      debounceTime(1500),
      filter(() => this.form.touched),
      tap(() => {
        if (this.form.valid && this.note) {
          const note = this.updateNoteByForm();
          this.onUpdateNote.emit(note);
        }
      }),
      takeUntil(this.destroy$),
    ).subscribe();
  }

  ngOnChanges() {
    this.updateForm();
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

  saveNote() {
    const note = this.updateNoteByForm();
    this.onUpdateNote.emit(note);
  }

  private updateNoteByForm(): NoteDto {
    const data = this.form.value;

    const title: string = data.title || '';
    const description: string = data.description || '';
    const tags = this.findTags(data.tags) || [];

    return {...this.note!, title, description, tags};
  }

  private findTags(ids: number[]): TagDto[] {
    if (!Array.isArray(ids)) {
      return [];
    }

    return ids.reduce((acc, id) => {
      const tag = this.tags.find(t => t.id === id);
      if (tag) {
        acc.push(tag);
      }

      return acc;
    }, [] as TagDto[]);
  }

  createTag(dto: TagCreateDto) {
    this.tagFacade.create(dto).subscribe();
  }

  addTodo(input: HTMLInputElement) {
    if (this.note && input.value) {
      const dto: TodoCreateDto = {
        title: input.value
      };

      this.noteFacade.addTodo(dto, this.note.id)
        .subscribe(() => {
          input.value = '';
        });
    } else {
      input.focus();
    }
  }

  deleteTodo(todo: TodoDto) {
    this.noteFacade.deleteTodo(todo.id, this.note!.id);
  }

  completeTodo(checked: boolean, todo: TodoDto) {
    const updated: TodoDto = {...todo, checked};
    this.noteFacade.updateTodo(updated, this.note!.id);
  }

  deleteNote() {
    this.onDeleteNote.emit(this.note!);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
