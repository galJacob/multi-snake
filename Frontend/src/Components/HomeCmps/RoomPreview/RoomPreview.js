import React, { Component } from 'react';
import CssModules from 'react-css-modules';
import styles from './RoomPreview.scss';
import { connect } from 'react-redux';
import { enterRoom } from '../../../store/Actions/ToServer/ActionsToServer';


const mapDispatchToProps = dispatch => {
    return {
        enterRoom: (roomNum, user) => dispatch(enterRoom(roomNum, user)),
    }
}
const mapStateToProps = state => {
    return {
        loggedInUser: state.userReducer.loggedInUser,
        forbiddenRoom: state.userReducer.forbiddenRoom,
    }
}

class RoomPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    enterRoom = roomNum => {
        if (!(this.props.forbiddenRoom === roomNum))
            this.props.enterRoom(roomNum, this.props.loggedInUser.username);
    }
    render() {
        var roomNum = this.props.numOfRoom;
        var forbiddenRoom = this.props.forbiddenRoom;
        return (
            <li styleName={this.props.forbiddenRoom === roomNum ? 'forbidden-room' : 'room-preview'}
                onClick={() => this.enterRoom(roomNum)} >
                {forbiddenRoom === roomNum ? <span>can't enter!</span> : <span>{roomNum}</span>}
            </li >
        );
    }
}

let StyledRoomPrev = CssModules(RoomPreview, styles);
const connectedRoomPrev = connect(mapStateToProps, mapDispatchToProps)(StyledRoomPrev);
export default connectedRoomPrev;