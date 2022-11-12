import React, { useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';

import './newRoom.scss';
import { roomInputs } from '../../formSource';
import useFetch from '../../hooks/useFetch';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NewRoom = () => {
  const navigate = useNavigate('');

  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState(undefined);
  const [rooms, setRooms] = useState([]);

  const { data, loading, error } = useFetch('/hotels');

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const roomNumbers = rooms.split(',').map((room) => ({ number: room }));

    try {
      await axios.post(`/rooms/${hotelId}`, { ...info, roomNumbers });
    } catch (error) {
      console.log(error);
    }

    navigate('/rooms');
  };

  return (
    <div className='new'>
      <Sidebar />

      <div className='new-container'>
        <Navbar />
        <div className='top'>
          <h1>Add New Room</h1>
        </div>
        <div className='bottom'>
          <div className='right'>
            <form>
              {roomInputs.map((input) => (
                <div className='form-input' key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className='form-input'>
                <label>Rooms</label>
                <textarea
                  onChange={(e) => setRooms(e.target.value)}
                  placeholder='give comma between room number'
                />
              </div>
              <div className='form-input'>
                <label>Choose a hotel</label>
                <select
                  id='hotelId'
                  onChange={(e) => setHotelId(e.target.value)}
                >
                  {loading
                    ? 'loading'
                    : data?.map((hotel) => (
                        <option key={hotel._id} value={hotel._id}>
                          {hotel.name}
                        </option>
                      ))}
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
