import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {CoursesHttpService} from '../../services/courses-http.service';
import {catchError, concatMap, map, mergeMap} from 'rxjs/operators';
import {
  AllCoursesCancelled,
  AllCoursesLoaded,
  CourseActionTypes, CourseCancelled,
  CourseLoaded,
  CourseRequested,
  CourseSaved,
  CourseUpdated, LessonsPageCancelled,
  LessonsPageLoaded,
  LessonsPageRequested,
  LoadAllCourses
} from '../actions/course.actions';
import {AppState} from '../../../store/reducers';
import {Store} from '@ngrx/store';
import {of} from 'rxjs';

@Injectable()
export class CoursesEffects {

  @Effect()
  loadCourse$ = this.actions$
    .pipe(
      ofType<CourseRequested>(CourseActionTypes.CourseRequested),
      mergeMap(action => this.coursesHttpService.findCourseByUrl(action.payload.courseUrl)
        .pipe(
          map(course => new CourseLoaded({course})),
          catchError(() => of(new CourseCancelled()))
        )
      ),
    );

  @Effect()
  loadAllCourses$ = this.actions$.pipe(
    ofType<LoadAllCourses>(CourseActionTypes.LoadAllCourses),
    concatMap(() => this.coursesHttpService.findAllCourses()
      .pipe(
        map(courses => new AllCoursesLoaded({courses})),
        catchError(() => of(new AllCoursesCancelled()))
      )
    ),
  );

  @Effect()
  saveCourse$ = this.actions$.pipe(
    ofType<CourseUpdated>(CourseActionTypes.CourseUpdated),
    concatMap(action => this.coursesHttpService.saveCourse(
      action.payload.update.id,
      action.payload.update.changes
    ).pipe(
      map(course => new CourseSaved({ course: { id: course.id, changes: course } })),
      catchError(() => of(new CourseCancelled()))
    ))
  );

  @Effect()
  loadLessonsPage$ = this.actions$.pipe(
    ofType<LessonsPageRequested>(CourseActionTypes.LessonsPageRequested),
    concatMap(action => this.coursesHttpService.findLessons(
      action.payload.courseId,
      action.payload.page.pageIndex,
      action.payload.page.pageSize
    ).pipe(
      catchError(() => {
        this.store.dispatch(new LessonsPageCancelled());
        return of([]);
      })
    )),
    map(lessons => new LessonsPageLoaded({lessons})),

  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private coursesHttpService: CoursesHttpService
  ) {}
}
