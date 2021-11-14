import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { GroupDto, NoteCreateDto } from '@app/models';
import { NoteFacade } from '@app/store/note';

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupPageComponent implements OnInit {

  @Input() group: GroupDto | null = null;

  constructor(
    private noteFacade: NoteFacade,
  ) {
  }

  ngOnInit(): void {
  }

  createNote(dto: NoteCreateDto) {
    const note: NoteCreateDto = {...dto, groupId: this.group?.id};
    console.log(note);
    this.noteFacade.create(note);
  }
}
