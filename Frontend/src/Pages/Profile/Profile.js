import React, { Component } from 'react';
import CssModules from 'react-css-modules';
import styles from './Profile.scss';
// import connect
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {}
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