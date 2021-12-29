import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MovieCover from '../MovieCover';
import s from './MoviesList.module.scss';

const MoviesList = ({ movies, location }) => {
  return (
    <>
      {movies && (
        <ul className={s.MoviesList}>
          {movies.map(movie => (
            <li className={s.MovieItem} key={movie.id}>
              <Link
                className={s.Link}
                to={{
                  pathname: `movies/${movie.id}`,
                  state: {
                    from: {
                      location,
                    },
                  },
                }}
              >
                {' '}
                <MovieCover movie={movie} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ),
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    state: PropTypes.any,
  }).isRequired,
};

export default MoviesList;
