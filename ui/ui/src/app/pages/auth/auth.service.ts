import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from "@app/config";
import { LoginDto, LoginDtoResponse, SignupDto } from "@app/models";


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  get host() {
    return this.config.host;
  }

  constructor(
    private http: HttpClient,
    private config: Config,
  ) { }

  signup({name, password, email}: SignupDto) {
    const body = {name, password, email};
    const url = `${this.host}auth/sign-up`;
    return this.http.post(url, body);
  }

  login({name, password}: LoginDto) {
    const body = {name, password};
    const url = `${this.host}auth/sign-in`;
    return this.http.post<LoginDtoResponse>(url, body);
  }
}
