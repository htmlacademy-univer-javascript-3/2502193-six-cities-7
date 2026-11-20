import { NameSpace } from '../../const';
import { City } from '../../types/offer';
import { State } from '../../types/state';

export const selectCurrentCity = (state: State): City => state[NameSpace.App].city;
