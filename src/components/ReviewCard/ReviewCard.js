import PropTypes from 'prop-types';
import s from './ReviewCard.module.scss';

const ReviewCard = ({ review }) => {
  const { author, content } = review;

  return (
    <div className={s.ReviewCard}>
      <h3 className={s.Author}>Author: {author ? author : 'unknown'}</h3>
      <p className={s.Content}>{content}</p>
    </div>
  );
};

ReviewCard.propTypes = {
  actor: PropTypes.shape({
    author: PropTypes.string,
    content: PropTypes.string.isRequired,
  }),
};

export default ReviewCard;
