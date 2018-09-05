import React, { Component } from 'react';
import appStyle from './App.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import CssModules from 'react-css-modules';
import Routes from './Routes';
import Header from './Components/Header/Header'

class App extends Component {
  state = {
  }

  render() {
    return (
      <div styleName="App">
        <Router>
          <React.Fragment>
            <Header/>
            <Routes />
          </React.Fragment>
        </Router>
      </div>
    );
  }
}

export default CssModules(App, appStyle);
