import {Request, Response} from 'express';
import {LESSONS} from './db-data';

export function searchLessons(req: Request, res: Response) {
  console.log('Searching for lessons ...');
  const error = false;
  if (error) {
    console.log('ERROR loading lessons!');
    res.status(500).json({message: 'random error occured.'});
  } else {
    const queryParams: {
      courseId: string;
      filter?: string;
      sortOrder?: string;
      pageNumber?: string;
      pageSize?: string
    } = req.query;
    const courseId = queryParams.courseId;
    const filter = queryParams.filter || '';
    const sortOrder = queryParams.sortOrder || 'asc';
    const pageNumber = parseInt(queryParams.pageNumber, 10) || 0;
    const pageSize = parseInt(queryParams.pageSize, 10);

    let lessons = Object.values(LESSONS)
      .filter(lesson => lesson.courseId.toString() === courseId)
      .sort((l1, l2) => l1.id - l2.id);

    if (filter) {
      lessons = lessons
        .filter(lesson => lesson.description.trim().toLowerCase().search(filter.toLowerCase()) >= 0);
    }

    if (sortOrder === 'desc') {
      lessons = lessons.reverse();
    }

    const initialPos = pageNumber * pageSize;
    const lessonsPage = lessons.slice(initialPos, initialPos + pageSize);
    console.log(`Retrieving lessons page starting at position ${initialPos}, page size ${pageSize} for course ${courseId}`);

    res.status(200).json(lessonsPage);
  }
}
