import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AuthService} from '../auth.service';
import {tap} from 'rxjs/operators';
import {noop} from 'rxjs';
import {Router} from '@angular/router';
import { AuthState } from '../store/reducers';
import {Login} from '../store/actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
      private fb: FormBuilder,
      private auth: AuthService,
      private router: Router,
      private store: Store<AuthState>
  ) {

      this.form = fb.group({
          email: ['test@angular-university.io', [Validators.required]],
          password: ['test', [Validators.required]]
      });


  }

  ngOnInit() {

  }

  login() {
    const formVal = this.form.value;
    this.auth.login(formVal.email, formVal.password)
      .pipe(
        tap(user => {
          this.store.dispatch(new Login({ user }));
          this.router.navigateByUrl('/courses');
        })
      )
      .subscribe(
        noop,
        () => alert('Login Failed')
      );
  }

}
