import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ModalContext } from 'am-bulba';
import { NoteDto } from '@app/models';

@Component({
  selector: 'app-note-menu-modal',
  templateUrl: './note-menu-modal.component.html',
  styleUrls: ['./note-menu-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteMenuModalComponent implements OnInit {

  note: NoteDto;

  constructor(
    private context: ModalContext<NoteDto>,
  ) {
    this.note = context.data!;
  }

  ngOnInit(): void {
  }

  close() {
    this.context.close(this.note);
  }

  saveNote() {

  }
}
