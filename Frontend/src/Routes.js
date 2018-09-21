import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Game from './Pages/Game/Game';
import Profile from './Pages/Profile/Profile';
import Login from './Pages/Login/Login';

class Routes extends Component {
    state = {}
    render() {
        return (
            <React.Fragment>
                <Switch>
                    <Route exact component={Home} path='/' />
                    <Route exact component={Game} path='/game' />
                    <Route exact component={Profile} path='/profile' />
                    <Route exact component={Login} path='/login' />
                </Switch>
            </React.Fragment>
        );
    }
}

export default Routes;