import React, { useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';

import './new.scss';
import axios from 'axios';

const New = ({ inputs, title }) => {
  const [file, setFile] = useState('');
  const [info, setInfo] = useState({});

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'upload');

    try {
      const uploadRes = await axios.post(
        'https://api.cloudinary.com/v1_1/formyproject/image/upload',
        data
      );

      const { url } = uploadRes.data;

      const newUser = {
        ...info,
        img: url,
      };

      await axios.post('/auth/register', newUser);
      console.log(info);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='new'>
      <Sidebar />

      <div className='new-container'>
        <Navbar />
        <div className='top'>
          <h1>{title}</h1>
        </div>
        <div className='bottom'>
          <div className='left'>
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
              }
              alt={title}
            />
          </div>
          <div className='right'>
            <form>
              <div className='form-input'>
                <label htmlFor='file'>
                  Image: <DriveFolderUploadOutlinedIcon className='icon' />
                </label>
                <input
                  type='file'
                  id='file'
                  style={{ display: 'none' }}
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              {inputs.map((input) => (
                <div className='form-input' key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                  />
                </div>
              ))}

              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
