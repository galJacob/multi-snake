import React, { Component } from 'react';
import CssModules from 'react-css-modules';
import styles from './Home.scss';

class Home extends Component {
    state = {}
    render() {
        return (
            <div styleName="home">
                <h1>home page</h1>
            </div>
        );
    }
}

export default CssModules(Home, styles);
