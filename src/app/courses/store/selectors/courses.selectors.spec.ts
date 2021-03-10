import {courseAdapter, COURSES_FEATURE_KEY, CoursesPartialState, CoursesState, initialCoursesState} from '../reducers/courses.reducers';
import {createPartialStore} from '../../../testing/utils/store.util';
import {coursesMock} from '../../mocks/courses.mock';
import {areCoursesLoaded, selectAdvancedCourses, selectAllCourses, selectBeginnerCourses, selectPromoTotal} from './courses.selectors';

describe('CoursesSelectors', () => {
  const key = COURSES_FEATURE_KEY;
  let state: CoursesPartialState;

  beforeEach(() => {
    state = createPartialStore(key, initialCoursesState);
  });

  it('selectAllCourses() should return all existed courses', () => {
    const stateWithCourses: CoursesState = courseAdapter.addMany(coursesMock, initialCoursesState);
    state = createPartialStore(key, stateWithCourses);
    const result = selectAllCourses(state);
    expect(result).toBeTruthy();
    expect(result).toEqual(coursesMock);
  });

  it('selectBeginnerCourses() should return only beginner courses', () => {
    const beginnerCourses = coursesMock.filter(c => c.category === 'BEGINNER');
    const stateWithCourses: CoursesState = courseAdapter.addMany(coursesMock, initialCoursesState);
    state = createPartialStore(key, stateWithCourses);
    const result = selectBeginnerCourses(state);
    expect(result).toBeTruthy();
    expect(result).toEqual(beginnerCourses);
  });

  it('selectAdvancedCourses() should return only advanced courses', () => {
    const advancedCourses = coursesMock.filter(c => c.category === 'ADVANCED');
    const stateWithCourses: CoursesState = courseAdapter.addMany(coursesMock, initialCoursesState);
    state = createPartialStore(key, stateWithCourses);
    const result = selectAdvancedCourses(state);
    expect(result).toBeTruthy();
    expect(result).toEqual(advancedCourses);
  });

  it('selectPromoTotal() should return number of promo', () => {
    const promoTotal = coursesMock.filter(c => c.promo).length;
    const stateWithCourses: CoursesState = courseAdapter.addMany(coursesMock, initialCoursesState);
    state = createPartialStore(key, stateWithCourses);
    const result = selectPromoTotal(state);
    expect(result).toBe(promoTotal);
  });

  it('areCoursesLoaded() should return flag', () => {
    const stateWithCourses: CoursesState = courseAdapter.addMany(coursesMock, initialCoursesState);
    state = createPartialStore(key, stateWithCourses, { allCoursesLoaded: true});
    const result = areCoursesLoaded(state);
    expect(result).toBeTrue();
  });
});
