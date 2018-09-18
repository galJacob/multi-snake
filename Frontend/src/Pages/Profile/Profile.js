import React, { Component } from 'react';
import CssModules from 'react-css-modules';
import styles from './Profile.scss';

class Profile extends Component {
    state = {

    }
    render() {
        return (
            <div styleName="profile">
                <h1>profile page</h1>
            </div>
        );
    }
}

export default CssModules(Profile, styles);