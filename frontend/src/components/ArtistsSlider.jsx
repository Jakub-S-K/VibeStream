import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import avatar from '../assets/img/avatars/avatar1.jpg';
import artistsData from '../assets/json/artists.json';

function ArtistsSlider() {
  var settings = {
    // dots: true,
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
      { breakpoint: 600, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <>
      <div className='slider'>
        <Slider {...settings}>
          {artistsData.map((item, index) => {
            return (
              <div key={index} className='slider__card artists-card'>
                <div className='slider__card-top'>
                  <img
                    src={avatar}
                    alt={item.username}
                    className='slider__image'
                  />
                </div>
                <div className='slider__card-bottom'>
                  <span className='slider__username'>{item.username}</span>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
}

export default ArtistsSlider;
