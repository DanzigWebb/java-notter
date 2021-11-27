import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { GroupDto, NoteCreateDto, NoteDto, TagDto } from '@app/models';
import { NoteFacade } from '@app/store/note';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { filter, map, takeUntil } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TagFacade } from '@app/store/tag';
import { ModalsService } from '@app/shared/service/modals/modals.service';

const queryParamNoteName = 'noteId';

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupPageComponent implements OnInit, OnChanges, OnDestroy {

  @Input() group: GroupDto | null = null;

  tags$: Observable<TagDto[]> = this.tagFacade.tags$;

  checkedNote$ = new BehaviorSubject<NoteDto | null>(null);
  checkedNoteId$ = new BehaviorSubject<number>(-1);

  activeNotes: NoteDto[] = [];
  completedNotes: NoteDto[] = [];

  private destroy$ = new Subject();

  constructor(
    private noteFacade: NoteFacade,
    private tagFacade: TagFacade,
    private route: ActivatedRoute,
    private router: Router,
    private modals: ModalsService
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.pipe(
      map((params) => {
        const noteId = parseInt(params[queryParamNoteName]);
        const note = this.group?.notes.find(note => note.id === noteId) || null;
        this.checkedNote$.next(note);
        this.checkedNoteId$.next(noteId);
        return noteId;
      }),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.group) {
      this.findCheckedNote();
      this.sortedNotes();
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

  private findCheckedNote() {
    const noteId = this.checkedNoteId$.getValue();
    if (noteId) {
      const checkedNote = this.group?.notes.find(n => n.id === noteId) || null;
      this.checkedNote$.next(checkedNote);
    }
  }

  private sortedNotes() {
    if (this.group) {
      const notes = this.group.notes || [];
      this.activeNotes = notes.filter(n => !n.checked);
      this.completedNotes = notes.filter(n => n.checked);
    }
  }

  updateNote(note: NoteDto) {
    this.noteFacade.update(note).subscribe();
  }

  onCompleteNote(note: NoteDto, checked: boolean) {
    const dto = {...note, checked};
    this.updateNote(dto);
  }

  deleteNote(note: NoteDto) {
    const message = `Подтверждение удаления заметки: "${note.title}"`
    this.modals.submit({message}).pipe(
      filter(Boolean)
    ).subscribe(() => {
      this.noteFacade.delete(note.id);
    })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
