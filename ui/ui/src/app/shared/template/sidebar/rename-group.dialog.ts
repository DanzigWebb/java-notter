import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { ModalContext } from "am-bulba";
import { GroupCreateDto, GroupDto } from "@app/models";
import { CreateGroupFormComponent } from "@app/groups";

@Component({
  template: `
      <h3 class="text-2xl mb-4">Переименовать группу</h3>
      <app-create-group-form
          #groupForm="appCreateGroupForm"
          (onCreateGroup)="close($event)"
      >
      </app-create-group-form>
  `,
})
export class RenameGroupDialog implements AfterViewInit {

  @ViewChild('groupForm') groupForm!: CreateGroupFormComponent;

  group: GroupDto | undefined;

  constructor(
    public context: ModalContext<GroupDto>,
  ) {
    this.group = context.data;
  }

  ngAfterViewInit() {
    this.groupForm.control.setValue(this.group?.title);
    this.groupForm.input.focus();
    this.groupForm.detectChanges();
  }

  close(group: GroupCreateDto) {
    this.context.close({...this.group, title: group.title})
  }
}
