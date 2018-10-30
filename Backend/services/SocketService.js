const { ROOM_ENTERED, FORBID_ROOM, SEND_BOARD_SNAKE_TO_CLIENT,UPDATE_SCORES } = require('./SocketEventsToclient');

function checkIfRoomExist(io, socket, action) {
    var roomNum = `${action.payload.roomNum}`;
    var room = io.sockets.adapter.rooms[roomNum];
    let isExist = false;
    isExist = room ? true : false;
    return isExist;
}

function enterRoom(io, socket, action) {
    var roomNum = `${action.payload.roomNum}`;
    let payload = { roomNum, user: { score: 0, username: action.payload.user, userSocket: socket.id } };
    socket.join(roomNum, () => {
        io.emit('action', { type: ROOM_ENTERED, payload });
    });
}

function updateScores(io, userSocket, playingRoom) {
    io.to(playingRoom).emit('action', {
        type: UPDATE_SCORES,
        payload: userSocket
    });
}

function forbidRoom(io, socket, action) {
    io.emit('action', { type: FORBID_ROOM, payload: action.payload.roomNum });
}

function checkIfSocketInRoom(io, socket, action) {
    var roomNum = `${action.payload.roomNum}`;
    let isInRoom = io.sockets.adapter.rooms[roomNum].sockets[socket.id];
    return isInRoom;
}

function checkIfSocketPickedRoom(io, socket, action) {
    var roomNum = `${action.payload.roomNum}`;
    var rooms = io.sockets.adapter.rooms;
    // console.log('wrongggggg', io.sockets.adapter.rooms[socket.id]);
    let isSocketInRoom = false;
    // TODO:fix the bug when one joins a room and then clicks on another
    // and then cant enter the previous room
    for (var roomId in rooms) {
        if (roomId === socket.id) continue;
        if (roomId === roomNum) continue;
        if (rooms[roomId].sockets[socket.id]) {
            isSocketInRoom = true;
        }
    }
    return isSocketInRoom;
}

function getAllSocketsInRoom(io, socket, playingRoom) {
    let sockets = io.sockets.adapter.rooms[playingRoom].sockets;
    let socketsInRoom = [];
    for (let socketId in sockets) socketsInRoom.push(socketId);
    return socketsInRoom;
}

function decideWhoBuildBoard(socketsInRoom) {
    return socketsInRoom[0];
}

function getToEmitSocket(socket, socketsInRoom) {
    let wantedSocket = socketsInRoom.find(socketId => socketId !== socket.id)
    console.log('the other socket to send to:', wantedSocket);
    return wantedSocket;
}
function sendBoardAndSnakeToClient(io, board, nodes, playingRoom) {
    io.to(playingRoom).emit('action', {
        type: SEND_BOARD_SNAKE_TO_CLIENT,
        payload: { board, nodes }
    });
}

module.exports = {
    checkIfRoomExist,
    enterRoom,
    checkIfSocketInRoom,
    forbidRoom,
    checkIfSocketPickedRoom,
    getAllSocketsInRoom,
    decideWhoBuildBoard,
    getToEmitSocket,
    sendBoardAndSnakeToClient,
    updateScores
}