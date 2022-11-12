import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Chart from '../../components/chart/Chart';

import './single.scss';
import List from '../../components/table/Table';

const Single = () => {
  return (
    <div className='single'>
      <Sidebar />
      <div className='single-container'>
        <Navbar />
        <div className='top'>
          <div className='left'>
            <div className='edit-button'>Edit</div>
            <h1 className='title'>Information</h1>
            <div className='item'>
              <img
                src='https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'
                alt='product name'
                className='item-img'
              />
              <div className='details'>
                <h1 className='item-title'>Jane Doe</h1>
                <div className='detail-item'>
                  <span className='item-key'>Email:</span>
                  <span className='item-value'>jane@gmail.com</span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>Phone:</span>
                  <span className='item-value'>111-111-1111</span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>Address:</span>
                  <span className='item-value'>
                    House#109, Joyra Block-A, Road 1, Manikganj
                  </span>
                </div>
                <div className='detail-item'>
                  <span className='item-key'>Country:</span>
                  <span className='item-value'>Bangladesh</span>
                </div>
              </div>
            </div>
          </div>
          <div className='right'>
            <Chart aspect={3 / 1} title='User Spending (Last 6 Months)' />
          </div>
        </div>
        <div className='bottom'>
          <h1 className='title'>Last Transactions</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default Single;
