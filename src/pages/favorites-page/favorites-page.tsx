import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import PlaceCard from '../../components/place-card/place-card';
import Header from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectFavoriteOffers } from '../../store/offers-data/selectors';
import { fetchFavoritesAction } from '../../store/api-actions';
import { Offer } from '../../types/offer';

function FavoritesPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const favoriteOffers = useAppSelector(selectFavoriteOffers);

  useEffect(() => {
    dispatch(fetchFavoritesAction());
  }, [dispatch]);

  const isEmpty = favoriteOffers.length === 0;

  const offersByCity = favoriteOffers.reduce<Record<string, Offer[]>>((acc, offer) => {
    const cityName = offer.city.name;
    if (!acc[cityName]) {
      acc[cityName] = [];
    }
    acc[cityName].push(offer);
    return acc;
  }, {});

  return (
    <div className={`page ${isEmpty ? 'page--favorites-empty' : ''}`}>
      <Header />

      <main className={`page__main page__main--favorites ${isEmpty ? 'page__main--favorites-empty' : ''}`}>
        <div className="page__favorites-container container">
          {isEmpty ? (
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">
                  Save properties to narrow down search or plan your future trips.
                </p>
              </div>
            </section>
          ) : (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {Object.entries(offersByCity).map(([cityName, cityOffers]) => (
                  <li key={cityName} className="favorites__locations-items">
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <Link className="locations__item-link" to={AppRoute.Main}>
                          <span>{cityName}</span>
                        </Link>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {cityOffers.map((offer) => (
                        <PlaceCard
                          key={offer.id}
                          offer={offer}
                          cardType="favorites"
                        />
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Main}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}

export default FavoritesPage;
