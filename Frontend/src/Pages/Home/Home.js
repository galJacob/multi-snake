import React, { Component } from 'react';
import CssModules from 'react-css-modules';
import styles from './Home.scss';
import Signup from '../../Components/HomeCmps/Signup/Signup';
import ProfilePreview from '../../Components/HomeCmps/ProfilePreview/ProfilePreview';
import RoomList from '../../Components/HomeCmps/RoomList/RoomList';
import { connect } from "react-redux";
import { login } from '../../store/Actions/Client/ClientActions';
// import SocketService from '../../Services/SocketService/SocketService';

const mapDispatchToProps = dispatch => {
    return {
        login: () => dispatch(login()),
    }
}
const mapStateToProps = state => {
    return {
        loggedInUser: state.userReducer.loggedInUser,
        statusReq: state.userReducer.statusReq,
        playersWithRooms: state.userReducer.playersWithRooms,
    };
};

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shouldWait: null,
            interval: null,
            countDownNum: 5
        }
        props.login();
    }
    countDown = () => {
        var interval = setInterval(this.timer, 1000);
        this.setState({ interval: interval });
        return true;
    }
    timer = () => {
        this.setState({ countDownNum: this.state.countDownNum - 1 });
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.playersWithRooms.length === 2 && !nextState.interval) {
            this.countDown();
            return true;
        }
        if (!nextState.countDownNum) {
            clearInterval(this.state.interval);
            this.props.history.push('/game');
        }
        return true;
    }
    render() {
        var whichRender = this.props.loggedInUser ?
            (
                <React.Fragment>
                    <ProfilePreview user={this.props.loggedInUser} />
                    <RoomList />
                </React.Fragment>
            )
            : < Signup />;
        var flagReady = this.props.playersWithRooms.length === 2;
        return (
            <div styleName="home">
                <h1>home page</h1>
                {!(this.props.statusReq === 'BEFORE_REQ' || this.props.statusReq === 'PENDING') && whichRender}
                {this.props.playersWithRooms && (
                    <div styleName="chosen-room-container">
                        {this.props.playersWithRooms.map((playerWRoom, idx) => {
                            return <p key={idx}>{playerWRoom.user.username} chose:{playerWRoom.roomNum}</p>
                        })}
                    </div>
                )}
                {flagReady && (
                    <div>{this.state.countDownNum}</div>
                )
                }
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


