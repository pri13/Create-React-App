import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form'; // Import the useForm hook from react-hook-form
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// below Icons are imported from @fontawesome/free-solid-svg-icons as an object then provided to the Icon
// as prop as an object on line 52 and 58.
import { faSave, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import  Loader  from '../components/Loader';


const UserForm = () => {
  const { userId } = useParams();//This hook is used to access the URL parameters .ex QueryString -> ?UserId={value}.
  const [user, setUser] = useState(null); //setting User variable to Null e.g. User = null
  // Initialize the useForm hook and destructure its methods and form state
  const { register, handleSubmit, watch,  reset, getValues } = useForm();
  // register: This method is used to register an input or select element and apply the appropriate validation rules.
  // handleSubmit: This method will be called when the form is submitted.
  // watch: This method is used to subscribe to input changes and get the current value of an input.
  // getValues: This method is used to get the current values of the form fields.
  
  //Version 6, Removed the hook UseHistory, and added UseNavigate Hook for programmatic Nagivation.
  //useNavigate is a hook that returns a function that lets you navigate programmatically, similar to the history.push method in React Router v5.
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, [userId]); // Call fetchUser Function When UserId changes

  const fetchUser = async () => {
    try {
      const response = await axios.get(`https://randomuser.me/api/?uuid=${userId}`);
      const userData = response.data.results[0];
      setUser(userData);
      reset(userData); // Set the form default values to the fetched user data
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  if (!user) {
    return <div className='d-flex justify-content-center align-items-center'>
      <Loader />
    </div>;
  }

  console.log(watch("email")); // watch input value by passing the name of it

  const goHome= ()=> {
    navigate('/');
  }

  const handleSave = () => {
    const data = getValues();
    // getValues() is a method provided by the useForm hook that allows you to retrieve the current values of the form fields.
    console.log(data);
  }

  return (
    <div>
      <button onClick={goHome} className="btn btn-light my-2">
        <FontAwesomeIcon icon={faArrowLeft} />  Back
      </button>
      <div className=' cotainer-fluid alert alert-success'>
        <div className='d-flex justify-content-between'>
          <h2>Edit User</h2>
          <button type="submit" className="btn btn-light" onClick={handleSave}>
             Save <FontAwesomeIcon icon={faSave} />
          </button>
        </div>
        <div>
          
        </div>
        <div className='d-flex align-items-center flex-wrap'>
          <div className="col-3 p-1">
            <label htmlFor="firstName" className="form-label">First Name</label>
            <input type="text" className="form-control" id="firstName" {...register('name.first')} />
          </div>
          <div className="col-3 p-1">
            <label htmlFor="lastName" className="form-label">Last Name</label>
            <input type="text" className="form-control" id="lastName" {...register('name.last')} />
          </div>
          <div className="col-3 p-1">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" {...register('email')} />
          </div>
          <div className="col-3 p-1">
            <label htmlFor="phone" className="form-label">Phone</label>
            <input type="tel" className="form-control" id="phone" {...register('phone')} />
          </div>
          <div className="col-3 p-1">
            <label htmlFor="addressStreet" className="form-label">Street</label>
            <input type="text" className="form-control" id="addressStreet" {...register('location.street.name')} />
          </div>
          <div className="col-3 p-1">
            <label htmlFor="addressCity" className="form-label">City</label>
            <input type="text" className="form-control" id="addressCity" {...register('location.city')} />
          </div>
          <div className="col-3 p-1">
            <label htmlFor="addressState" className="form-label">State</label>
            <input type="text" className="form-control" id="addressState" {...register('location.state')} />
          </div>
          <div className="col-3 p-1">
            <label htmlFor="addressCountry" className="form-label">Country</label>
            <input type="text" className="form-control" id="addressCountry" {...register('location.country')} />
          </div>
          <div className="col-3 p-1">
            <label htmlFor="postcode" className="form-label">Postcode</label>
            <input type="text" className="form-control" id="postcode" {...register('location.postcode')} />
          </div>
          <div className="col-3 p-1">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" className="form-control" id="username" {...register('login.username')} />
          </div>
          <div className="col-3 p-1">
            <label htmlFor="dob" className="form-label">Date of Birth</label>
            <input type="date" className="form-control" id="dob" {...register('dob.date')} />
          </div>
          <div className="col-3 p-1">
            <label htmlFor="gender" className="form-label">Gender</label>
            <select className="form-control" id="gender" {...register('gender')}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="col-3 p-1">
            <label htmlFor="nat" className="form-label">Nationality</label>
            <input type="text" className="form-control" id="nat" {...register('nat')} />
          </div>
        </div>
      
      </div>
    </div>
  );
};

export default UserForm;
