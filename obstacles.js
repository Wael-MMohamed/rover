const obstacles = new Map()

const setObstacle = (x,y) => {
    if(obstacles.get(x)){
        obstacles.get(x).includes(y) ? null :
        obstacles.set(x, [...obstacles.get(x), y])
    } else {
        obstacles.set(x, [y])
    }
}
const isObstacle = (x, y) => {
    if(obstacles.get(x)){
        return obstacles.get(x)?.includes(y)
    }
    return false
}
module.exports = {obstacles, setObstacle, isObstacle}