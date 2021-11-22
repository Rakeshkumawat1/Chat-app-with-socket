import { React, Switch } from 'react'
import './App.css';
import { Route } from 'react-router-dom';
import Signin from './components/Signin/signin';
import Signup from './components/Signup/signup';
import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';
import PrivateRoute from './components/HOC/privateRoute';
import { useEffect } from 'react';
import { isUserLoggedIn } from './actions';
import { useDispatch, useSelector } from 'react-redux';


// const App = () => {
//     return (
//         <div>
//             <Router>
//                 <Route path="/" exact component={Join} />
//                 <Route path="/chat" component={Chat} />
//             </Router>
//         </div>
//     )
// }
function App() {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    useEffect(() => {
        if (!auth.authenticate) {
            dispatch(isUserLoggedIn());
        }

        // dispatch(getInitialData());

    }, []);

    return (
        <div className="App">
            <PrivateRoute path="/" exact component={Join} />
                <PrivateRoute path="/chat" component={Chat} />

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