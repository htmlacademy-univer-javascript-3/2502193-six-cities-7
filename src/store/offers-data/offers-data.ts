import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { OffersData } from '../../types/state';
import { fetchOfferAction, fetchOffersAction, postCommentAction } from '../api-actions';

const initialState: OffersData = {
  offers: [],
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
