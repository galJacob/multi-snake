import React from 'react';
import CssModules from 'react-css-modules';
import styles from './GameEndedModal.scss';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        isGameEnded: state.gameReducer.isGameEnded
    };
};
const GameEndedModal = props => {
    const redirect = () => {
        setTimeout(() => props.history.push('/'), 2000);
    }
    return (
        <React.Fragment>
            {props.isGameEnded && (
                <div styleName="game-ended-modal-container">
                    <div styleName="game-ended-modal">
                        {redirect()}
                        game ended
                        <button>play again</button>
                    </div>
                </div>
            )
            }
        </React.Fragment>
    )
}
let StyledGameEnded = CssModules(GameEndedModal, styles);
const connectedGameEnded = connect(mapStateToProps)(StyledGameEnded);
export default connectedGameEnded;


