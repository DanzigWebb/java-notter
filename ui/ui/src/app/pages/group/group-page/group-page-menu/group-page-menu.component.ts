import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  OnChanges, ChangeDetectorRef
} from '@angular/core';
import { NoteDto, TagDto } from '@app/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-group-page-menu',
  templateUrl: './group-page-menu.component.html',
  styleUrls: ['./group-page-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupPageMenuComponent implements OnInit, OnChanges, OnDestroy {

  @Input() note: NoteDto | null = null;
  @Input() tags: TagDto[] = [];

  @Output() onUpdateNote = new EventEmitter<NoteDto>();

  form: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: '',
    tags: []
  });

  get checkedTags(): TagDto[] {
    return this.note?.tags || [];
  }

  private destroy$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private ref: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(
      takeUntil(this.destroy$),
      debounceTime(300),
      tap((data) => {
        if (this.form.valid && this.note) {
          const title: string = data.title || '';
          const description: string = data.description || '';

          const tagsIds = (data.tags as string[]).reduce((acc, item) => {
            const tag: number = this.tags.find(t => t.name === item)?.id || 0;
            if (tag) {
              acc.push(tag);
            }
            return acc;
          }, [] as number[]);

          const note: NoteDto = {...this.note, title, description, tagsIds};
          this.onUpdateNote.emit(note);
        }
      })
    ).subscribe();
  }

  ngOnChanges() {
    this.updateForm();
  }

  private updateForm() {
    this.form.reset();
    this.updateControl('title', this.note?.title || '');
    this.updateControl('description', this.note?.description || '');
    this.updateControl('tags', this.note?.tags.map(t => t.name) || []);
    this.ref.detectChanges();
  }

  private updateControl<T>(controlName: string, value: T) {
    this.form.get(controlName)?.setValue(value);
  }

  isCheckedTag(id: number) {
    return !!this.checkedTags.find(tag => tag.id === id);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
