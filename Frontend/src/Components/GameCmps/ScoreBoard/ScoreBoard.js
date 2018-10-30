import React from 'react';
import CssModules from 'react-css-modules';
import styles from './ScoreBoard.scss';
import { connect } from "react-redux";

const mapStateToProps = state => {
    return {
        players: state.userReducer.playersWithRooms,
    };
};

const ScoreBoard = props => {
    return (
        <div styleName="score-board">
            <ul>
                {props.players.map((player, idx) => {
                    return (
                        <li key={idx}>
                            <ul>
                                <li>{player.user.username}</li>
                                <li>{player.user.score}</li>
                            </ul>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

let StyledBoard = CssModules(ScoreBoard, styles);
const connectedBoard = connect(mapStateToProps)(StyledBoard);
export default connectedBoard;