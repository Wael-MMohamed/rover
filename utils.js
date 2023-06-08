const {isObstacle} = require('./obstacles.js')
const directions = ['North', 'East', 'South', 'West']
const moves = ['y', 'x', 'y', 'x']

const move = (command, position) => {
    const currentDirection = moves[directions.indexOf(position.direction)]
    const amount = moves.indexOf(currentDirection) < 2 ? 1 : -1

    switch (command){
        case 'F':
            if(currentDirection === 'x'){
                if(isObstacle(position.x + amount, position.y)) return 'STOPPED'
            } else {
                if(isObstacle(position.x, position.y + amount)) return 'STOPPED'
            }
            return {...position, [currentDirection]: position[currentDirection] + amount}
        case 'B':
            if(currentDirection === 'x'){
                if(isObstacle(position.x - amount, position.y)) return 'STOPPED'
            } else {
                if(isObstacle(position.x, position.y - amount)) return 'STOPPED'
            }
            return {...position, [currentDirection]: position[currentDirection] - amount}
        default:
            return position
    }
}

const rotate = (command, position) => {
    let newDirection = 0
    switch (command) {
        case 'L':
            newDirection = directions.indexOf(position.direction) - 1
            return {...position, direction: directions[newDirection >= 0 ? newDirection : 3]}
        case 'R':
            newDirection = directions.indexOf(position.direction) + 1
            return {...position, direction: directions[newDirection <= 3 ? newDirection : 0]}
    }
}

const parsePath = (start, path) => {
    let result = ''
    let direction = directions.findIndex(ele => ele == start.direction)
    path.unshift([start.x, start.y])
    path.forEach((value, index, arr) => {
        if(index !== 0) {
            
            let dx =  value[0] - arr[index - 1][0]
            let dy =  value[1] - arr[index - 1][1]
            if(dx != 0) {
                if(direction % 2 == 1) {
                    direction == 1 && dx > 0 || direction == 3 && dx < 0 ? result += 'F' :
                    // direction == 1 && dx <0 ? result += 'B' :
                    result += 'B'
                } else {
                    if(direction == 0 && dx > 0 ){
                        result += 'RF'
                        direction = 1
                    } else if(direction == 2 && dx < 0 ) {
                        result += 'RF'
                        direction = 3
                    } else if(direction == 0 && dx < 0 ) {
                        result += 'LF'
                        direction = 3
                    } else {
                        result += 'LF'
                        direction = 1
                    }
                }
            } else {
                if(direction % 2 == 0) {
                    direction == 0 && dy > 0 || direction == 2 && dy < 0 ? result += 'F' :
                    //  ? result += 'F' :
                    // direction == 0 && dy <0 ? result += 'B' :
                    result += 'B'
                } else {
                    if(direction == 1 && dy > 0 ){
                        result += 'LF'
                        direction = 0
                    } else if(direction == 3 && dy < 0) {
                        result += 'LF'
                        direction = 2
                    } else if(direction == 1 && dy < 0) {
                        result += 'RF'
                        direction = 2
                    } else {
                        result += 'RF'
                        direction = 0
                    }
                     
                    
                }
            }
        }
    })
    return result
}

module.exports = {move, rotate, parsePath}