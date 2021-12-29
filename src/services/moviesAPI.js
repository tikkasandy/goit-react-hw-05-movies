const API_KEY = '9cfb04bddc247f0573a5d8f2973dbbeb';
const BASE_URL = 'https://api.themoviedb.org/3';
const TREND_URL = `${BASE_URL}/trending/movie/day`;
const ID_URL = `${BASE_URL}/movie/`;

export const fetchWithErrorHandling = async (url = '', config = {}) => {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(
        new Error('The resource you requested could not be found'),
      );
};

export const fetchTrending = async () => {
  const data = await fetchWithErrorHandling(`${TREND_URL}?api_key=${API_KEY}`);
  return data.results;
};

export const fetchMovieByQuery = async query => {
  const data = await fetchWithErrorHandling(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`,
  );
  return data.results;
};

export const fetchMovieById = async movieId => {
  return await fetchWithErrorHandling(
    `${ID_URL}${movieId}?api_key=${API_KEY}&language=en-US`,
  );
};

export const fetchCast = async movieId => {
  const data = await fetchWithErrorHandling(
    `${ID_URL}${movieId}/credits?api_key=${API_KEY}&language=en-US`,
  );
  return data.cast;
};

export const fetchReviews = async movieId => {
  const data = await fetchWithErrorHandling(
    `${ID_URL}${movieId}/reviews?api_key=${API_KEY}&language=en-US`,
  );
  return data.results;
};
