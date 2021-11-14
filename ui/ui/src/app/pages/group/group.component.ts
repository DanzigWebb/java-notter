import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupDto } from '@app/models';
import { filter, map, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { GroupFacade } from '@app/store/group';

@Component({
  template: `
    <div class="page" *ngIf="group$ | async as group">
      <app-group-page
        [group]="group">
      </app-group-page>
    </div>
  `,
  styleUrls: ['./group.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupComponent implements OnInit {

  group$: Observable<GroupDto | null> = this.route.paramMap.pipe(
    map(map => map.get('id') || ''),
    filter(id => !!id),
    switchMap((id: string) => this.groupFacade.groups$.pipe(
      map((groups) => this.findGroupById(groups, Number(id)))
    )),
  );

  constructor(
    private groupFacade: GroupFacade,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
  }

  private findGroupById(groups: GroupDto[], id: number): GroupDto | null {
    return groups.find(group => group.id === Number(id)) || null;
  }

}
