import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { DashboardDto, NoteDto } from '@app/models';
import { GroupFacade } from '@app/store/group';
import { map } from 'rxjs/operators';
import { ModalService } from 'am-bulba';
import { NoteMenuModalComponent } from '@app/shared/components/notes/note-menu-modal/note-menu-modal.component';

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
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
  }

  editNote(note: NoteDto) {
    this.modalService.open(NoteMenuModalComponent, note, {
      backgroundClass: 'bg-base-200'
    })
  }
}
