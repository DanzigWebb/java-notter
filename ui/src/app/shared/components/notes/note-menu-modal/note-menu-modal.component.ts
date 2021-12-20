import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ModalContext } from 'am-bulba';
import { NoteDto, TagDto } from '@app/models';
import { NoteFacade } from '@app/store/note';
import { TagFacade } from '@app/store/tag';
import { take, takeUntil, tap } from 'rxjs/operators';
import { GroupFacade } from '@app/store/group';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-note-menu-modal',
  templateUrl: './note-menu-modal.component.html',
  styleUrls: ['./note-menu-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteMenuModalComponent implements OnInit, OnDestroy {

  note: NoteDto;
  tags: TagDto[] = [];

  private destroy$ = new Subject();

  constructor(
    private context: ModalContext<NoteDto>,
    private notes: NoteFacade,
    private groupFacade: GroupFacade,
    private tagFacade: TagFacade,
    private ref: ChangeDetectorRef
  ) {
    this.note = this.cloneNote(context.data!);
  }

  ngOnInit(): void {
    this.tagFacade.tags$.pipe(
      take(1)
    ).subscribe(tags => this.tags = tags);

    this.groupFacade.groups$.pipe(
      tap(groups => {
        const group = groups.find(g => g.id === this.note.groupId);
        if (group) {
          const note = group.notes.find(n => n.id === this.note.id);
          if (note) {
            this.note = this.cloneNote(note);
            this.ref.detectChanges();
          }
        }
      }),
      takeUntil(this.destroy$)
    ).subscribe()
  }

  close() {
    this.context.close(this.note);
  }

  saveNote(dto: NoteDto) {
    this.notes.update(dto);
  }

  private cloneNote(note: NoteDto) {
    return JSON.parse(JSON.stringify(note));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
