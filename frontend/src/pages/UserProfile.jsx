import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';

function UserProfile() {
  const { username } = useParams();
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchAlbums() {
      setIsLoading(true);

      try {
        const response = await fetch(
          `http://localhost:3001/api/user/${username}`
        );
        const resData = await response.json();

        if (!response.ok) {
          throw new Error('Failed to fetch a user');
        }

        setUserData(resData);
      } catch (error) {
        setError(error.message || 'Could not fetch a user.');
      }

      setIsLoading(false);
    }

    fetchAlbums();
  }, []);

  return (
    <main>
      {/*=============== USER PROFILE ===============*/}
      <section className='user section' id='user'>
        <div className='user__container container'>
          <h2 className='section__title'>{username}</h2>

          {isLoading && <Loading></Loading>}

          {error && <p>Error: {error.message}</p>}
        </div>
      </section>
    </main>
  );
}

export default UserProfile;
