import { catchError } from 'rxjs/operators';
import { AppService } from './app.service';

export function initData(service: AppService) {
  return () => new Promise(((resolve) => {
    service.init().pipe(
      catchError(err => {
        resolve(err);
        return err;
      })
    ).subscribe(resolve);
  }));
}
