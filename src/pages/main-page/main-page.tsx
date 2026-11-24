import { useState, useMemo, useCallback } from 'react';
import { CITIES, SortOption } from '../../const';
import OffersList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';
import CitiesList from '../../components/cities-list/cities-list';
import SortingOptions from '../../components/sorting-options/sorting-options';
import Header from '../../components/header/header';
import MainEmpty from '../../components/main-empty/main-empty';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeCity } from '../../store/app-process/app-process';
import { selectCurrentCity } from '../../store/app-process/selectors';
import { selectCurrentCityOffers } from '../../store/offers-data/selectors';
import { City } from '../../types/offer';

function MainPage(): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const [currentSort, setCurrentSort] = useState<SortOption>(SortOption.Popular);

  const dispatch = useAppDispatch();
  const currentCity = useAppSelector(selectCurrentCity);
  const currentOffers = useAppSelector(selectCurrentCityOffers);

  const isEmpty = currentOffers.length === 0;

  const sortedOffers = useMemo(
    () =>
      [...currentOffers].sort((a, b) => {
        switch (currentSort) {
          case SortOption.PriceLowToHigh:
            return a.price - b.price;
          case SortOption.PriceHighToLow:
            return b.price - a.price;
          case SortOption.TopRatedFirst:
            return b.rating - a.rating;
          default:
            return 0;
        }
      }),
    [currentOffers, currentSort]
  );

  const handleCityChange = useCallback(
    (city: City) => {
      dispatch(changeCity(city));
    },
    [dispatch]
  );

  const handleListItemHover = useCallback((offerId: string | null) => {
    setActiveOfferId(offerId);
  }, []);

  const handleSortChange = useCallback((sort: SortOption) => {
    setCurrentSort(sort);
  }, []);

  return (
    <div className="page page--gray page--main">
      <Header isMainPage />

      <main className={`page__main page__main--index ${isEmpty ? 'page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList
              cities={CITIES}
              currentCity={currentCity}
              onCityChange={handleCityChange}
            />
          </section>
        </div>
        <div className="cities">
          {isEmpty ? (
            <MainEmpty cityName={currentCity.name} />
          ) : (
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {currentOffers.length} {currentOffers.length === 1 ? 'place' : 'places'} to stay in {currentCity.name}
                </b>
                <SortingOptions
                  currentSort={currentSort}
                  onSortChange={handleSortChange}
                />
                <OffersList
                  offers={sortedOffers}
                  onListItemHover={handleListItemHover}
                />
              </section>
              <div className="cities__right-section">
                <Map
                  city={currentCity}
                  offers={currentOffers}
                  selectedPoint={activeOfferId}
                  className="cities__map"
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default MainPage;
