import React, { Component } from 'react';
import styles from './Board.scss';
import CssModules from 'react-css-modules';
import { connect } from "react-redux";
import { updateBoard } from '../../../store/Actions';
import { changeDirection } from '../../../store/Actions';
import { addNode } from '../../../store/Actions';
// import { startInterval } from '../../../store/Actions';
import SnakeService from '../../../Services/SnakeService';
import BoardService from '../../../Services/BoardService';
import CtxService from '../../../Services/CtxService';
import { setInterval } from 'timers';
import FoodService from '../../../Services/FoodService';

const mapDispatchToProps = dispatch => {
    return {
        updateBoard: board => dispatch(updateBoard(board)),
        changeDirection: snake => dispatch(changeDirection(snake)),
        startInterval: interval => dispatch(changeDirection(interval)),
        addNode: newNode => dispatch(addNode(newNode))
    }
}
const mapStateToProps = state => {
    return {
        board: state.board,
        snake: state.snake,
        gameInterval: state.gameInterval
    };
};

class Board extends Component {
    constructor(props) {
        super(props);
        this.interval = null;
        this.counter = 0;
        this.state = {
            time: false,
            ctx: null,
            canvasSettings: {
                width: parseInt(window.innerWidth / 2, 10),
                height: parseInt(window.innerHeight / 2, 10)
            },
            snake: {
                color: 'red',
                width: 10,
                velocity: 2,
                direction: 'left',
                position: {
                    x: null,
                    y: null
                },
                nodes: [],
                animation: null
            },
            food: {
                color: 'black',
                aspectRatio: 10,
                position: {
                    x: null,
                    y: null
                },
                animation: null,
            },
        }
        this.canvas = React.createRef();
    }

    buildBoard = () => {
        let board = BoardService.getbuildedBoard(this.state.canvasSettings.width, this.state.canvasSettings.height);
        board = BoardService.getBoardWithFoodAndSnake(board);
        this.props.updateBoard(board);
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
        this.removeSnakeHead(positions.snakeHeadPos);
        board = BoardService.getBoardMovedSnake(board, this.props.snake);
        return board;
    }
    moveFood = board => {
        board = FoodService.moveFood(board);
        return board;
    }
    moveNodes = board => {
        let positions = BoardService.getPositions(board);
        console.log(positions);
        //         snakeHeadPos
        // :
        // {x: 4, y: 19}
        // snakeNodes
        // :
        // Array(1)
        // 0
        // :
        // {x: 4, y: 20}
    }
    addNode = board => {
        let positions = BoardService.getPositions(board);
        let nodePos = SnakeService.addNode(positions.snakeHeadPos, this.props.snake.direction);
        board = BoardService.addNewNode(nodePos, board);
        this.props.addNode(nodePos);
        return board;
    }
    checkIfFoodEaten = board => {
        if (BoardService.checkIfFoodEaten(board)) {
            board = this.addNode(board);
            return this.moveFood(board);
        }
        return board;
    }
    runGame = board => {
        board = this.moveSnake(board);
        board = this.checkIfFoodEaten(board);
        this.moveNodes(board);
        this.props.updateBoard(board);
        this.setState({ time: this.state.time + 100 });
    }
    init = () => {
        this.buildBoard();
    }
    startGame = board => {
        this.interval = setInterval(this.runGame, 70, board);
    }
    stop = () => {
        clearInterval(this.interval);
    }
    componentDidMount() {
        document.addEventListener("keydown", this.handleMove, false);
    }
    shouldComponentUpdate(nextProps) {
        if (!this.counter) {
            this.startGame(nextProps.board);
            this.counter++;
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
                <button onClick={this.stop}>stop</button>
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