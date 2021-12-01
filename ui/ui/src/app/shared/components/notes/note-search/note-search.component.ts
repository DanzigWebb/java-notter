import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GroupFacade } from '@app/store/group';
import { Observable, Subject } from 'rxjs';
import { NoteDto } from '@app/models';
import { map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-note-search',
  templateUrl: './note-search.component.html',
  styleUrls: ['./note-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteSearchComponent implements OnInit, OnDestroy {

  @Output() onCheckNote = new EventEmitter<NoteDto>();

  filteredNotes$: Observable<NoteDto[]> = new Subject<NoteDto[]>();
  private notes$ = this.facade.groups$.pipe(map(
    (groups) => groups.flatMap(group => group.notes)
  ));

  control = new FormControl();

  private destroy$ = new Subject();

  constructor(
    private facade: GroupFacade
  ) { }

  ngOnInit(): void {
    this.filteredNotes$ = this.control.valueChanges.pipe(
      startWith(''),
      switchMap((value) => this.notes$.pipe(
        map((notes) => notes.filter(
          (n) => n.title.toLowerCase().includes(value?.toLowerCase() || '')
        ))
      ))
    );
  }

  checkNote(note: NoteDto) {
    this.onCheckNote.emit(note);
    this.control.reset();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
