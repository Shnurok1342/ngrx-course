import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../model/course';
import {Observable} from 'rxjs';
import {Lesson} from '../model/lesson';
import {map, tap, withLatestFrom} from 'rxjs/operators';
import {CoursesHttpService} from '../services/courses-http.service';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store/reducers';
import {selectAllCourses, selectAllLessons} from '../store/selectors/courses.selectors';
import {LessonsPageRequested, PageQuery} from '../store/actions/course.actions';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  course$: Observable<Course>;
  lessons$: Observable<Lesson[]>;
  displayedColumns = ['seqNo', 'description', 'duration'];
  nextPage = 0;

  constructor(
    private coursesService: CoursesHttpService,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    const courseUrl = this.route.snapshot.paramMap.get('courseUrl');
    this.course$ = this.store.pipe(
      select(selectAllCourses),
      map(courses => courses.find(c => c.url === courseUrl))
    );
    this.lessons$ = this.store
      .pipe(
        select(selectAllLessons),
        withLatestFrom(this.course$),
        tap(([lessons, course]) => {
          if (this.nextPage === 0) {
            this.loadLessonsPage(course);
          }
        }),
        map(([lessons, course]) => lessons.filter(l => l.courseId === course.id))
      );
  }

  loadLessonsPage(course: Course): void {
    const page: PageQuery = {
      pageIndex: this.nextPage,
      pageSize: 3
    };
    this.store.dispatch(new LessonsPageRequested({ courseId: course.id, page }));
    this.nextPage = this.nextPage + 1;
  }
}
