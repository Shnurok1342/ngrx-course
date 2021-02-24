import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {CoursesActions} from '../actions/action-types';
import {CoursesHttpService} from '../../services/courses-http.service';
import {concatMap, map} from 'rxjs/operators';

@Injectable()
export class CoursesEffects {
  loadCourses$ = createEffect(
    () => this.actions$.pipe(
      ofType(CoursesActions.loadAllCourses),
      concatMap(() => this.coursesHttpService.findAllCourses()),
      map(courses => CoursesActions.allCoursesLoaded({courses}))
    )
  );

  saveCourse$ = createEffect(
    () => this.actions$.pipe(
      ofType(CoursesActions.courseUpdated),
      concatMap(action => this.coursesHttpService.saveCourse(
        action.update.id,
        action.update.changes
      ))
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private coursesHttpService: CoursesHttpService
  ) {}
}
