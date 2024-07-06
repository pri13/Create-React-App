import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

const CreateAccountPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

     const navigate = useNavigate();

     const createAccount = async () =>{
        try{
            if(password != confirmPassword){
                setError('Password and Cofirm Password do not match');
                return;
            }

            await createUserWithEmailAndPassword(getAuth(), email, password);
            navigate('/');
        }
        catch(e){
            setError(e.message);
        }
     }

    return (
        <>
            <div className="container my-3" id="login">
                <div className="card my-5 rounded border">
                    <div className='card-body'>
                        <div className="row justify-content-center">
                            <div className="col-12 text-center">
                                <h4 className="font-weight-bold text-success">Create new Account</h4>
                                <hr />
                            </div>
                            <div className="col-6">
                                {error &&
                                    <div className="alert alert-danger">
                                        <div className="row">
                                            <div className="col-lg-1 col-sm-12">
                                                <FontAwesomeIcon icon={faExclamationTriangle} />
                                            </div>
                                            <div class="col-lg-11 col-sm-12">
                                                <span>{error}</span>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-lg-6 col-md-12 col-sm-12">
                                <div>
                                    <label className="text-secondary">Email Address</label>
                                    <input className='form-control'
                                        placeholder='you email Address'
                                        value={email}
                                        onChange={e => setEmail(e.target.value)} />
                                </div>
                                <div>
                                    <label className="text-secondary">Password</label>
                                    <input className='form-control' type='password'
                                        placeholder='Your Password'
                                        value={password}
                                        onChange={e => setPassword(e.target.value)} />
                                </div>
                                <div>
                                    <label className="text-secondary">Confirm Password</label>
                                    <input className='form-control' type='password'
                                        placeholder='Re-enter Password'
                                        value={confirmPassword}
                                        onChange={e => setConfirmPassword(e.target.value)} />
                                </div>
                                <div className='my-3 text-center'>
                                    <button className='btn btn-sm btn-primary w-100'
                                        type="submit" onClick={createAccount}>
                                       Create Account <FontAwesomeIcon icon={faSignInAlt} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer bg-success text-white">
                        <span>Already have Account, login
                            <Link className='text-white' to="/login"> Here</Link>
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateAccountPage;