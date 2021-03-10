import {createFeatureSelector, createSelector} from '@ngrx/store';
import {courseAdapter, COURSES_FEATURE_KEY, CoursesState} from '../reducers/courses.reducers';

export const selectCoursesState = createFeatureSelector<CoursesState>(COURSES_FEATURE_KEY);

export const selectAllCourses = createSelector(
  selectCoursesState,
  state => courseAdapter.getSelectors().selectAll(state)
);

export const selectBeginnerCourses = createSelector(
  selectAllCourses,
  courses => courses.filter(c => c.category === 'BEGINNER')
);

export const selectAdvancedCourses = createSelector(
  selectAllCourses,
  courses => courses.filter(c => c.category === 'ADVANCED')
);

export const selectPromoTotal = createSelector(
  selectAllCourses,
  courses => courses.filter(c => c.promo).length
);

export const areCoursesLoaded = createSelector(
  selectCoursesState,
  state => state.allCoursesLoaded
);
