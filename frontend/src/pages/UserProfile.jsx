import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import { useFetch } from '../hooks/useFetch.js';
import './UserProfile.css';

function UserProfile() {
  const { username } = useParams();
  const {
    isLoading,
    error,
    fetchedData: userData,
  } = useFetch(`http://localhost:3001/api/user/${username}`, []);

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
