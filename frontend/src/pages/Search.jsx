import './Search.css';
import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '../components/Loading';
import defaultAvatar from '../assets/img/user.png';

function Search() {
  const [fetchedData, setFetchedData] = useState([]);

  const DEBOUNCE_DELAY = 700;

  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async (query, page = 1, append = false) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${query}&per_page=${
          page == 1 ? 5 : 10
        }&page=${page}`
      );
      const newData = await response.json();

      if (append) {
        setData((prevData) => [...prevData, ...newData.items]);
      } else {
        setData(newData.items);
      }

      setHasMore(newData.items.length > 0);
    } catch (error) {
      console.error('Error:', error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    const handleInputChange = setTimeout(() => {
      if (searchTerm.trim()) {
        setPage(1);
        fetchData(searchTerm, 1, false);
      } else {
        setData([]);
        setHasMore(false);
      }
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(handleInputChange);
  }, [searchTerm]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchData(searchTerm, nextPage, true);
  };

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

          {/*=============== USERS ===============*/}
          <h2>Artists</h2>

          <div className='search__list-l'>
            <ul className='search__list'>
              {data &&
                data.map((item) => (
                  <li key={item.id} className='search__item'>
                    <div className='search__item-top'>
                      <div
                        className='search__image'
                        style={{
                          backgroundImage: `url("${
                            item.avatar_url || defaultAvatar
                          }")`,
                        }}
                      ></div>
                    </div>
                    <div className='search__item-bottom'>{item.login}</div>
                  </li>
                ))}
            </ul>

            {isLoading && <Loading></Loading>}
          </div>

          {hasMore && !isLoading && (
            <button onClick={loadMore} disabled={isLoading}>
              Załaduj więcej
            </button>
          )}

          {!hasMore && !isLoading && searchTerm && <p>Brak więcej wyników</p>}
          {/* <div className='search__list-l'>
            <InfiniteScroll
              dataLength={items.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={<Loading />}
            >
              {' '}
              <ul className='search__list'>
                {items &&
                  items.map((item) => (
                    <li key={item.id} className='search__item'>
                      <div className='search__item-top'>
                        <div
                          className='search__image'
                          style={{
                            backgroundImage: `url("${
                              item.avatar || defaultAvatar
                            }")`,
                          }}
                        ></div>
                      </div>
                      <div className='search__item-bottom'>{item.name}</div>
                    </li>
                  ))}
              </ul>
            </InfiniteScroll>
          </div> */}
          {/* {fetchedData.length === 0 && searchTerm && !isLoading && (
            <p>No results found</p>
          )} */}
        </div>
      </section>
    </main>
  );
}

export default Search;

// function Search() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [fetchedData, setFetchedData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const DEBOUNCE_DELAY = 700;

//   useEffect(() => {
//     function fetchData(query) {
//       setIsLoading(true);

//       fetch('https://jsonplaceholder.typicode.com/users')
//         .then((response) => response.json())
//         .then((users) => {
//           const filteredData = users.filter((user) =>
//             user.name.toLowerCase().includes(query.toLowerCase())
//           );
//           setFetchedData(filteredData);
//         })
//         .catch((error) => console.error('Error:', error));

//       setIsLoading(false);
//     }

//     const handleInputChange = setTimeout(() => {
//       if (searchTerm.trim() === '') {
//         setFetchedData([]);
//         return;
//       } else {
//         fetchData(searchTerm);
//       }
//     }, DEBOUNCE_DELAY);

//     return () => clearTimeout(handleInputChange);
//   }, [searchTerm]);

//   return (
//     <main>
//       {/*=============== SEARCH ===============*/}
//       <section className='search section' id='upload'>
//         <div className='search__container container'>
//           <h2 className='section__title'>Search</h2>

//           <div className='search__field'>
//             <input
//               className='search__input'
//               type='text'
//               name='search'
//               placeholder='Search...'
//               autocomplete='off'
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <i class='bx bx-search'></i>
//           </div>

//           {isLoading && <Loading></Loading>}

//           {/*=============== USERS ===============*/}
//           <div className='search__list-l'>
//             <ul className='search__list'>
//               {fetchedData &&
//                 fetchedData.map((item) => (
//                   <li key={item.id} className='search__item'>
//                     <div className='search__item-top'>
//                       <div
//                         className='search__image'
//                         style={{ backgroundImage: `url("${avatar}")` }}
//                       ></div>
//                     </div>
//                     <div className='search__item-bottom'>{item.name}</div>
//                   </li>
//                 ))}
//             </ul>
//           </div>

//           {/* {fetchedData.length === 0 && searchTerm && !isLoading && (
//             <p>No results found</p>
//           )} */}
//         </div>
//       </section>
//     </main>
//   );
// }

// export default Search;
