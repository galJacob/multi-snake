import React, { Component } from 'react';
import CssModules from 'react-css-modules';
import styles from './Login.scss';
// import UserService from '../../../Services/UserService';
import { connect } from "react-redux";
import { login } from '../../store/Actions/Client/ClientActions';

const mapDispatchToProps = dispatch => {
    return {
        login: user => dispatch(login(user))
    }
}

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }
    onSubmit = ev => {
        ev.preventDefault();
        let user = {
            username: this.state.username,
            password: this.state.password
        }
        if (!Object.keys(user).length) return;
        this.props.login(user)
            .then((res) => {
                if (res.value === 'error in auth') return;
                this.props.history.push('/');
            })
    }
    handleInput = (ev, type) => {
        switch (type) {
            case 'username':
                this.setState({ username: ev.target.value })
                break;
            case 'password':
                this.setState({ password: ev.target.value })
                break;
            default:
                break;
        }
    }
    handleRepeatPass = ev => {
        this.setState({ repPassword: ev.target.value })
    }
    render() {
        return (
            <div styleName="login">
                <h1>login page</h1>
                <form onSubmit={this.onSubmit}>
                    <input onInput={ev => this.handleInput(ev, 'username')} value={this.state.username} placeholder="Username" />
                    <input onInput={ev => this.handleInput(ev, 'password')} value={this.state.password} type="password" placeholder="Password" />
                    <input type="submit" />
                </form>
            </div>
        );
    }
}

let StyledLogin = CssModules(Login, styles);
const connectedLogin = connect(null, mapDispatchToProps)(StyledLogin);
export default connectedLogin;