import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';
import AlbumDisplay from '../components/AlbumDisplay';
import './UserProfile.css';

function UserProfile() {
  const { username } = useParams();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [userData, setUserData] = useState();
  const [userAlbums, setUserAlbums] = useState();
  
  console.log(username);

  useEffect(() => {
    async function fetchUserData() {
      setIsLoading(true);

      try {
        const response = await fetch(
          `http://localhost:3001/api/user/${username}`
        );

        if (!response.ok) {
          throw new Error(
            (await response.statusText) || 'Failed to fetch user.'
          );
        }

        const resData = await response.json();
        setUserData(resData);
        console.log(resData);
        const response2 = await fetch(`http://localhost:3001/api/useralbums/${resData.id}`);
        const resData2 = await response2.json();
        setUserAlbums(resData2);

      } catch (error) {
        setError({ message: error.message || 'Failed to fetch user data.' });
      }

      setIsLoading(false);
    }

    fetchUserData();
  }, [username]);

        const [emailShown, showEmail] = useState(false);

  return (
    <main>
      {/*=============== USER PROFILE ===============*/}
      <section className='user section' id='user'>
        <div className='user__container container'>
          {isLoading && <Loading />}

          {error && <p>Error: {error.message}</p>}

          {!isLoading && userData && (
            <>
              <div id="user_header">
                <img id="user_avatar" src={"http://localhost:3001/api/image/"+userData.id}></img>
                <div id="user_header_right">
                  <h2>{userData.nickname}</h2>
                  <p>{userData.bio}</p>
                  <p>{"Likes: "+userData.like_count}</p>
                  <p onClick={() => showEmail(true)}>{emailShown ? "E-mail: "+userData.email : "[Reveal e-mail]"}</p>
                </div>
              </div>

              <h2> {"User's albums"} </h2>
              <div id="album_column">
                  {userAlbums && userAlbums.map((album) => {
                    return(
                      <AlbumDisplay album={album}/>
                    );
                  })}
                  
              </div>
              
            </>
          )}
        </div>
      </section>
    </main>
  );
}

export default UserProfile;
