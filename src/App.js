import { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomLoader from './components/CustomLoader';
import Navbar from './components/Navbar/Navbar';

const HomePage = lazy(() =>
  import('./pages/HomePage' /* webpackChunkName: "home-page" */),
);
const MovieDetailsPage = lazy(() =>
  import(
    './pages/MovieDetailsPage/MovieDetailsPage' /* webpackChunkName: "movie-details-page" */
  ),
);
const MoviesPage = lazy(() =>
  import('./pages/MoviesPage' /*webpackChunkName: "movies-page" */),
);

const App = () => {
  return (
    <>
      <Navbar />
      <main>
        <Suspense fallback={<CustomLoader />}>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/movies" exact component={MoviesPage} />
            <Route path="/movies/:movieId" component={MovieDetailsPage} />
            <Redirect to="/" />
          </Switch>
        </Suspense>
      </main>
      <ToastContainer />
    </>
  );
};

export default App;
