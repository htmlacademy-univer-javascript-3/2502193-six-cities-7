import { memo, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectAuthorizationStatus, selectUserData } from '../../store/user-process/selectors';
import { selectFavoriteOffers } from '../../store/offers-data/selectors';
import { logoutAction } from '../../store/api-actions';

type HeaderProps = {
  isMainPage?: boolean;
};

function HeaderComponent({ isMainPage = false }: HeaderProps): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const userData = useAppSelector(selectUserData);
  const favoriteOffers = useAppSelector(selectFavoriteOffers);

  const handleSignOutClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link
              className={`header__logo-link ${isMainPage ? 'header__logo-link--active' : ''}`}
              to={AppRoute.Main}
            >
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {authorizationStatus === AuthorizationStatus.Auth ? (
                <>
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">{userData?.email}</span>
                      <span className="header__favorite-count">{favoriteOffers.length}</span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <Link className="header__nav-link" to={AppRoute.Main} onClick={handleSignOutClick}>
                      <span className="header__signout">Sign out</span>
                    </Link>
                  </li>
                </>
              ) : (
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__login">Sign in</span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

const Header = memo(HeaderComponent);

export default Header;
