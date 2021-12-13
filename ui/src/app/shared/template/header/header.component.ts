import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { UserFacade } from '@app/store/user';
import { GroupFacade } from '@app/store/group';
import { NoteDto } from '@app/models';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NoteMenuFacade } from '@app/store/ui/note-menu';

const queryParamNoteName = 'noteId';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  user$ = this.userFacade.state$;

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private userFacade: UserFacade,
    private groupFacade: GroupFacade,
    private menu: NoteMenuFacade,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
  }

  setTheme(theme: string) {
    this.doc.querySelector('html')?.setAttribute('data-theme', theme);
  }

  checkNote(note: NoteDto) {
    const queryParams: Params = {[queryParamNoteName]: note.id};
    this.router.navigate(['group', note.groupId], {
      relativeTo: this.route,
      queryParams
    }).then(() => {
      this.menu.open();
    });
  }
}
