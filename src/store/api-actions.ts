import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { FullOffer, Offer } from '../types/offer';
import { APIRoute } from '../const';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { dropToken, saveToken } from '../services/token';
import { CommentData, Review } from '../types/review';

export const fetchOffersAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offer[]>(APIRoute.Offers);
    return data;
  },
);

export const fetchFavoritesAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFavorites',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offer[]>(APIRoute.Favorite);
    return data;
  },
);

export const changeFavoriteStatusAction = createAsyncThunk<
  FullOffer,
  { offerId: string; status: number },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/changeFavoriteStatus',
  async ({ offerId, status }, { extra: api }) => {
    const { data } = await api.post<FullOffer>(`${APIRoute.Favorite}/${offerId}/${status}`);
    return data;
  },
);

export const fetchOfferAction = createAsyncThunk<
  { offer: FullOffer; nearbyOffers: Offer[]; reviews: Review[] },
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/fetchOffer',
  async (offerId, { extra: api }) => {
    const [offerResponse, nearbyResponse, reviewsResponse] = await Promise.all([
      api.get<FullOffer>(`${APIRoute.Offers}/${offerId}`),
      api.get<Offer[]>(`${APIRoute.Offers}/${offerId}/nearby`),
      api.get<Review[]>(`${APIRoute.Comments}/${offerId}`),
    ]);

    return {
      offer: offerResponse.data,
      nearbyOffers: nearbyResponse.data,
      reviews: reviewsResponse.data,
    };
  },
);

export const postCommentAction = createAsyncThunk<Review, CommentData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'comments/postComment',
  async ({ offerId, comment, rating }, { extra: api }) => {
    const { data } = await api.post<Review>(`${APIRoute.Comments}/${offerId}`, { comment, rating });
    return data;
  },
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<UserData>(APIRoute.Login);
    dispatch(fetchFavoritesAction());
    return data;
  },
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(data.token);
    dispatch(fetchOffersAction());
    dispatch(fetchFavoritesAction());
    return data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(fetchOffersAction());
  },
);
