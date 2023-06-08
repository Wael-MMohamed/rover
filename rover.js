const {move, rotate} = require('./utils')

class Rover {
    constructor(x, y, direction) {
        this.x = x
        this.y = y
        this.direction = direction
        this.stopped = false
    }
    
}
Rover.prototype.commands = function (commands) {
    const orders = commands?.split('');
    orders.forEach(order => {
        if(this.stopped === true) {
            return
        }
        if(order === 'F' || order === 'B') {
            const newPosition = move(order, {x:this.x, y:this.y, direction:this.direction})
            if(newPosition === 'STOPPED') {
                this.stopped = true 
                return ;
            }
            this.x = newPosition.x
            this.y = newPosition.y
            this.direction= newPosition.direction
        } else {
            const newPosition = rotate(order, {x:this.x, y:this.y, direction:this.direction})
            this.x = newPosition.x
            this.y = newPosition.y
            this.direction= newPosition.direction
        }
    })
    return !this.stopped ? `(${this.x}, ${this.y}) ${this.direction.toUpperCase()}` :
    `(${this.x}, ${this.y}) ${this.direction.toUpperCase()} STOPPED`
}

module.exports = Rover;