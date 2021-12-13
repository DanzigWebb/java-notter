import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { SignupDto } from "@app/models";
import { UserFacade } from "@app/store/user";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private user: UserFacade,
    private router: Router
  ) {
    this.form = this.createFormGroup();
  }

  ngOnInit(): void {
  }

  private createFormGroup(): FormGroup {
    return this.fb.group({
      login: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data: SignupDto = {
      email: this.form.controls.email?.value,
      name: this.form.controls.login?.value,
      password: this.form.controls.password?.value
    }

    this.user.signup(data).pipe(
      tap(()=> {
        this.router.navigate(['auth/login'])
      }),
      catchError((err) => {
        alert('error')
        return err
      })
    ).subscribe()
  }
}
