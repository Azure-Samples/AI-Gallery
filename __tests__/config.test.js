const config = require('./../src/config');

test('confirm getData has models', () =>{
    expect(config.getData()).toContain('models');
})