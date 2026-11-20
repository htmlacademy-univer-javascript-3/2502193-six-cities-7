import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { FullOffer, Offer } from '../../types/offer';
import { Review } from '../../types/review';
import { State } from '../../types/state';
import { selectCurrentCity } from '../app-process/selectors';

export const selectOffers = (state: State): Offer[] => state[NameSpace.Data].offers;

export const selectIsOffersDataLoading = (state: State): boolean =>
  state[NameSpace.Data].isOffersDataLoading;

export const selectCurrentOffer = (state: State): FullOffer | null =>
  state[NameSpace.Data].currentOffer;

export const selectNearbyOffers = (state: State): Offer[] =>
  state[NameSpace.Data].nearbyOffers;

export const selectReviews = (state: State): Review[] =>
  state[NameSpace.Data].reviews;

export const selectIsCurrentOfferLoading = (state: State): boolean =>
  state[NameSpace.Data].isCurrentOfferLoading;

export const selectIsOfferNotFound = (state: State): boolean =>
  state[NameSpace.Data].isOfferNotFound;

export const selectCurrentCityOffers = createSelector(
  [selectOffers, selectCurrentCity],
  (offers, currentCity) => offers.filter((offer) => offer.city.name === currentCity.name)
);

export const selectFavoriteOffers = createSelector(
  [selectOffers],
  (offers) => offers.filter((offer) => offer.isFavorite)
);

export const selectSortedReviews = createSelector(
  [selectReviews],
  (reviews) =>
    [...reviews]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10)
);
