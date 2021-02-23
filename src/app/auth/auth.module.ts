import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {MatCardModule} from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { StoreModule } from '@ngrx/store';
import {AuthService} from './auth.service';
import { EffectsModule } from '@ngrx/effects';
import {authReducer} from './store/reducers';
import {AuthGuard} from './guards/auth.guard';
import {AuthEffects} from './store/effects/auth.effects';

@NgModule({
    imports: [
      CommonModule,
      ReactiveFormsModule,
      MatCardModule,
      MatInputModule,
      MatButtonModule,
      RouterModule.forChild([{path: '', component: LoginComponent}]),
      StoreModule.forFeature('auth', authReducer),
      EffectsModule.forFeature([AuthEffects])
    ],
    declarations: [LoginComponent],
    exports: [LoginComponent]
})
export class AuthModule {
    static forRoot(): ModuleWithProviders<AuthModule> {
        return {
            ngModule: AuthModule,
            providers: [
              AuthService,
              AuthGuard
            ]
        };
    }
}
