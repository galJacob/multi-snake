import React, { Component } from 'react';
import appStyle from './App.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import CssModules from 'react-css-modules';
import Routes from './Routes';
import Header from './Components/Header/Header'
import { Route } from 'react-router-dom';
import io from 'socket.io-client';

class App extends Component {
  state = {
    isLoggedOut: false,
  }
  routeToHome = isLoggedOut => {
    this.setState({ isLoggedOut });
  }
  componentDidMount() {
    const socket = io('http://localhost:2000');
    socket.on('connect', () => {
      socket.emit('chat join', { data: 'hello' });
    })
  }
  render() {
    return (
      <div styleName="App">
        <Router>
          <React.Fragment>
            <Route component={Header} />
            <Routes />
          </React.Fragment>
        </Router>
      </div>
    );
  }
}

export default CssModules(App, appStyle);
