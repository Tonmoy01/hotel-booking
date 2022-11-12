import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

import './reserve.css';
import useFetch from '../../hooks/useFetch';
import { SearchContext } from '../../context/searchContext';
import axios from 'axios';

const Reserve = ({ setOpen, hotelId }) => {
  const navigate = useNavigate();

  const [selectedRooms, setSelectedRooms] = useState([]);

  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
  const { dates } = useContext(SearchContext);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    let list = [];

    while (date <= end) {
      list.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return list;
  };

  const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      allDates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;

    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const handleClick = async (e) => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/rooms/availability/${roomId}`, {
            dates: allDates,
          });

          return res.data;
        })
      );
      setOpen(false);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='reserve'>
      <div className='reserve-container'>
        <FontAwesomeIcon
          icon={faCircleXmark}
          className='reserve-close'
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data?.map((item) => (
          <div key={item._id} className='reserve-item'>
            <div className='reserve-info'>
              <div className='reserve-title'>{item?.title}</div>
              <div className='reserve-desc'>{item?.desc}</div>
              <div className='reserve-max'>
                Max People: <b>{item?.maxPeople}</b>
              </div>
              <div className='reserve-price'>{item?.price}</div>
            </div>
            <div className='reserve-select-rooms'>
              {item.roomNumbers.map((roomNumber) => (
                <div className='room' key={roomNumber._id}>
                  <label>{roomNumber.number}</label>
                  <input
                    type='checkbox'
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className='reserve-button'>
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
