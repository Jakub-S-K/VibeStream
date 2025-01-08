import { Link } from 'react-router-dom';
import Loading from './Loading';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import avatar from '../assets/img/user.png';
import { useFetch } from '../hooks/useFetch.js';

function ArtistsSlider({ usersToShow }) {
  const {
    isLoading,
    error,
    fetchedData: trendingUsers,
  } = useFetch(`http://localhost:3001/api/trending/users/${usersToShow}`, []);

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const settings = {
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
      {!isLoading && trendingUsers.length === 0 && <p>No users available</p>}
      {!isLoading && trendingUsers.length > 0 && (
        <div className='slider'>
          <Slider {...settings}>
            {trendingUsers.map((user, index) => {
              return (
                <div key={index} className='slider__card artists-card'>
                  <div className='slider__card-top'>
                    <Link to={`/user/${user.nickname}`}>
                      <div
                        className='slider__image'
                        style={{
                          // backgroundImage: `url("${
                          //   user.image
                          //     ? `http://localhost:3001/assets/img/albums/${user.image}.jpg`
                          //     : image
                          // }")`,
                          backgroundImage: `url("${avatar}")`,
                        }}
                      ></div>
                    </Link>
                  </div>
                  <div className='slider__card-bottom'>
                    <Link
                      to={`/user/${user.nickname}`}
                      className='slider__username'
                    >
                      {user.nickname}
                    </Link>
                    {/* <span className='slider__username'>{user.nickname}</span> */}
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

export default ArtistsSlider;
