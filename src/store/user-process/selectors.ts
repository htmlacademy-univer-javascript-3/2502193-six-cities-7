import { AuthorizationStatus, NameSpace } from '../../const';
import { State } from '../../types/state';
import { UserData } from '../../types/user-data';

export const selectAuthorizationStatus = (state: State): AuthorizationStatus =>
  state[NameSpace.User].authorizationStatus;

export const selectUserData = (state: State): UserData | null =>
  state[NameSpace.User].userData;
