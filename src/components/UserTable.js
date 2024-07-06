
import React from 'react';
import { Link } from 'react-router-dom';

const UserTable = ({ users }) => {
  return (
      <div className='container-fluid'>
          <table className="table table-sm table-striped text-center table-bordered">
              <thead>
                  <tr>
                      <th>Picture</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Actions</th>
                  </tr>
              </thead>
              <tbody>
                  {users.map((user) => (
                      <tr key={user.login.uuid}>
                          <td>
                              <img className='rounded' src={user.picture.thumbnail} alt="User" />
                          </td>
                          <td>{`${user.name.first} ${user.name.last}`}</td>
                          <td>{user.email}</td>
                          <td>
                              <Link to={`/User/${user.login.uuid}`} className="btn btn-primary">
                                  Edit
                              </Link>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
   
  );
};

export default UserTable;
