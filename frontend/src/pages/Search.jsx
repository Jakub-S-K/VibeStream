import './Search.css';
import React, { useState, useEffect, useRef } from 'react';
import genresData from '../assets/json/genres.json';

const mockDatabase = genresData.genres;

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Funkcja symulująca pobieranie danych z bazy
  const fetchData = (query) => {
    setLoading(true);
    setTimeout(() => {
      // Filtrowanie danych z "bazy"
      const filteredData = mockDatabase.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setData(filteredData);
      setLoading(false);
    }, 1000); // 1 sekunda opóźnienia (symulacja połączenia z bazą)
  };

  // Obsługa zmiany pola wyszukiwania
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setData([]); // Jeśli brak frazy, nie pokazuj wyników
      return;
    }

    const timeoutId = setTimeout(() => {
      fetchData(searchTerm);
    }, 500); // Debouncing: opóźnienie przed wysłaniem zapytania

    return () => clearTimeout(timeoutId); // Czyść poprzednie timeouty
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

          {loading && (
            <div className='loading'>
              <div></div>
              <div></div>
              <div></div>
            </div>
          )}
          <ul>
            {data.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
          {data.length === 0 && searchTerm && !loading && (
            <p>No results found</p>
          )}
        </div>
      </section>
    </main>
  );
}

export default Search;
