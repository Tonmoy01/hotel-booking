import React from 'react';
import madrid from '../../assets/properties/madrid.webp';
import austin from '../../assets/properties/austin.jpg';
import berlin from '../../assets/properties/berlin.jpg';
import lisbon from '../../assets/properties/lisbon.jpg';
import useFetch from '../../hooks/useFetch';

import './featuredProperties.css';

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch('hotels?featured=true&limit=4');

  return (
    <div className='fp'>
      {loading ? (
        'Loading, Please Wait!'
      ) : (
        <>
          {data.map((item) => (
            <div className='fp-item' key={item._id}>
              <img src={item.photos[0]} alt='' className='fp-img' />
              <span className='fp-name'>{item.name}</span>
              <span className='fp-city'>{item.city}</span>
              <span className='fp-price'>
                Starting from ${item.cheapestPrice}
              </span>
              {item.rating && (
                <div className='fp-rating'>
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
