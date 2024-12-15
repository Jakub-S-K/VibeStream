import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { username } = useParams();

  return (
    <main>
      {/*=============== USER PROFILE ===============*/}
      <section className='user section' id='user'>
        <div className='user__container container'>
          <h2 className='section__title'>{username}</h2>
        </div>
      </section>
    </main>
  );
}

export default UserProfile;
