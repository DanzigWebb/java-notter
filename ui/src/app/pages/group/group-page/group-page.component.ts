import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { GroupDto, NoteCreateDto, NoteDto, TagDto, UpdateOrderDto } from '@app/models';
import { NoteFacade } from '@app/store/note';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { distinctUntilChanged, filter, map, takeUntil } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { TagFacade } from '@app/store/tag';
import { ModalsService } from '@app/shared/service/modals/modals.service';
import { FormControl } from '@angular/forms';
import { GroupFacade } from '@app/store/group';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { ResponsiveService } from '@app/shared/service/responsive/responsive.service';
import { NoteMenuFacade } from '@app/store/ui/note-menu';

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

  control = new FormControl();

  private destroy$ = new Subject();

  isMenuOpen$ = combineLatest([this.menu.state$, this.checkedNote$]).pipe(
    map(([a, b]) => a.isOpen && !!b),
    distinctUntilChanged()
  )

  menuWidth = 320;
  windowSize$ = this.responsive.resize$.pipe(
    map(size => size >= 600 ? this.menuWidth : 'auto')
  );

  constructor(
    private noteFacade: NoteFacade,
    private tagFacade: TagFacade,
    private groupFacade: GroupFacade,
    private route: ActivatedRoute,
    private router: Router,
    private modals: ModalsService,
    private responsive: ResponsiveService,
    private menu: NoteMenuFacade
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
      this.updateControl();
    }
  }

  checkNote(note: NoteDto) {
    const queryParams: Params = {[queryParamNoteName]: note.id};
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams
    }).then(() => {
      this.menu.open()
    });
  }

  updateControl() {
    this.control.setValue(this.group?.title);
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
      this.activeNotes = notes.filter(n => !n.checked).sort((a, b) => (a.order || 0) - (b.order || 0));
      this.completedNotes = notes.filter(n => n.checked).sort((a, b) => (a.order || 0) - (b.order || 0));
    }
  }

  updateGroup(title: string) {
    const dto: GroupDto = {...this.group!, title};
    this.groupFacade.update(dto);
  }

  createNote(dto: NoteCreateDto) {
    const note: NoteCreateDto = {...dto, groupId: this.group?.id};
    this.noteFacade.create(note);
  }

  updateNote(note: NoteDto) {
    this.noteFacade.update(note).subscribe();
  }

  onCompleteNote(note: NoteDto, checked: boolean) {
    const dto = {...note, checked};
    this.updateNote(dto);
  }

  deleteNote(note: NoteDto) {
    const message = `Подтверждение удаления заметки: "${note.title}"`;
    this.modals.submit({message}).pipe(
      filter(Boolean)
    ).subscribe(() => {
      this.noteFacade.delete(note.id);
    });
  }

  dropNote(event: CdkDragDrop<NoteDto[], any>) {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );

    const dto: UpdateOrderDto[] = event.container.data.map((todo, index) => ({
      entityId: todo.id,
      order: index
    }));

    this.noteFacade.updateNoteOrder(dto);
  }

  closeNoteMenu() {
    this.menu.close();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
