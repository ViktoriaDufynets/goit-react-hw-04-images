import PropTypes from 'prop-types';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { FaSearch } from 'react-icons/fa';
import css from './Searchbar.module.css';


export default function Searchbar({onSubmit}) {

  const [query, setQuery] = useState('');

  const onChangeInput = e => {
    setQuery(e.currentTarget.value);
  };

  const onSubmitForm = e => {
    e.preventDefault();
    if (query.trim() === '') {
      return toast.info('Please enter a search term.');

    }
    onSubmit(query);
  };

    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={onSubmitForm}>
          <input className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={onChangeInput}
          />
        <button className={css.SearchFormButton} type="submit">
        <FaSearch size={15} />
        </button>
        </form>
      </header>
    );
  }



Searchbar.propTypes = { 
  onSubmit: PropTypes.func.isRequired,
};
