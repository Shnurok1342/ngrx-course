import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {compareLessons, Lesson} from '../../model/lesson';
import {CourseActions, CourseActionTypes} from '../actions/course.actions';

export interface LessonsState extends EntityState<Lesson> {

}

export const adapter = createEntityAdapter<Lesson>({
  sortComparer: compareLessons,
});

export const initialLessonsState = adapter.getInitialState();

export function lessonsReducer(state = initialLessonsState, action: CourseActions): LessonsState {
  switch (action.type) {
    case CourseActionTypes.LessonsPageLoaded:
      return adapter.addMany(action.payload.lessons, state);
    default:
      return state;
  }
}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();
