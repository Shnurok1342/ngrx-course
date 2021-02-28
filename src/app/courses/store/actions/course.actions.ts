import {Action} from '@ngrx/store';
import {Course} from '../../model/course';
import {Update} from '@ngrx/entity';
import {Lesson} from '../../model/lesson';

export enum CourseActionTypes {
  CourseRequested = '[View Course Page] Course Requested',
  CourseLoaded = '[Courses API] Course Loaded',
  LoadAllCourses = '[Courses Home Page] Load All Courses',
  AllCoursesLoaded = '[Courses API] All Courses Loaded',
  CourseUpdated = '[Edit Course Dialog] Course Updated',
  CourseSaved = '[Courses API] Course Saved',
  LessonsPageRequested = '[Course Landing Page] Lessons Page Requested',
  LessonsPageLoaded = '[Courses API] Lessons Page Loaded',
  LessonsPageCancelled = '[Courses API] Lessons Page Cancelled'
}

export interface PageQuery {
  pageIndex: number;
  pageSize: number;
}

export class LessonsPageRequested implements Action {
  readonly type = CourseActionTypes.LessonsPageRequested;
  constructor(public payload: {courseId: number, page: PageQuery}) {}
}

export class LessonsPageLoaded implements Action {
  readonly type = CourseActionTypes.LessonsPageLoaded;
  constructor(public payload: {lessons: Lesson[]}) {}
}

export class LessonsPageCancelled implements Action {
  readonly type = CourseActionTypes.LessonsPageCancelled;
}

export class CourseRequested implements Action {
  readonly type = CourseActionTypes.CourseRequested;
  constructor(public payload: { courseUrl: string }) {}
}

export class CourseLoaded implements Action {
  readonly type = CourseActionTypes.CourseLoaded;
  constructor(public payload: { course: Course }) {}
}

export class LoadAllCourses implements Action {
  readonly type = CourseActionTypes.LoadAllCourses;
}

export class AllCoursesLoaded implements Action {
  readonly type = CourseActionTypes.AllCoursesLoaded;
  constructor(public payload: { courses: Course[] }) {}
}

export class CourseUpdated implements Action {
  readonly type = CourseActionTypes.CourseUpdated;
  constructor(public payload: { update: Update<Course> }) {}
}

export class CourseSaved implements Action {
  readonly type = CourseActionTypes.CourseSaved;
  constructor(public payload: { course: Update<Course> }) {}
}

export type CourseActions =
  CourseRequested
  | CourseLoaded
  | LoadAllCourses
  | AllCoursesLoaded
  | CourseUpdated
  | CourseSaved
  | LessonsPageRequested
  | LessonsPageLoaded
  | LessonsPageCancelled;
