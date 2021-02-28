import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {compareLessons, Lesson} from '../../model/lesson';
import {CourseActions, CourseActionTypes} from '../actions/course.actions';

export interface LessonsState extends EntityState<Lesson> {
  loading: boolean;
}

export const adapter = createEntityAdapter<Lesson>({
  sortComparer: compareLessons,
});

export const initialLessonsState = adapter.getInitialState({ pageIndex: 0, pageSize: 3, loading: false });

export function lessonsReducer(state = initialLessonsState, action: CourseActions): LessonsState {
  switch (action.type) {
    case CourseActionTypes.LessonsPageRequested:
      return { ...state, loading: true };

    case CourseActionTypes.LessonsPageLoaded:
      return adapter.addMany(action.payload.lessons, {...state, loading: false});

    case CourseActionTypes.LessonsPageCancelled:
      return { ...state, loading: false };

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
