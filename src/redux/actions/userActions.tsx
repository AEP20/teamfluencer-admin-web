import { User, LOGIN, LOGOUT, UserActionTypes } from '../types';

export const login = (user: User): UserActionTypes => ({
  type: LOGIN,
  payload: user,
});

export const logout = (): UserActionTypes => ({
  type: LOGOUT,
});
