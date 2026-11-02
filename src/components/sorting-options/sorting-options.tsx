import { useState } from 'react';
import { SortOption } from '../../const';

type SortingOptionsProps = {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
};

function SortingOptions({ currentSort, onSortChange }: SortingOptionsProps): JSX.Element {
  const [isOpened, setIsOpened] = useState(false);

  const handleSortClick = (option: SortOption) => {
    onSortChange(option);
    setIsOpened(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpened((prev) => !prev)}
      >
        {currentSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${
          isOpened ? 'places__options--opened' : ''
        }`}
      >
        {Object.values(SortOption).map((option) => (
          <li
            key={option}
            className={`places__option ${
              option === currentSort ? 'places__option--active' : ''
            }`}
            tabIndex={0}
            onClick={() => handleSortClick(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default SortingOptions;
