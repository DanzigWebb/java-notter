import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TagCreateDto } from '@app/models';
import { TagFacade } from '@app/store/tag';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-create-tag-form',
  templateUrl: './create-tag-form.component.html',
  styleUrls: ['./create-tag-form.component.scss']
})
export class CreateTagFormComponent implements OnInit {

  @Output() onCreate = new EventEmitter<TagCreateDto>();

  colors$ = this.tags.state$.pipe(
    map(state => state.colors)
  )
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tags: TagFacade,
  ) {
    this.form = this.createFormGroup();
  }

  ngOnInit(): void {
  }

  private createFormGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      color: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data: TagCreateDto = {
      name: this.form.controls.name?.value,
      color: this.form.controls.color?.value,
    };

    this.onCreate.emit(data);
    this.form.reset();
  }
}
