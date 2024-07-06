import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const navigate= useNavigate();  

    const logIn = async ()=> {
        try{
            await signInWithEmailAndPassword(getAuth(), email, password);
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
                        <div className="row">
                            <div className="col-12 text-center">
                                <h4 className="font-weight-bold text-primary">Login</h4>
                                <hr />
                            </div>
                            <div className="col-12 text-center">
                                {error &&
                                    <div className="alert alert-danger">
                                        <div className="row">
                                            <div className="col-lg-1 col-sm-12">
                                                <FontAwesomeIcon icon={faExclamationTriangle} />
                                            </div>
                                            <div class="col-lg-11 col-sm-12 text-center">
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
                                <div className='my-3 text-center'>
                                    <button className='btn btn-sm btn-success w-100'
                                        type="submit" onClick={logIn}>
                                        Log in <FontAwesomeIcon icon={faSignInAlt} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer bg-primary text-white">
                        <span>Not Registed, Click
                            <Link className='text-white' to="/create-account"> Here
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginPage;