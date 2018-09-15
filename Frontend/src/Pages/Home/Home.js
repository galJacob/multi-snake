import React, { Component } from 'react';
import CssModules from 'react-css-modules';
import styles from './Home.scss';
import Signup from '../../Components/HomeCmps/Signup/Signup';

class Home extends Component {
    state = {}
    render() {
        return (
            <div styleName="home">
                <h1>home page</h1>
                <Signup />
            </div>
        );
    }
}

export default CssModules(Home, styles);
