import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ModalContext } from 'am-bulba';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-group-modal',
  templateUrl: './create-group-modal.component.html',
  styleUrls: ['./create-group-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateGroupModalComponent implements OnInit {

  control = new FormControl('', Validators.required);

  constructor(
    private context: ModalContext<null>,
  ) {
  }

  ngOnInit(): void {
  }

  submit() {
    if (!this.control.value) {
      this.control.markAsTouched();
      return;
    }

    this.context.close(this.control.value);
  }

  close() {
    this.context.close();
  }
}
