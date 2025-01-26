import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const UserCard = ({ user , index}) => {
  return (
    <div className="card user h-100 shadow">
      <img src={user.picture.large} className="card-img-top" alt="User" />
      <div className="card-body">
        <h5 className="card-title">#{index}. {`${user.name.first} ${user.name.last}`}</h5>
        <p className="card-text">Email: {user.email}</p>
      </div>
      <div className='card-footer d-flex justify-content-center'>
        <Link to="/view" state={user} className="btn btn-success m-1">
          View
        </Link>
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
