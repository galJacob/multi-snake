import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CssModules from 'react-css-modules';
import styles from './Header.scss';

class Header extends Component {
    state = {}
    render() {
        return (
            <div styleName="header">
                <Link to="/">home</Link>
                <Link to="/game">game</Link>
            </div>
        );
    }
}

export default CssModules(Header, styles);