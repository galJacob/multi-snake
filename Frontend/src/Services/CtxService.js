const PX_CLEAR = 0.001;

function renderRect(position) {
    return [position.x * 10, position.y * 10, 10, 10];
}
function clearRect(position) {
    return [0, 0, 1000, 1000];
    // return [position.x * 10 - PX_CLEAR, position.y * 10 - PX_CLEAR, 10 + PX_CLEAR * 2, 10 + PX_CLEAR * 2];
}
export default {
    renderRect,
    clearRect
}