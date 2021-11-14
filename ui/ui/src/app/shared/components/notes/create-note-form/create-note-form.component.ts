import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { GroupCreateDto, NoteCreateDto } from '@app/models';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-note-form',
  templateUrl: './create-note-form.component.html',
  styleUrls: ['./create-note-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateNoteFormComponent implements OnInit {

  @ViewChild('input') private inputEl!: ElementRef;

  @Output() onCreateGroup = new EventEmitter<GroupCreateDto>();

  control = new FormControl('', Validators.required);

  get input(): HTMLInputElement {
    return this.inputEl.nativeElement;
  }

  constructor(
    private ref: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
  }

  createNote() {
    if (this.control.invalid) {
      return;
    }

    const dto: NoteCreateDto = {
      title: this.control.value
    };

    this.createEmit(dto);
    this.control.reset();
  }

  detectChanges() {
    this.ref.detectChanges();
  }

  private createEmit(group: GroupCreateDto) {
    this.onCreateGroup.emit(group);
  }

}
