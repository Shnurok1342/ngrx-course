import {createFeatureSelector, createSelector} from '@ngrx/store';
import {adapter, CoursesState} from '../reducers/courses.reducers';
import {LessonsState} from '../reducers/lessons.reducers';
import * as fromLesson from '../reducers/lessons.reducers';

export const selectCoursesState = createFeatureSelector<CoursesState>('courses');

export const selectLessonsState = createFeatureSelector<LessonsState>('lessons');

export const selectAllCourses = createSelector(
  selectCoursesState,
  state => adapter.getSelectors().selectAll(state)
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

export const selectAllLessons = createSelector(
  selectLessonsState,
  fromLesson.selectAll
);
