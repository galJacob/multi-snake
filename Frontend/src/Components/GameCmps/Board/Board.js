import React, { Component } from 'react';
import styles from './Board.scss';
import CssModules from 'react-css-modules';
import { connect } from "react-redux";
import { changeDirection } from '../../../store/Actions/ToServer/ActionsToServer';
import { startGame } from '../../../store/Actions/ToServer/ActionsToServer';
import { nextMove } from '../../../store/Actions/ToServer/ActionsToServer';
import BoardService from '../../../Services/BoardService';
import CtxService from '../../../Services/CtxService';
const CANVAS_HEIGHT = parseInt(window.innerHeight / 15, 10) * 10;
const CANVAS_WIDTH = parseInt(window.innerWidth / 15, 10) * 10;

const mapDispatchToProps = dispatch => {
    return {
        changeDirection: snake => dispatch(changeDirection(snake)),
        startGame: (playingRoom, canvasWidth, canvasHeight) => dispatch(startGame(playingRoom, canvasWidth, canvasHeight)),
        nextMove: (board, playingRoom, snake) => dispatch(nextMove(board, playingRoom, snake))
    }
}
const mapStateToProps = state => {
    return {
        board: state.gameReducer.board,
        snake: state.gameReducer.snake,
        forbiddenRoom: state.userReducer.forbiddenRoom,
        players: state.userReducer.playersWithRooms
    };
};

class Board extends Component {
    constructor(props) {
        super(props);
        this.shouldStart = true;
        this.state = {
            time: 0,
            ctx: null,
            canvasSettings: {
                width: CANVAS_WIDTH,
                height: CANVAS_HEIGHT
            },
            food: {
                color: 'black',
                aspectRatio: 10,
            },
        }
        this.canvas = React.createRef();
    }
    renderBoard = board => {
        let positions = BoardService.getPositions(board);
        this.renderSnakeHead(positions.snakeHeadPos);
        this.renderFoods(positions.foods);
        this.renderNodes(positions.snakeNodes);
    }
    renderSnakeHead = snakeHeadPos => {
        let ctx = this.canvas.current.getContext("2d");
        ctx.fillStyle = this.props.snake.color;
        ctx.fillRect(...CtxService.renderRect(snakeHeadPos));
    }
    removeSnakeHead = snakeHeadPos => {
        let ctx = this.canvas.current.getContext("2d");
        ctx.clearRect(...CtxService.clearRect(snakeHeadPos));
    }
    removeNodes = snakeNodes => {
        let ctx = this.canvas.current.getContext("2d");
        snakeNodes.forEach(node => {
            ctx.clearRect(...CtxService.clearRect(node));
        })
    }
    renderNodes(snakeNodes) {
        if (snakeNodes.length) {
            let ctx = this.canvas.current.getContext("2d");
            ctx.fillStyle = this.props.snake.color;
            snakeNodes.forEach(node => {
                ctx.fillRect(...CtxService.renderRect(node));
            })
        }
    }
    renderFoods = foods => {
        let ctx = this.canvas.current.getContext("2d");
        foods.forEach(food => {
            console.log(food);
            
            let foodPos = food.pos;
            ctx.fillStyle = food.color;
            ctx.fillRect(...CtxService.renderRect(foodPos))
        });
    }
    handleMove = ev => {
        this.props.changeDirection(ev.key);
    }
    executeNextMove = (board, playingRoom, snake) => {
        this.props.nextMove(board, playingRoom, snake);
    }
    clearBoard = () => {
        let ctx = this.canvas.current.getContext("2d");
        ctx.clearRect(...CtxService.clearRect('node'));
    }
    shouldStartGame = (board, forbiddenRoom, snake) => {
        if (this.shouldStart) {
            this.executeNextMove(board, forbiddenRoom, snake);
            this.shouldStart = false;
        }
    }
    shouldComponentUpdate(nextProps) {
        let { board, forbiddenRoom, snake } = nextProps;
        if (!board.length) return false;
        this.clearBoard();
        this.renderBoard(board);
        this.shouldStartGame(board, forbiddenRoom, snake);
        return true;
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleMove, false);
    }
    init = () => {
        document.addEventListener("keydown", this.handleMove, false);
        this.props.startGame(this.props.forbiddenRoom, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
    componentDidMount() {
        this.init();
    }
    render() {
        return (
            <div styleName="board">
                <p>this is board</p>
                {console.log(this.props.players)}
                <canvas styleName="canvas-board" ref={this.canvas}
                    width={this.state.canvasSettings.width} height={this.state.canvasSettings.height} />
            </div>
        );
    }
}

let StyledBoard = CssModules(Board, styles);
const connectedBoard = connect(
    mapStateToProps,
    mapDispatchToProps
)(StyledBoard);

export default connectedBoard;