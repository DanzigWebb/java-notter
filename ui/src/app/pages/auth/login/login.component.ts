import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginDto } from "@app/models";
import { UserFacade } from "@app/store/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private user: UserFacade,
    private router: Router
  ) {
    this.form = this.createFormGroup();
  }

  ngOnInit(): void {
    this.fixError()
  }

  private createFormGroup(): FormGroup {
    return this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const data: LoginDto = {
      login: this.form.controls.login?.value,
      password: this.form.controls.password?.value
    };

    this.user.login(data).pipe(
      tap(() => {
        this.router.navigate(['']);
      }),
      catchError((err) => {
        this.setError();
        return err;
      })
    ).subscribe();
  }

  fixError() {
    const login = this.form.get('login');
    this.form.get('password')?.valueChanges.subscribe(() => {
      if (login?.errors?.invalidLogin) {
        login.setErrors(null)
      }
    })
  }

  setError() {
    const control = this.form.get('login');
    if (control) {
      control.setErrors({invalidLogin: true});
    }
  }
}
