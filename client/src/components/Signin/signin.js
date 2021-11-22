import React, { useEffect, useState } from 'react';
import { Form, Button, Toast } from 'react-bootstrap';
import Input from '../../components/UI/Inputs/signupinput';
import { login } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


toast.configure()
/**
* @author
* @function Signin
**/

const Signin = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [error, setError] = useState('');
    const auth = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const userLogin = (e) => {

        e.preventDefault();

        const user = {
            email, password
        }

        dispatch(login(user));
    }

    if (auth.authenticate) {
        return <Redirect to={`/`} />
    } else if (auth.error != null) {

        toast.error("Wow so easy!", {
            position: toast.POSITION.TOP_LEFT
        });
        // console.log(auth.error)
        // console.log(auth.error.data.error)
    }
    

    // useEffect(() => {
    //     userLogin()
    // },[])

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

                    {/* <p style={{ color: "red" }}>
                        {auth.error != null ? notify() : null}
                    </p>

                    <div>
                        <button onClick={notify}>Notify!</button>
                        <ToastContainer />
                    </div> */}


                    <div class="d-grid gap-2">
                        <Button variant="primary" type="submit" class="btn btn-primary">
                            Submit
                        </Button>
                    </div>

                    <div class="d-flex mt-2">
                        <a href='signup' className="justify-content-start col-6">  SignUp  </a>
                        <p className="forgot-password  justify-content-end col-6 col-6 text-right">
                            Forgot <a href="#">password?</a>
                        </p>
                    </div>

                    <p className="mt-1 float-right">

                    </p>

                    {/* <p className="forgot-password text-right ">
                        Forgot <a href="#">password?</a>
                    </p> */}


                </Form>
            </div>
        </div>
    )

}

export default Signin