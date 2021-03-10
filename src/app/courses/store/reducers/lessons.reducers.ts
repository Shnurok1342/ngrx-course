import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {compareLessons, Lesson} from '../../model/lesson';
import {CourseActions, CourseActionTypes} from '../actions/course.actions';

export const LESSONS_FEATURE_KEY = 'lessons';

export interface LessonsState extends EntityState<Lesson> {
  loading: boolean;
}

export interface LessonsPartialState {
  readonly [LESSONS_FEATURE_KEY]: LessonsState;
}

export const lessonsAdapter = createEntityAdapter<Lesson>({
  sortComparer: compareLessons,
});

export const initialLessonsState = lessonsAdapter.getInitialState({ loading: false });

export function lessonsReducer(state = initialLessonsState, action: CourseActions): LessonsState {
  switch (action.type) {
    case CourseActionTypes.LessonsPageRequested:
      return { ...state, loading: true };

    case CourseActionTypes.LessonsPageLoaded:
      return lessonsAdapter.addMany(action.payload.lessons, {...state, loading: false});

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
} = lessonsAdapter.getSelectors();
