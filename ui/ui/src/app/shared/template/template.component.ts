import { Component, OnInit } from '@angular/core';
import { GroupCreateDto, GroupDto } from '@app/models';
import { GroupsService } from '@app/groups';
import { filter, switchMap } from 'rxjs/operators';
import { ModalContext, ModalService } from "am-bulba";
import { GroupFacade } from '@app/store/group';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
})
export class TemplateComponent implements OnInit {

  groups$: Observable<GroupDto[]> = this.groupsFacade.groups$;

  isExpand = false;

  constructor(
    private groupsService: GroupsService,
    private modalService: ModalService,
    private groupsFacade: GroupFacade
  ) {
  }

  ngOnInit(): void {
  }

  createGroup(dto: GroupCreateDto) {
    this.groupsFacade.create(dto);
  }

  deleteGroup(group: GroupDto) {
    this.modalService.open(SubmitModalComponent, group).pipe(
      filter(Boolean),
      switchMap(() => this.groupsFacade.delete(group.id)),
    ).subscribe();
  }

  updateGroup(group: GroupDto) {
    this.groupsFacade.update(group);
  }
}

@Component({
  template: `
      <h3 class="text-2xl mb-4">Подтверждение</h3>
      <p>Вы уверены, что хотите удалить группу: {{group?.title}}</p>
      <div class="modal-action mt-4">
          <label for="my-modal-2" class="btn btn-primary" (click)="close(true)">Подтвердить</label>
          <label for="my-modal-2" class="btn" (click)="close()">Отменить</label>
      </div>
  `,
})
export class SubmitModalComponent {
  group: GroupDto | undefined;

  constructor(
    public context: ModalContext<GroupDto>,
  ) {
    this.group = context.data;
  }

  close(isSubmit = false) {
    this.context.close(isSubmit);
  }
}
