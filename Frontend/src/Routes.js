import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Game from './Pages/Game/Game';
import Profile from './Pages/Profile/Profile';


class Routes extends Component {
    state = {}
    render() {
        return (
            <React.Fragment>
                <Switch>
                    <Route exact component={Home} path='/' />
                    <Route exact component={Game} path='/game' />
                    <Route exact component={Profile} path='/profile' />
                </Switch>
            </React.Fragment>
        );
    }
}

export default Routes;