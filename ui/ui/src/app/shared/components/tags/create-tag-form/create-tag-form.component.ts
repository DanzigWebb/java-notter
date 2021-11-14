import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TagCreateDto } from '@app/models';

@Component({
  selector: 'app-create-tag-form',
  templateUrl: './create-tag-form.component.html',
  styleUrls: ['./create-tag-form.component.scss']
})
export class CreateTagFormComponent implements OnInit {

  @Output() create = new EventEmitter<TagCreateDto>();

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.form = this.createFormGroup();
  }

  ngOnInit(): void {
  }

  private createFormGroup(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const data: TagCreateDto = {
      name: this.form.controls.title?.value
    };

    this.create.emit(data)

  }
}
