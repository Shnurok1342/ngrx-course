import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../model/course';
import {combineLatest, Observable} from 'rxjs';
import {Lesson} from '../model/lesson';
import {map, take, withLatestFrom} from 'rxjs/operators';
import {CoursesHttpService} from '../services/courses-http.service';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store/reducers';
import {
  selectAllCourses,
  selectAllLessons,
  selectLessonPageIndex,
  selectLessonPageSize,
} from '../store/selectors/courses.selectors';
import {LessonsPageRequested, UpdateLessonPageIndex} from '../store/actions/course.actions';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  course$: Observable<Course>;
  lessons$: Observable<Lesson[]>;
  pageIndex$: Observable<number>;
  pageSize$: Observable<number>;
  displayedColumns = ['seqNo', 'description', 'duration'];

  constructor(
    private coursesService: CoursesHttpService,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    const courseUrl = this.route.snapshot.paramMap.get('courseUrl');
    this.course$ = this.store.pipe(
      select(selectAllCourses),
      map(courses => courses.find(c => c.url === courseUrl)),
    );
    this.pageIndex$ = this.store.select(selectLessonPageIndex);
    this.pageSize$ = this.store.select(selectLessonPageSize);

    this.lessons$ = combineLatest(
      this.pageIndex$,
      this.store.select(selectAllLessons)
    ).pipe(
      withLatestFrom(this.pageSize$, this.course$),
      map(([[pageIndex, allLessons], pageSize, course]) => {
        const start = pageIndex * pageSize;
        const end = start + pageSize;

        const lessons = allLessons
          .filter(lesson => lesson.courseId === course.id)
          .slice(start, end);

          if (lessons?.length < pageSize) {
            this.store.dispatch(new LessonsPageRequested({ courseId: course.id, page: {pageIndex, pageSize} }));
          }

          return lessons;
      })
    );
  }

  loadNextPage(): void {
    this.pageIndex$
      .pipe(take(1))
      .subscribe(i => this.updateLessonPageIndex(i + 1));
  }

  loadPreviousPage(): void {
    this.pageIndex$
      .pipe(take(1))
      .subscribe(i => {
        const newPageIndex = i > 0 ? i - 1 : 0;
        this.updateLessonPageIndex(newPageIndex);
      });
  }

  updateLessonPageIndex(pageIndex: number): void {
    this.store.dispatch(new UpdateLessonPageIndex({ pageIndex }));
  }
}
