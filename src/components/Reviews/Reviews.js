import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchReviews } from '../../services/moviesAPI';
import CustomLoader from '../CustomLoader';
import ReviewCard from '../ReviewCard/ReviewCard';
import s from './Reviews.module.scss';

const Reviews = () => {
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const unmountedRef = useRef();
  const { movieId } = useParams();

  useEffect(() => {
    return () => {
      unmountedRef.current = true;
    };
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchReviews(movieId);
        if (!unmountedRef.current) {
          setReviews(result);
        }
      } finally {
        if (!unmountedRef.current) {
          setLoading(false);
        }
      }
    };

    getData();
  }, [movieId]);

  return (
    <>
      {loading ? (
        <CustomLoader />
      ) : (
        <ul className={s.Reviews}>
          {reviews.length > 0 ? (
            reviews.map(review => (
              <li className={s.ReviewsItem} key={review.id}>
                <ReviewCard review={review} />
              </li>
            ))
          ) : (
            <p className={s.NoReviews}>
              We don't have any reviews for this moment
            </p>
          )}
        </ul>
      )}
    </>
  );
};

export default Reviews;
