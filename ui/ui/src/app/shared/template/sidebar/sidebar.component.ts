import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GroupCreateDto, GroupDto } from '@app/models';
import { ModalService } from 'am-bulba';
import { RenameGroupDialog } from './rename-group.dialog';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {

  @Input() groups: GroupDto[] = [];
  @Input() isExpand = true;

  @Output() onExpand = new EventEmitter<boolean>();
  @Output() onCreateGroup = new EventEmitter<GroupCreateDto>();
  @Output() onUpdateGroup = new EventEmitter<GroupDto>();
  @Output() onCheckGroup = new EventEmitter<GroupDto>();
  @Output() onDeleteGroup = new EventEmitter<GroupDto>();

  constructor(
    private modalService: ModalService,
  ) {
  }

  ngOnInit(): void {
  }

  toggle() {
    this.expandEmit(!this.isExpand);
  }

  expand() {
    this.expandEmit(true);
  }

  expandEmit(state: boolean) {
    this.onExpand.emit(state);
  }

  checkEmit(group: GroupDto) {
    this.onCheckGroup.emit(group);
  }

  createEmit(group: GroupCreateDto) {
    this.onCreateGroup.emit(group);
  }

  deleteEmit(group: GroupDto) {
    this.onDeleteGroup.emit(group);
  }

  animEnd(input: HTMLInputElement) {
    if (this.isExpand) {
      input.focus();
    }
  }

  renameGroup(group: GroupDto) {
    this.modalService.open<GroupDto>(RenameGroupDialog, group).pipe(
      filter((group) => !!group),
    ).subscribe(group => {
      this.onUpdateGroup.emit(group);
    });
  }
}
