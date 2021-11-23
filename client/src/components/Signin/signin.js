import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Input from '../../components/UI/Inputs/signupinput';
import { login } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()
/**
* @author
* @function Signin
**/

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [error, setError] = useState(false);
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const history = useHistory();

    const userLogin = (e) => {
        e.preventDefault();

        const user = {
            email, password
        }

        if (!email || !password) {
            toast.error(!email ? `Email required!!` : `Password required!!`, {
                position: toast.POSITION.TOP_LEFT
            });
        } else {
            dispatch(login(user));
        }
    }

    useEffect(() => {
        if (auth.authenticate) {
            // auth.error = null;
            history.push({
                pathname: '/',
            });
            // return <Redirect to={`/`} />
        } else if (auth.error != null) {
            toast.error(auth.error.data.error, {
                position: toast.POSITION.TOP_LEFT
            });
            auth.error = null;

        }
    }, [auth])

    // if (auth.authenticate) {
    //     return <Redirect to={`/`} />
    // } else if (auth.error != null) {
    //     toast.error(auth.error.data.error, {
    //         position: toast.POSITION.TOP_LEFT
    //     });
    // }

    return (
        <div className="container ">
            <div style={{ width: '450px', margin: 'auto', padding: '40px 55px 45px 55px' }}>
                <Form onSubmit={userLogin}>


                    <h3 className="text-center mt-5">Log in</h3>

                    <Input
                        label="Email "
                        placeholder="you@gmail.com "
                        value={email}
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Input
                        label="Password "
                        placeholder="Password "
                        value={password}
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <div className="d-grid gap-2 mt-2">
                        <Button variant="primary" type="submit" className="btn btn-primary">
                            Submit
                        </Button>
                    </div>

                    <div className="d-flex mt-2">
                        <a href='signup' className="justify-content-start col-6">  SignUp  </a>
                        <p className="forgot-password  justify-content-end col-6 col-6 text-right">
                            Forgot <a href="#">password?</a>
                        </p>
                    </div>

                    <p className="mt-1 float-right">

                    </p>

                </Form>
            </div>
        </div>
    )

}

export default Signin