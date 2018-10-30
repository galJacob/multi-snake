import React, { Component } from 'react';
import CssModules from 'react-css-modules';
import styles from './Game.scss';
import Board from '../../Components/GameCmps/Board/Board';
import ScoreBoard from '../../Components/GameCmps/ScoreBoard/ScoreBoard'


class Game extends Component {
    state = {}

    render() {
        return (
            <div styleName="game">
                    <Board />
                <ScoreBoard />
            </div>
        );
    }
}

export default CssModules(Game, styles);