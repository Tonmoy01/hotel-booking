import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import { DateRange } from 'react-date-range';
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';

import './list.css';
import SearchItem from '../../components/searchItem/SearchItem';
import Footer from '../../components/footer/Footer';
import useFetch from '../../hooks/useFetch';

const List = () => {
  const { state } = useLocation();

  const [destination, setDestination] = useState(state?.destination ?? '');
  const [dates, setDates] = useState(state?.dates ?? []);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(state?.options ?? []);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { data, loading, error, reFetch } = useFetch(
    `/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`
  );

  const handleClick = () => {
    reFetch();
    return true;
  };

  return (
    <>
      <Navbar />
      <Header type='list' />

      <div className='list-container'>
        <div className='list-wrapper'>
          <div className='list-search'>
            <h1 className='ls-title'>Search</h1>
            <div className='ls-item'>
              <label>Destination</label>
              <input
                type='text'
                placeholder={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className='ls-item'>
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                'MM/dd/yyyy'
              )} to ${format(dates[0].endDate, 'MM/dd/yyyy')}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>

            <div className='ls-item'>
              <label>Options</label>
              <div className='ls-options'>
                <div className='ls-option-item'>
                  <span className='ls-option-text'>
                    Min price <small>per night</small>
                  </span>
                  <input
                    type='number'
                    onChange={(e) => setMin(e.target.value)}
                    className='ls-option-input'
                  />
                </div>
                <div className='ls-option-item'>
                  <span className='ls-option-text'>
                    Max price <small>per night</small>
                  </span>
                  <input
                    type='number'
                    onChange={(e) => setMax(e.target.value)}
                    className='ls-option-input'
                  />
                </div>
                <div className='ls-option-item'>
                  <span className='ls-option-text'>Adult</span>
                  <input
                    type='number'
                    className='ls-option-input'
                    placeholder={options.adult}
                    min={1}
                  />
                </div>
                <div className='ls-option-item'>
                  <span className='ls-option-text'>Children</span>
                  <input
                    type='number'
                    className='ls-option-input'
                    placeholder={options.children}
                    min={0}
                  />
                </div>
                <div className='ls-option-item'>
                  <span className='ls-option-text'>Room</span>
                  <input
                    type='number'
                    className='ls-option-input'
                    placeholder={options.room}
                    min={1}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className='list-result'>
            {loading ? (
              'Loading Please Wait!'
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem key={item._id} item={item} />
                ))}
              </>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default List;
