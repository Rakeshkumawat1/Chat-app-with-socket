import React, { useEffect, useState } from 'react';
import './home.css';
import { io } from 'socket.io-client';
import { useHistory } from 'react-router-dom';
import { socketEndpoint } from '../../urlConfig';
import { axios } from '../../helpers/axios'
import { homeData } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import Input from '../../components/UI/Inputs/signupinput';
import { toast } from 'react-toastify';


export default function Home() {

    toast.configure();
    let socket;
    const history = useHistory();
    const home = useSelector(state => state.home)
    const dispatch = useDispatch()
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    const [mobile, setMobile] = useState('')
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSubmit = () => {
        if (!mobile || mobile.length < 10) {
            toast.error(!mobile ? "Enter mobile number!" : "Enter currect mobile number!", {
                position: toast.POSITION.TOP_LEFT
            });
        } else {
            // const form = new FormData();
            // form.append('mobile', mobile);
            if (mobile == user.mobile) {
                toast.error("You can't add your mobile number to your list!", {
                    position: toast.POSITION.TOP_LEFT
                });
            } else {
                const form = { mobile }
                dispatch(homeData(form, user));
                setShow(false);
            }

        }

    }

    useEffect(() => {
        if (token) {
            socket = io(socketEndpoint, { transports: ['websocket'] });
            if (home.message) {
                toast.success(home.message, {
                    position: toast.POSITION.TOP_LEFT
                });
            }
            // dispatch(homeData(user))

            // socket.emit('join', { name:"test", room: "test" }, () => {
            //     // if(error) return console.log("error from socket");
            // })
            // return () => {
            //     socket.emit('disconnect');

            //     socket.off();
            // }

        } else {
            history.push({
                pathname: '/singin',
            })
        }
    }, [token, dispatch, home])

    // console.log(home)

    return (
        <div>
            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />

            <div className="container" style={{ width: "100%" }}>
                <div className="row clearfix">
                    <div className="col-lg-12">
                        <div className="card chat-app">
                            <div id="plist" className="people-list">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-search"></i></span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Search..." />
                                </div>
                                <ul className="list-unstyled chat-list mt-2 mb-0">
                                    <li className="clearfix">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar" />
                                        <div className="about">
                                            <div className="name">Vincent Porter</div>
                                            <div className="status"> <i className="fa fa-circle offline"></i> left 7 mins ago </div>
                                        </div>
                                    </li>
                                    <li className="clearfix active">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar" />
                                        <div className="about">
                                            <div className="name">Aiden Chavez</div>
                                            <div className="status"> <i className="fa fa-circle online"></i> online </div>
                                        </div>
                                    </li>
                                    <li className="clearfix">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="avatar" />
                                        <div className="about">
                                            <div className="name">Mike Thomas</div>
                                            <div className="status"> <i className="fa fa-circle online"></i> online </div>
                                        </div>
                                    </li>
                                    <li className="clearfix">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar" />
                                        <div className="about">
                                            <div className="name">Christian Kelly</div>
                                            <div className="status"> <i className="fa fa-circle offline"></i> left 10 hours ago </div>
                                        </div>
                                    </li>
                                    <li className="clearfix">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar8.png" alt="avatar" />
                                        <div className="about">
                                            <div className="name">Monica Ward</div>
                                            <div className="status"> <i className="fa fa-circle online"></i> online </div>
                                        </div>
                                    </li>
                                    <li className="clearfix">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="avatar" />
                                        <div className="about">
                                            <div className="name">Dean Henry</div>
                                            <div className="status"> <i className="fa fa-circle offline"></i> offline since Oct 28 </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="chat">
                                <div className="chat-header clearfix">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            {/* <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info"> */}
                                            <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar" />
                                            {/* </a> */}
                                            <div className="chat-about">
                                                <h6 className="m-b-0">Aiden Chavez</h6>
                                                <small>Last seen: 2 hours ago</small>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 hidden-sm text-right">
                                            <button className="rounded-pill" onClick={handleShow}>Add User</button>
                                            {/* <a href="javascript:void(0);" className="btn btn-outline-secondary"><i className="fa fa-camera"></i></a>
                                            <a href="javascript:void(0);" className="btn btn-outline-primary"><i className="fa fa-image"></i></a>
                                            <a href="javascript:void(0);" className="btn btn-outline-info"><i className="fa fa-cogs"></i></a>
                                            <a href="javascript:void(0);" className="btn btn-outline-warning"><i className="fa fa-question"></i></a> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="chat-history">
                                    <ul className="m-b-0">
                                        <li className="clearfix">
                                            <div className="message-data text-right">
                                                <span className="message-data-time">10:10 AM, Today</span>
                                                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar" />
                                            </div>
                                            <div className="message other-message float-right"> Hi Aiden, how are you? How is the project coming along? </div>
                                        </li>
                                        <li className="clearfix">
                                            <div className="message-data">
                                                <span className="message-data-time">10:12 AM, Today</span>
                                            </div>
                                            <div className="message my-message">Are we meeting today?</div>
                                        </li>
                                        <li className="clearfix">
                                            <div className="message-data">
                                                <span className="message-data-time">10:15 AM, Today</span>
                                            </div>
                                            <div className="message my-message">Project has been already finished and I have results to show you.</div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="chat-message clearfix">
                                    <div className="input-group mb-0">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fa fa-send"></i></span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="Enter text here..." />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add New user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        value={mobile}
                        placeholder={`Enter mobile number`}
                        type="number"
                        onChange={(e) => setMobile(e.target.value)}
                    />

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
