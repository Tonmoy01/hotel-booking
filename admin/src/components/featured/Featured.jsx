import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import { CircularProgressbar } from 'react-circular-progressbar';

import './featured.scss';
import 'react-circular-progressbar/dist/styles.css';

const Featured = () => {
  return (
    <div className='featured'>
      <div className='top'>
        <h1 className='title'>Total Revenew</h1>
        <MoreVertIcon fontSize='small' />
      </div>
      <div className='bottom'>
        <div className='featured-chart'>
          <CircularProgressbar value={70} text={'70%'} strokeWidth={5} />
        </div>

        <p className='title'>Total sales made today</p>
        <p className='amount'>$420</p>
        <p className='desc'>
          Previous transactions processing. Last payments may not be included.
        </p>

        <div className='summary'>
          <div className='item'>
            <div className='item-title'>Target</div>
            <div className='item-result negative'>
              <KeyboardArrowDownIcon fontSize='small' />
              <div className='result-amount'>$12.4k</div>
            </div>
          </div>
          <div className='item'>
            <div className='item-title'>Last Week</div>
            <div className='item-result positive'>
              <KeyboardArrowUpOutlinedIcon fontSize='small' />
              <div className='result-amount'>$12.4k</div>
            </div>
          </div>
          <div className='item'>
            <div className='item-title'>Last Month</div>
            <div className='item-result positive'>
              <KeyboardArrowUpOutlinedIcon fontSize='small' />
              <div className='result-amount'>$12.4k</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
