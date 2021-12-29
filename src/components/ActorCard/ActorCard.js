import PropTypes from 'prop-types';
import image from '../../images/no-avatar.png';
import s from './ActorCard.module.scss';

const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const ActorCard = ({ actor }) => {
  const { profile_path: url, name, character } = actor;

  return (
    <div className={s.ActorCard}>
      <img
        className={s.Img}
        src={url ? `${IMG_URL}${url}` : image}
        alt={name}
      />
      <h4 className={s.Name}>{name}</h4>
      <p className={s.Character}>
        {character ? `as ${character}` : 'uncredited'}
      </p>
    </div>
  );
};

ActorCard.propTypes = {
  actor: PropTypes.shape({
    name: PropTypes.string.isRequired,
    character: PropTypes.string,
    profile_path: PropTypes.string,
  }),
};

export default ActorCard;
