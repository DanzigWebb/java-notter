import { Injectable } from '@angular/core';
import { ModalsData } from '@app/shared/service/modals/modals.type';
import { ModalService } from 'am-bulba';
import { ModalSubmit } from '@app/shared/service/modals/modals';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {

  constructor(
    private modals: ModalService
  ) { }

  submit(data: ModalsData): Observable<boolean> {
    return this.modals.open(ModalSubmit, data)
  }
}
