import { Link } from 'react-router-dom';
import Loading from './Loading';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import image from '../assets/img/album.png';
import { useFetch } from '../hooks/useFetch.js';

function TrendingSlider({ albumsToShow }) {
  const {
    isLoading,
    fetchedData: trendingAlbums,
    error,
  } = useFetch(
    // `http://localhost:3001/api/trending/albums/7`
    `http://localhost:3001/test/albums`,
    []
  );

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
      {!isLoading && trendingAlbums.length === 0 && <p>No albums available</p>}
      {!isLoading && trendingAlbums.length > 0 && (
        <div className='slider'>
          <Slider {...settings}>
            {trendingAlbums.map((album, index) => {
              return (
                <div key={index} className='slider__card trending-card'>
                  <div className='slider__card-top'>
                    <div
                      className='slider__image trending-image'
                      style={{
                        backgroundImage: `url("${
                          album.albumImage
                            ? `http://localhost:3001/assets/img/albums/${album.albumImage}.jpg`
                            : image
                        }")`,
                      }}
                    ></div>
                  </div>
                  <div className='slider__card-bottom'>
                    <span className='slider__username trending-username'>
                      {album.username}
                    </span>
                    <div className='slider__play'>
                      <i class='bx bx-play-circle'></i>
                      <span className='slider__album-name'>
                        {album.albumName}
                      </span>
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
