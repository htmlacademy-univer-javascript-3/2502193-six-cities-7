import { Review } from '../types/review';

export const reviews: Review[] = [
  {
    id: '1',
    date: '2019-04-24T14:13:56.569Z',
    user: {
      name: 'Max',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false,
    },
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    rating: 4,
  },
  {
    id: '2',
    date: '2023-06-12T14:13:56.569Z',
    user: {
      name: 'Angelina',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true,
    },
    comment: 'Beautiful and luxurious studio. We loved our stay here, highly recommended!',
    rating: 5,
  }
];
