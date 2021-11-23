import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signup } from '../../actions';
import Input from '../../components/UI/Inputs/signupinput';
import { toast } from 'react-toastify';

toast.configure()

/**
* @author
* @function Signup
**/

const Signup = () => {

    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [error, setError] = useState('');
    const dispatch = useDispatch();
    const history = useHistory()

    const userSignup = (e) => {

        e.preventDefault();

        const user = {
            firstName, lastName, email, password
        }
        if (!firstName || !lastName || !email || !password) {
            toast.error(!firstName ? `First Name required!!` :
                (!lastName ? 'Last Name required' : (!email ? 'Email required' : `Password required!!`)), {
                position: toast.POSITION.TOP_LEFT
            });
        } else {
            dispatch(signup(user));
        }
    }

    useEffect(() => {
        if (auth.authenticate || user.verified) {
            history.push({
                pathname: '/',
            });
        } else if (user.error != null) {
            console.log(user.error)
            toast.error(user.error.data.error, {
                position: toast.POSITION.TOP_LEFT
            });
            user.error = null;

        }
    }, [user, auth])

    // if (auth.authenticate) {
    //     return <Redirect to={`/`} />
    // }

    // if(user.loading){
    //     return <p>Loading...!</p>
    // }
    return (
        <div className="container ">
            <div style={{ width: '450px', margin: 'auto', padding: '40px 55px 45px 55px' }}>
                <Form onSubmit={userSignup}>
                    <h3 className="text-center mt-5">Register</h3>
                    {/* {user.message} */}
                    <Row>
                        <Col md={6}>
                            <Input
                                label="First Name"
                                placeholder="First Name"
                                value={firstName}
                                type="text"
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Col>
                        <Col md={6}>
                            <Input
                                label="Last Name"
                                placeholder="Last Name"
                                value={lastName}
                                type="text"
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Col>
                    </Row>

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
                        <Button variant="primary" type="submit" className="btn btn-primary mt-3">
                            Submit
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    )

}

export default Signup