import React from 'react';
import dublin from '../../assets/dublin.webp';
import reno from '../../assets/reno.webp';
import austin from '../../assets/austin.webp';
import './featured.css';

import useFetch from '../../hooks/useFetch';

const Featured = () => {
  const { data, loading, error, reFetch } = useFetch(
    '/hotels/countByCity?cities=berlin,madrid,london'
  );

  return (
    <div className='featured'>
      {loading ? (
        'Loading Please Wait!'
      ) : (
        <>
          <div className='featured-item'>
            <img src={dublin} alt='image' className='featured-img' />
            <div className='featured-titles'>
              <h1>Berlin</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>
          <div className='featured-item'>
            <img src={reno} alt='image' className='featured-img' />
            <div className='featured-titles'>
              <h1>Madrid</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className='featured-item'>
            <img src={austin} alt='image' className='featured-img' />
            <div className='featured-titles'>
              <h1>London</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
