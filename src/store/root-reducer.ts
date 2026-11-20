import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { appProcess } from './app-process/app-process';
import { offersData } from './offers-data/offers-data';
import { userProcess } from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.Data]: offersData.reducer,
  [NameSpace.App]: appProcess.reducer,
  [NameSpace.User]: userProcess.reducer,
});
