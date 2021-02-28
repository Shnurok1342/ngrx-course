import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../model/course';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {Lesson} from '../model/lesson';
import {delay, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {CoursesHttpService} from '../services/courses-http.service';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store/reducers';
import {
  selectAllCourses,
  selectLessonsLoading, selectLessonsPage
} from '../store/selectors/courses.selectors';
import {LessonsPageRequested} from '../store/actions/course.actions';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
      this.course$.pipe(map(c => c.id), distinctUntilChanged()),
      this.pageIndex$,
      this.pageSize$
    ).pipe(
      switchMap(([courseId,  pageIndex, pageSize]) =>
        this.store.pipe(
          select(selectLessonsPage, { courseId, page: {pageIndex, pageSize} }),
          tap(lessons => {
            if (!lessons?.length) {
              this.store.dispatch(new LessonsPageRequested({ courseId, page: {pageIndex, pageSize} }));
            }
          })
        )
      )
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
