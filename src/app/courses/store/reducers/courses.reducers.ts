import {Course} from '../../model/course';
import {EntityState} from '@ngrx/entity';

// Entity Format
// export interface CoursesState {
//   entities: { [key: number]: Course };
//   ids: number[];
// }

export interface CoursesState extends EntityState<Course> {}
