import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CssModules from 'react-css-modules';
import styles from './Header.scss';
import { connect } from 'react-redux';
import { logOut } from '../../store/Actions/Client/ClientActions';
import { login } from '../../store/Actions/Client/ClientActions';

const mapDispatchToProps = dispatch => {
    return {
        logOut: () => dispatch(logOut()),
        login: () => dispatch(login())
    }
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.userReducer.loggedInUser,
    };
};

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        props.login();
    }
    logOut = ev => {
        ev.preventDefault();
        this.props.logOut()
            .then(() => {
                this.props.history.push('/');
            })
    }

    render() {
        return (
            <React.Fragment>
                {this.props.loggedInUser && (
                    <div styleName="header">
                        <Link to="/">home</Link>
                        <Link to="/game">game</Link>
                        <Link to="/profile">profile</Link>
                        <Link onClick={ev => this.logOut(ev)} to="/logout">logout</Link>
                    </div>
                )}
            </React.Fragment>
        );
    }
}

let StyledHeader = CssModules(Header, styles);
const connectedHeader = connect(mapStateToProps, mapDispatchToProps)(StyledHeader);
export default connectedHeader;