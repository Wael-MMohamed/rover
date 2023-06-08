const Rover = require('./rover.js');
const { setObstacle } = require('./obstacles.js')

test('rover stop before an obstacle', () => {
    const rover = new Rover(0,0,'North')
    setObstacle(2,1)
    setObstacle(2,2)
    setObstacle(2,2)
    setObstacle(1,3)
    expect(rover.commands('RFFLFFFRFFLB')).toBe('(2, 0) NORTH STOPPED')
})