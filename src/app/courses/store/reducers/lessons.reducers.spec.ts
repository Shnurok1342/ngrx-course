import {initialLessonsState, lessonsReducer, LessonsState} from './lessons.reducers';
import {createState} from '../../../testing/utils/store.util';
import {LessonsPageCancelled, LessonsPageLoaded, LessonsPageRequested} from '../actions/course.actions';
import {lessonsMock} from '../../mocks/lessons.mock';

describe('LessonsReducer', () => {
  let state: LessonsState;

  beforeEach(() => {
    state = createState(initialLessonsState);
  });

  it('LessonsPageRequested should set loading flag to true', () => {
    const action = new LessonsPageRequested({ courseId: 1, page: { pageSize: 3, pageIndex: 0 } });
    expect(state.loading).toBeFalse();
    const result = lessonsReducer(state, action);
    expect(result.loading).toBeTrue();
  });

  it('LessonsPageCancelled should set loading flag to false', () => {
    const action = new LessonsPageCancelled();
    const stateWithLoading: LessonsState = createState(state, {loading: true});
    expect(stateWithLoading.loading).toBeTrue();
    const result = lessonsReducer(stateWithLoading, action);
    expect(result.loading).toBeFalse();
  });

  it('LessonsPageLoaded should add lessons and set loading flag to false', () => {
    const action = new LessonsPageLoaded({ lessons: lessonsMock });
    const stateWithLoading: LessonsState = createState(state, {loading: true});
    expect(stateWithLoading.loading).toBeTrue();
    const result = lessonsReducer(stateWithLoading, action);
    expect(result.loading).toBeFalse();
    expect(result.ids).toHaveSize(lessonsMock.length);
  });

  it('should return the previous state if unknown action', () => {
    const action = {} as any;
    const result = lessonsReducer(undefined, action);
    expect(result).toBe(initialLessonsState);
  });
});
