import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCast } from '../../services/moviesAPI';
import ActorCard from '../ActorCard/ActorCard';
import CustomLoader from '../CustomLoader';
import s from './Cast.module.scss';

const Cast = () => {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
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
        const result = await fetchCast(movieId);
        if (!unmountedRef.current) {
          setCast(result);
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
        <ul className={s.Cast}>
          {cast.length > 0 ? (
            cast.map(actor => (
              <li className={s.ActorCard} key={actor.id}>
                <ActorCard actor={actor} />
              </li>
            ))
          ) : (
            <p className={s.NoCast}>We don't have cast for this moment</p>
          )}
        </ul>
      )}
    </>
  );
};

export default Cast;
