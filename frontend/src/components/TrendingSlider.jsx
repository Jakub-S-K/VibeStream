import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// import albumImage from '../assets/img/albumImage.jpg';
// import trendingData from '../assets/json/trending.json';

function TrendingSlider() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/test/trending');
      if (!response.ok) {
        throw new Error('Error!');
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

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
          {data.map((item, index) => {
            return (
              <div key={index} className='slider__card trending-card'>
                <div className='slider__card-top'>
                  <img
                    src={`http://localhost:3001/assets/img/albums/${item.albumName}.jpg`}
                    alt={item.albumName}
                    className='slider__image trending-image'
                  />
                </div>
                <div className='slider__card-bottom'>
                  <span className='slider__username trending-username'>
                    {item.username}
                  </span>
                  <div className='slider__play'>
                    <i class='bx bx-play-circle'></i>
                    <span className='slider__album-name'>{item.albumName}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
}

export default TrendingSlider;
