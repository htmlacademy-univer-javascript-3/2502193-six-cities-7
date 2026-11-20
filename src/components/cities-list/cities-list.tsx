import { memo } from 'react';
import { City } from '../../types/offer';

type CitiesListProps = {
  cities: City[];
  currentCity: City;
  onCityChange: (city: City) => void;
};

function CitiesListComponent({ cities, currentCity, onCityChange }: CitiesListProps): JSX.Element {
  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li key={city.name} className="locations__item">
          <a
            className={`locations__item-link tabs__item ${
              city.name === currentCity.name ? 'tabs__item--active' : ''
            }`}
            href="#"
            onClick={(evt) => {
              evt.preventDefault();
              onCityChange(city);
            }}
          >
            <span>{city.name}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

const CitiesList = memo(CitiesListComponent);

export default CitiesList;
