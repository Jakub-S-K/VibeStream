import './Search.css';
import React, { useState, useEffect, useRef } from 'react';
import Loading from '../components/Loading';
import avatar from '../assets/img/user.png';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [fetchedData, setFetchedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const DEBOUNCE_DELAY = 700;

  useEffect(() => {
    function fetchData(query) {
      setIsLoading(true);

      fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((users) => {
          const filteredData = users.filter((user) =>
            user.name.toLowerCase().includes(query.toLowerCase())
          );
          setFetchedData(filteredData);
        })
        .catch((error) => console.error('Error:', error));

      setIsLoading(false);
    }

    const handleInputChange = setTimeout(() => {
      if (searchTerm.trim() === '') {
        setFetchedData([]);
        return;
      } else {
        fetchData(searchTerm);
      }
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(handleInputChange);
  }, [searchTerm]);

  return (
    <main>
      {/*=============== SEARCH ===============*/}
      <section className='search section' id='upload'>
        <div className='search__container container'>
          <h2 className='section__title'>Search</h2>

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

          {isLoading && <Loading></Loading>}

          {/*=============== USERS ===============*/}
          <div className='search__list-l'>
            <ul className='search__list'>
              {fetchedData &&
                fetchedData.map((item) => (
                  <li key={item.id} className='search__item'>
                    <div className='search__item-top'>
                      <div
                        className='search__image'
                        style={{ backgroundImage: `url("${avatar}")` }}
                      ></div>
                    </div>
                    <div className='search__item-bottom'>{item.name}</div>
                  </li>
                ))}
            </ul>
          </div>

          {/* {fetchedData.length === 0 && searchTerm && !isLoading && (
            <p>No results found</p>
          )} */}
        </div>
      </section>
    </main>
  );
}

export default Search;
