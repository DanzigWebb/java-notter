import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { GroupDto, NoteCreateDto, NoteDto, UpdateOrderDto } from '@app/models';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { NoteFacade } from '@app/store/note';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-group-card',
  templateUrl: './group-card.component.html',
  styleUrls: ['./group-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupCardComponent implements OnInit, OnChanges {

  @Input() group: GroupDto | undefined;

  @Output() onClickNote = new EventEmitter<NoteDto>();

  notes: NoteDto[] = [];

  constructor(
    private noteFacade: NoteFacade,
  ) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.group) {
      if (this.group?.notes.length) {
        this.notes = [...this.group.notes].sort(
          (a, b) => (a.order || 0) - (b.order || 0)
        );
      }
    }
  }

  dropNote(event: CdkDragDrop<NoteDto[], any>) {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );

    const dto: UpdateOrderDto[] = event.container.data.map((todo, index) => ({
      entityId: todo.id,
      order: index
    }));

    this.noteFacade.updateNoteOrder(dto);
  }

  createNote(dto: NoteCreateDto) {
    const note = {...dto, groupId: this.group!.id};
    this.noteFacade.create(note).pipe(tap(data => {
      console.log(data);
    })).subscribe()
  }
}
