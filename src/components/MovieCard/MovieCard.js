import PropTypes from 'prop-types';
import image from '../../images/no-cover.png';
import s from './MovieCard.module.scss';

const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const MovieCard = ({ movie }) => {
  const {
    genres,
    overview,
    poster_path: poster,
    title,
    vote_average: vote,
    release_date: year,
  } = movie;

  return (
    <div className={s.MovieCard}>
      <img
        className={s.Image}
        src={poster ? `${IMG_URL}${poster}` : image}
        alt={title}
      />
      <div>
        {year.length > 0 && (
          <h2 className={s.Title}>{`${title} (${year.slice(0, 4)})`}</h2>
        )}
        {vote > 0 && (
          <p>
            <span className={s.Subtitle}>User score:</span> {`${vote * 10}%`}
          </p>
        )}
        {overview.length > 0 && (
          <>
            <h3 className={s.Subtitle}>Overview:</h3>
            <p className={s.Overview}>{overview}</p>
          </>
        )}
        {genres.length > 0 && (
          <>
            <h3 className={s.Subtitle}>Genres:</h3>
            <ul className={s.Genres}>
              {genres.map(genre => (
                <li className={s.GenresItem} key={genre.id}>
                  {genre.name}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    genres: PropTypes.arrayOf(PropTypes.object).isRequired,
    overview: PropTypes.string.isRequired,
    poster_path: PropTypes.string,
    title: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
    release_date: PropTypes.string.isRequired,
  }),
};

export default MovieCard;
