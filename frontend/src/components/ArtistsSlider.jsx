import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loading from './Loading';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import avatar from '../assets/img/user.png';

function ArtistsSlider({ usersToShow }) {
  const [trendingUsers, setTrendingUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchUsers() {
      setIsLoading(true);

      try {
        const response = await fetch(
          `http://localhost:3001/api/trending/users/${usersToShow}`
        );
        const resData = await response.json();

        if (!response.ok) {
          throw new Error('Failed to fetch trending users');
        }

        setTrendingUsers(resData);
      } catch (error) {
        setError(error.message || 'Could not fetch trending users.');
      }

      setIsLoading(false);
    }

    fetchUsers();
  }, []);

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
    <div className='slider'>
      {isLoading && <Loading></Loading>}
      {!isLoading && trendingUsers.length === 0 && <p>No users available</p>}
      {!isLoading && trendingUsers.length > 0 && (
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
                  <span className='slider__username'>{user.nickname}</span>
                </div>
              </div>
            );
          })}
        </Slider>
      )}
    </div>
  );
}

export default ArtistsSlider;
