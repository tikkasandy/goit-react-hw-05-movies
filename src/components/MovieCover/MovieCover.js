import PropTypes from 'prop-types';
import image from '../../images/no-cover.png';
import s from './MovieCover.module.scss';

const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const MovieCover = ({ movie }) => {
  const { title, poster_path: url } = movie;

  return (
    <div className={s.MovieCover}>
      <img
        className={s.Img}
        src={url ? `${IMG_URL}${url}` : image}
        alt={title}
      />
      <h4 className={s.Title}>{title}</h4>
    </div>
  );
};

MovieCover.propTypes = {
  actor: PropTypes.shape({
    title: PropTypes.string.isRequired,
    bposter_path: PropTypes.string,
  }),
};

export default MovieCover;
