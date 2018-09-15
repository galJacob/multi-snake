import React, { Component } from 'react';
import styles from './Board.scss';
import CssModules from 'react-css-modules';
import { connect } from "react-redux";
import { updateBoard } from '../../../store/Actions';
import { changeDirection } from '../../../store/Actions';
import SnakeService from '../../../Services/SnakeService';
import BoardService from '../../../Services/BoardService';
import CtxService from '../../../Services/CtxService';
import FoodService from '../../../Services/FoodService';
const CANVAS_HEIGHT = parseInt(window.innerHeight / 15, 10) * 10;
const CANVAS_WIDTH = parseInt(window.innerWidth / 15, 10) * 10;

const mapDispatchToProps = dispatch => {
    return {
        updateBoard: board => dispatch(updateBoard(board)),
        changeDirection: snake => dispatch(changeDirection(snake)),
    }
}
const mapStateToProps = state => {
    return {
        board: state.board,
        snake: state.snake,
    };
};

class Board extends Component {
    constructor(props) {
        super(props);
        this.interval = null;
        this.shouldStart = true;
        this.lastSnakeHeadPos = null;
        this.nodes = [];
        this.state = {
            time: 0,
            ctx: null,
            canvasSettings: {
                width: CANVAS_WIDTH,
                height: CANVAS_HEIGHT
            },
            snake: {
                color: 'red',
                width: 10,
                velocity: 2,
                direction: 'left',
            },
            food: {
                color: 'black',
                aspectRatio: 10,
            },
        }
        this.canvas = React.createRef();
    }

    buildBoard = () => {
        let board = BoardService.getbuiltBoard(this.state.canvasSettings.width, this.state.canvasSettings.height);
        let boardAndNodes = BoardService.getBoardWithFoodAndSnake(board);
        this.nodes = boardAndNodes.nodes;
        this.props.updateBoard(boardAndNodes.board);
    }
    renderBoard = board => {
        let positions = BoardService.getPositions(board);
        this.renderSnakeHead(positions.snakeHeadPos);
        this.renderFood(positions.foodPos);
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
    renderFood = foodPos => {
        let ctx = this.canvas.current.getContext("2d");
        ctx.fillStyle = this.state.food.color;
        ctx.fillRect(...CtxService.renderRect(foodPos))
    }
    handleMove = ev => {
        let direction = SnakeService.getDirection(ev.key, this.props.snake.direction);
        let snake = Object.assign({}, this.props.snake);
        snake.direction = direction;
        this.props.changeDirection(direction);
    }
    moveSnake = board => {
        let positions = BoardService.getPositions(board);
        this.lastSnakeHeadPos = positions.snakeHeadPos;
        this.removeSnakeHead(positions.snakeHeadPos);
        board = BoardService.getBoardMovedSnake(board, this.props.snake);
        return board;
    }
    moveFood = board => {
        board = FoodService.moveFood(board);
        return board;
    }
    moveNodes = (board) => {
        this.removeNodes(this.nodes);
        this.nodes = SnakeService.updateNodes(this.nodes, this.lastSnakeHeadPos);
        board = BoardService.getBoardMovedNodes(board, this.nodes);
        return board;
    }
    checkIfFoodEaten = board => {
        if (BoardService.checkIfFoodEaten(board)) {
            this.nodes.push('newNode');
            board = this.moveFood(board)
            return board;
        }
        return board;
    }
    startOver = () => {
        alert('gameOver');
        window.location.reload();
    }
    runGame = board => {
        if (SnakeService.isOutOfBounds(board, this.props.snake) ||
            SnakeService.isTouchedItSelf(board, this.props.snake)) {
            this.stopGame();
            this.startOver();
            return;
        }
        board = this.checkIfFoodEaten(board);
        board = this.moveSnake(board);
        board = this.moveNodes(board, this.nodes);
        this.props.updateBoard(board);
        this.setState({ time: this.state.time + 100 });
    }
    init = () => {
        document.addEventListener("keydown", this.handleMove, false);
        this.buildBoard();
    }
    startGame = board => {
        this.interval = setInterval(this.runGame, 70, board);
    }
    stopGame = () => {
        clearInterval(this.interval._id);
    }
    shouldComponentUpdate(nextProps) {
        if (this.shouldStart) {
            this.startGame(nextProps.board);
            this.shouldStart = false;
        }
        this.renderBoard(nextProps.board);
        return true;
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleMove, false);
    }
    render() {
        return (
            <div styleName="board">
                <p>this is board</p>
                <button onClick={this.init}>start</button>
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