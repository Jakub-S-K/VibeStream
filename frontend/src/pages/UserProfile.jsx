import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import './UserProfile.css';

function UserProfile() {
  const { username } = useParams();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const [userData, setUserData] = useState();

  useEffect(() => {
    async function fetchUserData() {
      setIsLoading(true);

      try {
        const response = await fetch(
          `http://localhost:3001/api/user/${username}`
        );

        if (!response.ok) {
          throw new Error((await response.text()) || 'Failed to fetch user.');
        }

        const resData = await response.json();
        setUserData(resData);
      } catch (error) {
        setError({ message: error.message || 'Failed to fetch user data.' });
      }

      setIsLoading(false);
    }

    fetchUserData();
  }, []);

  return (
    <main>
      {/*=============== USER PROFILE ===============*/}
      <section className='user section' id='user'>
        <div className='user__container container'>
          {isLoading && <Loading></Loading>}

          {error && <p>Error: {error.message}</p>}

          {userData && (
            <>
              <h2 className='section__title'>{userData.nickname}</h2>
              <p>{userData.email}</p>
              <p>{userData.bio}</p>
            </>
          )}
        </div>
      </section>
    </main>
  );
}

export default UserProfile;
