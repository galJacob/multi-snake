import React, { Component } from 'react';
import CssModules from 'react-css-modules';
import styles from './ProfilePreview.scss';

class ProfilePreview extends Component {
    state = {

    }
    render() {
        return (
            <div styleName="profile-preview">
                <h1>hello:{this.props.user.username}</h1>
            </div>
        );
    }
}

export default CssModules(ProfilePreview, styles);