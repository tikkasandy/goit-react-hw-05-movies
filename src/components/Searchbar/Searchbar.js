import { useState } from 'react';
import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import s from './Searchbar.module.scss';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (query.trim() === '') {
      toast.error('Query is empty. Please enter a correct query.');
      return;
    }

    onSubmit(query);
  };

  // const reset = () => {
  //   setQuery('');
  // };

  return (
    <form className={s.SearchForm} onSubmit={handleSubmit}>
      <input
        className={s.Input}
        type="text"
        name="searchQuery"
        value={query}
        onChange={handleChange}
        autoComplete="off"
        autoFocus
        placeholder="Search movies"
      />
      <button type="submit" className={s.Button} arial-label="Search">
        <ImSearch className={s.ButtonSvg} />
      </button>
    </form>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
