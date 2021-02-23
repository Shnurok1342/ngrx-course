import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/reducers';
import {finalize, first, tap} from 'rxjs/operators';
import {CoursesActions} from '../store/actions/action-types';

@Injectable()
export class CoursesResolver implements Resolve<any> {
  loading = false;

  constructor(private store: Store<AppState>) {}

  resolve(router: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<any> {
    return this.store
      .pipe(
        tap(() => {
          if (!this.loading) {
            this.loading = true;
            this.store.dispatch(CoursesActions.loadAllCourses());
          }
        }),
        first(),
        finalize(() => this.loading = false)
      );
  }
}
