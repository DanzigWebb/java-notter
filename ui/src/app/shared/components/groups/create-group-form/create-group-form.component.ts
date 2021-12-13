import { ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { GroupCreateDto } from '@app/models';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-group-form',
  exportAs: 'appCreateGroupForm',
  templateUrl: './create-group-form.component.html',
  styleUrls: ['./create-group-form.component.scss']
})
export class CreateGroupFormComponent implements OnInit {

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

  createGroup() {
    if (this.control.invalid) {
      return;
    }

    const dto: GroupCreateDto = {
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
