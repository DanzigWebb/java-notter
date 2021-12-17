import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ModalContext } from 'am-bulba';
import { NoteDto, TagDto } from '@app/models';
import { NoteFacade } from '@app/store/note';
import { TagFacade } from '@app/store/tag';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-note-menu-modal',
  templateUrl: './note-menu-modal.component.html',
  styleUrls: ['./note-menu-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteMenuModalComponent implements OnInit {

  note: NoteDto;
  tags: TagDto[] = [];

  constructor(
    private context: ModalContext<NoteDto>,
    private notes: NoteFacade,
    private tagFacade: TagFacade,
  ) {
    this.note = this.cloneNote(context.data!);
  }

  ngOnInit(): void {
    this.tagFacade.tags$.pipe(
      take(1)
    ).subscribe(tags => this.tags = tags)
  }

  close() {
    this.context.close(this.note);
  }

  saveNote(dto: NoteDto) {
    this.note.tags = this.normalizeTags(this.note.tags)
    this.notes.update(dto);
  }

  private normalizeTags(ids: any[]): TagDto[] {
    if (!Array.isArray(ids)) {
      return [];
    }

    return ids.reduce((acc, id) => {
      const tag = this.tags.find(t => t.id === id);
      if (tag) {
        acc.push(tag);
      }

      return acc;
    }, [] as TagDto[]);
  }

  private cloneNote(note: NoteDto) {
    const todos = note.todos.map(t => ({...t}));
    return {...note, todos};
  }
}
