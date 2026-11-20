import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer';

type PlaceCardProps = {
  offer: Offer;
  cardType?: 'cities' | 'near-places' | 'favorites';
  onMouseEnter?: (id: string) => void;
  onMouseLeave?: () => void;
};

function PlaceCardComponent({
  offer,
  cardType = 'cities',
  onMouseEnter,
  onMouseLeave,
}: PlaceCardProps): JSX.Element {
  const { id, title, type, price, isFavorite, isPremium, rating, previewImage } = offer;
  const ratingWidth = `${Math.round(rating) * 20}%`;
  const isFavorites = cardType === 'favorites';

  return (
    <article
      className={`${cardType}__card place-card`}
      onMouseEnter={() => onMouseEnter?.(id)}
      onMouseLeave={() => onMouseLeave?.()}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${cardType}__image-wrapper place-card__image-wrapper`}>
        <Link to={`/offer/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width={isFavorites ? '150' : '260'}
            height={isFavorites ? '110' : '200'}
            alt={title}
          />
        </Link>
      </div>
      <div className={`${isFavorites ? 'favorites__card-info ' : ''}place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${
              isFavorite ? 'place-card__bookmark-button--active ' : ''
            }button`}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">
              {isFavorite ? 'In bookmarks' : 'To bookmarks'}
            </span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: ratingWidth }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

const PlaceCard = memo(PlaceCardComponent);

export default PlaceCard;
