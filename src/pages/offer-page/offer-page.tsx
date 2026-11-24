import { useEffect, useMemo } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import ReviewForm from '../../components/review-form/review-form';
import ReviewsList from '../../components/reviews-list/reviews-list';
import Map from '../../components/map/map';
import OffersList from '../../components/offers-list/offers-list';
import Spinner from '../../components/spinner/spinner';
import Header from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeFavoriteStatusAction, fetchOfferAction } from '../../store/api-actions';
import { setOfferNotFoundStatus } from '../../store/offers-data/offers-data';
import {
  selectCurrentOffer,
  selectIsCurrentOfferLoading,
  selectIsOfferNotFound,
  selectNearbyOffers,
  selectReviews,
} from '../../store/offers-data/selectors';
import { selectAuthorizationStatus } from '../../store/user-process/selectors';

function OfferPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const currentOffer = useAppSelector(selectCurrentOffer);
  const nearbyOffers = useAppSelector(selectNearbyOffers);
  const reviews = useAppSelector(selectReviews);
  const isCurrentOfferLoading = useAppSelector(selectIsCurrentOfferLoading);
  const isOfferNotFound = useAppSelector(selectIsOfferNotFound);
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferAction(id));
    }

    return () => {
      dispatch(setOfferNotFoundStatus(false));
    };
  }, [id, dispatch]);

  const displayedNearbyOffers = useMemo(
    () => nearbyOffers.slice(0, 3),
    [nearbyOffers]
  );

  const mapOffers = useMemo(
    () => (currentOffer ? [...displayedNearbyOffers, currentOffer] : displayedNearbyOffers),
    [displayedNearbyOffers, currentOffer]
  );

  if (isOfferNotFound) {
    return <Navigate to={AppRoute.NotFound} />;
  }

  if (isCurrentOfferLoading || !currentOffer || currentOffer.id !== id) {
    return <Spinner />;
  }

  const handleBookmarkClick = () => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }

    dispatch(
      changeFavoriteStatusAction({
        offerId: currentOffer.id,
        status: currentOffer.isFavorite ? 0 : 1,
      })
    );
  };

  const ratingWidth = `${Math.round(currentOffer.rating) * 20}%`;

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {currentOffer.images.slice(0, 6).map((image) => (
                <div key={image} className="offer__image-wrapper">
                  <img className="offer__image" src={image} alt={currentOffer.title} />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {currentOffer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {currentOffer.title}
                </h1>
                <button
                  className={`offer__bookmark-button button ${
                    currentOffer.isFavorite ? 'offer__bookmark-button--active' : ''
                  }`}
                  type="button"
                  onClick={handleBookmarkClick}
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">
                    {currentOffer.isFavorite ? 'In bookmarks' : 'To bookmarks'}
                  </span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: ratingWidth }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{currentOffer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {currentOffer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {currentOffer.bedrooms} {currentOffer.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {currentOffer.maxAdults} {currentOffer.maxAdults === 1 ? 'adult' : 'adults'}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{currentOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {currentOffer.goods.map((good) => (
                    <li key={good} className="offer__inside-item">
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div
                    className={`offer__avatar-wrapper ${
                      currentOffer.host.isPro ? 'offer__avatar-wrapper--pro' : ''
                    } user__avatar-wrapper`}
                  >
                    <img
                      className="offer__avatar user__avatar"
                      src={currentOffer.host.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">
                    {currentOffer.host.name}
                  </span>
                  {currentOffer.host.isPro && (
                    <span className="offer__user-status">
                      Pro
                    </span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {currentOffer.description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <ReviewsList reviews={reviews} />
                {authorizationStatus === AuthorizationStatus.Auth && (
                  <ReviewForm offerId={currentOffer.id} />
                )}
              </section>
            </div>
          </div>
          <Map
            city={currentOffer.city}
            offers={mapOffers}
            selectedPoint={currentOffer.id}
            className="offer__map"
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OffersList
              offers={displayedNearbyOffers}
              cardType="near-places"
            />
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
