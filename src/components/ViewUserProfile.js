import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// below Icons are imported from @fontawesome/free-solid-svg-icons as an object then provided to the Icon
// as prop as an object on line 52 and 58.
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';



const ViewUserProfile = () => {

    const location = useLocation();
    const data = location.state;
    console.log(data);

     const navigate = useNavigate();

     const goHome= ()=> {
        navigate('/');
     }

    return (
        <div>
            <button onClick={goHome} className="btn btn-light my-2 mx-3">
                <FontAwesomeIcon icon={faArrowLeft} />  Back
            </button>
           
            <div className="container-fluid">
                <div className="card">
                    <div className="card-header">
                        <div className="d-flex justify-content-start align-items-center">
                            <span>Profile Details</span>
                            <span className="badge bg-danger mx-2">{data.name.first}, {data.name.last}</span>
                            <span className="badge bg-success mx-2">{data.dob.age} years old</span>
                            <span className="badge bg-primary mx-2">{data.gender}</span>
                        </div>
                      
                    </div>
                    <div className="card-body">
                        <div className="row justify-content-center ">
                            <div className="col-4 text-left m-5">
                                <img src={data.picture.large} width={300} height={300} className="img-fluid rounded" alt="Responsive image" />
                                <h5 className="card-title">{`${data.name.first} ${data.name.last}`}</h5>
                                <p className="card-text">Email: {data.email}</p>
                            </div>
                            <div className="col">
                                <div className="card shadow">
                                    <div className="card-header">
                                        <span>Address</span>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-6">
                                                <p className="card-text">
                                                    <span className="fw-bold">Address: </span>
                                                     {data.location.street.number} 
                                                     {data.location.street.name} ,   {data.location.city} ,
                                                     {data.location.state}  - {data.location.postcode}
                                                </p>
                                                <p>
                                                    <span className="fw-bold">Coordinates:</span> 
                                                    <span className="mx-2">
                                                        <span className="fw-bold">Latitude: </span>
                                                         {data?.location?.coordinates?.latitude}
                                                    </span>
                                                    <span className="mx-2">
                                                        <span className="fw-bold">Longtitude: </span>
                                                        {data?.location?.coordinates?.longitude}
                                                    </span>
                                                </p>
                                                <p> <span className="fw-bold">Timezone: </span>
                                                    {data?.location?.timezone?.description}
                                                 </p>
                                            </div>
                                            <div className="col-6">
                                                <p><span className="fw-bold">Phone:</span> {data.phone}</p>
                                                <p><span className="fw-bold">Cell:</span> {data.cell}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card my-2 shadow">
                                    <div className="card-header">
                                        <span>Login Information</span>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col">
                                                <p className="card-text">
                                                    <span className="fw-bold">UserId : </span>        
                                                    {data.login.uuid}
                                                </p>
                                                <p className="card-text">
                                                    <span className="fw-bold">Username: </span>
                                                     {data.login.username}
                                                </p>
                                                <p className="card-text">
                                                    <span className="fw-bold">Password: </span>
                                                    {data.login.password} 
                                                </p>
                                            </div>
                                            <div className="col">
                                                <p className="card-text">
                                                    <span className="fw-bold">Salt: </span>
                                                    {data.login.salt}
                                                </p>
                                                <p className="card-text">
                                                    <span className="fw-bold">MD5: </span>
                                                    {data.login.md5}
                                                </p>
                                                <p className="card-text">
                                                    <span className="fw-bold">SHA1: </span>
                                                    {data.login.sha1}
                                                </p>
                                                <p className="card-text">
                                                    <span className="fw-bold">SHA256: </span>
                                                    {data.login.sha256}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default ViewUserProfile;