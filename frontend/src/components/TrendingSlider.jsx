import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useFetch } from '../hooks/useFetch.js';
import Loading from './Loading';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import defaultCover from '../assets/img/album.png';

function TrendingSlider({ albumsToShow }) {
  const {
    isLoading,
    error,
    fetchedData: trendingAlbums,
  } = useFetch(`http://localhost:3001/api/trending/albums/${albumsToShow}`, []);

  const [albumsWithCovers, setAlbumsWithCovers] = useState([]);

  useEffect(() => {
    async function fetchCovers() {
      if (trendingAlbums && trendingAlbums.length > 0) {
        const albumsWithCovers = await Promise.all(
          trendingAlbums.map(async (album) => {
            try {
              const response = await fetch(
                `http://localhost:3001/api/image/${album.id}`
              );

              if (!response.ok) {
                throw new Error(`Error fetching avatar for user ${album.id}`);
              }

              const cover = response.url;
              return { ...album, cover };
            } catch (error) {
              return { ...album, cover: null };
            }
          })
        );

        setAlbumsWithCovers(albumsWithCovers);
      }
    }

    fetchCovers();
  }, [trendingAlbums]);

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: 'ease',
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <>
      {isLoading && <Loading></Loading>}
      {!isLoading && albumsWithCovers.length === 0 && (
        <p>No albums available</p>
      )}
      {!isLoading && albumsWithCovers.length > 0 && (
        <div className='slider'>
          <Slider {...settings}>
            {albumsWithCovers.map((album, index) => {
              return (
                <div key={index} className='slider__card trending-card'>
                  <div className='slider__card-top'>
                    <Link to={`/album/${album.id}`}>
                      <div
                        className='slider__image trending-image'
                        style={{
                          backgroundImage: `url("${
                            album.cover || defaultCover
                          }")`,
                        }}
                      ></div>
                    </Link>
                  </div>
                  <div className='slider__card-bottom'>
                    <Link
                      to={`/user/${album.user.nickname}`}
                      className='slider__username trending-username'
                    >
                      {album.user.nickname}
                    </Link>
                    <div className='slider__play'>
                      <i class='bx bx-play-circle'></i>
                      <Link
                        to={`/album/${album.id}`}
                        className='slider__album-name'
                      >
                        {album.name}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      )}
    </>
  );
}

export default TrendingSlider;
