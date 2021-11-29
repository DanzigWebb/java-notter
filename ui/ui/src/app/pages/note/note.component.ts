import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GroupFacade } from '@app/store/group';
import { filter, map, switchMap } from 'rxjs/operators';
import { GroupDto } from '@app/models';
import { ActivatedRoute } from '@angular/router';

@Component({
  template: `
    <div class="page" *ngIf="note$ | async as note">
      <app-note-menu
        class="rounded-md"
        [note]="note">
      </app-note-menu>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteComponent {

  note$ = this.route.paramMap.pipe(
    map(map => map.get('id') || ''),
    filter(id => !!id),
    switchMap((id: string) => this.facade.groups$.pipe(
      map((groups) => this.findNote(groups, Number(id)))
    )),
  );

  constructor(
    private facade: GroupFacade,
    private route: ActivatedRoute,
  ) {
  }

  private findNote(groups: GroupDto[], id: number) {
    return groups.flatMap(g => g.notes).find(n => n.id === id) || null;
  }
}
