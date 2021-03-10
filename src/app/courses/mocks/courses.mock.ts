import {Course} from '../model/course';

export const coursesMock: Course[] = [
  {
    id: 1,
    description: 'Serverless Angular with Firebase Course',
    longDescription: 'Serveless Angular with Firestore, Firebase Storage & Hosting, Firebase Cloud Functions & AngularFire',
    iconUrl: 'https://s3-us-west-1.amazonaws.com/angular-university/course-images/serverless-angular-small.png',
    lessonsCount: 10,
    category: 'BEGINNER',
    seqNo: 1,
    url: 'serverless-angular'
  },
  {
    id: 2,
    description: 'Angular Core Deep Dive',
    longDescription: 'A detailed walk-through of the most important part of Angular - the Core and Common modules',
    iconUrl: 'https://s3-us-west-1.amazonaws.com/angular-university/course-images/angular-core-in-depth-small.png',
    lessonsCount: 10,
    category: 'BEGINNER',
    seqNo: 2,
    promo: true,
    url: 'angular-core-course'
  },
  {
    id: 3,
    description: 'NgRx (with NgRx Data) - The Complete Guide',
    longDescription: 'Learn the modern Ngrx Ecosystem, including NgRx Data, Store, Effects, Router Store, Ngrx Entity, and Dev Tools.',
    iconUrl: 'https://angular-university.s3-us-west-1.amazonaws.com/course-images/ngrx-v2.png',
    category: 'BEGINNER',
    lessonsCount: 10,
    seqNo: 3,
    url: 'ngrx-course'
  },
  {
    id: 4,
    description: 'Angular Advanced Library Laboratory: Build Your Own Library',
    longDescription: 'Learn Advanced Angular functionality typically used in Library Development. Advanced Components, Directives, Testing, Npm',
    iconUrl: 'https://angular-academy.s3.amazonaws.com/thumbnails/advanced_angular-small-v3.png',
    category: 'ADVANCED',
    seqNo: 4,
    url: 'angular-advanced-course'
  }
];
