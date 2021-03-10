import {courseAdapter, coursesReducer, CoursesState, initialCoursesState} from './courses.reducers';
import {createState} from '../../../testing/utils/store.util';
import {AllCoursesLoaded, CourseLoaded, CourseUpdated} from '../actions/course.actions';
import {coursesMock} from '../../mocks/courses.mock';

describe('CoursesReducer', () => {
  let state: CoursesState;

  beforeEach(() => {
    state = createState(initialCoursesState);
  });

  it('CourseLoaded should add course', () => {
    const courseMock = coursesMock[0];
    const action = new CourseLoaded({ course: courseMock });
    const result = coursesReducer(state, action);
    expect(result.ids.length).toBe(1);
    expect(result.entities[courseMock.id]).toBe(courseMock);
  });

  it('AllCoursesLoaded should add all courses and mark allCoursesLoaded flag', () => {
    const action = new AllCoursesLoaded({ courses: coursesMock });
    const result = coursesReducer(state, action);
    expect(result.ids.length).toBe(coursesMock.length);
    expect(result.allCoursesLoaded).toBeTrue();
  });

  it('CourseUpdated should update course', () => {
    const courseMock = coursesMock[0];
    const updatedCourse = { ...courseMock, description: 'updated description' };
    const stateWithCourse: CoursesState = courseAdapter.addOne(courseMock, state);
    expect(stateWithCourse.ids.length).toBe(1);
    expect(stateWithCourse.entities[courseMock.id]).toBe(courseMock);
    const action = new CourseUpdated({ update: { id: updatedCourse.id, changes: updatedCourse } });
    const result = coursesReducer(stateWithCourse, action);
    expect(result.ids.length).toBe(1);
    expect(result.entities[courseMock.id]).toEqual(updatedCourse);
    expect(result.entities[courseMock.id].description).toBe(updatedCourse.description);
  });

  it('should return the previous state if unknown action', () => {
    const action = {} as any;
    const result = coursesReducer(undefined, action);
    expect(result).toBe(initialCoursesState);
  });
});
