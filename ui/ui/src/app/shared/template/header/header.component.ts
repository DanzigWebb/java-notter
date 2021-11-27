import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { UserFacade } from '@app/store/user';
import { GroupFacade } from '@app/store/group';
import { map, startWith, switchMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { NoteDto } from '@app/models';
import { ActivatedRoute, Params, Router } from '@angular/router';

const queryParamNoteName = 'noteId';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user$ = this.userFacade.state$;

  control = new FormControl();

  filteredNotes$: Observable<NoteDto[]> = new Subject<NoteDto[]>();
  private notes$ = this.groupFacade.groups$.pipe(map(
    (groups) => groups.flatMap(group => group.notes)
  ));

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private userFacade: UserFacade,
    private groupFacade: GroupFacade,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

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

  setTheme(theme: string) {
    this.doc.querySelector('html')?.setAttribute('data-theme', theme);
  }

  checkNote(note: NoteDto) {
    const queryParams: Params = {[queryParamNoteName]: note.id};
    this.router.navigate(['group', note.groupId], {
      relativeTo: this.route,
      queryParams
    }).then(() => this.control.reset());
  }
}
