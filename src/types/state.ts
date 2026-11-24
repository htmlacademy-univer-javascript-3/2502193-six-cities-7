import { store } from '../store';
import { AuthorizationStatus } from '../const';
import { City, FullOffer, Offer } from './offer';
import { Review } from './review';
import { UserData } from './user-data';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
};

export type AppProcess = {
  city: City;
};

export type OffersData = {
  offers: Offer[];
  favoriteOffers: Offer[];
  isOffersDataLoading: boolean;
  currentOffer: FullOffer | null;
  nearbyOffers: Offer[];
  reviews: Review[];
  isCurrentOfferLoading: boolean;
  isOfferNotFound: boolean;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
