import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { DashboardDto } from '@app/models';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPageComponent implements OnInit {

  @Input() dashboard!: DashboardDto;

  get groups() {
    return this.dashboard.groups;
  }

  constructor() { }

  ngOnInit(): void {
  }
}
