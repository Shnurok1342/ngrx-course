import {compareCourses, Course} from '../../model/course';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {CourseActions, CourseActionTypes} from '../actions/course.actions';

export const COURSES_FEATURE_KEY = 'courses';

export interface CoursesState extends EntityState<Course> {
  allCoursesLoaded: boolean;
}

export interface CoursesPartialState {
  readonly [COURSES_FEATURE_KEY]: CoursesState;
}

export const courseAdapter = createEntityAdapter<Course>({
  sortComparer: compareCourses,
});
export const initialCoursesState = courseAdapter.getInitialState({
  allCoursesLoaded: false
});

export function coursesReducer(state = initialCoursesState , action: CourseActions): CoursesState {

  switch (action.type) {
    case CourseActionTypes.CourseLoaded:
      return courseAdapter.addOne(action.payload.course, state);

    case CourseActionTypes.AllCoursesLoaded:
      return courseAdapter.addAll(action.payload.courses, {...state, allCoursesLoaded: true});

    case CourseActionTypes.CourseUpdated:
      return courseAdapter.updateOne(action.payload.update, state);

    default: {
      return state;
    }
  }
}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = courseAdapter.getSelectors();
