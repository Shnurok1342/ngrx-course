import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {Store} from '@ngrx/store';
import { AppState } from '../../store/reducers';
import { isLoggedIn } from '../store/selectors/auth-selectors';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private store: Store<AppState>
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(isLoggedIn).pipe(
      tap(loggedIn => {
        if (!loggedIn) {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }
}
