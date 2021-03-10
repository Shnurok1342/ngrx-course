import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromLesson from '../reducers/lessons.reducers';
import {Lesson} from '../../model/lesson';
import {PageQuery} from '../actions/course.actions';
import {LessonsState} from '../reducers/lessons.reducers';

export const filterLessons = (lessons: Lesson[], opts?: { courseId: number, page?: PageQuery }): Lesson[] => {
  if (opts) {
    const lessonsById = (!!opts.courseId || opts.courseId === 0)
      ? lessons.filter(lesson => lesson.courseId === opts.courseId)
      : lessons;
    if (opts.page) {
      const start = opts.page.pageIndex * opts.page.pageSize;
      const end = start + opts.page.pageSize;
      return lessonsById.slice(start, end);
    }
    return lessonsById;
  }
  return lessons;
};

export const selectLessonsState = createFeatureSelector<LessonsState>(fromLesson.LESSONS_FEATURE_KEY);

export const selectLessonsLoading = createSelector(
  selectLessonsState,
  state => state.loading
);

export const selectAllLessons = createSelector(
  selectLessonsState,
  fromLesson.selectAll
);

export const selectLessonsPage = createSelector(
  selectAllLessons,
  (allLessons: Lesson[], props: { courseId: number, page: PageQuery }) => filterLessons(allLessons, props)
);
