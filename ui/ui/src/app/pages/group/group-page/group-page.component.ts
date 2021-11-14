import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { GroupDto, NoteCreateDto, NoteDto } from '@app/models';
import { NoteFacade } from '@app/store/note';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';

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
export class GroupPageComponent implements OnInit {

  @Input() group: GroupDto | null = null;

  checkedNote$: Observable<NoteDto | null> = this.route.queryParams.pipe(
    map((params) => {
      const noteId = parseInt(params[queryParamNoteName]);
      return this.group?.notes.find(note => note.id === noteId) || null;
    }),
  );

  constructor(
    private noteFacade: NoteFacade,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
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
}
