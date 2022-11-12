import React, { useContext } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';

import './navbar.scss';
import { DarkModeContext } from '../../context/darkModeContext';

const Navbar = () => {
  const { dispatch, darkMode } = useContext(DarkModeContext);

  return (
    <div className='navbar'>
      <div className='wrapper'>
        <div className='search'>
          <input type='text' placeholder='Search...' />
          <SearchOutlinedIcon />
        </div>
        <div className='items'>
          <div className='item'>
            <LanguageOutlinedIcon className='icon' />
            English
          </div>
          <div className='item'>
            {darkMode ? (
              <WbSunnyOutlinedIcon
                className='icon'
                style={{ cursor: 'pointer' }}
                onClick={() => dispatch({ type: 'TOGGLE' })}
              />
            ) : (
              <DarkModeOutlinedIcon
                className='icon'
                style={{ cursor: 'pointer' }}
                onClick={() => dispatch({ type: 'TOGGLE' })}
              />
            )}
          </div>
          <div className='item'>
            <FullscreenExitOutlinedIcon className='icon' />
          </div>
          <div className='item'>
            <NotificationsOutlinedIcon className='icon' />
            <div className='counter'>1</div>
          </div>
          <div className='item'>
            <ChatBubbleOutlineIcon className='icon' />
            <div className='counter'>2</div>
          </div>
          <div className='item'>
            <ListOutlinedIcon className='icon' />
          </div>
          <div className='item'>
            <img
              src='https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
              alt='avatar'
              className='avatar'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
