import {Course} from '../../model/course';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, on} from '@ngrx/store';
import {CoursesActions} from '../actions/action-types';

export interface CoursesState extends EntityState<Course> {}

export const adapter = createEntityAdapter<Course>();
export const initialCoursesState = adapter.getInitialState();

export const coursesReducer = createReducer(
  initialCoursesState,
  on(CoursesActions.allCoursesLoaded,
    (state, action) => adapter.addAll(action.courses, state))
);
