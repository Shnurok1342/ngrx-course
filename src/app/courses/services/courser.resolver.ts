import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store/reducers';
import {filter, finalize, first, tap} from 'rxjs/operators';
import {areCoursesLoaded} from '../store/selectors/courses.selectors';
import {LoadAllCourses} from '../store/actions/course.actions';

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
            this.store.dispatch(new LoadAllCourses());
          }
        }),
        filter(Boolean),
        first(),
        finalize(() => this.loading = false)
      );
  }
}
