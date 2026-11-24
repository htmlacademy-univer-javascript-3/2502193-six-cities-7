import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { OffersData } from '../../types/state';
import {
  changeFavoriteStatusAction,
  fetchFavoritesAction,
  fetchOfferAction,
  fetchOffersAction,
  logoutAction,
  postCommentAction,
} from '../api-actions';

const initialState: OffersData = {
  offers: [],
  favoriteOffers: [],
  isOffersDataLoading: false,
  currentOffer: null,
  nearbyOffers: [],
  reviews: [],
  isCurrentOfferLoading: false,
  isOfferNotFound: false,
};

export const offersData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    setOfferNotFoundStatus: (state, action: PayloadAction<boolean>) => {
      state.isOfferNotFound = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersDataLoading = false;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
      })
      .addCase(changeFavoriteStatusAction.fulfilled, (state, action) => {
        const updatedOffer = action.payload;

        const offerIndex = state.offers.findIndex((offer) => offer.id === updatedOffer.id);
        if (offerIndex !== -1) {
          state.offers[offerIndex].isFavorite = updatedOffer.isFavorite;
        }

        const nearbyIndex = state.nearbyOffers.findIndex((offer) => offer.id === updatedOffer.id);
        if (nearbyIndex !== -1) {
          state.nearbyOffers[nearbyIndex].isFavorite = updatedOffer.isFavorite;
        }

        if (state.currentOffer && state.currentOffer.id === updatedOffer.id) {
          state.currentOffer.isFavorite = updatedOffer.isFavorite;
        }

        if (updatedOffer.isFavorite) {
          state.favoriteOffers.push(updatedOffer);
        } else {
          state.favoriteOffers = state.favoriteOffers.filter(
            (offer) => offer.id !== updatedOffer.id
          );
        }
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.favoriteOffers = [];
        if (state.currentOffer) {
          state.currentOffer.isFavorite = false;
        }
        state.nearbyOffers.forEach((offer) => {
          offer.isFavorite = false;
        });
      })
      .addCase(fetchOfferAction.pending, (state) => {
        state.isCurrentOfferLoading = true;
        state.isOfferNotFound = false;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.currentOffer = action.payload.offer;
        state.nearbyOffers = action.payload.nearbyOffers;
        state.reviews = action.payload.reviews;
        state.isCurrentOfferLoading = false;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.isCurrentOfferLoading = false;
        state.isOfferNotFound = true;
      })
      .addCase(postCommentAction.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
      });
  },
});

export const { setOfferNotFoundStatus } = offersData.actions;
