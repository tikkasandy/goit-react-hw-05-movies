import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchTrending } from '../../services/moviesAPI';
import CustomLoader from '../../components/CustomLoader';
import MoviesList from '../../components/MoviesList';
import Section from '../../components/Section';
import s from './HomePage.module.scss';

const HomePage = () => {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const unmountedRef = useRef();

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchTrending();
        if (!unmountedRef.current) {
          setMovies(result);
        }
      } catch (message) {
        setError(message);
      } finally {
        if (!unmountedRef.current) {
          setLoading(false);
        }
      }
    };

    getData();
    return () => {
      unmountedRef.current = true;
    };
  }, []);

  return (
    <>
      {
        <Section title="Trending now">
          {error && <p className={s.Error}>{error}</p>}
          {movies &&
            (movies.length > 0 ? (
              <MoviesList movies={movies} location={location} />
            ) : (
              <p className={s.Error}>Don't have trending movies now</p>
            ))}
        </Section>
      }
      {loading && <CustomLoader />}
    </>
  );
};

export default HomePage;
