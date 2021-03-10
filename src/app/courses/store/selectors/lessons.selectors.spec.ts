import {initialLessonsState, LESSONS_FEATURE_KEY, lessonsAdapter, LessonsPartialState, LessonsState} from '../reducers/lessons.reducers';
import {createPartialStore} from '../../../testing/utils/store.util';
import {lessonsMock} from '../../mocks/lessons.mock';
import {filterLessons, selectAllLessons, selectLessonsLoading, selectLessonsPage} from './lessons.selectors';
import {PageQuery} from '../actions/course.actions';

describe('LessonsSelectors', () => {
  const key = LESSONS_FEATURE_KEY;
  let state: LessonsPartialState;

  beforeEach(() => {
    state = createPartialStore(key, initialLessonsState);
  });

  it('selectLessonsLoading() should return flag', () => {
    const stateWithLessons: LessonsState = lessonsAdapter.addMany(lessonsMock, initialLessonsState);
    state = createPartialStore(key, stateWithLessons, {loading: true});
    const result = selectLessonsLoading(state);
    expect(result).toBeTrue();
  });

  it('selectAllLessons() should return all existed lessons', () => {
    const stateWithLessons: LessonsState = lessonsAdapter.addMany(lessonsMock, initialLessonsState);
    state = createPartialStore(key, stateWithLessons);
    const result = selectAllLessons(state);
    expect(result).toEqual(lessonsMock);
  });

  it('selectLessonsPage() should return lessons filtered by courseId and page', () => {
    const page: PageQuery = { pageIndex: 0, pageSize: 2 };
    const courseId = 5;
    const filterOptions = { page, courseId };
    const stateWithLessons: LessonsState = lessonsAdapter.addMany(lessonsMock, initialLessonsState);
    const expectedLessons = filterLessons(lessonsMock, filterOptions);
    state = createPartialStore(key, stateWithLessons);
    const result = selectLessonsPage(state, filterOptions);
    expect(result).toEqual(expectedLessons);
  });
});
