import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {LoginComponent} from './login.component';
import {DebugElement} from '@angular/core';
import {Store} from '@ngrx/store';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../auth.service';
import {MockAuthService} from '../mocks/auth.service.mock';
import {RouterTestingModule} from '@angular/router/testing';
import {of, throwError} from 'rxjs';
import {userMock} from '../mocks/user.mock';
import {Router} from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;
  let store;
  let el: DebugElement;

  beforeEach(waitForAsync(() => {
    const storeSpy = jasmine.createSpyObj('Store', ['dispatch']);
    TestBed.configureTestingModule(({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: Store, useValue: storeSpy }
      ]
    }))
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        authService = TestBed.inject(AuthService);
        router = TestBed.inject(Router);
        store = TestBed.inject(Store);
        el = fixture.debugElement;
      });
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should login and route to /courses page', () => {
    const loginSpy = spyOn(authService, 'login').and.returnValue(of(userMock));
    const navigate = spyOn(router, 'navigateByUrl');
    component.login();
    expect(loginSpy).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith('/courses');
  });

  it('should show alert message if login failed', () => {
    const loginSpy = spyOn(authService, 'login').and.returnValue(throwError(null));
    const navigate = spyOn(router, 'navigateByUrl');
    const alert = spyOn(window, 'alert');
    component.login();
    expect(loginSpy).toHaveBeenCalled();
    expect(store.dispatch).not.toHaveBeenCalled();
    expect(navigate).not.toHaveBeenCalled();
    expect(alert).toHaveBeenCalledWith('Login Failed');
  });
});
