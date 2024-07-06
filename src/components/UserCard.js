import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const UserCard = ({ user }) => {
  return (
    <div className="card h-100">
      <img src={user.picture.large} className="card-img-top" alt="User" />
      <div className="card-body">
        <h5 className="card-title">{`${user.name.first} ${user.name.last}`}</h5>
        <p className="card-text">Email: {user.email}</p>
      </div>
      <div className='card-footer d-flex justify-content-center'>
        <Link to={`/user/${user.login.uuid}`} className="btn btn-primary m-1">
          Edit <FontAwesomeIcon icon={faEdit} /> 
        </Link>
        <button className='btn btn-danger m-1'>
          Delete <FontAwesomeIcon icon={faTrash} />  
        </button>
      </div>
    </div>
  );
};

export default UserCard;
