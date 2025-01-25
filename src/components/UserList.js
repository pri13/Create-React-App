import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserCard from './UserCard';
import UserTable from './UserTable';
import Pagination from './Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTable, faTh, faFilter } from '@fortawesome/free-solid-svg-icons';
import  Loader  from '../components/Loader';

const UserList = () => {
  // Initializing State Variables and Assinging default values with UseState.
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('card'); // card or table
  const usersPerPage = 20;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://randomuser.me/api/?results=50'); // Fetching 50 users for demonstration
      setUsers(response.data.results);
      setFilteredUsers(response.data.results);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filterUsers = () => {
    const filtered = users.filter(user =>
      user.name.first.toLowerCase().includes(filter.toLowerCase()) ||
      user.name.last.toLowerCase().includes(filter.toLowerCase()) ||
      user.email.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  };
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === 'card' ? 'table' : 'card'));
  };

  return (
    <div>
      <div className='container my-3'>
        <div className='alert alert-success d-flex justify-content-between align-items-center mb-3'>
          <div className="d-flex align-items-center flex-grow-1">
            <input
              type="text"
              className="form-control"
              placeholder="Filter by name or email"
              value={filter}
              onChange={handleFilterChange}
            />
            <button className="btn btn-light ms-2 filter-button" onClick={filterUsers}>
              <FontAwesomeIcon icon={faFilter} style={{ fontSize: '1rem' }} /> Filter
            </button>
          </div>
        </div>
      </div>
      <div className='d-flex justify-content-end'>
        <button className="btn btn-sm btn-light my-4" onClick={toggleViewMode}>
          {viewMode === 'card' ? (
            <span><FontAwesomeIcon icon={faTable} /> Table view</span>
          ) : (
            <span><FontAwesomeIcon icon={faTh} /> Card view</span>
          )}
        </button>
      </div>
      {loading ? (
        <div className="text-center my-5">
          <Loader />
        </div>
      ) : viewMode === 'card' ? (
        <>
          <Pagination totalPages={totalPages} paginate={paginate} currentPage={currentPage} />
          <div className="row row-cols-1 row-cols-md-4 g-4 mx-2">
            {currentUsers.map((user) => (
              // g-4 is a Bootstrap class for gutter spacing between grid items
              // mx-2 is a Bootstrap class for horizontal margin X-axis
              // my-2 is a Bootstrap class for vertical margin Y-axis
              <div key={user.login.uuid} className="col">
                <UserCard user={user} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <Pagination totalPages={totalPages} paginate={paginate} currentPage={currentPage} />
          <UserTable users={currentUsers} />
        </>
      )}
    </div>
  );
};

export default UserList;
