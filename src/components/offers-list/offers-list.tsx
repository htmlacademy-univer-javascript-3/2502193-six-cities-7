import { memo, useCallback } from 'react';
import { Offer } from '../../types/offer';
import PlaceCard from '../place-card/place-card';

type OffersListProps = {
  offers: Offer[];
  cardType?: 'cities' | 'near-places';
  onListItemHover?: (offerId: string | null) => void;
};

function OffersListComponent({
  offers,
  cardType = 'cities',
  onListItemHover,
}: OffersListProps): JSX.Element {
  const listClassName =
    cardType === 'near-places'
      ? 'near-places__list places__list'
      : 'cities__places-list places__list tabs__content';

  const handleMouseEnter = useCallback(
    (id: string) => {
      onListItemHover?.(id);
    },
    [onListItemHover]
  );

  const handleMouseLeave = useCallback(() => {
    onListItemHover?.(null);
  }, [onListItemHover]);

  return (
    <div className={listClassName}>
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          cardType={cardType}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  );
}

const OffersList = memo(OffersListComponent);

export default OffersList;
