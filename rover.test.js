const Rover = require('./rover.js');


test('test rover excute commands', () => {

    const rover = new Rover(4,2,'East')
    expect(rover.commands('FLFFFRFLB')).toBe('(6, 4) NORTH')
})