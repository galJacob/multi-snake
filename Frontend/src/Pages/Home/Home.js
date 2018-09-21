import React, { Component } from 'react';
import CssModules from 'react-css-modules';
import styles from './Home.scss';
import Signup from '../../Components/HomeCmps/Signup/Signup';
import ProfilePreview from '../../Components/HomeCmps/ProfilePreview/ProfilePreview';
import { connect } from "react-redux";
import { login } from '../../store/Actions';

const mapDispatchToProps = dispatch => {
    return {
        login: () => dispatch(login()),
    }
}
const mapStateToProps = state => {
    return {
        loggedInUser: state.userReducer.loggedInUser,
        statusReq: state.userReducer.statusReq,
    };
};

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        props.login();
    }
    render() {
        const whichRender = this.props.loggedInUser ? <ProfilePreview user={this.props.loggedInUser} /> : < Signup />;
        return (
            <div styleName="home">
                <h1>home page</h1>
                {!(this.props.statusReq === 'BEFORE_REQ' || this.props.statusReq === 'PENDING') && whichRender}
            </div>
        );
    }
}

const StyledHome = CssModules(Home, styles);
const connectedHome = connect(
    mapStateToProps,
    mapDispatchToProps
)(StyledHome);

export default connectedHome;


