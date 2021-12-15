import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { DashboardDto } from '@app/models';
import { GroupFacade } from '@app/store/group';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPageComponent implements OnInit {

  @Input() dashboard!: DashboardDto;

  groups$ = this.facade.groups$.pipe(
    map((groups) => groups.filter(g => g.dashboardId === this.dashboard.id))
  );

  constructor(
    private facade: GroupFacade
  ) { }

  ngOnInit(): void {
  }
}
