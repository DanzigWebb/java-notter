import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { GroupDto } from '@app/models';

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupPageComponent implements OnInit {

  @Input() group: GroupDto | null = null;

  constructor() {
  }

  ngOnInit(): void {
  }

}
