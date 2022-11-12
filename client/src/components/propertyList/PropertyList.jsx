import React from 'react';
import hotels from '../../assets/propertyList/hotels.webp';
import apartments from '../../assets/propertyList/apartments.jpg';
import resorts from '../../assets/propertyList/resorts.jpg';
import cabins from '../../assets/propertyList/cabins.jpg';
import villas from '../../assets/propertyList/villas.jpg';
import useFetch from '../../hooks/useFetch';

import './propertyList.css';

const PropertyList = () => {
  const { data, loading, error } = useFetch('hotels/countByType');

  const images = [
    'https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=',
    'https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg',
    'https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg',
    'https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg',
    'https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg',
  ];

  return (
    <div className='p-list'>
      {loading ? (
        'Loading, Please Wait!'
      ) : (
        <>
          {data &&
            images.map((img, index) => (
              <div className='p-list-item' key={index}>
                <img src={img} alt={data[index]?.type} className='p-list-img' />
                <div className='p-list-titles'>
                  <h1>{data[index]?.type}</h1>
                  <h2>
                    {data[index]?.count} {data[index]?.type}
                  </h2>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default PropertyList;

// <div className='p-list-item'>
//             <img src={apartments} alt='hotels' className='p-list-img' />
//             <div className='p-list-titles'>
//               <h1>Apartments</h1>
//               <h2>{data[1]} apartment</h2>
//             </div>
//           </div>
//           <div className='p-list-item'>
//             <img src={resorts} alt='hotels' className='p-list-img' />
//             <div className='p-list-titles'>
//               <h1>Resorts</h1>
//               <h2>{data[2]} resort</h2>
//             </div>
//           </div>
//           <div className='p-list-item'>
//             <img src={villas} alt='hotels' className='p-list-img' />
//             <div className='p-list-titles'>
//               <h1>Villas</h1>
//               <h2>{data[3]} villa</h2>
//             </div>
//           </div>
//           <div className='p-list-item'>
//             <img src={cabins} alt='hotels' className='p-list-img' />
//             <div className='p-list-titles'>
//               <h1>Cabins</h1>
//               <h2>{data[4]} cabin</h2>
//             </div>
//           </div>
