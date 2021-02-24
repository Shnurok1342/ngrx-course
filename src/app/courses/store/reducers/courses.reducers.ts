import {compareCourses, Course} from '../../model/course';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {CourseActions, CourseActionTypes} from '../actions/course.actions';

export interface CoursesState extends EntityState<Course> {
  allCoursesLoaded: boolean;
}

export const adapter = createEntityAdapter<Course>({
  sortComparer: compareCourses,
});
export const initialCoursesState = adapter.getInitialState({
  allCoursesLoaded: false
});

export function coursesReducer(state = initialCoursesState , action: CourseActions): CoursesState {

  switch (action.type) {
    case CourseActionTypes.CourseLoaded:
      return adapter.addOne(action.payload.course, state);

    case CourseActionTypes.AllCoursesLoaded:
      return adapter.addAll(action.payload.courses, {...state, allCoursesLoaded: true});

    case CourseActionTypes.CourseUpdated:
      return adapter.updateOne(action.payload.update, state);

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
} = adapter.getSelectors();
