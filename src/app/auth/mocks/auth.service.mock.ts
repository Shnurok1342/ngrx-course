import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {User} from '../model/user.model';

@Injectable()
export class MockAuthService {
  login(email: string, password: string): Observable<User> {
    return of(null);
  }
}
