import { lazy, Suspense } from 'react';
import { NavLink, Route, useLocation, useRouteMatch } from 'react-router-dom';
import CustomLoader from '../../components/CustomLoader';
import Section from '../Section';
import s from './MovieAdditionalInfo.module.scss';

const Cast = lazy(() =>
  import(
    '../../components/Cast/Cast' /* webpackChunkName: "cast-information" */
  ),
);
const Reviews = lazy(() =>
  import(
    '../../components/Reviews' /* webpackChunkName: "reviews-information" */
  ),
);

const MovieAdditionalInfo = () => {
  const { url, path } = useRouteMatch();
  const location = useLocation();

  return (
    <Section title="Additional information">
      <ul className={s.Menu}>
        <li className={s.MenuItem}>
          <NavLink
            to={{
              pathname: `${url}/cast`,
              state: { ...location.state },
            }}
            className={s.Link}
            activeClassName={s.Active}
          >
            Cast
          </NavLink>
        </li>
        <li className={s.MenuItem}>
          <NavLink
            to={{
              pathname: `${url}/reviews`,
              state: { ...location.state },
            }}
            className={s.Link}
            activeClassName={s.Active}
          >
            Reviews
          </NavLink>
        </li>
      </ul>

      <Suspense fallback={<CustomLoader />}>
        <Route path={`${path}/cast`} component={Cast} />
        <Route path={`${path}/reviews`} component={Reviews} />
      </Suspense>
    </Section>
  );
};

export default MovieAdditionalInfo;
