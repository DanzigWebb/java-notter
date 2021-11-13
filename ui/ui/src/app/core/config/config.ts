import { Injectable } from "@angular/core";

@Injectable()
export class Config {
  readonly host = '/api/v1/';
  readonly authHost = '/auth/';
}
