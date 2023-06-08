const { bfs } = require('./findPath.js')
const { setObstacle } = require('./obstacles.js')
const { parsePath } = require('./utils.js')

test('Find safe path from origin to destination avoiding obstacles', () => {
    setObstacle(2,1)
    setObstacle(2,2)
    setObstacle(6,6)
    setObstacle(1,3)
    const path = bfs([0,0], [6,7])
    expect(parsePath({x: 0, y: 0, direction: 'North'}, path)).toBe('RFFFFFLFFFFFFFRF')
})