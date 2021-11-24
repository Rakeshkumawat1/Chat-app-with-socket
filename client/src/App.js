import { React, Switch } from 'react'
import './App.css';
import { Route } from 'react-router-dom';
import Signin from './components/Signin/signin';
import Signup from './components/Signup/signup';
import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';
import Home from './components/Home/home';
import PrivateRoute from './components/HOC/privateRoute';
import { useEffect } from 'react';
import { isUserLoggedIn } from './actions';
import { useDispatch, useSelector } from 'react-redux';

function App() {

    // const dispatch = useDispatch();
    // const auth = useSelector(state => state.auth);

    // useEffect(() => {
    //     if (!auth.authenticate) {
    //         dispatch(isUserLoggedIn());
    //     }

    //     // dispatch(getInitialData());

    // }, []);

    return (
        <div className="App">
            <PrivateRoute path="/join"  component={Join} />
            <PrivateRoute path="/chat" component={Chat} />
            <PrivateRoute path="/" exact component={Home} />


            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
            {/* <Switch>
                <PrivateRoute path="/" exact component={Join} />
                <PrivateRoute path="/chat" component={Chat} /> 

                <Route path="/signin" component={Signin} />
                <Route path="/signup" component={Signup} />
            </Switch> */}
        </div>
    );
}


export default App;