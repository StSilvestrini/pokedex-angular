import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as AuthAction from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  loginMode = true;
  constructor(private store: Store<fromApp.AppState>) {}

  switchAuth() {
    this.loginMode = !this.loginMode;
  }

  onSubmit() {
    this.store.dispatch(AuthAction.Login());
  }
}
