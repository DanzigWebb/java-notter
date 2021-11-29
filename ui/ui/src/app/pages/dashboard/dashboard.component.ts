import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupDto } from '@app/models';
import { filter, map, switchMap } from 'rxjs/operators';
import { GroupFacade } from '@app/store/group';
import { ActivatedRoute } from '@angular/router';

@Component({
  template: `
    <div class="page" *ngIf="group$ | async as group">
      <ng-container *ngIf="group">
        <app-dashboard-page
          [group]="group">
        </app-dashboard-page>
      </ng-container>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {

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

  private findGroupById(groups: GroupDto[], id: number): GroupDto | null {
    return groups.find(group => group.id === Number(id)) || null;
  }


}
