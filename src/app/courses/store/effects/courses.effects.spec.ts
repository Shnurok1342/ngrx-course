import {Action, Store} from '@ngrx/store';
import {Observable, of, throwError} from 'rxjs';
import {COURSES_FEATURE_KEY, CoursesPartialState, initialCoursesState} from '../reducers/courses.reducers';
import {initialLessonsState, LESSONS_FEATURE_KEY, LessonsPartialState} from '../reducers/lessons.reducers';
import {CoursesEffects} from './courses.effects';
import {CoursesHttpService} from '../../services/courses-http.service';
import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {provideMockStore} from '@ngrx/store/testing';
import {CoursesHttpServiceMock} from '../../mocks/services/courses-http.service.mock';
import {hot} from 'jasmine-marbles';
import {
  AllCoursesCancelled,
  AllCoursesLoaded,
  CourseCancelled,
  CourseLoaded,
  CourseRequested, CourseSaved, CourseUpdated, LessonsPageCancelled, LessonsPageLoaded, LessonsPageRequested,
  LoadAllCourses, PageQuery
} from '../actions/course.actions';
import {coursesMock} from '../../mocks/courses.mock';
import {filterLessons} from '../selectors/lessons.selectors';
import {lessonsMock} from '../../mocks/lessons.mock';

describe('CoursesEffects', () => {
  let store: Store<CoursesPartialState & LessonsPartialState>;
  let effects: CoursesEffects;
  let actions$: Observable<Action>;
  let coursesHttp: CoursesHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        CoursesEffects,
        provideMockActions(() => actions$),
        provideMockStore({
          initialState: {
            [COURSES_FEATURE_KEY]: initialCoursesState,
            [LESSONS_FEATURE_KEY]: initialLessonsState,
          }
        }),
        { provide: CoursesHttpService, useClass: CoursesHttpServiceMock }
      ]
    });
    effects = TestBed.inject(CoursesEffects);
    coursesHttp = TestBed.inject(CoursesHttpService);
    store = TestBed.inject(Store);
  });

  describe('loadCourse$', () => {
    it('should load course by id and return new Action CourseLoaded', () => {
      const course = coursesMock[0];
      spyOn(coursesHttp, 'findCourseByUrl').and.returnValue(of(course));
      actions$ = hot('-a-|', { a: new CourseRequested({ courseUrl: course.url }) });
      const expectedAction = hot('-a-|', { a: new CourseLoaded({ course }) });
      expect(effects.loadCourse$).toBeObservable(expectedAction);
      expect(coursesHttp.findCourseByUrl).toHaveBeenCalledWith(course.url);
    });

    it('should error out and return new Action CourseCancelled', () => {
      const course = coursesMock[0];
      spyOn(coursesHttp, 'findCourseByUrl').and.returnValue(throwError(null));
      actions$ = hot('-a-|', { a: new CourseRequested({ courseUrl: course.url }) });
      const expectedAction = hot('-a-|', { a: new CourseCancelled() });
      expect(effects.loadCourse$).toBeObservable(expectedAction);
      expect(coursesHttp.findCourseByUrl).toHaveBeenCalledWith(course.url);
    });
  });

  describe('loadAllCourses', () => {
    it('should load all courses return new Action AllCoursesLoaded', () => {
      spyOn(coursesHttp, 'findAllCourses').and.returnValue(of(coursesMock));
      actions$ = hot('-a-|', { a: new LoadAllCourses() });
      const expectedAction = hot('-a-|', { a: new AllCoursesLoaded({ courses: coursesMock }) });
      expect(effects.loadAllCourses$).toBeObservable(expectedAction);
      expect(coursesHttp.findAllCourses).toHaveBeenCalled();
    });

    it('should error out and return new Action AllCoursesCancelled', () => {
      spyOn(coursesHttp, 'findAllCourses').and.returnValue(throwError(null));
      actions$ = hot('-a-|', { a: new LoadAllCourses() });
      const expectedAction = hot('-a-|', { a: new AllCoursesCancelled() });
      expect(effects.loadAllCourses$).toBeObservable(expectedAction);
      expect(coursesHttp.findAllCourses).toHaveBeenCalled();
    });
  });

  describe('saveCourse$', () => {
    it('should save course out and return new Action CourseSaved', () => {
      const course = coursesMock[0];
      spyOn(coursesHttp, 'saveCourse').and.returnValue(of(course));
      actions$ = hot('-a-|', { a: new CourseUpdated({ update: { id: course.id, changes: course } }) });
      const expectedAction = hot('-a-|', { a: new CourseSaved({ course: { id: course.id, changes: course } }) });
      expect(effects.saveCourse$).toBeObservable(expectedAction);
      expect(coursesHttp.saveCourse).toHaveBeenCalledWith(course.id, course);
    });

    it('should error out and return new Action CourseCancelled', () => {
      const course = coursesMock[0];
      spyOn(coursesHttp, 'saveCourse').and.returnValue(throwError(null));
      actions$ = hot('-a-|', { a: new CourseUpdated({ update: { id: course.id, changes: course } }) });
      const expectedAction = hot('-a-|', { a: new CourseCancelled() });
      expect(effects.saveCourse$).toBeObservable(expectedAction);
      expect(coursesHttp.saveCourse).toHaveBeenCalled();
    });
  });

  describe('loadLessonsPage$', () => {
    it('should load lessons and return new Action LessonsPageLoaded', () => {
      const page: PageQuery = { pageIndex: 0, pageSize: 2 };
      const courseId = 5;
      const filterOptions = { page, courseId };
      const lessons = filterLessons(lessonsMock, filterOptions);
      spyOn(coursesHttp, 'findLessons').and.returnValue(of(lessons));
      actions$ = hot('-a-|', { a: new LessonsPageRequested(filterOptions) });
      const expectedAction = hot('-a-|', { a: new LessonsPageLoaded({lessons}) });
      expect(effects.loadLessonsPage$).toBeObservable(expectedAction);
      expect(coursesHttp.findLessons).toHaveBeenCalledWith(courseId, page.pageIndex, page.pageSize);
    });

    it('should return empty array and call LessonsPageLoaded if request is failed', () => {
      const page: PageQuery = { pageIndex: 0, pageSize: 2 };
      const courseId = 5;
      const filterOptions = { page, courseId };
      spyOn(coursesHttp, 'findLessons').and.returnValue(throwError(null));
      spyOn(store, 'dispatch');
      actions$ = hot('-a-|', { a: new LessonsPageRequested(filterOptions) });
      const expectedAction = hot('-a-|', { a: new LessonsPageLoaded({lessons: []}) });
      expect(effects.loadLessonsPage$).toBeObservable(expectedAction);
      expect(store.dispatch).toHaveBeenCalledWith(new LessonsPageCancelled());
      expect(coursesHttp.findLessons).toHaveBeenCalledWith(courseId, page.pageIndex, page.pageSize);
    });
  });
});
