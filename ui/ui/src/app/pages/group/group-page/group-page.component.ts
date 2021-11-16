import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { GroupDto, NoteCreateDto, NoteDto, TagDto } from '@app/models';
import { NoteFacade } from '@app/store/note';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';
import { TagFacade } from '@app/store/tag';

const queryParamNoteName = 'noteId';

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({
          width: '0',
          overflow: 'hidden'
        }),
        animate('160ms ease-in-out', style({width: '*'}))
      ]),
      transition(':leave', [
        animate('160ms ease-in-out', style({width: 0, overflow: 'hidden'}))
      ])
    ])
  ]
})
export class GroupPageComponent implements OnInit, OnChanges, OnDestroy {

  @Input() group: GroupDto | null = null;

  tags$: Observable<TagDto[]> = this.tagFacade.tags$;

  checkedNote$ = new BehaviorSubject<NoteDto | null>(null);

  private destroy$ = new Subject();

  constructor(
    private noteFacade: NoteFacade,
    private tagFacade: TagFacade,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.pipe(
      map((params) => {
        const noteId = parseInt(params[queryParamNoteName]);
        const note = this.group?.notes.find(note => note.id === noteId) || null;
        this.checkedNote$.next(note);
        return noteId
      }),
    ).subscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    // обновляем заметку при обновлении состояния группы
    if (changes.group) {
      const note = this.checkedNote$.getValue();
      if (note) {
        const updatedNote = this.group?.notes.find(n => n.id === note.id) || null;
        this.checkedNote$.next(updatedNote);
      }
    }
  }

  createNote(dto: NoteCreateDto) {
    const note: NoteCreateDto = {...dto, groupId: this.group?.id};
    this.noteFacade.create(note);
  }

  checkNote(note: NoteDto) {
    const queryParams: Params = {[queryParamNoteName]: note.id};
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams
    });
  }

  updateNote(note: NoteDto) {
    this.noteFacade.update(note).subscribe();
  }

  onCompleteNote(note: NoteDto, checked: boolean) {
    const dto = {...note, checked};
    this.updateNote(dto);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
