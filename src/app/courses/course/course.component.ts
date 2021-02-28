import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../model/course';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {Lesson} from '../model/lesson';
import {delay, map} from 'rxjs/operators';
import {CoursesHttpService} from '../services/courses-http.service';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store/reducers';
import {
  selectAllCourses,
  selectAllLessons, selectLessonsLoading
} from '../store/selectors/courses.selectors';
import {LessonsPageRequested} from '../store/actions/course.actions';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  course$: Observable<Course>;
  lessons$: Observable<Lesson[]>;
  loading$: Observable<boolean>;
  pageIndex$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  pageSize$: BehaviorSubject<number> = new BehaviorSubject<number>(3);
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
    this.loading$ = this.store.select(selectLessonsLoading).pipe(delay(0));

    this.lessons$ = combineLatest(
      this.course$,
      this.store.select(selectAllLessons),
      this.pageIndex$,
      this.pageSize$,
    ).pipe(
      map(([course, allLessons, pageIndex, pageSize]) => {
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
    const currentPageIndex = this.pageIndex$.getValue();
    this.updateLessonPageIndex(currentPageIndex + 1);
  }

  loadPreviousPage(): void {
    const currentPageIndex = this.pageIndex$.getValue();
    const newPageIndex = currentPageIndex > 0 ? currentPageIndex - 1 : 0;
    this.updateLessonPageIndex(newPageIndex);
  }

  updateLessonPageIndex(pageIndex: number): void {
    this.pageIndex$.next(pageIndex);
  }
}
