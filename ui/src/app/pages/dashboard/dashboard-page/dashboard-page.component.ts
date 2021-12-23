import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { DashboardDto, GroupCreateDto, NoteDto } from '@app/models';
import { GroupFacade } from '@app/store/group';
import { map } from 'rxjs/operators';
import { ModalService, ModalSliderComponent } from 'am-bulba';
import { NoteMenuModalComponent } from '@app/shared/components/notes/note-menu-modal/note-menu-modal.component';
import { CreateGroupModalComponent } from '@app/shared/components/groups/create-group-modal/create-group-modal.component';

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
    private facade: GroupFacade,
    private modalService: ModalService,
  ) {
  }

  ngOnInit(): void {
  }

  editNote(note: NoteDto) {
    this.modalService.open(NoteMenuModalComponent, note, {
      backgroundClass: 'bg-base-200',
      containerType: ModalSliderComponent,
    });
  }

  openCreateGroupModal() {
    this.modalService.open<string | undefined>(CreateGroupModalComponent, null, {
      backgroundClass: 'bg-base-200',
    }).subscribe((title) => {
      title && this.createGroup(title);
    });
  }

  private createGroup(title: string) {
    const dto: GroupCreateDto = {
      dashboardId: this.dashboard.id,
      title,
    };
    this.facade.create(dto);
  }
}
