import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { GroupDto } from "@app/models";
import { filter, map, switchMap } from "rxjs/operators";
import { GroupsService } from "@app/groups";
import { ActivatedRoute } from "@angular/router";

@Component({
  template: `
      <app-group-page
          [group]="group$ | async">
      </app-group-page>
  `,
})
export class GroupComponent implements OnInit {

  group$: Observable<GroupDto> = this.route.paramMap.pipe(
    map(map => map.get('id') || ''),
    filter(id => !!id),
    switchMap((id: string) => this.groups.getOne(id)),
  );

  constructor(
    private groups: GroupsService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

}
