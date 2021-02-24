import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../model/course';
import {Observable, of} from 'rxjs';
import {Lesson} from '../model/lesson';
import {map} from 'rxjs/operators';
import {CourseEntityService} from '../services/course-entity.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  course$: Observable<Course>;
  lessons$: Observable<Lesson[]>;
  displayedColumns = ['seqNo', 'description', 'duration'];

  constructor(
    private route: ActivatedRoute,
    private coursesService: CourseEntityService
  ) {}

  ngOnInit() {
    const courseUrl = this.route.snapshot.paramMap.get('courseUrl');
    this.course$ = this.coursesService.entities$
      .pipe(
        map(courses => courses.find(c => c.url === courseUrl))
      );
    this.lessons$ = of([]);
  }

  loadLessonsPage(course: Course) {}

}
