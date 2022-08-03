import { Action, createReducer, on } from '@ngrx/store';
import * as AuthAction from './auth.actions';

export interface State {
  isLogged: boolean;
}

const initialState: State = {
  isLogged: false,
};

const __AuthReducer = createReducer(
  initialState,
  on(AuthAction.Login, (state, action) => {
    return {
      ...state,
      isLogged: true,
    };
  }),
  on(AuthAction.Logout, (state, action) => {
    return {
      ...state,
      isLogged: false,
    };
  })
);

export function AuthReducer(state: State, action: Action) {
  return __AuthReducer(state, action);
}
