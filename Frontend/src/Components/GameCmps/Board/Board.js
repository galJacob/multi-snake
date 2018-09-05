import React, { Component } from 'react';
import CssModules from 'react-css-modules';
import styles from './Board.scss';
import SnakeService from '../../../Services/SnakeService';

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ctx: null,
            animationFr: null,
            canvasSettings: {
                width: window.innerWidth / 2,
                height: window.innerHeight / 2
            },
            snakeAspects: {
                length: null,
                width: null, //constant
                velocity: 2,
                direction: 'left'
            },
            snakePosition: {
                x: null,
                y: null,
            }
        }
        this.canvas = React.createRef();
        this.state.snakeAspects.length = parseInt(this.state.canvasSettings.width / 25, 10);
        this.state.snakeAspects.width = parseInt(this.state.canvasSettings.width / 25, 10);
        this.state.snakePosition.x = parseInt(this.state.canvasSettings.width / 2, 10);
        this.state.snakePosition.y = parseInt(this.state.canvasSettings.height / 2, 10);
    }
    drawSnake = () => {
        var ctx = this.canvas.current.getContext("2d");
        ctx.fillStyle = 'red';
        ctx.fillRect(this.state.snakePosition.x, this.state.snakePosition.y,
            this.state.snakeAspects.length, this.state.snakeAspects.width);
    }
    moveSnake = () => {
        var ctx = this.canvas.current.getContext("2d");
        ctx.clearRect(0, 0, this.state.canvasSettings.width, this.state.canvasSettings.height);
        this.handleToDirection();
        this.drawSnake();
    }
    handleToDirection = () => {
        let snakePosition = SnakeService.getNewPosition(this.state.snakePosition, this.state.snakeAspects);
        this.setState({ snakePosition });
        this.setState({ animationFr: window.requestAnimationFrame(this.moveSnake) });
    }
    configureMoves = () => {
        document.addEventListener("keydown", this.handleMove, false);
    }
    handleMove = (ev) => {
        let direction = SnakeService.getDirection(ev.key, this.state.snakeAspects.direction);
        let snakeAspects = Object.assign({}, this.state.snakeAspects);
        snakeAspects.direction = direction;
        this.setState({ snakeAspects });
    }
    startGame = () => {
        this.setState({ animationFr: window.requestAnimationFrame(this.moveSnake) })
    }
    stop = () => {
        window.cancelAnimationFrame(this.state.animationFr);
    }
    init = () => {
        this.drawSnake();
        this.startGame();
        this.configureMoves();
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleMove, false)
    }
    render() {
        return (
            <div styleName="board">
                <p>this is board</p>
                <button onClick={this.init}>start</button>
                <canvas onMouseOver={this.stop} styleName="canvas-board" ref={this.canvas}
                    width={this.state.canvasSettings.width} height={this.state.canvasSettings.height} />
            </div>
        );
    }
}

export default CssModules(Board, styles);