import { useEffect, useRef, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import { fetchMovieByQuery } from '../../services/moviesAPI';
import CustomLoader from '../../components/CustomLoader';
import MoviesList from '../../components/MoviesList';
import Searchbar from '../../components/Searchbar/Searchbar';
import Section from '../../components/Section';
import s from './MoviesPage.module.scss';

const MoviesPage = () => {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const history = useHistory();
  const unmountedRef = useRef();

  const search = queryString.parse(location.search).query ?? '';
  const [query, setQuery] = useState(search);

  useEffect(() => {
    return () => {
      unmountedRef.current = true;
    };
  }, []);

  useEffect(() => {
    unmountedRef.current = false;
    if (query !== '') {
      const getData = async () => {
        try {
          setLoading(true);
          const result = await fetchMovieByQuery(query);
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
    }
  }, [query]);

  const handleFormSubmit = query => {
    setQuery(query);
    history.push({ ...location, search: `query=${query}` });
  };

  return (
    <>
      <Section>
        <Searchbar onSubmit={handleFormSubmit} />
      </Section>
      {error && <p className={s.Error}>{error}</p>}
      {movies &&
        (movies.length > 0 ? (
          <Section title={`Results for '${query}'`}>
            <MoviesList movies={movies} location={location} />
          </Section>
        ) : (
          <Section title={`No movies for your query '${query}'`} />
        ))}
      {loading && <CustomLoader />}
    </>
  );
};

export default MoviesPage;
