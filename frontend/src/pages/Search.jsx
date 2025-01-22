import './Search.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import defaultAvatar from '../assets/img/user.png';

function Search() {
  const [results, setResults] = useState({ user: [], album: [], song: [] });
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchType, setSearchType] = useState('user');
  const DEBOUNCE_DELAY = 700;

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      try {
        const response = await fetch(
          `http://localhost:3001/api/search/${searchType}/${searchTerm}`
        );
        const data = await response.json();

        setResults((prevResults) => ({
          ...prevResults,
          [searchType]: data,
        }));
      } catch (error) {
        console.error('Error:', error);
      }

      setIsLoading(false);
    }

    const handleInputChange = setTimeout(() => {
      if (searchTerm.trim()) {
        fetchData();
      } else {
        setResults({ user: [], album: [], song: [] });
      }
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(handleInputChange);
  }, [searchTerm, searchType]);

  return (
    <main>
      {/*=============== SEARCH ===============*/}
      <section className='search section' id='upload'>
        <div className='search__container container'>
          <h2 className='section__title'>Search</h2>

          <div className='search__top-container'>
            <div className='search__field'>
              <input
                className='search__input'
                type='text'
                name='search'
                placeholder='Search...'
                autocomplete='off'
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <i class='bx bx-search'></i>
            </div>

            <div className='search__buttons-list-l'>
              <ul className='search__buttons-list'>
                <li
                  className={`search__type-button ${
                    searchType === 'user' ? 'search__type-button--active' : ''
                  }`}
                  onClick={() => setSearchType('user')}
                >
                  <i className='bx bxs-user'></i>
                  <span> Artists</span>
                </li>
                <li
                  className={`search__type-button ${
                    searchType === 'album' ? 'search__type-button--active' : ''
                  }`}
                  onClick={() => setSearchType('album')}
                >
                  <i className='bx bxs-album'></i>
                  <span> Albums</span>
                </li>
                <li
                  className={`search__type-button ${
                    searchType === 'song' ? 'search__type-button--active' : ''
                  }`}
                  onClick={() => setSearchType('song')}
                >
                  <i className='bx bxs-music'></i>
                  <span> Songs</span>
                </li>
              </ul>
            </div>
          </div>

          {/*=============== USERS ===============*/}
          {searchType === 'user' && <h2 className='search__title'>Artists</h2>}
          {searchType === 'album' && <h2 className='search__title'>Albums</h2>}
          {searchType === 'song' && <h2 className='search__title'>Songs</h2>}

          {!searchTerm && !results[searchType].length && (
            <p className='search__text'>Type something to search</p>
          )}

          {isLoading && <Loading></Loading>}

          <div className='search__list-l'>
            <ul className='search__list'>
              {searchType === 'user' &&
                results.user &&
                results.user.map((user) => (
                  <li key={user.id} className='search__item-l'>
                    <div className='search__item'>
                      <div className='search__item-top'>
                        <Link to={`/user/${user.nickname}`}>
                          <div
                            className='search__image'
                            style={{
                              backgroundImage: `url("${
                                user.avatar_url || defaultAvatar
                              }")`,
                            }}
                          ></div>
                        </Link>
                      </div>

                      <Link
                        to={`/user/${user.nickname}`}
                        className='search__item-bottom'
                      >
                        {user.nickname}
                      </Link>
                    </div>
                  </li>
                ))}
            </ul>
          </div>

          {!isLoading && searchTerm && !results[searchType].length && (
            <p className='search__text'>No results found</p>
          )}
        </div>
      </section>
    </main>
  );
}

export default Search;
