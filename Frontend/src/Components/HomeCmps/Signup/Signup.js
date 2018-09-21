import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CssModules from 'react-css-modules';
import styles from './Signup.scss';
import { connect } from "react-redux";
import { addUser } from '../../../store/Actions';

const mapDispatchToProps = dispatch => {
    return {
        addUser: user => dispatch(addUser(user))
    }
}

class Signup extends Component {
    state = {
        username: '',
        password: '',
        repPassword: ''
    }
    onSubmit = ev => {
        ev.preventDefault();
        if (this.state.password !== this.state.repPassword){
            alert('incorrect password');
            return;
        }
        let user = {
            username: this.state.username,
            password: this.state.password
        }
        this.props.addUser(user);
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
            <div styleName="signup">
                <h1>Welcome to Multi Snake</h1>
                <p>Enjoy with friends together!</p>
                <form onSubmit={this.onSubmit}>
                    <input onInput={ev => this.handleInput(ev, 'username')} value={this.state.username} placeholder="Username" />
                    <input onInput={ev => this.handleInput(ev, 'password')} value={this.state.password} type="password" placeholder="Password" />
                    <input onInput={ev => this.handleRepeatPass(ev)} value={this.state.repPassword} type="password" placeholder="Repeat password" />
                    <input type="submit" />
                </form>
                <p>already a user?<Link to="/login">Login</Link></p>
            </div>
        );
    }
}
let StyledSignup = CssModules(Signup, styles);
const connectedSignup = connect(null, mapDispatchToProps)(StyledSignup);
export default connectedSignup;