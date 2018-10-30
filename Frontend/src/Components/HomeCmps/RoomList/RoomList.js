import React, { Component } from 'react';
import CssModules from 'react-css-modules';
import styles from './RoomList.scss';
import RoomPreview from '../RoomPreview/RoomPreview';
import { connect } from "react-redux";
const mapStateToProps = state => {
    return {
        forbiddenRoom: state.userReducer.forbiddenRoom,
    };
};

class RoomList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: [1, 2, 3, 4]
        }
    }
    render() {
        return (
            <div styleName="room-list">
                <h1>Rooms:</h1>
                <ul>
                    {this.state.rooms.map(roomNum => {
                        return <RoomPreview numOfRoom={roomNum} key={roomNum} />
                    })}
                </ul>
            </div>
        );
    }
}

const StyledRoomList = CssModules(RoomList, styles);
const connectedRoomList = connect(mapStateToProps)(StyledRoomList);
export default connectedRoomList;