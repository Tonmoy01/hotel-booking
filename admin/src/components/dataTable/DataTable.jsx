import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import useFetch from '../../hooks/useFetch';

import './dataTable.scss';
import axios from 'axios';

const DataTable = ({ columns }) => {
  const [list, setList] = useState([]);

  const location = useLocation();
  const path = location.pathname.split('/')[1];

  const { data, loading, error } = useFetch(`/${path}`);

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/${path}/${id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => {
        return (
          <div className='cell-action'>
            <Link to='/users/test' style={{ textDecoration: 'none' }}>
              <div className='view-button'>View</div>
            </Link>
            <div
              className='delete-button'
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className='data-table'>
      <div className='data-table-title'>
        Add New User
        <Link to={`/${path}/new`} className='link'>
          Add New
        </Link>
      </div>
      <DataGrid
        className='data-grid'
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default DataTable;
