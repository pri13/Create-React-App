import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const UserTable = ({ users }) => {
  return (
      <div className='container-fluid'>
          <table className="table table-sm table-striped text-center table-bordered">
              <thead>
                  <tr>
                      <th>Number # </th>
                      <th>Picture</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Actions</th>
                  </tr>
              </thead>
              <tbody>
                  {users.map((user, index) => (
                      <tr key={user.login.uuid}>
                          <td>{index + 1}</td>
                          <td>
                              <img className='rounded' src={user.picture.thumbnail} alt="User" />
                          </td>
                          <td>{`${user.name.first} ${user.name.last}`}</td>
                          <td>{user.email}</td>
                          <td>
                              <Link to="/view" state={user} className="btn btn-success m-1">
                                  View
                              </Link>
                              <Link to={`/User/${user.login.uuid}`} className="btn btn-primary">
                                  Edit <FontAwesomeIcon icon={faEdit} />
                              </Link>
                              <button className='btn btn-danger m-1'>
                                  Delete <FontAwesomeIcon icon={faTrash} />
                              </button>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
  );
};

export default UserTable;
