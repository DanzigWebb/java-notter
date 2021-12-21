import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardDto } from '@app/models';
import { filter, map, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { DashboardFacade } from '@app/store/dashboard';

@Component({
  template: `
    <div class="page pt-4 p-1" *ngIf="dashboard$ | async as dashboard">
      <ng-container *ngIf="dashboard">
        <app-dashboard-page
          [dashboard]="dashboard">
        </app-dashboard-page>
      </ng-container>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {

  dashboard$: Observable<DashboardDto | null> = this.route.paramMap.pipe(
    map(map => map.get('id') || ''),
    filter(id => !!id),
    switchMap((id: string) => this.dash.state$.pipe(
      map((state) => this.findGroupById(state.items, Number(id)))
    )),
  );

  constructor(
    private dash: DashboardFacade,
    private route: ActivatedRoute,
  ) {
  }

  private findGroupById(dashboards: DashboardDto[], id: number): DashboardDto | null {
    return dashboards.find(d => d.id === Number(id)) || null;
  }
}
