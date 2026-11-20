import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CITIES, NameSpace } from '../../const';
import { AppProcess } from '../../types/state';
import { City } from '../../types/offer';

const initialState: AppProcess = {
  city: CITIES[0],
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    },
  },
});

export const { changeCity } = appProcess.actions;
