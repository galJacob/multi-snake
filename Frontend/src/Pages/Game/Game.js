import React, { Component } from 'react';
import CssModules from 'react-css-modules';
import styles from './Game.scss';
import Board from '../../Components/GameCmps/Board/Board';

class Game extends Component {
    state = {}
    componentDidMount() {

    }
    render() {
        return (
            <div styleName="game">
                <h1>Game Page</h1>
                <Board />
            </div>
        );
    }
}

export default CssModules(Game, styles);