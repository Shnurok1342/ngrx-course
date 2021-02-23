import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store/reducers';
import {filter, finalize, first, tap} from 'rxjs/operators';
import {CoursesActions} from '../store/actions/action-types';
import {areCoursesLoaded} from '../store/selectors/courses.selectors';

@Injectable()
export class CoursesResolver implements Resolve<any> {
  loading = false;

  constructor(private store: Store<AppState>) {}

  resolve(router: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<any> {
    return this.store
      .pipe(
        select(areCoursesLoaded),
        tap(coursesLoaded => {
          if (!this.loading && !coursesLoaded) {
            this.loading = true;
            this.store.dispatch(CoursesActions.loadAllCourses());
          }
        }),
        filter(Boolean),
        first(),
        finalize(() => this.loading = false)
      );
  }
}
