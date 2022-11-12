import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import MailList from '../../components/mailList/MailList';
import Footer from '../../components/footer/Footer';
import useFetch from '../../hooks/useFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationDot,
  faCircleXmark,
  faCircleArrowLeft,
  faCircleArrowRight,
} from '@fortawesome/free-solid-svg-icons';

import './hotel.css';
import { SearchContext } from '../../context/searchContext';
import { AuthContext } from '../../context/authContext';
import Reserve from '../../components/reserve/Reserve';

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split('/')[2];

  const navigate = useNavigate();

  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { data, loading, error, reFetch } = useFetch(`/hotels/find/${id}`);

  const { dates, options } = useContext(SearchContext);
  const { user } = useContext(AuthContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0].endDate, dates[0].startDate);

  const handleOpen = (index) => {
    setSlideNumber(index);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === 'l') {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate('/login');
    }
  };

  return (
    <div>
      <Navbar />
      <Header type='list' />
      {loading ? (
        'Loading Please Wait!'
      ) : (
        <div className='hotel-container'>
          {open && (
            <div className='slider'>
              <FontAwesomeIcon
                icon={faCircleXmark}
                className='close'
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className='arrow'
                onClick={() => handleMove('l')}
              />
              <div className='slider-wrapper'>
                <img
                  src={data.photos[slideNumber]}
                  alt=''
                  className='slider-img'
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className='arrow'
                onClick={() => handleMove('r')}
              />
            </div>
          )}
          <div className='hotel-wrapper'>
            <button className='book-now'>Reserve or Book Now!</button>
            <h1 className='hotel-title'>{data.name}</h1>
            <div className='hotel-address'>
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className='hotel-distance'>
              Excellent location - {data.distance}m from center
            </span>
            <span className='hotel-price-highlight'>
              Book a stay over ${data.cheapestPrice} at this property and get a
              free airport taxi
            </span>
            <div className='hotel-images'>
              {data?.photos?.map((photo, index) => (
                <div key={index} className='hotel-img-wrapper'>
                  <img
                    onClick={() => handleOpen(index)}
                    src={photo}
                    alt='hotel image'
                    className='hotel-img'
                  />
                </div>
              ))}
            </div>

            <div className='hotel-details'>
              <div className='hotel-details-texts'>
                <h1 className='hotel-title'>{data.title}</h1>
                <p className='hotel-desc'>{data.description}</p>
              </div>
              <div className='hotel-details-price'>
                <h1>Perfect for a {days}-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  <b>${days * data.cheapestPrice * options.room}</b> ({days}{' '}
                  nights)
                </h2>
                <button onClick={handleClick}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  );
};

export default Hotel;
