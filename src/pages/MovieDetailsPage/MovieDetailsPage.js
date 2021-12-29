import { useEffect, useState, useRef } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { fetchMovieById } from '../../services/moviesAPI';
import CustomLoader from '../../components/CustomLoader';
import GoBack from '../../components/GoBack';
import MovieAdditionalInfo from '../../components/MovieAdditionalInfo';
import MovieCard from '../../components/MovieCard';
import Section from '../../components/Section';
import s from './MovieDetailsPage.module.scss';

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const match = useRouteMatch();
  const unmountedRef = useRef();
  const { movieId } = match.params;

  useEffect(() => {
    return () => {
      unmountedRef.current = true;
    };
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchMovieById(movieId);
        if (!unmountedRef.current) {
          setMovie(result);
        }
      } catch ({ message }) {
        setError(message);
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
      {error && (
        <Section>
          <GoBack />
          <p className={s.Error}>{error}</p>
        </Section>
      )}

      {movie && (
        <>
          <Section>
            <GoBack />
            <MovieCard movie={movie} />
          </Section>
          <Section>
            <MovieAdditionalInfo />
          </Section>
        </>
      )}

      {loading && <CustomLoader />}
    </>
  );
};

export default MovieDetailsPage;
