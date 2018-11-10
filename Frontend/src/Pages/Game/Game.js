import React from 'react';
import CssModules from 'react-css-modules';
import styles from './Game.scss';
import Board from '../../Components/GameCmps/Board/Board';
import ScoreBoard from '../../Components/GameCmps/ScoreBoard/ScoreBoard';
import GameEndedModal from '../../Components/GameCmps/GameEndedModal/GameEndedModal';
const Game = props => {
    console.log(props);
    return (
        <div styleName="game">
            <Board />
            <ScoreBoard />
            <GameEndedModal history={props.history} />
        </div>
    )
}

export default CssModules(Game, styles);