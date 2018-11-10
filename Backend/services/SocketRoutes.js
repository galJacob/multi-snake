
const { ENTER_ROOM, START_GAME, NEXT_MOVE, CHANGE_DIRECTION } = require('./SocketEvents');
const { UPDATE_BOARD_SER, WILL_BUILD_BOARD } = require('./SocketEventsToclient');
const SocketService = require('./SocketService');
const BoardService = require('./GameService/BoardService');
const SnakeService = require('./GameService/SnakeService');
var gBoard, gNodes, gDirection;

module.exports = (socket, io) => {
    socket.on('action', action => {
        switch (action.type) {
            case ENTER_ROOM:
                if (SocketService.checkIfSocketPickedRoom(io, socket, action)) break;
                if (!SocketService.checkIfRoomExist(io, socket, action))
                    SocketService.enterRoom(io, socket, action);
                else {
                    if (SocketService.checkIfSocketInRoom(io, socket, action)) break;
                    SocketService.enterRoom(io, socket, action);
                    SocketService.forbidRoom(io, socket, action);
                }
                break;
            case START_GAME:
                let socketsInRoom = SocketService.getAllSocketsInRoom(io, socket, action.payload.playingRoom);
                if (socketsInRoom[1] === socket.id) break;
                let boardAndNodes;
                gBoard = BoardService.buildBoard(action.payload.canvasWidth, action.payload.canvasHeight);
                boardAndNodes = BoardService.getBoardWithFoodAndSnake(gBoard, socketsInRoom);
                gNodes = boardAndNodes.nodes;
                SocketService.sendBoardAndSnakeToClient(io, gBoard, gNodes, action.payload.playingRoom);
                break;
            case NEXT_MOVE: {
                let socketsInRoom = SocketService.getAllSocketsInRoom(io, socket, action.payload.playingRoom);
                let { snake } = action.payload;
                gDirection = snake.direction;
                if (socketsInRoom[1] === socket.id) break;
                var interval = setInterval(() => {
                    let shouldAddNode = false;
                    let lastSnakeHeadPos = {};
                    // game over:
                    if (SnakeService.isOutOfBounds(gBoard, gDirection) ||
                        SnakeService.isTouchedItSelf(gBoard, gDirection, gNodes)) {
                        SocketService.sendGameOver(io, action.payload.playingRoom);
                        clearInterval(interval);
                        return;
                    }
                    let food = BoardService.checkIfFoodEatenAndGetPos(gBoard, gDirection);
                    if (food) {
                        console.log(food);
                        SocketService.updateScores(io, food.userSocket, action.payload.playingRoom);
                        gBoard = BoardService.moveFood(gBoard, food);
                        shouldAddNode = true;
                    }
                    lastSnakeHeadPos = SnakeService.getLastSnakeHeadPos(gBoard);
                    gBoard = BoardService.getBoardMovedSnake(gBoard, gDirection);
                    gNodes = SnakeService.updateNodes(gNodes, lastSnakeHeadPos, shouldAddNode);
                    gBoard = BoardService.getBoardMovedNodes(gBoard, gNodes);
                    SocketService.sendBoardAndSnakeToClient(io, gBoard, gNodes, action.payload.playingRoom);
                }, 100);
            }
            case CHANGE_DIRECTION: {
                gDirection = SnakeService.getDirection(action.payload, gDirection);
            }
                break;
            default:
                break;
        }
    });
}
