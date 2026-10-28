import PlaceCard from '../place-card/place-card';
import { Offer } from '../../types/offer';

type OffersListProps = {
  offers: Offer[];
  cardType?: 'cities' | 'near-places';
  onListItemHover?: (id: string | null) => void;
};

function OffersList({ offers, cardType = 'cities', onListItemHover }: OffersListProps): JSX.Element {
  return (
    <>
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          cardType={cardType}
          onMouseEnter={() => onListItemHover?.(offer.id)}
          onMouseLeave={() => onListItemHover?.(null)}
        />
      ))}
    </>
  );
}

export default OffersList;
