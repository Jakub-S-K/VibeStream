import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch.js';
import './Album.css';
import Loading from '../components/Loading.jsx';
import { useSongPlayer } from '../context/SongPlayerContext.jsx';
import defaultCover from '../assets/img/album.png';
import LikeButton from '../components/LikeButton.jsx';
import { useAuth } from '../context/AuthContext.jsx';

function Album() {
  const { user } = useAuth();
  const { id } = useParams();
  const { setPlaylist, playTrack, currentTrackIndex } = useSongPlayer();
  const {
    isLoading,
    fetchedData: albumData,
    error,
  } = useFetch(`http://localhost:3001/api/albumpage/${id}/${user.id}`, []);

  if (!isLoading && !error) setPlaylist(albumData.songs || []);

  return (
    <>
      <main>
        {/*=============== ALBUM PROFILE ===============*/}
        <section className='album section' id='album'>
          <div className='album__container container'>
            {isLoading && <Loading />}

            {!isLoading && albumData && (
              <>
                <div className='album__top'>
                  <div
                    className='album__banner'
                    style={{
                      backgroundImage:
                        `url("http://localhost:3001/api/image/${albumData.id}")` ||
                        defaultCover,
                    }}
                  ></div>
                  <div className='album__top-info'>
                    <span className='album__title'>{albumData.name}</span>

                    {/*========== AUTHOR ==========*/}
                    <Link
                      to={`/user/${albumData.author}`}
                      class='album__author'
                    >
                      <span>{albumData.author} </span>
                    </Link>

                    {/*========== DESCRIPTION ==========*/}
                    {albumData.description && (
                      <span className='album__description'>
                        {albumData.description}
                      </span>
                    )}

                    {/*========== GENRE ==========*/}
                    <span className='album__genre'>{albumData.genre}</span>

                    {/*========== TAGS ==========*/}
                    <div className='album__tags'>
                      {albumData.tags &&
                        albumData.tags.length > 0 &&
                        albumData.tags.map((tag, index) => (
                          <span key={index} className='album__tag'>
                            #{tag}
                          </span>
                        ))}
                    </div>

                    {/*========== LIKE ==========*/}
                    <LikeButton
                      likesCount={albumData.like_count}
                      isLiked={albumData.liked_by_user}
                      albumId={albumData.id}
                    />
                  </div>
                </div>

                <ul className='album__list'>
                  {albumData.songs &&
                    albumData.songs.map((song, index) => (
                      <li
                        key={index}
                        className={`album__song ${
                          currentTrackIndex === index
                            ? 'album__song--playing'
                            : ''
                        }`}
                        onClick={() =>
                          playTrack(
                            index,
                            `http://localhost:3001/api/stream/${song.id}`,
                            song.title
                          )
                        }
                      >
                        <span className='album__song-number'>{index + 1}</span>
                        <span className='album__song-name'>{song.title}</span>
                        <span className='album__total-plays'>
                          <i class='bx bx-headphone'></i>: {song.play_counter}
                        </span>
                      </li>
                    ))}
                </ul>
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export default Album;
